import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';

function ChatPanel() {
    const [messages, setMessages] = useState([]);
    const [currentBotResponseChunks, setCurrentBotResponseChunks] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);

    const messagesContainerRef = React.useRef(null);
    useEffect(() => {
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentBotResponseChunks]);

    const handleUserSubmit = async (query) => {
        setMessages([...messages, { type: 'user', content: query }]);
        setIsBotTyping(true);
        
        try {//http://localhost:5000/query
            ///api/query-vertex
            const result = await fetch('/api/query-vertex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            
            let chat_history = await result.json();
            chat_history = JSON.parse(chat_history);
            chat_history.forEach((message) => {
                console.log(message);
                const words = message.trim().split(' ');
                let chunks = [];

                while (words.length) {
                    chunks.push(words.splice(0, 5).join(' ')); // Breaking the message into chunks of 5 words
                }

                // console.log("Starting chunk logic");
                // console.log("NUMBER OF CHUNKS: ", chunks.length);
                // chunks.forEach((chunk, index) => {
                //     setTimeout(() => {
                //         setCurrentBotResponseChunks(prevChunks => [...prevChunks, chunk]);
                //     }, 1000 * index);
                // });
                // console.log("Ending chunk logic");
                chunks.forEach((chunk, index) => {
                    setCurrentBotResponseChunks(prevChunks => [...prevChunks, chunk]);
                })

                // After all chunks are revealed, add the entire response to the messages and clear the currentBotResponseChunks
                // setTimeout(() => {
                //     setMessages(prev => [...prev, { type: 'bot', content: message }]);
                //     setCurrentBotResponseChunks([]);
                //     setIsBotTyping(false);
                // }, 1000 * chunks.length)

                setMessages(prev => [...prev, { type: 'bot', content: message }]);
                setCurrentBotResponseChunks([]);
                setIsBotTyping(false);
            });

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <div className="chat-panel">
        <h4>ReX</h4>
            <MessageList messages={messages} currentBotResponseChunks={currentBotResponseChunks} ref={messagesContainerRef} />
            <InputArea onSubmit={handleUserSubmit} isBotTyping={isBotTyping} />
        </div>
    );
}

export default ChatPanel;
