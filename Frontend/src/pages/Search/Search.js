import React from "react";
import "./Search.css";
import Form from "../../components/Search/Form/Form";
import List from "../../components/Search/List/List";

function Search() {
  return (
    <div className="search-container">
      <Form />
      <List />
    </div>
  );
}

export default Search;
