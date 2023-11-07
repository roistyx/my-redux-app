import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import GenerateBalanceSheet from "./GenerateBalanceSheet.js";
import searchStocks from "../../api/searchStocks.js";

function BalanceSheet() {
    const [balanceSheetObject, setBalanceSheetObject ] = useState(null);
  const { stockData } = useSelector((state) => state.search);
  const symbol = stockData.symbol;
  const reportType = 'bs'


  const handleGetFinancials = async () => {
    const response = await searchStocks.getStockFinancials(symbol, reportType);
    const balanceSheet = {};
    

  response.forEach(item => {
    const key = item.concept.replace('us-gaap_', '');

    balanceSheet[key] = {
      unit: item.unit,
      label: item.label,
      value: item.value
    };
  });
  // console.log(balanceSheet);

  setBalanceSheetObject(balanceSheet);

    if (!response) {
      alert("API responded with an error");
    }
  };

  return (
    <div >
      {balanceSheetObject ? <GenerateBalanceSheet data={balanceSheetObject} /> : <button onClick={handleGetFinancials}>Get Balance Sheet</button>}
    </div>
  );
}

export default BalanceSheet;
