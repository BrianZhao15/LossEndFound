import React, { useState } from "react";
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

function Form() {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    const newItem = { description: description, type: type, title: title };
    console.log("Form Submitted Value of: ", newItem);
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
          onClick={handleSubmit}
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
