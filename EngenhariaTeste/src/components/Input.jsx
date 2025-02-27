import React from "react";

import '../styles/Input/InputStyle.css'

const Input = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="inputBox">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;