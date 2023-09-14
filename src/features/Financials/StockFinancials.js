import React from "react";
import { useDispatch, useSelector } from "react-redux";

import searchStocks from "../../api/searchStocks.js";

function StockFinancials() {
  const { stockData } = useSelector((state) => state.search);

  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(stockData.symbol);
    console.log(response.data);

    if (!response) {
      alert("API responded with an error");
    }
  };
  return (
    <div>
      <h1>Stock Financials</h1>
      <button onClick={handleGetFinancials}>Get Stock Data</button>
    </div>
  );
}

export default StockFinancials;
