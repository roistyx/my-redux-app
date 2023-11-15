import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';

function SaveAndDisplay({ report, reportType }) {
  const { stockData } = useSelector((state) => state.search);
  const [financialReportList, setFinancialReportList] =
    useState(null);

  const symbol = stockData.symbol;
  //   console.log('SaveAndDisplay', symbol);
  useEffect(() => {
    const getFinancialReportList = async () => {
      const response = await searchStocks.getFinancialReportList(
        symbol
      );
      setFinancialReportList(response);
    };
    getFinancialReportList();
  });
  const handleSave = async () => {
    const response = await searchStocks.saveFinancialReport(
      report,
      reportType,
      symbol
    );
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      {financialReportList ? (
        <div>
          <ul>
            {financialReportList.map((report) => (
              <li key={report.reportName}>{report.companyName}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>no financial reports saved</div>
      )}
    </div>
  );
}

export default SaveAndDisplay;
