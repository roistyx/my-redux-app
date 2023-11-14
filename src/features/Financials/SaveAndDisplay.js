import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';

function SaveAndDisplay({ report, reportType, symbol }) {
  const handleSave = async () => {
    const response = await searchStocks.getFinancialReport(
      report,
      reportType,
      symbol
    );
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <div></div>
    </div>
  );
}

export default SaveAndDisplay;
