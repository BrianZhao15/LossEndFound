import React, { useState } from "react";
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

function Form({ itemList, setItemList }) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState('');

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
      // const response = await fetch('http://localhost/lost_item/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: new URLSearchParams({
      //     title: title,
      //     description: description,
      //     object_type: type,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to upload lost item');
      // }

      // const data = await response.json();
      // setMessage(data.message);  // Set success message from backend


      const response = await fetch(`http://localhost/match_lost_item/?description=${description}&object_type=${type}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('No matches found');
      }

      const data = await response.json();
      setItemList(data.matches.metadata)
      console.log(itemList);


    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while uploading the lost item.');
    }
  };
  return (
    <SearchCard scroll="hidden">
      <SearchCardHeader>Enter Lost Item Description</SearchCardHeader>
      <FormInput
        label="Description: "
        type="textarea"
        name="Description"
        value={description}
        placeholder="specific details. eg. basketball with signatures"
        onChange={handleDescriptionChange}
      />
      <FormInput
        label="Object type: "
        type="text"
        name="text"
        value={type}
        placeholder="basketball, football, airpods, etc."
        onChange={handleTypeChange}
      />
      <FormInput
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
    </SearchCard>
  );
}

export default Form;
