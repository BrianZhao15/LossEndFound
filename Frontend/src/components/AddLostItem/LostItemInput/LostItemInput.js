import React from "react";
import "./LostItemInput.css";
function FormInput({ label, type, name, value, placeholder, onChange }) {
  return (
    <div className="lost-item-form-input-container">
      <label className="lost-item-form-label">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="lost-item-form-input"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="lost-item-form-input"
        />
      )}
    </div>
  );
}

export default FormInput;
