// backend/convex/items.ts
import { mutation } from './_generated/server';
// import cohere from 'cohere-ai';
import { ChromaClient } from 'chromadb';
// import { detectLanguage, translateText } from './utils';
import dotenv from 'dotenv';
// import { matchItems } from './match';
import { v } from 'convex/values';

dotenv.config();

const { CohereClient } = require("cohere-ai")


const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// cohere.init(process.env.COHERE_API_KEY);

const chromaClient = new ChromaClient({
  path: process.env.CHROMA_API_URL, // Should be 'http://localhost:8000'
});

export const postItem = mutation({
  args: {
    userId: v.id('users'), // The ID of the user
    type: v.string(), // Either 'lost' or 'found'
    description: v.string(), // The description of the item
    imageUrl: v.string(), // URL to the item's image
    location: v.string(), // Location where the item was lost/found
  },
  handler: async ({ db }, { userId, type, description, imageUrl, location }) => {
    const timestamp = Date.now();

    // Generate embedding using Cohere's embed method
    const cohereResponse = await cohere.embed({ texts: [description] });
    const embedding = cohereResponse.body.embeddings[0];

    // Insert the item into the database
    const itemId = await db.insert('items', {
      userId,
      type,
      description,
      imageUrl,
      location,
      timestamp,
      embeddingId: 'embeddingId', // Placeholder for embedding ID
      matchedItemIds: [],
    });

    // Get the item from the database after insertion
    const item = await db.get(itemId);
    if (!item) throw new Error(`Item with ID ${itemId} not found.`);

    const oppositeType = item.type === 'lost' ? 'found' : 'lost';

    // Access the collection in Chroma and perform similarity search
    const collection = await chromaClient.getOrCreateCollection({
      name: 'item_embeddings',
      metadata: { description: 'Embedding collection for lost and found items' },
    });

    const queryResult = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 5,
      where: { type: oppositeType },
    });

    const matchedIds = queryResult.ids[0];

    for (const matchedId of matchedIds) {
      const matchedUserId = matchedId;
      const matchedItem = await db
        .query('items')
        .filter(q => q.eq(q.field('userId'), matchedUserId))
        .first();

      if (matchedItem) {
        // Update matched items
        await db.patch(itemId, {
          matchedItemIds: [...item.matchedItemIds, matchedItem._id],
        });
        await db.patch(matchedItem._id, {
          matchedItemIds: [...matchedItem.matchedItemIds, itemId],
        });

        // Send notifications
        await db.insert('notifications', {
          userId: item.userId,
          message: `Potential match found for your ${item.type} item.`,
          timestamp: Date.now(),
          read: false,
        });

        await db.insert('notifications', {
          userId: matchedItem.userId,
          message: `Your ${matchedItem.type} item may match with another user's item.`,
          timestamp: Date.now(),
          read: false,
        });
      }
    }
  },
});
