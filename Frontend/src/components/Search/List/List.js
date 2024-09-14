import React from "react";
import SearchCard from "../SearchCard/SearchCard";
import ListItem from "./ListItem/ListItem";
import SearchCardHeader from "../SearchCard/SearchCardHeader/SearchCardHeader";

function List() {
  return (
    <SearchCard scroll="scroll">
      <SearchCardHeader>Found 5 results...</SearchCardHeader>

      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </SearchCard>
  );
}

export default List;
