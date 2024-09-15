import React, { useState } from "react";
import "./Search.css";
import Form from "../../components/Search/Form/Form";
import List from "../../components/Search/List/List";

function Search() {
  //each item contains: description, contact (email, phone number, etc), finder (posters username), image (uploaded image)
  const [lostItems, setLostItems] = useState([
    {
      description: "yellow and blue mikasa volleyball",
      contact: "6472005730",
      finder: "Jason",
      image: "/images/temp.jpg",
    },
  ]);
  return (
    <div className="search-container">
      <Form />
      <List items={lostItems} setLostItems={setLostItems} />
    </div>
  );
}

export default Search;
