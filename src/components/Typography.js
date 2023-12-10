import React from 'react';
import './Typography.css'; // Import the CSS file

export default function Typography({
  variant,
  color,
  component: Component = 'p',
  ...props
}) {
  const className = `${variant}`; // Construct the class name based on the variant

  const style = {
    color: color // Inline style for color
    // You can add other inline styles if needed
  };

  return <span className={className} style={style} {...props} />;
}
