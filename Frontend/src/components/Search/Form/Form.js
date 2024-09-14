import React, { useState } from "react";
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";

//color, shape, size, date it was lost,

function Form() {
  //label, type, name, value, placeholder, onChange
  const [formData, setFormData] = useState({
    color: "",
    shape: "",
    size: "",
    dateOfLoss: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // handle form submission logic here
  };
  return (
    <SearchCard scroll="hidden">
      <FormInput
        label="Color"
        type="text"
        name="color"
        value={formData.firstName}
        placeholder="color of item"
        onChange={handleChange}
      />
      <FormInput
        label="Shape"
        type="text"
        name="shape"
        value={formData.shape}
        placeholder="shape of item"
        onChange={handleChange}
      />
      <FormInput
        label="Size"
        type="text"
        name="firstName"
        value={formData.firstName}
        placeholder="size of item"
        onChange={handleChange}
      />
      <FormInput
        label="Date of loss"
        type="date"
        name="dateOfLoss"
        value={formData.dateOfLoss}
        onChange={handleChange}
      />
      <div className="update-query-form-button">
        <Button
          location=""
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
