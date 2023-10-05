import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/Auth/Login";
import Header from "./features/Header/Header";
import SearchDatesRange from "./features/Search/SearchDatesRange";
import News from "./features/News/News";
import Chat from "./features/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setStockData } from "./features/Search/searchSlice";
import StockFinancials from "./features/Financials/StockFinancials.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stockData = JSON.parse(localStorage.getItem("stockData"));
    if (stockData) {
      dispatch(setStockData(stockData));
    }
  }, []);
  return (
    <div className="App">
      <Header backgroundColor="#1976d2" height="50px" gap="6px" />

      <BrowserRouter>
        <Routes>
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
