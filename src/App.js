import React from "react";
import "./App.css";
import Login from "./features/Auth/Login";
import Header from "./features/Header/Header";
import Search from "./features/Search/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />

      {/* <Login /> */}
    </div>
  );
}

export default App;
