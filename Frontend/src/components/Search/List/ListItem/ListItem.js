import React from "react";
import "./ListItem.css";

function ListItem({ itemData }) {
  console.log(itemData);

  return (
    <div className="list-item">
      <div className="list-item-description-container">
        <div className="inner-container-one">
          <div className="list-item-header">Found by {itemData.finder}</div>
          <div className="list-item-description">{itemData.description}</div>
        </div>
        <div className="inner-container-two">
          <div className="contact">contact: {itemData.contact}</div>
        </div>
      </div>
      <div className="list-item-image-container">
        <img src={itemData.image} alt="" className="list-item-image" />
      </div>
    </div>
  );
}

export default ListItem;
