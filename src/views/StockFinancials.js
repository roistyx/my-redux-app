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
import Alert from '../components/Alert.js';
import Modal from '../components/Modal.js';

const tabData = [
  {
    label: 'Balance Sheet',
    name: 'bs',
    content: <BalanceSheet />
  },
  {
    label: 'Income Statement',
    name: 'ic,',
    content: <IncomeStatement />
  },
  { label: 'Cash Flow', name: 'cf', content: <CashFlow /> }
];

function StockFinancials() {
  const [modal, setModal] = useState(true);

  const { report_type, error } = useSelector(state => state.reports);
  const { stockData } = useSelector(state => state.search);

  console.log('error', error);

  const symbol = stockData.symbol;

  return (
    <Center>
      {error ? (
        <Modal openModal={modal} closeModal={() => setModal(false)}>
          <Alert severity="error">Error while fetching data</Alert>
        </Modal>
      ) : null}
      <Tabs tabs={tabData} subComponent={<SaveAndDisplay />} />
    </Center>
  );
}

export default StockFinancials;
