import React from 'react';
import './Alert.css';

function Alert({ severity, children }) {
  const getIcon = severity => {
    switch (severity) {
      case 'danger':
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
  return (
    <div className={`alert alert-${severity}`}>
      <span className="icon">{getIcon(severity)}</span>
      {children}
    </div>
  );
}

export default Alert;
