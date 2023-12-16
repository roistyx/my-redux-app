import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Center } from '../../layouts/Line.js';
import searchStocks from '../../api/searchStocks.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FlexStart } from '../../layouts/Line.js';
import ToggleSwitch from '../../elements/ToggleSwitch.js';
import ArticleEditor from '../../components/ArticleEditor.js';
import { AlignStart } from '../../layouts/Line.js';
import './News.css';

function News() {
  const [newsFeed, setNewsFeed] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [highlightedNews, setHighlightedNews] = useState([]);
  const { stockData } = useSelector(state => state.search);
  const handleExtract = news => news;

  const phrases = [stockData.symbol, stockData.company_name];

  const handleToggle = () => {
    setHighlightedNews(!highlightedNews);
  };

  const shouldHighlight = (word, phrases) => {
    if (!word || typeof word !== 'string') return false;
    const cleanWord = word.replace(/[.,!?;"]/g, ''); // Strips common punctuation
    return phrases.some(phrase => {
      if (!phrase || typeof phrase !== 'string') return false;
      return cleanWord.toLowerCase().includes(phrase.toLowerCase());
    });
  };

  const processTextForHighlight = (text, phrases) => {
    if (!text || typeof text !== 'string') return [];
    if (!Array.isArray(phrases)) return [];
    return text.split(/\s+/).map(word => {
      if (shouldHighlight(word, phrases)) {
        return { type: 'highlight', content: word };
      } else {
        return { type: 'text', content: word };
      }
    });
  };

  useEffect(() => {
    if (!stockData.symbol) return setNewsFeed([]);

    const searchStock = async () => {
      console.log(stockData.company_name);
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
      setSelectedNews(selectedNews.filter(item => item !== summary));
    }
  };

  const handleSummarize = async () => {
    const response = await searchStocks.summarizeNews(selectedNews);
  };

  return (
    <div>
      <AlignStart gap="5px 0 0 5px">
        <ToggleSwitch label="Highlight" handleToggle={handleToggle} />
      </AlignStart>

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
            {newsFeed.map(news => (
              <div className="grid-item" key={uuidv4()}>
                <FlexStart>
                  <Checkbox
                    checked={selectedNews.includes(news.summary)}
                    onChange={e => handleCheckboxChange(e, news.summary)}
                  />
                </FlexStart>
                <div className="news-title">{news.title}</div>
                <div className="news-summary">
                  {highlightedNews ? (
                    <span>{news.summary}</span>
                  ) : (
                    processTextForHighlight(news.summary, phrases).map(
                      (segment, index) => {
                        if (segment.type === 'highlight') {
                          return (
                            <span key={index} className="highlight">
                              {segment.content + ' '}
                            </span>
                          );
                        } else {
                          return <span key={index}>{segment.content} </span>;
                        }
                      }
                    )
                  )}
                </div>

                <div className="NewsLink">
                  <a href={news.url} target="_blank">
                    {news.url}
                  </a>

                  <ArticleEditor handleExtract={() => handleExtract(news)} />
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
