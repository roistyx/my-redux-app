import React from "react";
import "./LinkButton.css";

const LinkButton = ({ url, children }) => (
  <a href={url} className="link-button" target="_blank" rel="noreferrer">
    {children}
  </a>
);

export default LinkButton;
