import React from "react";
import "./HomeHeader.css";

function HomeHeader() {
  return (
    <div className="header-container">
      <div className="first-word">
        <div className="letter">T</div>
        <div className="letter">I</div>
        <div className="letter">T</div>
        <div className="letter">L</div>
        <div className="letter">E</div>
      </div>
      <p className="description-text-transition home-description-text">
        An AI powered lost and found app
      </p>
    </div>
  );
}

export default HomeHeader;
