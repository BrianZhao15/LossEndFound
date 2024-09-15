import React from "react";

function Registrantion({ children }) {
  return (
    <div className="registration-container">
      <div className="regristration-inner-container">
        <div className="registration-card">{children}</div>
      </div>
    </div>
  );
}

export default Registrantion;
