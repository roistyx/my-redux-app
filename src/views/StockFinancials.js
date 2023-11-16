import React, { useEffect, useState } from 'react';
import { Center } from '../layouts/Line.js';
import Tabs from '../components/Tabs/Tabs.js';
import BalanceSheet from '../features/Financials/BalanceSheet.js';
import IncomeStatement from '../features/Financials/IncomeStatement.js';
import CashFlow from '../features/Financials/CashFlow.js';
import SaveAndDisplay from '../features/Financials/SaveAndDisplay.js';
import searchStocks from '../api/searchStocks.js';
import { stockData } from '../features/Search/searchSlice.js';
import { useSelector } from 'react-redux';

const tabData = [
  {
    label: 'Balance Sheet',
    name: 'bs',
    content: <BalanceSheet />,
  },
  {
    label: 'Income Statement',
    name: 'ic,',
    content: <IncomeStatement />,
  },
  { label: 'Cash Flow', name: 'cf', content: <CashFlow /> },
];

function StockFinancials() {
  const { report_type } = useSelector((state) => state.reports);
  const { stockData } = useSelector((state) => state.search);

  const symbol = stockData.symbol;
  console.log('report', report_type);

  return (
    <Center>
      <Tabs tabs={tabData} subComponent={<SaveAndDisplay />} />
    </Center>
  );
}

export default StockFinancials;
