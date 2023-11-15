import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';
import SaveAndDisplay from './SaveAndDisplay.js';

function BalanceSheet() {
  const { stockData } = useSelector((state) => state.search);
  const { report_type, report, is_loading } = useSelector(
    (state) => state.reports
  );
  const symbol = stockData.symbol;
  const reportType = 'bs';

  console.log('Balance Sheet report', report);

  return (
    <div>
      {is_loading ? <div>Loading...</div> : report.financial_report}
    </div>
  );
}

export default BalanceSheet;
