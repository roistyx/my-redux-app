import React from 'react';
import './Typography.css'; // Import the CSS file

export default function Typography({ variant, color, margin, children }) {
  console.log('color', color);
  const selectStyle = {
    ...(variant ? { '--select-variant': variant } : {}),
    ...(color ? { '--select-color': color } : {}),
    ...(margin ? { '--select-margin': margin } : {})
  };

  return (
    <div className="typography-container" style={selectStyle}>
      {children}
    </div>
  );
}
