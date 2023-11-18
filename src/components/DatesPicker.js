import React, { useState, useEffect } from 'react';
import './DatesPicker.css'; // Make sure your CSS file is correctly linked

export default function DatesPicker({ containerMargin, onDateRangeComplete }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Handlers for date changes
  const handleStartDateChange = event => {
    setStartDate(event.target.value);
    setIsTouched(true);
  };

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
    setIsTouched(true);
    if (startDate && endDate) {
      onDateRangeComplete(startDate, endDate);
    }
  };

  // Check if both dates are filled and call onDateRangeComplete

  const isComplete = startDate && endDate;

  const selectStyle = {
    ...(containerMargin ? { '--field-margin': containerMargin } : {})
  };

  return (
    <div className="field-container" style={selectStyle}>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className={!isComplete && isTouched ? 'incomplete' : ''}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className={!isComplete && isTouched ? 'incomplete' : ''}
        />
      </label>
    </div>
  );
}
