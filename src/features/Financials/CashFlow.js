import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenerateCashFlow from './GenerateCashFlow.js';
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
    let cashFlowReport = {};

    response.forEach((item) => {
      const key = item.concept.replace('us-gaap_', '');

      cashFlowReport[key] = {
        unit: item.unit,
        label: item.label,
        value: item.value,
      };
    });
    // console.log(balanceSheet);

    setCashFlow(cashFlowReport);
    // console.log(incomeStatementReport);

    if (!response) {
      alert('API responded with an error');
    }
  };

  return (
    <div>
      {cashFlow ? (
        <GenerateCashFlow data={cashFlow} />
      ) : (
        <button onClick={handleGetFinancials}>Cash Flow</button>
      )}
    </div>
  );
}

export default CashFlow;
