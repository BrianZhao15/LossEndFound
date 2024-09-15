import React from "react";
import "./FormInput.css";
function FormInput({ label, type, name, value, placeholder, onChange }) {
  return (
    <div className="form-input-container">
      <label className="form-label">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
        />
      )}
    </div>
  );
}

export default FormInput;
