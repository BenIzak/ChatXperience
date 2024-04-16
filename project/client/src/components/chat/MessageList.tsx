import React, { useEffect, useState, useCallback } from 'react';
import NewMessageForm from '@components/chat/NewMessageForm';
import Message from '@components/chat/Message';
import { Messages } from '@/type';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type MessageListProps = {
    currentChatId: string | undefined;
    userID: string;
    receiver: string;
    groupID: string;
};

const MessageList: React.FC<MessageListProps> = ({ currentChatId, userID }) => {
    const [messages, setMessages] = useState<MessageListProps[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const userName = useSelector((state: RootState) => state.user.userDetails?.firstname);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    // Fonction pour initialiser la WebSocket
    const initWebSocket = useCallback(() => {
        const token = localStorage.getItem('token');
        const socketUrl = token ? `ws://localhost:3000/ws?token=${encodeURIComponent(token)}` : 'ws://localhost:3000/ws';
        const newSocket = new WebSocket(socketUrl);

        newSocket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        newSocket.onmessage = (event) => {
            try {
                const receivedMessage = JSON.parse(event.data) as any;
                console.log(receivedMessage)
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            } catch (e) {
                console.error('Error parsing message:', e);
                console.log('Received raw data:', event.data);
            }
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket connection closed:', event.reason);
            setSocket(null);
            // Tentative de reconnexion
            setTimeout(() => {
                console.log("Attempting to reconnect WebSocket...");
                initWebSocket();
            }, 5000); // Reconnecter après 5 secondes
        };

        setSocket(newSocket);
    }, []);

    useEffect(() => {
        if (!socket) {
            initWebSocket();
        }
    }, [socket, initWebSocket]);

    const sendMessage = () => {
        if (socket && newMessage && socket.readyState === WebSocket.OPEN) {
            console.log("Socket status:", socket.readyState);
            const userID = localStorage.getItem("userId")
            const messageData = {
                sender: userID,
                content: newMessage,
                groupID: "1"
            };
            socket.send(JSON.stringify(messageData));
            setNewMessage(''); // Effacer le champ de message après l'envoi
        } else {
            console.log("No message to send or socket not connected.");
        }
    };

    if (!currentChatId) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-center text-typo-primary">
                    Bienvenue <span className="font-bold">{userName}</span>, créez ou sélectionnez un chat pour commencer.
                </p>
                <input
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
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col justify-between space-y-4 rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
                {/* {messages.map((message) => (
                    <Message key={message.id} time={message.timestamp} text={message.content} username={message.senderName} isCurrent={message.senderId === userID} />
                ))} */}
            </div>
            <NewMessageForm senderName={userName || 'none'} />
        </div>
    );
};

export default MessageList;
