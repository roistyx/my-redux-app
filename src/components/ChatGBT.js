import React, { useState } from 'react';
import askChatGBT from "../api/askChatGBT";
import './ChatGPT.css';

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'user' }]);
    
        try {
            const response = await askChatGBT.chatBot(inputValue);
            console.log("response", response);
            setMessages(prevMessages => [...prevMessages, { text: response.data, sender: 'gpt' }]);
        } catch (error) {
            console.log("Error while getting response:", error);
        }
    
        setInputValue('');
    };
    

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === 'user' ? 'user-message' : 'gpt-message'}>
                        <div className={message.sender === 'user' ? 'user-text' : 'gpt-text'}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <textarea
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
            />
            <button onClick={handleSubmit} className="send-button">
                Send
            </button>
        </div>
    );
};

export default ChatGPT;
