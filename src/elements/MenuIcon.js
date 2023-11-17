import React from 'react';
import './MenuIcon.css';

function MenuIcon({ onClick, children }) {
  return (
    <div className="menu-icon" onClick={onClick}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
}

export default MenuIcon;
