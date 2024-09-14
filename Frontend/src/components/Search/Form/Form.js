import React, { useState } from "react";
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

function Form() {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("Form Submitted Value of: ", description);
  };
  return (
    <SearchCard scroll="hidden">
      <SearchCardHeader>Enter Lost Item Description</SearchCardHeader>
      <FormInput
        label="Description"
        type="text"
        name="color"
        value={description}
        placeholder="color, size, shape etc."
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
