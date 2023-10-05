import React, { useState } from 'react';
import './ChatGPT.css';

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add user message to messages array
        setMessages([...messages, { text: inputValue, sender: 'user' }]);

        // Mock the GPT-3 response
        setMessages(prev => [...prev, { text: "This is a mock response!", sender: 'gpt' }]);

        // Clear the input field
        setInputValue('');
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
