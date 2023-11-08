import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenerateIncomeStatement from './GenerateIncomeStatement.js';
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
    let incomeStatementReport = {};

    response.forEach((item) => {
      const key = item.concept.replace('us-gaap_', '');

      incomeStatementReport[key] = {
        unit: item.unit,
        label: item.label,
        value: item.value,
      };
    });
    // console.log(balanceSheet);

    setIncomeStatement(incomeStatementReport);
    // console.log(incomeStatementReport);

    if (!response) {
      alert('API responded with an error');
    }
  };

  return (
    <div>
      {incomeStatement ? (
        <GenerateIncomeStatement data={incomeStatement} />
      ) : (
        <button onClick={handleGetFinancials}>
          Income Statement
        </button>
      )}
    </div>
  );
}

export default IncomeStatement;
