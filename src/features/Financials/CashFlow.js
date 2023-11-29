import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';
import SaveAndDisplay from './SaveAndDisplay.js';

function CashFlow() {
  const { stockData } = useSelector(state => state.search);
  const { report_type, is_loading, report, retrieved_reports } = useSelector(
    state => state.reports
  );

  const symbol = stockData.symbol;
  const reportType = 'cf';

  return (
    <div>
      {is_loading ? <div>Loading...</div> : null}
      {report ? (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: report.financial_report
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CashFlow;
