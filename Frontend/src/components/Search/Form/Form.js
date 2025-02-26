import React, { useState } from "react";
import axios from 'axios';  // Make sure axios is imported
import "./Form.css";
import FormInput from "./FormInput/FormInput";
import Button from "../../Button/Button";
import SearchCard from "../SearchCard/SearchCard";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

const API_KEY = 'cohere_api_key';  // Remember to replace with your Cohere API key
const BASE_URL = 'https://api.cohere.ai/v1/generate';

function Form() {
  const [description, setDescription] = useState("");  // The state for input

  const handleChange = (e) => {
    setDescription(e.target.value);  // Handle change in inputted data in field to parse
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior I guess

    console.log("Form Submitted Value of:", description);

    try {
      const response = await axios.post(
        BASE_URL,
        {
          model: 'command-xlarge-nightly',  // The Cohere model of the playground AI
          prompt: description,  // Send the description entered by the user to server side
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,  // Be sure to add your own Cohere API Key here
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
        onChange={handleChange}
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