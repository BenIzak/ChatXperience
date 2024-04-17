import React, { useEffect, useState, useCallback } from 'react';
import NewMessageForm from '@components/chat/NewMessageForm';
import Message from '@components/chat/Message';
import { Messages } from '@/type';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getMessagesByGroupId } from '@/api/services/message';

type MessageListProps = {
    currentChatId: string | undefined;
};

const MessageList: React.FC<MessageListProps> = ({ currentChatId }) => {
    const [messagesData, setMessagesData] = useState<Messages[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    const userID = localStorage.getItem('userId');
    const userName = useSelector((state: RootState) => state.user.userDetails?.firstname);

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentChatId) {
                setIsLoadingMessages(true);
                try {
                    const fetchedMessages = await getMessagesByGroupId({ groupID: Number(currentChatId) });
                    setMessagesData(fetchedMessages);
                } catch (error) {
                    console.error('Failed to fetch messages:', error);
                } finally {
                    setIsLoadingMessages(false);
                }
            }
        };

        fetchMessages();
    }, [currentChatId]);




    if (!currentChatId) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-center text-typo-primary">
                    Bienvenue <span className="font-bold">{userName}</span>, créez ou sélectionnez un chat pour commencer.
                </p>
                {/* <input
                    type="text"
                    placeholder="Enter your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="border-2 border-gray-300 rounded px-4 py-2 m-2"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Send
                </button> */}
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col justify-between space-y-4 rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
                {messagesData.map((message) => (
                    <Message key={message.id} isCurrent={message.user_id.toString() === userID} text={message.content} time={message.created_at} username={message.user_id.toString()} />
                ))}
            </div>
            <NewMessageForm senderName={userName!} chatId={currentChatId} />
        </div>
    );
};

export default MessageList;
