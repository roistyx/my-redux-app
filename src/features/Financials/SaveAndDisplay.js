import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';
import {
  setReportType,
  setReport,
  setIsLoading,
  setIsSaved,
  setGetReports
} from './fiancialReportsSlice.js';
import SearchReportByDate from './SearchReportByDate.js';

import Button from '../../elements/Button.js';
import { Center } from '../../layouts/Line.js';
import { forEach } from 'lodash';

function SaveAndDisplay() {
  const { stockData } = useSelector(state => state.search);
  const { report_type, is_loading, report, retrieved_reports } = useSelector(
    state => state.reports
  );
  const [selectedReport, setSelectedReport] = useState('');
  const dispatch = useDispatch();
  const [financialReportList, setFinancialReportList] = useState(null);

  const symbol = stockData.symbol;
  let reportType = '';

  useEffect(() => {
    switch (
      report_type // To solve the problem of the report_type being non-existing if 'ic'
    ) {
      case 'bs':
        reportType = 'bs';
        break;
      case 'cf':
        reportType = 'cf';
        break;
      default:
        reportType = 'ic';
    }
    const getFinancialReports = async () => {
      let requestedReports = [];

      try {
        const response = await searchStocks.getFinancialReportList(
          symbol,
          report_type
        );

        response.forEach(statement => {
          if (statement.report_type === reportType) {
            requestedReports.push(statement);
          }
        });

        // dispatch(setGetReports(response));
        setFinancialReportList(requestedReports);
      } catch (error) {
        console.log('error', error);
      }

      // console.log('requestedReports', requestedReports);
    };
    getFinancialReports();
  }, [report_type, symbol]);

  const handleSelectChange = event => {
    const selectedId = event.target.value;
    const report = financialReportList.find(r => r._id === selectedId);
    console.log('Selected Report:', report);
    setSelectedReport(report);
    dispatch(setReport(report));
  };

  const handleSave = async () => {
    const response = await searchStocks.saveFinancialReport(
      report,
      report_type,
      symbol
    );

    console.log('handleSave', response);
    if (!response) {
      alert('API responded with an error');
    }
    dispatch(setIsSaved(true));
  };

  return (
    <>
      <Center gap="5px 0 5px 0">
        <SearchReportByDate />
      </Center>
      <Center>
        {financialReportList ? (
          <select
            onChange={handleSelectChange}
            value={selectedReport?._id || ''}
          >
            <option value="">Select a report</option>
            {financialReportList.map(statement => (
              <option key={statement._id} value={statement._id}>
                {statement.company_name} - {statement.report_name}
              </option>
            ))}
          </select>
        ) : (
          <div>no reports</div>
        )}
        <Button onClick={handleSave}>Save</Button>
      </Center>
    </>
  );
}

export default SaveAndDisplay;
