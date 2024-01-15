import React from 'react';
//import { useGetChatsQuery } from '../../api/chatApi';
import { useAppDispatch, useAppSelector } from '../../hooks';
//import { selectChat } from '../../redux/slices/chatSlice';

const ChatList = () => {
    //const { data: chats, isLoading, isError } = useGetChatsQuery();
    const dispatch = useAppDispatch();
    const currentChat = useAppSelector((state) => state.chat.currentChat);

    const handleSelectChat = (chatId: string) => {
        dispatch(selectChat(chatId));
    };

    // if (isLoading) return <div>Loading...</div>;
    // if (isError || !chats) return <div>Error loading chats.</div>;

    return (
        <ul>
            {/* {chats.map((chat) => (
                <li
                    key={chat.id}
                    className={chat.id === currentChat ? 'selected' : ''}
                    onClick={() => handleSelectChat(chat.id)}
                >
                    {chat.name}
                </li>
            ))} */}
        </ul>
    );
};

export default ChatList;
