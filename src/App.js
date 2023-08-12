import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/Auth/Login";
import Header from "./features/Header/Header";
import Search from "./features/Search/Search";
import News from "./features/News/News";

function App() {
  return (
    <div className="App">
      <Header backgroundColor="#1976d2" height="50px" gap="6px" />
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
