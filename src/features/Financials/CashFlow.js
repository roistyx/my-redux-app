import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';

function CashFlow() {
  const [cashFlow, setCashFlow] = useState(null);
  const { stockData } = useSelector((state) => state.search);
  const symbol = stockData.symbol;
  const reportType = 'cf';

  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(
      symbol,
      reportType
    );
    console.log(response);

    setCashFlow(response);

    if (!response) {
      alert('API responded with an error');
    }
  };
  return (
    <div>
      {cashFlow ? (
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: cashFlow.report }}
          />
        </div>
      ) : (
        <button onClick={handleGetFinancials}>Cash Flow</button>
      )}
    </div>
  );
}

export default CashFlow;
