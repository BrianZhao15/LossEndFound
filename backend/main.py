import os
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from firebase_admin import auth, credentials, initialize_app
from io import BytesIO
from PIL import Image
import numpy as np
from dotenv import load_dotenv
import cohere
import chromadb
from chromadb.utils.embedding_functions import CohereEmbeddingFunction
from sklearn.metrics.pairwise import cosine_similarity as cs

# Load environment variables from .env
load_dotenv()

# Fetch keys from environment
FIREBASE_KEY = os.getenv('FIREBASE_ADMIN_SDK_KEY')
COHERE_KEY = os.getenv('COHERE_API_KEY')

# Initialize FastAPI app
app = FastAPI()

# Check for required keys
if not FIREBASE_KEY or not COHERE_KEY:
    raise ValueError(
        "FIREBASE_ADMIN_SDK_KEY or COHERE_API_KEY not set. Please check your environment variables.")

# Initialize Firebase
try:
    if os.path.exists(FIREBASE_KEY):
        cred = credentials.Certificate(FIREBASE_KEY)
    else:
        cred = credentials.Certificate(json.loads(FIREBASE_KEY))
    initialize_app(cred)
except Exception as e:
    raise ValueError(f"Firebase initialization failed: {str(e)}")

# Initialize Cohere client
cohere_client = cohere.Client(COHERE_KEY)

# Initialize ChromaDB client and collection
chroma_client = chromadb.PersistentClient(path="./chroma_db")

# Check if collection already exists, else create it
collection_name = "lost_found_items"
embedding_function = CohereEmbeddingFunction(api_key=COHERE_KEY)

try:
    chroma_collection = chroma_client.get_collection(collection_name)
except ValueError:
    chroma_collection = chroma_client.create_collection(
        collection_name,
        embedding_function=embedding_function
    )

# Helper function to extract image features (color)


def extract_image_features(image: Image.Image):
    # Average color of the image (RGB)
    color = np.array(image).mean(axis=(0, 1)).tolist()
    return {"color": color}

# Helper function to calculate cosine similarity between embeddings


def cosine_similarity(embedding1, embedding2):
    # Ensure embeddings are flattened to 1D
    embedding1 = np.ravel(embedding1)
    embedding2 = np.ravel(embedding2)
    return cs([embedding1], [embedding2])[0][0]

# Model for Lost Item


class LostItem(BaseModel):
    title: str
    description: str
    object_type: str

# Route to upload lost item details


@app.post("/lost_item/")
async def upload_lost_item(title: str = Form(...), description: str = Form(...), object_type: str = Form(...)):
    try:
        # Generate embedding for lost item using Cohere
        embedding = cohere_client.embed(
            texts=[description], model="embed-multilingual-v2.0").embeddings[0]

        # Ensure embedding is a list for ChromaDB compatibility
        embedding = list(embedding)

        # Store the lost item details in ChromaDB
        chroma_collection.add(
            embeddings=[embedding],
            ids=[title],
            metadatas=[{"title": title, "description": description,
                        "object_type": object_type}]
        )
        return {"message": "Lost item uploaded successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")

# Route to upload found item image


@app.post("/found_item/")
async def upload_found_item(image: UploadFile = File(...), description: str = Form(...), object_type: str = Form(...)):
    try:
        # Read and process image
        image_bytes = await image.read()
        img = Image.open(BytesIO(image_bytes))

        # Extract image features (e.g., color)
        image_features = extract_image_features(img)
        image_features_str = json.dumps(image_features)

        # Generate embedding for image features using Cohere
        embedding = cohere_client.embed(
            texts=[image_features_str]).embeddings[0]

        # Ensure embedding is a list for ChromaDB compatibility
        embedding = list(embedding)

        # Store the found item details in ChromaDB
        chroma_collection.add(
            embeddings=[embedding],
            ids=[image.filename],
            metadatas=[{"image_features": image_features_str,
                        "description": description, "object_type": object_type}]
        )
        return {"message": "Found item uploaded successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")

# Route to compare lost item description with found items


@app.get("/match_lost_item/")
# Lowered threshold for testing
async def match_lost_item(description: str, object_type: str, threshold: float = 0.8):
    try:
        # Generate embedding for lost item description using Cohere
        query_embedding = cohere_client.embed(
            texts=[description], model="embed-multilingual-v2.0").embeddings[0]

        # Debugging: Check if embedding was generated properly
        # print(f"Generated embedding for description: {query_embedding}")

        # Search in ChromaDB for similar found items
        results = chroma_collection.query(
            query_embeddings=[query_embedding], n_results=3, include=["embeddings", "metadatas", "distances"])

        # Debugging: Output the raw results from ChromaDB
        # print(f"Query Results from ChromaDB: {results}")

        # Ensure results are not empty and contain valid metadata
        if not results or "metadatas" not in results or not results["metadatas"]:
            raise HTTPException(status_code=404, detail="No matches found")

        # Initialize an empty list for matches
        matches = []

        # Iterate through the results and filter by object type and threshold
        for idx, metadata in enumerate(results["metadatas"]):
            # print(f"Checking metadata {metadata}")  # Debugging output
            for dict in metadata:
                # print(f"dict: {dict}")
                # print(f'{"object_type" in dict}')
                # print(
                #     f'{dict["object_type"]}-----{object_type[1:len(object_type) - 1]}')
                if "object_type" in dict and dict["object_type"] == object_type[1:len(object_type) - 1]:
                    # print(f"Hello World")
                    # Get the corresponding embedding
                    stored_embedding = np.array(results["embeddings"][idx])

                    # print(f"stored_embedding successful")

                    # Calculate similarity
                    similarity = cosine_similarity(
                        query_embedding, stored_embedding)
                    # print(f"Similarity: {similarity}")  # Debugging output

                    # Check if the similarity exceeds the threshold
                    if similarity >= threshold:
                        matches.append(
                            {"metadata": metadata, "similarity": similarity})

        # If no matches found above the threshold
        if not matches:
            raise HTTPException(
                status_code=404, detail="No relevant matches found")

        return {"matches": matches}

    except Exception as e:
        # Print the full exception for debugging
        # print(f"Full Error: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


# Route for Firebase Authentication


@app.post("/login/")
async def login(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]
        return {"uid": uid}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
