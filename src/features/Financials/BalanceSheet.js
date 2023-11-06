import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import searchStocks from "../../api/searchStocks.js";

function BalanceSheet() {
  const [balanceSheet, setBalanceSheet] = useState(null); // Initialize to null

  const { stockData } = useSelector((state) => state.search);

  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(stockData.symbol);
    console.log(response.data.data[0].report.bs);
    setBalanceSheet(response.data.data[0].report.bs);

    if (!response) {
      alert("API responded with an error");
    }
  };

  return (
    <div>
      <h1>Stock Financials</h1>
      <button onClick={handleGetFinancials}>Get Stock Data</button>
      {balanceSheet && ( // Check if balanceSheet is not null before mapping
        <div>
          <h2>Cash and Cash Equivalents At Carrying Value</h2>
          <div>
            {balanceSheet.map((item) => (
              <div key={item.concept}>
                <p>{item.label}</p>
                <p>Unit: {item.unit}</p>
                <p>Value: ${item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BalanceSheet;
