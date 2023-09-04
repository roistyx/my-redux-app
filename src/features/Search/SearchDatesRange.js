import React, { useState, useRef } from "react";
import { Center } from "../../layouts/Line.js";
// import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import DatesPicker from "../../components/DatesPicker.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearchSymbol, setDates, setStockData } from "./searchSlice.js";
import LineChartComponent from "../../components/LineChartComponent.js";
import { Box } from "../../layouts/Box.js";

import Button from "@mui/material/Button";

import "./Search.css";

function SearchDatesRange() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState("");
  const { stockData } = useSelector((state) => state.search);

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const response = await searchStocks.getStockQuote(event.target.value);
      dispatch(setStockData(response.data));
      console.log(response.data);
    }
  };

  const handleDatesPick = (event) => {
    setDates(event);
    // dispatch(setDates(event.target.value));
  };

  const handleSubmit = async () => {
    const searchObj = {
      searchQuery: stockData.symbol,
      startMonth: dates[0].$M + 1,
      startDate: dates[0].$D,
      startYear: dates[0].$y,
      endMonth: dates[1].$M + 1,
      endDate: dates[1].$D,
      endYear: dates[1].$y,
    };
    const response = await searchStocks.getStockData(searchObj);

    console.log(response);
  };

  return (
    <div>
      <Center>
        {/* <TextField
          onKeyDown={handleSearch}
          label="Search"
          inputProps={{
            style: { textTransform: "uppercase" },
          }}
          sx={{ marginRight: "10px" }}
        /> */}
        <DatesPicker onChange={handleDatesPick} />
        <div className="Button">
          <Button className="Button" onClick={handleSubmit} variant="contained">
            Search
          </Button>
        </div>
      </Center>
      <Center>
        <LineChartComponent />
      </Center>
    </div>
  );
}

export default SearchDatesRange;
