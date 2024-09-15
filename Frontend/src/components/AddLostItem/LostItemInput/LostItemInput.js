import React from "react";
import "./LostItemInput.css";

function LostItemInput({ label, name, value, onChange, placeholder }) {
  return (
    <div className="lost-item-form-input-container">
      <label className="lost-item-form-label">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="lost-item-form-input"
      />
    </div>
  );
}

export default LostItemInput;
