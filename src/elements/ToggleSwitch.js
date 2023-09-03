import React, { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ label, handleToggle }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => {
    setIsOn(!isOn);
    handleToggle();
  };
  return (
    <>
      <label class="toggle-switch">
        <input type="checkbox" onClick={toggle} />
        <span class="slider "></span>
        <span>{label}</span>
      </label>
    </>
  );
}

export default ToggleSwitch;
