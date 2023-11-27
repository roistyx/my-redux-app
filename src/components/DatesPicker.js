import React, { useState, useEffect } from 'react';
import './DatesPicker.css';

export default function DatesPicker({ containerMargin, onDateRangeComplete }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const handleStartDateChange = event => {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);
    setIsTouched(true);
  };

  const handleEndDateChange = event => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    setIsTouched(true);

    if (startDate && newEndDate) {
      onDateRangeComplete(startDate, newEndDate);
    }
  };

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
