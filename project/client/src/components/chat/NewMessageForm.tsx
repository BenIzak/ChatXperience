import React, { useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket'; // Assurez-vous que le chemin d'accès est correct

interface NewMessageProps {
  senderName: string;
  chatId: string; // Vous devez passer chatId comme prop pour savoir à quel groupe le message est destiné
}

const NewMessageForm: React.FC<NewMessageProps> = ({ senderName, chatId }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useWebSocket(); // Utiliser le hook pour envoyer des messages
  const userId = localStorage.getItem('userId') || 'defaultUserId'; // Assurez-vous d'avoir un ID d'utilisateur valide

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message) {
      // Utilisez la méthode sendMessage de votre hook
      sendMessage({
        sender: userId,
        content: message,
        groupID: chatId,
      });
      setMessage(''); // Réinitialiser le message après l'envoi
    }
  };

  const openEmojiPicker = () => {
    console.log('openEmojiPicker');
  };


    return (
        <div className="w-full">
            <form
                className="bg-wp-50 flex items-center justify-between gap-4 rounded-md p-4 shadow-team-3 dark:bg-dark-2 dark:shadow-box-dark"
                onSubmit={handleSubmit}
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="h-11 w-full rounded-[5px] border border-stroke bg-transparent pl-[18px] pr-12 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6"
                    />
                    <button
                        className="absolute right-0 top-0 flex h-full w-12 items-center justify-center"
                        onClick={() => {
                            openEmojiPicker()
                        }}
                    >
                        <i
                            className="fa-light fa-smile text-typo-secondary
                        "
                        ></i>
                    </button>
                </div>

                <button className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-5 text-base font-medium text-white hover:bg-blue-dark">
                    <span className="hidden pr-[10px] sm:inline"> Send </span>
                    <span>
                        <i className="fa-regular fa-paper-plane"></i>
                    </span>
                </button>
            </form>
        </div>
    )
}

export default NewMessageForm
