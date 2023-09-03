import React from "react";
import "./Button.css";

function Button({ children, onClick, addClass }) {
  const classes = `styled-button ${addClass || ""}`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
