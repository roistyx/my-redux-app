import React, { useState } from "react";
import { Center } from "../../layouts/Line.js";
// import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import "./News.css";

function News() {
  const [symbol, setSymbol] = useState("");
  const [newsFeed, setNewsFeed] = useState([]);

  const handleSearch = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log(searchObj);
    const response = await searchStocks.getStockNews(symbol);
    console.log(response.data.feed);
    setNewsFeed(response.data.feed);
  };

  return (
    <div>
      <Center>
        <Box>
          <TextField
            inputProps={{ style: { textTransform: "uppercase" } }}
            onChange={handleSearch}
            label="Search"
          />
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
      <Center>
        <Box>
          <div className="grid-container">
            {newsFeed.map((news) => (
              <div className="grid-item">
                <div className="NewsTitle">{news.title}</div>
                <div className="NewsDescription">{news.description}</div>
                <div className="NewsLink"></div>
                <div>{news.summary}</div>
                <a href={news.url} target="_blank">
                  Link
                </a>
              </div>
            ))}
          </div>
        </Box>
      </Center>
    </div>
  );
}

export default News;
