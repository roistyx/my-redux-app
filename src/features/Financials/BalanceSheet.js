import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';
import SaveAndDisplay from './SaveAndDisplay.js';

function BalanceSheet() {
  const [balanceSheetObject, setBalanceSheetObject] = useState(null);
  const { stockData } = useSelector((state) => state.search);
  const symbol = stockData.symbol;
  const reportType = 'bs';

  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(
      symbol,
      reportType
    );
    console.log(response);

    setBalanceSheetObject(response);

    if (!response) {
      alert('API responded with an error');
    }
  };
  return (
    <div>
      <SaveAndDisplay
        report={balanceSheetObject}
        reportType={reportType}
      />
      {balanceSheetObject ? (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: balanceSheetObject.financial_report,
            }}
          />
        </div>
      ) : (
        <button onClick={handleGetFinancials}>
          Get Balance Sheet
        </button>
      )}
    </div>
  );
}

export default BalanceSheet;
