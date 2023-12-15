import React from 'react';
import './Typography.css'; // Import the CSS file

export default function Typography({
  variant,
  color,
  margin,
  component: Component = 'p',
  ...props
}) {
  const className = `${variant}`; // Construct the class name based on the variant

  const style = {
    color: color,
    margin: margin
  };

  return <span className={className} style={style} {...props} />;
}
