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
import DatesPicker from '../../components/DatesPicker.js';

function SaveAndDisplay() {
  const { stockData } = useSelector((state) => state.search);
  const { report_type, reports, is_loading, report, get_reports } =
    useSelector((state) => state.reports);
  const [FinancialReport, setFinancialReport] = useState(null);
  const dispatch = useDispatch();
  const [financialReportList, setFinancialReportList] =
    useState(null);

  console.log('getFinancialReportList', get_reports);

  const symbol = stockData.symbol;
  //   console.log('SaveAndDisplay', symbol);
  useEffect(() => {
    const getFinancialReportList = async () => {
      const response = await searchStocks.getFinancialReportList(
        symbol
      );
      dispatch(setGetReports(response));
    };
    getFinancialReportList();
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
    <div>
      <DatesPicker />
      {financialReportList ? (
        <select>
          {financialReportList.map((report) => (
            <option
              key={report.reportName}
              value={report.companyName}
            >
              {report.reportName}
            </option>
          ))}
        </select>
      ) : (
        <div>no reports</div>
      )}
      <button onClick={handleSave}>Save</button>
      <button onClick={handleGetFinancials}>Generate report</button>
    </div>
  );
}

export default SaveAndDisplay;
