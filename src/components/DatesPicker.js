import React, { useState, useEffect } from 'react';
import './DatesPicker.css';
import Typography from './Typography';

export default function DatesPicker({ containerMargin, onDateRangeComplete }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  console.log('containerMargin', containerMargin);

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
        <Typography margin="0 5px 0 0">Start date:</Typography>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className={!isComplete && isTouched ? 'incomplete' : ''}
        />
      </label>
      <label>
        <Typography margin="0 5px 0 0">End date:</Typography>
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
