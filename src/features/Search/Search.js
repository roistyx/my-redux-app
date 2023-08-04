import React, { useState } from "react";
import { Center } from "../../layouts/Line.js";
// import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import DatesPicker from "../../components/DatesPicker.js";
import { useDispatch } from "react-redux";
import { setSearchQuery, setDates } from "./searchSlice.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import "./Search.css";

function Search() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };

  const handleDatesPick = (event) => {
    setDates(event);
    // dispatch(setDates(event.target.value));
  };

  const handleSubmit = () => {
    const searchObj = {
      searchQuery: search,
      startMonth: dates[0].$M + 1,
      startDate: dates[0].$D,
      startYear: dates[0].$y,
      endMonth: dates[1].$M + 1,
      endDate: dates[1].$D,
      endYear: dates[1].$y,
    };
    // console.log(searchObj);
    searchStocks.getStockData(searchObj);
  };

  return (
    <div>
      <Center>
        <Box>
          <TextField onChange={handleSearch} label="Search" />
          <DatesPicker onChange={handleDatesPick} />
          <div className="Button">
            <Button
              className="Button"
              onClick={handleSubmit}
              variant="contained">
              Search
            </Button>
          </div>
        </Box>
      </Center>
    </div>
  );
}

export default Search;
