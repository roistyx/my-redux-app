import React, { useState, useRef } from 'react';
import DatesPicker from '../../components/DatesPicker.js';
import { Center, Between } from '../../layouts/Line.js';
import searchStocks from '../../api/searchStocks.js';
import { useDispatch, useSelector } from 'react-redux';

import {
  setReportType,
  setReport,
  setIsLoading,
  setIsSaved,
  setGetReports,
  setErrorMessages
} from './fiancialReportsSlice.js';

import Button from '../../elements/Button.js';
import Alert from '@mui/material/Alert';
import BasicSelect from '../../elements/BasicSelect.js';

function SearchDatesRange() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const { stockData } = useSelector(state => state.search);
  const {
    report_type,
    error_message,
    reports,
    is_loading,
    report,
    retrieved_reports
  } = useSelector(state => state.reports);
  const symbol = stockData.symbol;
  const { message, severity } = error_message || {};
  const onDateRangeComplete = (startDate, endDate) => {
    setDates({ startDate, endDate });
  };

  const onSelectChange = event => {
    setSelectedQuarter(event.target.value);
    // console.log('selectedQuarter', event.target.value);
  };

  const handleGetFinancials = async () => {
    // dispatch(setReportType({}));
    if (!dates) {
      const errorMessage = {
        message: 'this is an error',
        severity: 'danger',
        is_error: true
      };
      dispatch(setErrorMessages(errorMessage));

      return;
    }
    dispatch(setIsLoading(true));
    const response = await searchStocks.getStockFinancials(
      symbol,
      report_type,
      dates,
      selectedQuarter
    );

    dispatch(setIsLoading(false));
    dispatch(setReport(response));

    if (!response) {
      alert('API responded with an error');
    }
  };

  return (
    <div>
      <Between gap="5px 0 5px 0">
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
          <Button
            className="Button"
            onClick={handleGetFinancials}
            variant="contained"
            isDisabled={false}
          >
            Search
          </Button>
        </div>
      </Between>
    </div>
  );
}

export default SearchDatesRange;
