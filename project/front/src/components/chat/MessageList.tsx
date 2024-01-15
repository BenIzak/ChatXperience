import React from 'react';
// import { useGetMessagesQuery } from '../../api/chatApi';
import { useAppSelector } from '../../hooks';

const MessageList = () => {
    const currentChatId = useAppSelector((state) => state.chat.currentChat);
    // const { data: messages, isLoading, isError } = useGetMessagesQuery(currentChatId);

    // if (isLoading) return <div>Loading messages...</div>;
    // if (isError || !messages) return <div>Error loading messages.</div>;

    // return (
    //     <ul>
    //         {messages.map((message) => (
    //             <li key={message.id}>
    //                 <strong>{message.sender}:</strong> {message.content}
    //             </li>
    //         ))}
    //     </ul>
    // );
};

export default MessageList;
