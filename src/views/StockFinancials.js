import React from 'react';
import { Center } from '../layouts/Line.js';
import Tabs from '../components/Tabs/Tabs.js';
import BalanceSheet from '../features/Financials/BalanceSheet.js';
import IncomeStatement from '../features/Financials/IncomeStatement.js';
import CashFlow from '../features/Financials/CashFlow.js';

const tabData = [
  { label: 'Balance Sheet', content: <BalanceSheet /> },
  { label: 'Income Statement', content: <IncomeStatement /> },
  { label: 'Cash Flow', content: <CashFlow /> },
];

function StockFinancials() {
  return (
    <Center>
      <Tabs tabs={tabData} />
    </Center>
  );
}

export default StockFinancials;
