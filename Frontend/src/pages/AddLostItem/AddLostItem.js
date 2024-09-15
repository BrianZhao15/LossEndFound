import React from "react";
import AddLostItemCard from "../../components/AddLostItem/AddLostItemCard";
import "./AddLostItem.css";

function AddLostItem() {
  return (
    <div className="add-lost-item-container">
      <div className="add-lost-item-inner-container">
        <AddLostItemCard />
      </div>
    </div>
  );
}

export default AddLostItem;
