import React, { useState } from "react";
import LostItemInput from "./LostItemInput/LostItemInput";
import "./LostItemCard.css";
import ImageUpload from "./ImageUpload/ImageUpload";
import Button from "../Button/Button";
//each item contains: description, contact (email, phone number, etc), finder (posters username), image (uploaded image)
function AddLostItemCard() {
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [img, setImg] = useState(null); // img will store a file

  // Handle input changes
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    const newItem = {
      description: description,
      contact: contact,
      img: img,
    };

    // Further processing of form data like sending to a backend, etc.
  };

  return (
    <div className="add-lost-item-card">
      <div className="add-lost-item-header">
        Submit info about what you found
      </div>
      <LostItemInput
        label="Description: "
        name="description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <LostItemInput
        label="Contact: "
        name="contact"
        value={contact}
        onChange={handleContactChange}
      />
      <ImageUpload img={img} setImg={setImg} />
      <Button
        location="/search"
        onClick={handleSubmit}
        buttonStyle="btn-primary"
        buttonSize="btn-max-width"
      >
        Post found item
      </Button>
    </div>
  );
}

export default AddLostItemCard;
