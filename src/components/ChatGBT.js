import React, { useState } from 'react';
import askChatGBT from "../api/askChatGBT";
import { useSelector } from "react-redux";
import Loader from "./Loader.js";
import './ChatGPT.css';

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { stockData } = useSelector((state) => state.search);
    

    const handleSave = async () => {
        const userDataAndChatLog = {
            userContext: {
              time_stamp: new Date(),
              stock_data: stockData
            },
            chatLog: messages
          };
        

        console.log("handleSave called", userDataAndChatLog);
        try {
            const response = await askChatGBT.saveChatLog(userDataAndChatLog);
            console.log("response", response);
            return response;
        } catch (error) {
            console.log("Error while saving chat log:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'user' }]);
    
        try {
            setIsLoading(true);
            
            const response = await askChatGBT.chatBot(inputValue);
            console.log("response", response);
            setIsLoading(false);
            setMessages(prevMessages => [...prevMessages, { text: response.data, sender: 'gpt' }]);
            setInputValue('');
        } catch (error) {
            console.log("Error while getting response:", error);
        }
    
        
    };
    

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === 'user' ? 'user-message' : 'gpt-message'}>
                        <span className={message.sender === 'user' ? 'user-text' : 'gpt-text'}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            {isLoading ? <Loader /> : <textarea
                className="message-input"
                rows="3"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />}
            <button onClick={handleSubmit} className="send-button">
                Send
            </button>
            {messages.length > 0 ? <button onClick={handleSave}>Save </button> : null}
        </div>
    );
};

export default ChatGPT;
