import React, { useState, useRef } from 'react';
import { Center, Between } from '../../layouts/Line.js';
// import TextField from "../../components/TextField.js";
import searchStocks from '../../api/searchStocks.js';
import DatesPicker from '../../components/DatesPicker.js';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '../../layouts/Box.js';

import Button from '../../elements/Button.js';
import Alert from '@mui/material/Alert';
import BasicSelect from '../../elements/BasicSelect.js';

function SearchDatesRange() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState('');
  const { stockData } = useSelector((state) => state.search);
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(false);

  const handleDatesPick = (event) => {
    setDates(event);
    // dispatch(setDates(event.target.value));
  };

  const handleSubmit = async () => {
    const searchObj = {
      searchQuery: stockData.symbol,
      startMonth: dates[0].$M + 1,
      startDate: dates[0].$D,
      startYear: dates[0].$y,
      endMonth: dates[1].$M + 1,
      endDate: dates[1].$D,
      endYear: dates[1].$y,
    };
    const formatSearchDate = (month, day, year) => {
      // Assuming 'month' is already 1-indexed
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      return [monthNames[month - 1], day + ',', year].join(' ');
    };
    try {
      const response = await searchStocks.getStockData(
        searchObj,
        '1',
        'month'
      );
      if (response === false) {
        return setError(true);
      }
      const chartDisplayData = {
        start: formatSearchDate(
          searchObj.startMonth,
          searchObj.startDate,
          searchObj.startYear
        ),
        end: formatSearchDate(
          searchObj.endMonth,
          searchObj.endDate,
          searchObj.endYear
        ),
        close: response.map((item) => item.close),
        date_US: response.map((item) => item.date_US),
      };

      // if (response.meta.dataGranularity === "1mo") {
      //   data.date = data.date.map((dateStr) => {
      //     const dateObj = new Date(dateStr);
      //     return dateObj.toLocaleString("default", { month: "long" });
      //   });
      // }

      setChartData(chartDisplayData);
    } catch (error) {
      console.log('Error while getting historical data API ', error);
      return setError(true);
    }
  };

  return (
    <div>
      <Between gap="5px 0 5px 0">
        {error ? (
          <Alert severity="error">Error while fetching data</Alert>
        ) : null}
        <DatesPicker
          onChange={handleDatesPick}
          containerMargin="0px 0 0 0"
        />
        <BasicSelect
          selectPadding="17px 0 17px 5px"
          selectContainerMargin="9px 5px 0px 0px"
          customSelectFocusBoxShadow="0"
          customSelectBoxShadow="0"
          selectCustomColor="grey"
          selectContainerColor="grey"
        />
        <div className="Button">
          <Button
            className="Button"
            onClick={handleSubmit}
            variant="contained"
          >
            Search
          </Button>
        </div>
      </Between>
    </div>
  );
}

export default SearchDatesRange;
