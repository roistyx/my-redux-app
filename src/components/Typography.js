import React from 'react';
import './Typography.css'; // Import the CSS file

export default function Typography({
  variant,
  color = 'var(--typography-color)', // Default to CSS variable
  margin = 'var(--typography-margin)', // Default to CSS variable
  component: Component = 'p',
  ...props
}) {
  const className = `typography-${variant}`; // Adjusted class name

  const style = {
    '--typography-color': color, // Set CSS variable
    '--typography-margin': margin // Set CSS variable
  };

  return <Component className={className} style={style} {...props} />;
}
