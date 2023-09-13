import React from "react";
import "./MenuIcon.css";

function MenuIcon({ onClick, children }) {
  return (
    <div class="menu-icon" onClick={onClick}>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  );
}

export default MenuIcon;
