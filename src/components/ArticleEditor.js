import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import searchStocks from "../api/searchStocks.js";
import AlertComponent from "./AlertComponent.js";
import Loader from "./Loader.js";
import "./ArticleEditor.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import LinkButton from "../elements/LinkButton.js";

export default function ArticleEditor({ handleExtract }) {
  const [articleContent, setArticleContent] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState("");
  const { stockData } = useSelector((state) => state.search);

  const [modal, setModal] = useState(false);

  const handleOpen = async () => {
    console.log("handleOpen");
    setIsLoading(true);
    try {
      const news = await handleExtract();
      setNews(news);
      if (!news || !news.url) {
        setNews("");
        throw new Error("News extraction failed or no URL provided.");
      }

      const response = await searchStocks.extractNews(news.url);

      if (!response) {
        setError(true);
      }

      setArticleContent(response);
      setIsLoading(false);
      setModal(true);
    } catch (error) {
      console.error("Error in handleOpen:", error.message);
    }
  };

  const handleSummarize = async () => {
    if (!articleContent) return;
    if (articleContent) setError(false);

    try {
      const { data } = await searchStocks.summarizeNews({
        content: articleContent,
        symbol: stockData.symbol,
        price: stockData.regularMarketPrice,
        time: stockData.regularMarketTime,
        url: news.url,
      });

      setArticleContent(data.content);
      console.log(data);
    } catch (error) {
      console.error("Summarization Error:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await searchStocks.saveStockArticle({
        content: articleContent,
        symbol: stockData.symbol,
        price: stockData.regularMarketPrice,
        time: stockData.regularMarketTime,
        url: news.url,
      });
      console.log(response);
    } catch (error) {
      console.error("Error while saving article:", error.message);
    }
  };

  return (
    <>
      <button onClick={handleOpen}>Open modal</button>
      {isLoading ? <Loader /> : null}
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <span id="modal-modal-title">Edit Article </span>{" "}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {" "}
          {error ? (
            <AlertComponent severity="error">
              {"The article could not be extracted. Please go to website."}

              <LinkButton url={news.url}>Visit Site</LinkButton>
            </AlertComponent>
          ) : (
            <AlertComponent severity="success">
              {
                "Article extracted with success! Yet, for the finest details, consider a direct copy/paste from the original."
              }
              <Link
                component="button"
                to={news.url}
                target="_blank"
                rel="noreferrer">
                Link
              </Link>
            </AlertComponent>
          )}
          <div className="textarea-wrapper">
            <textarea
              className="scrollable-textarea"
              value={articleContent}
              rows="20"
              onChange={(e) => setArticleContent(e.target.value)}
            />
          </div>
        </Typography>
        <Button onClick={handleSummarize}>Summarize</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </>
  );
}
