import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
// import { useSendChatMessageMutation } from '../../api/chatApi';

const NewMessageForm = () => {
    const [message, setMessage] = useState('');
    const currentChatId = useAppSelector((state) => state.chat.currentChat);
    // const [sendChatMessage] = useSendChatMessageMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            // await sendChatMessage({ chatId: currentChatId, content: message }).unwrap();
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default NewMessageForm;
