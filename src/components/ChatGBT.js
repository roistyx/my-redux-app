import React, { useState, useEffect } from 'react';
import askChatGBT from '../api/askChatGBT';
import { useSelector } from 'react-redux';
import Loader from './Loader.js';
import './ChatGPT.css';

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { stockData } = useSelector(state => state.search);

  const userDataAndChatLog = {
    userContext: {
      time_stamp: new Date(),
      symbol: stockData.symbol,
      company_name: stockData.company_name,
      last_trade_day: stockData.regularMarketTime,
      previous_close: stockData.previousClose,
      volume: stockData.volume
    }
  };

  useEffect(() => {
    const fetchChatLog = async () => {
      try {
        const response = await askChatGBT.getChatLog(stockData.symbol);
        console.log('fetchChatLog', response.data);
        const logs = response.data;
        if (logs) {
          logs.forEach(log => {
            log.chatLog.forEach(message => {
              const newMessage = {
                text: message.text,
                sender: message.sender,
                userContext: log.chatLog.userContext
              };
              setChatHistory(prevMessages => [...prevMessages, newMessage]);
            });
          });
          console.log('logs', chatHistory);
          console.log('messages', messages);
        }
      } catch (error) {
        console.log('Error while getting chat log:', error);
      }
    };
    fetchChatLog();
  }, [stockData.symbol]);

  const handleSave = async () => {
    console.log('handleSave called', messages);
    try {
      const response = await askChatGBT.saveChatLog(messages);
      console.log('Saved', response);
      return response;
    } catch (error) {
      console.log('Error while saving chat log:', error);
    }
  };

  const handleSubmitToChatGBT = async e => {
    e.preventDefault();

    // Split the input value into paragraphs based on double line breaks
    const paragraphs = inputValue.split('\n\n');

    // Replace line breaks within each paragraph with <br> tags
    const formattedText = paragraphs
      .map(paragraph => paragraph.replace(/\n/g, '<br>'))
      .join('<p>');

    setMessages(prevMessages => [
      ...prevMessages,
      { text: formattedText, sender: 'user', userDataAndChatLog }
    ]);

    try {
      setIsLoading(true);

      const response = await askChatGBT.chatBot(inputValue, stockData.symbol);
      console.log('response', response);
      setIsLoading(false);

      setMessages(prevMessages => [
        ...prevMessages,
        { text: response.data, sender: 'gpt', userDataAndChatLog }
      ]);
      setInputValue('');
    } catch (error) {
      console.log('Error while getting response:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === 'user' ? 'user-message' : 'gpt-message'
            }
          >
            <span
              className={message.sender === 'user' ? 'user-text' : 'gpt-text'}
              dangerouslySetInnerHTML={{
                __html: message.text
              }}
            ></span>
          </div>
        ))}
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === 'user' ? 'user-message' : 'gpt-message'
            }
          >
            {/* <span className={message.sender === 'user' ? 'user-text' : 'gpt-text'}>
                            {message.text}
                        </span> */}
            <div
              className={message.sender === 'user' ? 'user-text' : 'gpt-text'}
              dangerouslySetInnerHTML={{
                __html: message.text
              }}
            ></div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <textarea
          className="message-input"
          rows="3"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmitToChatGBT(e);
            }
          }}
        />
      )}
      <button onClick={handleSubmitToChatGBT} className="send-button">
        Send
      </button>
      {messages.length > 0 ? <button onClick={handleSave}>Save </button> : null}
    </div>
  );
};

export default ChatGPT;
