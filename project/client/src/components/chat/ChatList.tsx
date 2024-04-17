import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import Modal from './Modal';
import CreateGroupForm from '../group/CreateGroupForm';
import { Chat, DBChat, Messages } from '@/type';
import { useQuery } from '@tanstack/react-query';
import { getGroupsByUserId } from '@/api/services/group';
import formatDateString from '@/hooks/useDateFormat';
import { getMessagesByGroupId } from '@/api/services/message';

const ChatList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState<string>('');
    const userID = localStorage.getItem('userId') || '';

    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    // Fetch chat list of the user
    const { data: chatList, isSuccess: isChatListSuccess } = useQuery<DBChat[], Error>({
        queryKey: ['groups', userID],
        queryFn: () => getGroupsByUserId(userID),
        enabled: !!userID,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 2,
        onError: (error : Error) => console.error('Failed to fetch chats:', error)
    });



    const handleSelectChat = (chatId: string) => {
        setCurrentChat(chatId);
        localStorage.setItem('currentChat', chatId);
    };

    const openModal = () => setIsModalOpen(true);
    const onSubmit = () => setIsModalOpen(false);
    const onCancel = () => setIsModalOpen(false);

    return (
        <>
            {isModalOpen && (
                <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
                    <CreateGroupForm onSubmit={onSubmit} onCancel={onCancel} />
                </Modal>
            )}
            <div className="flex h-full w-full flex-row gap-4">
                <div className="flex h-full w-1/4 flex-col rounded-xl bg-gray-200 p-4">
                    <ul className="h-full w-full overflow-y-auto">
                        {isChatListSuccess && (chatList as DBChat[]).map((chat: DBChat) => (
                            <li key={chat.id} onClick={() => handleSelectChat(chat.id)} title={chat.name}>
                                <div className={["group flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-gray-100", currentChat === chat.id ? 'bg-gray-300' : ''].join(' ')}>
                                    <div className="flex w-full flex-col gap-1">
                                        <div className="flex justify-between items-center font-medium text-typo-primary gap-3">
                                            <span className="w-5/6 flex items-center gap-2 font-medium ">
                                                <span className="flex h-8 w-8 items-center justify-center">
                                                    <i className={`fa-duotone text-xl ${chat.public ? 'fa-users' : 'fa-lock'}`}></i>
                                                </span>
                                                <h5 className="truncate font-semibold">{chat.name}</h5>
                                            </span>
                                            <span className="w-1/6 text-xs text-typo-tertiary whitespace-nowrap text-end">{formatDateString(chat.updated_at, 'short')}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={openModal} className="btn-primary w-full">Create Chat</button>
                </div>
                <div className="flex h-full w-3/4 flex-col">
                    <MessageList currentChatId={currentChat}  />
                </div>
            </div>
        </>
    );
};

export default ChatList;
