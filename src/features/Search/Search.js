import React, { useState, useRef } from "react";
import { Center } from "../../layouts/Line.js";
import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import DatesPicker from "../../components/DatesPicker.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearchSymbol, setDates, setStockData } from "./searchSlice.js";
import Loader from "../../components/Loader.js";
import "./Search.css";

function Search({ backgroundColor, height, gap }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSearch = async (event) => {
    setIsTyping(
      !(
        (event.key === "Backspace" && event.target.value.length === 1) ||
        event.target.value.length === 0
      )
    );
    if (event.key !== "Enter") return;
    setIsLoading(true);
    const response = await searchStocks.getStockQuote(event.target.value);
    console.log("Response", response);
    dispatch(setStockData(response));
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <TextField
          onKeyDown={handleSearch}
          label="Search..."
          textTransform={isTyping ? "uppercase" : "none"}
          backgroundColor={backgroundColor}
          height={height}
          gap={gap}
          fontColor="white"
        />
      ) : (
        <Loader color={"secondary"} />
      )}
    </>
  );
}

export default Search;
