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
  const { report_type, reports, is_loading, report, get_reports } =
    useSelector((state) => state.reports);
  const [FinancialReport, setFinancialReport] = useState(null);
  const dispatch = useDispatch();
  const [financialReportList, setFinancialReportList] =
    useState(null);

  const symbol = stockData.symbol;
  console.log('report_type', report_type);

  useEffect(() => {
    // console.log('report_type', symbol, report_type);
    const getFinancialReports = async () => {
      const response = await searchStocks.getFinancialReportList(
        symbol,
        report_type
      );
      dispatch(setGetReports(response));
      setFinancialReportList(response);
    };
    getFinancialReports();
  }, [report_type]);

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
          financialReportList.map((report) => (
            <div key={report._id}>
              <div>{report.report_date}</div>
            </div>
          ))
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
