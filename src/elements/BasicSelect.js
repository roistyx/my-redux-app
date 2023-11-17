import React, { useState } from 'react';
import './BasicSelect.css';

function BasicSelect({
  selectPadding,
  selectContainerMargin,
  customSelectBoxShadow,
  customSelectFocusBoxShadow,
  selectContainerColor,
  selectCustomColor,
}) {
  // Accept padding as a prop
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Use the padding prop for inline styling, with a default value
  const selectStyle = {
    ...(selectContainerMargin
      ? { '--select-container-margin': selectContainerMargin }
      : {}),
    ...(selectPadding ? { padding: selectPadding } : {}),
    ...(customSelectFocusBoxShadow
      ? {
          '--custom-select-focus-box-shadow':
            customSelectFocusBoxShadow,
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
      : {}),
  };

  return (
    <div className="select-container" style={selectStyle}>
      <select
        value={value}
        onChange={handleChange}
        className="custom-select"
        style={selectStyle}
      >
        <option value="" disabled>
          Select Quarter
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}

export default BasicSelect;
