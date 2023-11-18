import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';
import {
  setReportType,
  setReport,
  setIsLoading,
  setIsSaved,
  setGetReports,
} from './fiancialReportsSlice.js';
import SearchReportByDate from './SearchReportByDate.js';
import { Center } from '../../layouts/Line.js';

function SaveAndDisplay() {
  const { stockData } = useSelector((state) => state.search);
  const {
    report_type,
    reports,
    is_loading,
    report,
    retrieved_reports,
  } = useSelector((state) => state.reports);
  const [selectedReport, setSelectedReport] = useState('');
  const dispatch = useDispatch();
  const [financialReportList, setFinancialReportList] =
    useState(null);

  const symbol = stockData.symbol;
  console.log('symbol', symbol);

  useEffect(() => {
    const getFinancialReports = async () => {
      let requestedReports = [];

      try {
        const response = await searchStocks.getFinancialReportList(
          symbol,
          report_type
        );

        response.forEach((report) => {
          if (report.report_type === report_type) {
            requestedReports.push(report);
          }
        });
        dispatch(setGetReports(response));
        setFinancialReportList(requestedReports);
      } catch (error) {
        console.log('error', error);
      }

      // console.log('requestedReports', requestedReports);
    };
    getFinancialReports();
  }, [report_type]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const report = financialReportList.find(
      (r) => r._id === selectedId
    );
    // setSelectedReport(report);
    dispatch(setReport(report));
    // console.log('Selected Report:', report);
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

  const handleGetFinancials = async () => {
    dispatch(setIsLoading(true));
    const response = await searchStocks.getStockFinancials(
      symbol,
      report_type
    );
    console.log('handleGetFinancials', response);
    dispatch(setIsLoading(false));
    dispatch(setReport(response));

    if (!response) {
      alert('API responded with an error');
    }
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
            {financialReportList.map((report) => (
              <option key={report._id} value={report._id}>
                {report.company_name} - {report.report_name}
              </option>
            ))}
          </select>
        ) : (
          <div>no reports</div>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={handleGetFinancials}>Generate report</button>
      </Center>
    </>
  );
}

export default SaveAndDisplay;
