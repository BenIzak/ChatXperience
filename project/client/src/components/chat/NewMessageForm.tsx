import React, { useEffect, useState, useCallback } from 'react';

interface NewMessageData {
  content: string;
  groupID: string;
  sender: string;
}

const NewMessageForm: React.FC<{ senderName: string; chatId: string }> = ({ senderName, chatId }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const userID = localStorage.getItem('userId');

  // Initialisation du WebSocket
  useEffect(() => {
    const token = localStorage.getItem('token');
    const socketUrl = `ws://localhost:3000/ws?token=${encodeURIComponent(token!)}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => console.log('WebSocket connection established.');
    newSocket.onclose = () => console.log('WebSocket connection closed.');
    newSocket.onerror = (error) => console.error('WebSocket error:', error);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = useCallback((data: NewMessageData) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sending message:', { content: message, groupID: chatId, sender: userID });
    sendMessage({ content: message, groupID: chatId.toString(), sender: userID! });
    setMessage('');
  };

  return (
    <div className="w-full">
      <form className="bg-wp-50 flex items-center justify-between gap-4 rounded-md p-4 shadow-team-3 dark:bg-dark-2 dark:shadow-box-dark" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="h-11 w-full rounded-[5px] border border-stroke bg-transparent pl-[18px] pr-12 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6" />
          <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center">
            <i className="fa-light fa-smile text-typo-secondary"></i>
          </button>
        </div>
        <button type="submit" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-5 text-base font-medium text-white hover:bg-blue-dark">
          <span className="hidden pr-[10px] sm:inline">Send</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default NewMessageForm;
