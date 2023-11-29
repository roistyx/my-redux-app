import React from 'react';

function Alert({ severity, children }) {
  const getIcon = severity => {
    switch (severity) {
      case 'error':
        return '⛔'; // Replace with a proper icon
      case 'warning':
        return '⚠️'; // Replace with a proper icon
      case 'info':
        return 'ℹ️'; // Replace with a proper icon
      case 'success':
        return '✅'; // Replace with a proper icon
      default:
        return '';
    }
  };
  return <div>{children}</div>;
}

export default Alert;
