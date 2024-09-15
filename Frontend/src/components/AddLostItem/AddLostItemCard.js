import React, { useState } from "react";
import LostItemInput from "./LostItemInput/LostItemInput";
import "./LostItemCard.css";
import ImageUpload from "./ImageUpload/ImageUpload";
import Button from "../Button/Button";
import SearchCardHeader from "../Search/SearchCard/SearchCardHeader/SearchCardHeader";
import Confirmation from "./confirmation/Confirmation";
//each item contains: description, contact (email, phone number, etc), finder (posters username), image (uploaded image)
function AddLostItemCard() {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false)

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const uploadLostItem = async () => {

    try {
      const response = await fetch('http://localhost/lost_item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title: title,
          description: description,
          object_type: type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload lost item');
      }
      setValid(true)
      setDescription("")
      setTitle("")
      setType("")
      setTimeout(() => setValid(false), 7000);


    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="add-lost-item-card">
      {valid && <Confirmation />}
      <SearchCardHeader>Enter Lost Item Description</SearchCardHeader>
      <LostItemInput
        label="Description: "
        type="textarea"
        name="Description"
        value={description}
        placeholder="specific details. eg. basketball with signatures"
        onChange={handleDescriptionChange}
      />
      <LostItemInput
        label="Object type: "
        type="text"
        name="text"
        value={type}
        placeholder="basketball, football, airpods, etc."
        onChange={handleTypeChange}
      />
      <LostItemInput
        label="Title: "
        type="text"
        name="title"
        value={title}
        placeholder="ex. lost brand new airpods"
        onChange={handleTitleChange}
      />
      <div className="update-query-form-button">
        <Button
          onClick={uploadLostItem}
          buttonStyle="btn-outline"
          buttonSize="btn-max-width"
        >
          Update Query
        </Button>
      </div>
    </div>
  );
}

export default AddLostItemCard;
