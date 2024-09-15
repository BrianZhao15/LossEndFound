import React from "react";
import "./DescriptionSection.css";
import DescriptionSectionHeader from "./DescriptionSectionHeader/DescriptionSectionHeader";
import Button from "../../Button/Button";

function DescriptionSection() {
  return (
    <div className="description-section-container">
      <div className="description-section-inner-container">
        <div className="description-section-text-container">
          <DescriptionSectionHeader />
          <div className="description-section-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
            dolorem eligendi vel minus, optio sit temporibus praesentium,
            possimus obcaecati tempora quia architecto eum nobis tempore,
            doloremque repellendus dolores corporis nam!
          </div>

          <div className="search-button-container">
            <Button
              location="/search"
              buttonStyle="btn-primary"
              buttonSize="btn-meduim"
            >
              Search
            </Button>
          </div>
        </div>
        <div className="description-section-image-container">
          <img
            src="/images/lostAndFound.jpg"
            alt="lost and found png"
            className="description-section-image"
          />
        </div>
      </div>
    </div>
  );
}

export default DescriptionSection;
