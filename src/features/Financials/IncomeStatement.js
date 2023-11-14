import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchStocks from '../../api/searchStocks.js';

function IncomeStatement() {
  const [incomeStatement, setIncomeStatement] = useState(null);
  const { stockData } = useSelector((state) => state.search);
  const symbol = stockData.symbol;
  const reportType = 'ic';

  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(
      symbol,
      reportType
    );
    console.log(response);

    setIncomeStatement(response);

    if (!response) {
      alert('API responded with an error');
    }
  };

  return (
    <div>
      {incomeStatement ? (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: incomeStatement.report,
            }}
          />
        </div>
      ) : (
        <button onClick={handleGetFinancials}>
          Income Statement
        </button>
      )}
    </div>
  );
}

export default IncomeStatement;
