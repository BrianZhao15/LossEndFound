import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload({ img, setImg }) {
  const [preview, setPreview] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImg(file);
      // Create a preview URL (Data URL)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Preview image using a Data URL
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file");
    }
  };

  // Handle form submission or further processing

  return (
    <div className="image-upload-container">
      <label>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {preview && (
        <div>
          <p>Image Preview:</p>
          <img src={preview} alt="Selected Preview" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
