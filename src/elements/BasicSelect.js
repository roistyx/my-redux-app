import React, { useState } from 'react';
import './BasicSelect.css';

function BasicSelect({
  onSelectChange,
  selectPadding,
  selectContainerMargin,
  customSelectBoxShadow,
  customSelectFocusBoxShadow,
  selectContainerColor,
  selectCustomColor
}) {
  // Accept padding as a prop
  const [value, setValue] = useState('');

  // const handleChange = event => {
  //   const newValue = event.target.value;
  //   setValue(newValue);
  //   handleSelect(newValue); // Call the passed handleSelect function with the new value
  // };

  const selectStyle = {
    ...(selectContainerMargin
      ? { '--select-container-margin': selectContainerMargin }
      : {}),
    ...(selectPadding ? { padding: selectPadding } : {}),
    ...(customSelectFocusBoxShadow
      ? {
          '--custom-select-focus-box-shadow': customSelectFocusBoxShadow
        }
      : {}),
    ...(customSelectBoxShadow
      ? { '--custom-select-box-shadow': customSelectBoxShadow }
      : {}),
    ...(selectCustomColor
      ? { '--select-custom-color': selectCustomColor }
      : {}),
    ...(selectContainerColor
      ? { '--select-container-color': selectContainerColor }
      : {})
  };

  return (
    <div className="select-container" style={selectStyle}>
      <select
        value={value}
        onChange={onSelectChange}
        className="custom-select"
        style={selectStyle}
      >
        <option value="" disabled>
          Select Quarter
        </option>
        <option value="0">Yearly</option>
        <option value="1">Quarter 1</option>
        <option value="2">Quarter 2</option>
        <option value="3">Quarter 3</option>
        <option value="4">Quarter 4</option>
      </select>
    </div>
  );
}

export default BasicSelect;
