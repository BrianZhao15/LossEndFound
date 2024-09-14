import React from "react";
import "./SearchCard.css";
import SearchCardHeader from "./SearchCardHeader/SearchCardHeader";

function SearchCard({ children, scroll }) {
  return (
    <div className="form-container">
      <div className="form-card" style={{ "overflow-y": scroll }}>
        {children}
      </div>
    </div>
  );
}

export default SearchCard;
