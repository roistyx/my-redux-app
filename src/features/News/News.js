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
import "./News.css";
import ArticleEditor from "../../components/ArticleEditor.js";

function News() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsFeed, setNewsFeed] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const { stockData } = useSelector((state) => state.search);
  console.log(stockData.symbol);

  const handleSearch = () => {
    const phrases = [
      stockData.symbol,
      stockData.displayName,
      `${stockData.displayName}'s`,
    ];
    const contents = document.getElementsByClassName("NewsDescription");

    // You should loop through each of the "contents"
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];

      // Clear previous highlights
      let newText = content.innerHTML.replace(
        /<span class="highlight">([^<]+)<\/span>/g,
        "$1"
      );

      // Iterate over each phrase and highlight its occurrences
      phrases.forEach((phrase) => {
        const re = new RegExp(`(${phrase})`, "gi");
        newText = newText.replace(re, '<span class="highlight">$1</span>');
      });

      content.innerHTML = newText;
    }
  };

  useEffect(() => {
    if (!stockData.symbol) return;
    const handleSubmit = async () => {
      // console.log(searchObj);
      const response = await searchStocks.getStockNews(stockData.symbol);
      console.log(response.data.feed);
      setNewsFeed(response.data.feed);
    };
    handleSubmit();
  }, [stockData.symbol]);

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
    setIsModalOpen(true);
  };

  const handleExtract = async (newsUrl) => {
    const response = await searchStocks.extractNews(newsUrl);
    console.log(response.articleContent);
    setIsModalOpen(true);

    return;
  };

  return (
    <div>
      <Center>
        <div className="Button">
          <Button className="Button" onClick={handleSearch} variant="contained">
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
                <div id="NewsDescription" className="NewsDescription">
                  {news.summary}
                </div>
                <div className="NewsLink">
                  <a href={news.url} target="_blank">
                    {news.url}
                  </a>

                  <ArticleEditor url={news.url} />
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
