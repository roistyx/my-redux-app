import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Center } from "../../layouts/Line.js";
// import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { FlexStart } from "../../layouts/Line.js";

import TextField from "@mui/material/TextField";

import "./News.css";

function News() {
  const [symbol, setSymbol] = useState("");
  const [newsFeed, setNewsFeed] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);

  const handleSearch = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log(searchObj);
    const response = await searchStocks.getStockQuote(symbol);
    console.log(response.data.feed);
    setNewsFeed(response.data.feed);
  };

  const handleCheckboxChange = (event, summary) => {
    if (event.target.checked) {
      setSelectedNews([...selectedNews, summary]);
    } else {
      setSelectedNews(selectedNews.filter((item) => item !== summary));
    }
  };

  const handleSummarize = async () => {
    const response = await searchStocks.summarizeNews(selectedNews);
    console.log(response);
  };

  return (
    <div>
      <Center>
        <TextField
          inputProps={{
            style: { textTransform: "uppercase" },
          }}
          sx={{ marginRight: "10px" }}
          onChange={handleSearch}
          label="Search"
        />
        <div className="Button">
          <Button className="Button" onClick={handleSubmit} variant="contained">
            Search
          </Button>
        </div>
      </Center>
      <Center>
        <Box>
          <Button variant="text" onClick={handleSummarize}>
            Generate Feed Summary
          </Button>
        </Box>
      </Center>

      <Center>
        <Box>
          <div className="grid-container">
            {newsFeed.map((news) => (
              <div className="grid-item" key={uuidv4()}>
                <FlexStart>
                  <Checkbox
                    checked={selectedNews.includes(news.summary)}
                    onChange={(e) => handleCheckboxChange(e, news.summary)}
                  />
                </FlexStart>
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
