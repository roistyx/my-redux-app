import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import searchStocks from "../api/searchStocks.js";
import TextArea from "../components/TextArea.js";
import AlertComponent from "./AlertComponent.js";
import Loader from "./Loader.js";
import "./ArticleEditor.css";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ArticleEditor({ handleExtract }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [articleContent, setArticleContent] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState("");
  const { stockData } = useSelector((state) => state.search);

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
      setOpen(true);
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

  return (
    <div>
      <Button onClick={handleOpen}>Extract</Button>
      {isLoading ? <Loader /> : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <span id="modal-modal-title" variant="h6" component="h2">
            Edit Article
          </span>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error ? (
              <AlertComponent severity="error">
                {"The article could not be extracted. Please go to website."}
                <Link to={news.url} target="_blank" rel="noreferrer">
                  Link
                </Link>
              </AlertComponent>
            ) : null}
            <textarea
              value={articleContent}
              rows="5"
              cols="50"
              onChange={(e) => setArticleContent(e.target.value)}
            />
          </Typography>
          <Button onClick={handleSummarize}>Summarize</Button>
        </Box>
      </Modal>
    </div>
  );
}
