import React from 'react';
import './Button.css';

function Button({
  isDisabled,
  children,
  onClick,
  addClass,
  buttonPadding,
  buttonContainerMargin
}) {
  const buttonStyle = {
    ...(buttonContainerMargin
      ? { '--button-container-margin': buttonContainerMargin }
      : {}),
    ...(buttonPadding ? { padding: buttonPadding } : {})
  };
  const classes = `styled-button ${addClass || ''}`;
  return (
    <button
      className={classes}
      style={buttonStyle}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
