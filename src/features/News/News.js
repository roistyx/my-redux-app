import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Center } from "../../layouts/Line.js";
import searchStocks from "../../api/searchStocks.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { FlexStart } from "../../layouts/Line.js";
import TextField from "@mui/material/TextField";
import { setNews } from "./newsSlice.js";
import "./News.css";
import ArticleEditor from "../../components/ArticleEditor.js";
import handleHighlight from "../../helpers/handleHighlight.js";

function News() {
  const [newsFeed, setNewsFeed] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const { stockData } = useSelector((state) => state.search);
  // const [stockData, setStockData] = useState("");
  const { news } = useSelector((state) => state.news);
  const handleExtract = (news) => news;
  const phrases = [
    stockData.symbol,
    stockData.displayName,
    `${stockData.displayName}'s`,
    "buy",
    "Buy",
  ];


  useEffect(() => {
    if (!stockData.symbol) return setNewsFeed([]);

    const searchStock = async () => {
      console.log(stockData.symbol);
      const response = await searchStocks.getStockNews(stockData.symbol);
      setNewsFeed(response.data.feed);
    };
    searchStock();
  }, [stockData]);

  const handleCheckboxChange = (event, summary) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setSelectedNews([...selectedNews, summary]);
    } else {
      setSelectedNews(selectedNews.filter((item) => item !== summary));
    }
  };

  const handleSummarize = async () => {
    const response = await searchStocks.summarizeNews(selectedNews);
  };

  return (
    <div>
      <Center>
        <div className="Button">
          <Button
            className="Button"
            onClick={() => handleHighlight(phrases)}
            variant="contained">
            highlight
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
                <div className="news-title">{news.title}</div>
                <div className="news-summary">{news.summary}</div>
                <div className="NewsLink">
                  <a href={news.url} target="_blank">
                    {news.url}
                  </a>

                  <ArticleEditor
                    handleExtract={() => handleExtract(news)}
                    // onClick={() => handleExtract(news)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Center>
    </div>
  );
}

export default News;
