import React, { useState, useRef } from "react";
import { Center } from "../../layouts/Line.js";
import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import DatesPicker from "../../components/DatesPicker.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearchSymbol, setDates, setStockData } from "./searchSlice.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// import TextField from "@mui/material/TextField";

import "./Search.css";

function Search() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  console.log(isTyping);

  const handleSearch = async (event) => {
    setIsTyping(
      !(event.key === "Backspace" && event.target.value.length === 1)
    );
    if (event.key !== "Enter") return;
    setIsLoading(true);
    const response = await searchStocks.getStockQuote(event.target.value);
    dispatch(setStockData(response.data));
    setIsLoading(false);
  };

  return (
    <TextField
      onKeyDown={handleSearch}
      label="Search..."
      textTransform={isTyping ? "uppercase" : "none"}
      backgroundColor="#1976d2"
      fontColor="white"
      spacing="3px"
    />
  );
}

export default Search;
