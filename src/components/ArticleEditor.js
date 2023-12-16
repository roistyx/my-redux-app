import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import searchStocks from '../api/searchStocks.js';
import Alert from './Alert.js';
import Loader from './Loader.js';
import './ArticleEditor.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import LinkButton from '../elements/LinkButton.js';
import Button from '../elements/Button.js';

export default function ArticleEditor({ handleExtract }) {
  const [articleContent, setArticleContent] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState('');
  const { stockData } = useSelector(state => state.search);

  const [modal, setModal] = useState(false);

  const handleOpen = async () => {
    setIsLoading(true);
    try {
      const news = await handleExtract();
      setNews(news);
      if (!news || !news.url) {
        setNews('');
        throw new Error('News extraction failed or no URL provided.');
      }

      const response = await searchStocks.extractNews(news.url);

      if (!response) {
        setError(true);
      }

      setArticleContent(response);
      setIsLoading(false);
      setModal(true);
    } catch (error) {
      console.error('Error in handleOpen:', error.message);
    }
  };

  const handleSummarize = async () => {
    if (!articleContent) return;
    if (articleContent) setError(false);

    try {
      const { data } = await searchStocks.summarizeNews({
        content: articleContent,
        symbol: stockData.symbol,
        company_name: stockData.company_name,
        previous_close: stockData.previous_close,
        last_trade_day: stockData.last_trade_day,
        url: news.url
      });

      setArticleContent(data.content);
      console.log(data);
    } catch (error) {
      console.error('Summarization Error:', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await searchStocks.saveStockArticle({
        content: articleContent,
        symbol: stockData.symbol,
        company_name: stockData.company_name,
        previous_close: stockData.previous_close,
        last_trade_day: stockData.last_trade_day,
        url: news.url
      });
      console.log(response);
    } catch (error) {
      console.error('Error while saving article:', error.message);
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          // <button onClick={handleOpen}>Review Article</button>
          <Button onClick={handleOpen}>Review Article</Button>
        )}
      </div>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <span id="modal-modal-title">Edit Article </span>{' '}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {' '}
          {error ? (
            <Alert severity="error">
              {'The article could not be extracted. Please go to website.'}

              <LinkButton url={news.url}>Visit Site</LinkButton>
            </Alert>
          ) : (
            <Alert severity="success">
              {
                'Article extracted with success! Yet, for the finest details, consider a direct copy/paste from the original.'
              }
              <Link
                component="button"
                to={news.url}
                target="_blank"
                rel="noreferrer"
              >
                Link
              </Link>
            </Alert>
          )}
          <div className="textarea-wrapper">
            <textarea
              autoFocus
              className="scrollable-textarea"
              value={articleContent}
              // dangerouslySetInnerHTML={{
              //   __html: articleContent
              // }}
              rows="20"
              onChange={e => setArticleContent(e.target.value)}
            />
          </div>
        </Typography>
        <Button onClick={handleSummarize}>Summarize</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </>
  );
}
