import React from "react";
import "./TextField.css";

const TextField = ({ label }) => {
  return (
    <div className="text-field">
      <label htmlFor="username">{label}</label>
      <input type="text" />
    </div>
  );
};

export default TextField;
