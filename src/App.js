import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/Auth/Login';
import Header from './features/Header/Header';
import SearchDatesRange from './features/Search/SearchDatesRange';
import News from './features/News/News';
import Chat from './features/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { setStockData } from './features/Search/searchSlice';
import StockFinancials from './views/StockFinancials';
import CompanyGrid from './components/CompanyGrid/CompanyGrid';
const companies = [
  {
    symbol: 'PFE',
    companyName: 'Pfizer Inc',
    count: 12
  },
  {
    symbol: 'CTSO',
    companyName: 'Cytosorbents Corp',
    count: 3
  },
  {
    symbol: 'HUBB',
    companyName: 'Hubbell Inc',
    count: 1
  },
  {
    symbol: 'WMT',
    companyName: 'Walmart Inc',
    count: 4
  },
  {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc',
    count: 1
  },
  {
    symbol: 'MASI',
    companyName: 'Masimo Corp',
    count: 1
  },
  {
    symbol: 'ALL',
    companyName: 'Allstate Corp',
    count: 2
  },
  {
    symbol: 'ABT',
    companyName: 'Abbott Laboratories',
    count: 3
  },
  {
    symbol: 'INTC',
    companyName: 'Intel Corp',
    count: 1
  },
  {
    symbol: 'HP',
    companyName: 'Helmerich & Payne, Inc',
    count: 1
  },
  {
    symbol: 'TRUP',
    companyName: 'Trupanion, Inc',
    count: 1
  },
  {
    symbol: 'ALLY',
    companyName: 'Ally Financial Inc',
    count: 1
  },
  {
    symbol: 'AGL',
    companyName: 'agilon health, inc',
    count: 1
  },
  {
    symbol: 'BP',
    companyName: 'BP p.l.c',
    count: 1
  },
  {
    symbol: 'MASI',
    companyName: 'Masimo Corporation',
    count: 1
  },
  {
    symbol: 'TEAM',
    companyName: 'Atlassian Corporation Class A Common Stock',
    count: 1
  },
  {
    symbol: 'PLUG',
    companyName: 'Plug Power Inc',
    count: 1
  },
  {
    symbol: 'TTD',
    companyName: 'The Trade Desk, Inc',
    count: 1
  },
  {
    symbol: 'O',
    companyName: 'Realty Income Corporation',
    count: 1
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc. Common Stock',
    count: 1
  }
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stockData = JSON.parse(localStorage.getItem('stockData'));
    if (stockData) {
      dispatch(setStockData(stockData));
    }
  }, []);
  return (
    <div className="App">
      <Header backgroundColor="#1976d2" height="50px" gap="6px" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompanyGrid companies={companies} />} />
          <Route path="/search" element={<SearchDatesRange />} />
          <Route path="/news" element={<News />} />
          <Route path="/financials" element={<StockFinancials />} />

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
