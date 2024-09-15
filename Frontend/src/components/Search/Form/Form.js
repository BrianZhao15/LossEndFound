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

  const handleChange = (e) => {
    setDescription(e.target.value);
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
        onChange={handleChange}
      />
      <FormInput
        label="Object type: "
        type="text"
        name="color"
        value={type}
        placeholder="basketball, football, airpods, etc."
        onChange={handleChange}
      />
      <FormInput
        label="Title: "
        type="text"
        name="title"
        value={description}
        placeholder="ex. lost brand new airpods"
        onChange={handleChange}
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
