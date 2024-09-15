import React, { useState } from "react";
import axios from 'axios';  // Make sure axios is imported
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

const API_KEY = 'z8n2w30S7Q59PTydYSfG4PHekEVo1ZvbTXNbFRfW';  // Replace with your Cohere API key
const BASE_URL = 'https://api.cohere.ai/v1/generate';

function Form() {
  const [description, setDescription] = useState("");  // State for input

  // Handle change in input field
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle form submission with API call to Cohere
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    console.log("Form Submitted Value of:", description);

    try {
      const response = await axios.post(
        BASE_URL,
        {
          model: 'command-xlarge-nightly',  // The Cohere model you're using
          prompt: description,  // Send the description entered by the user
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,  // Add your Cohere API Key here
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Cohere Response:", response.data.generations[0].text);
    } catch (error) {
      console.error('Error calling Cohere API:', error);
    }
  };

  return (
    <SearchCard scroll="hidden">
      <SearchCardHeader>Enter Lost Item Description</SearchCardHeader>
      <FormInput
        label="Description"
        type="text"
        name="description"
        value={description}
        placeholder="color, size, shape etc."
        onChange={handleChange}  // Capture input changes
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
