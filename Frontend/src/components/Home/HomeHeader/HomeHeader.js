import React from "react";
import "./HomeHeader.css";

function HomeHeader() {
  return (
    <div className="header-container">
      <div className="first-word word">
        <div className="letter">L</div>
        <div className="letter">O</div>
        <div className="letter">S</div>
        <div className="letter">S</div>
      </div>
      <div className="second-word word">
        <div className="letter">E</div>
        <div className="letter">N</div>
        <div className="letter">D</div>
      </div>
      <div className="third-word word">
        <div className="letter">F</div>
        <div className="letter">O</div>
        <div className="letter">U</div>
        <div className="letter">N</div>
        <div className="letter">D</div>
      </div>
      <p className="description-text-transition home-description-text">
        An AI powered lost and found app
      </p>
    </div>
  );
}

export default HomeHeader;
