import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Center } from '../layouts/Line.js';
import Tabs from '../components/Tabs/Tabs.js';
import BalanceSheet from '../features/Financials/BalanceSheet.js';
import IncomeStatement from '../features/Financials/IncomeStatement.js';
import CashFlow from '../features/Financials/CashFlow.js';
import SaveAndDisplay from '../features/Financials/SaveAndDisplay.js';
import searchStocks from '../api/searchStocks.js';
import { stockData } from '../features/Search/searchSlice.js';
import Alert from '../components/Alert.js';
import Modal from '../components/Modal.js';
import {
  setReportType,
  setReport,
  setIsLoading,
  setIsSaved,
  setGetReports,
  setErrorMessages
} from '../features/Financials/fiancialReportsSlice.js';

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
  const [modal, setModal] = useState(false);

  const { report_type, error_message } = useSelector(state => state.reports);
  const { stockData } = useSelector(state => state.search);
  const { message, severity, is_error } = error_message || {};
  const dispatch = useDispatch();

  const symbol = stockData.symbol;
  const closeErrorMessage = {
    message: '',
    severity: '',
    is_error: false
  };

  const handleError = () => {
    dispatch(setErrorMessages(null));
    setModal(true);
  };

  return (
    <Center>
      {is_error ? (
        <Modal
          openModal={!modal}
          closeModal={() => dispatch(setErrorMessages(closeErrorMessage))}
        >
          <Alert severity={severity}>{message}</Alert>
        </Modal>
      ) : null}
      <Tabs
        tabs={tabData}
        subComponent={
          <SaveAndDisplay handleError={handleError} containerMargin />
        }
      />
    </Center>
  );
}

export default StockFinancials;
