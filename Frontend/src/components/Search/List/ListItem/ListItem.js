import React from "react";
import "./ListItem.css";

function ListItem() {
  return (
    <div className="list-item">
      <div className="list-item-description-container">
        <div className="list-item-header">Volleybals</div>
        <div className="list-item-description">
          bolly balls big yellow mikasa dirty supa cool
        </div>
      </div>
      <div className="list-item-image-container">
        <img src="/images/temp.jpg" alt="" className="list-item-image" />
      </div>
    </div>
  );
}

export default ListItem;
