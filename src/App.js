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
import InsertText from './components/InsertText/InsertText';

const phrases = [
  ['investor', 1],
  ['Wall Street', 2],
  ['Long-term', 3]
];

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

const article = `MOST PEOPLE would like to find an easy way to get rich, just as they might want a quick way to get thin, or play a musical instrument. But it is a mistake for novice investors to assume that they can find instant success in achieving high returns when professionals, armed with extensive research and sophisticated technology, struggle to do so. Of course, just as people might get lucky at roulette, they might pick a wonder stock, but the odds are against them. Long-term prosperity can best be achieved by investors who save as much as they can afford in a low-cost fashion and in an asset class that reflects the long-term growth of the economy and the corporate sector. Even then, investors can be unlucky if they start saving in the wrong era (1920s America or 1980s Japan) or if governments seize their assets. These five books provide useful lessons on what approaches to take and, just as importantly, what steps to avoid.

The Intelligent Investor. By Benjamin Graham. (Revised edition, updated with new commentary by Jason Zweig.) HarperCollins; 640 pages; $20.99 and £18.99

This is the foundational text for serious investors, written by the mentor of Warren Buffett, arguably the most successful investor of the modern era. Ben Graham was the archetypal “value investor”, looking for bargains in the market. He honed his skills after the Wall Street crash of 1929 when equity valuations had plunged. Accordingly, some of his methods for finding bargains are difficult to apply today when stocks are more expensively valued. But his principles remain sound. Much depends on the price paid for stocks, so beware of fashionable industries. As he notes “obvious prospects for physical growth in a business do not translate into obvious prospects for investors”  whereas “a sufficiently low price can turn a security of mediocre quality into a sound investment opportunity”.`;

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
          <Route
            path="/text"
            element={<InsertText article={article} phrases={phrases} />}
          />
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
