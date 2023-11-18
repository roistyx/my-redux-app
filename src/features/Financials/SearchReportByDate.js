import React, { useState, useRef } from 'react';
import DatesPicker from '../../components/DatesPicker.js';
import { Center, Between } from '../../layouts/Line.js';
import searchStocks from '../../api/searchStocks.js';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '../../layouts/Box.js';

import Button from '../../elements/Button.js';
import Alert from '@mui/material/Alert';
import BasicSelect from '../../elements/BasicSelect.js';

function SearchDatesRange() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState(null);
  const { stockData } = useSelector(state => state.search);
  const [error, setError] = useState(false);

  const onDateRangeComplete = (startDate, endDate) => {
    // Logic to handle the date range
    console.log('Start Date:', startDate, 'End Date:', endDate);
  };

  const onSelectChange = event => {
    console.log('event', event.target.value);
  };

  const handleSubmit = async () => {
    console.log('dates', dates);
  };

  return (
    <div>
      <Between gap="5px 0 5px 0">
        {error ? (
          <Alert severity="error">Error while fetching data</Alert>
        ) : null}
        <DatesPicker
          onDateRangeComplete={onDateRangeComplete}
          containerMargin="0px 0 0 0"
        />
        <BasicSelect
          onSelectChange={onSelectChange}
          selectPadding="17px 0 17px 5px"
          selectContainerMargin="9px 5px 0px 0px"
          customSelectFocusBoxShadow="0"
          customSelectBoxShadow="0"
          selectCustomColor="grey"
          selectContainerColor="grey"
        />
        <div className="Button">
          <Button className="Button" onClick={handleSubmit} variant="contained">
            Search
          </Button>
        </div>
      </Between>
    </div>
  );
}

export default SearchDatesRange;
