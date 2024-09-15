import React from "react";
import SearchCard from "../SearchCard/SearchCard";
import ListItem from "./ListItem/ListItem";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

function List({ items }) {
  return (
    <SearchCard scroll="scroll">
      <SearchCardHeader>Found 5 results...</SearchCardHeader>
      {items.map((item) => (
        <ListItem itemData={item} />
      ))}
    </SearchCard>
  );
}

export default List;
