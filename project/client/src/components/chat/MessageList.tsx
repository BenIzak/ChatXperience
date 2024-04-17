import React, { useEffect, useState } from 'react';
import NewMessageForm from '@components/chat/NewMessageForm';
import MessageComponent from '@components/chat/Message';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getMessagesByGroupId } from '@/api/services/message';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    // Autres champs
}

interface MessageData {
    id: number;
    user_id: number;
    group_id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

interface MessageWithUser {
    Message: MessageData;
    User: User;
}

type MessageListProps = {
    currentChatId: string | undefined;
};

const MessageList: React.FC<MessageListProps> = ({ currentChatId }) => {
    const [messagesWithUsers, setMessagesWithUsers] = useState<MessageWithUser[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const userID = localStorage.getItem('userId');
    const userName = useSelector((state: RootState) => state.user.userDetails?.firstname);

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentChatId) {
                setIsLoadingMessages(true);
                try {
                    const fetchedMessages: MessageWithUser[] = await getMessagesByGroupId({ groupID: Number(currentChatId) });
                    setMessagesWithUsers(fetchedMessages);
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
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col justify-between space-y-4 rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
                {messagesWithUsers.map(({ Message, User }) => (
                    <MessageComponent
                        key={Message.id}
                        isCurrent={Message.user_id.toString() === userID}
                        text={Message.content}
                        time={Message.created_at}
                        username={User.firstname}
                    />

                ))}
            </div>
            <NewMessageForm senderName={userName!} chatId={currentChatId} />
        </div>
    );
};

export default MessageList;
