// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@redux/slices/chatSlice";
import { RootState } from "@redux/store";
import { MessageTypes } from "@/types/messageTypes";
// import { fetchMessages } from "@/api/api";
import Message from "@/components/chat/Message";
import { testMessages } from "@/api/testData";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInputForm from "@/components/chat/ChatInputForm";

export default function Chat() {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    /*
        const { data: messages, isLoading, error } = useQuery({
            queryKey: ['messages'],
            queryFn: fetchMessages // Utilisez la fonction importée
        });
    */

    const localMessages = useSelector((state: RootState) => state.chat.messages);
    // const combinedMessages = isLoading || error ? testMessages : [...messages, ...localMessages];

    const combinedMessages = [...testMessages, ...localMessages];


    const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (!newMessage) return;

        const message = {
            img: 'https://cdn.tailgrids.com/2.0/image/dashboard/images/chat-box/chat-box-02/image-02.jpg',
            time: new Date().toLocaleTimeString(),
            text: newMessage,
            isCurrent: true,
            username: 'Samuel'
        };

        dispatch(addMessage(message));
        setNewMessage('');
    };

    // if (isLoading) return 'Chargement...';
    // if (error) return 'Une erreur est survenue.';
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <section className="w-full h-full bg-white dark:bg-dark">
                <div className="w-full h-full border flex flex-col justify-between  border-stroke bg-[#F8FAFC] dark:border-dark-3 dark:bg-dark-2 rounded-lg overflow-hidden">
                    <ChatHeader typeOfChat="private" lastSeen="2 hours ago" chatId="224" interlocutorId="24340" />

                    <div className="h-full flex flex-col justify-end space-y-4 p-4 overflow-y-auto">
                        <div className="flex flex-col space-y-4">
                            {combinedMessages.map((msg: MessageTypes, index: number) => (
                                <Message
                                    key={index}
                                    time={msg.time}
                                    text={msg.text}
                                    isCurrent={msg.isCurrent}
                                    username={msg.username}
                                />
                            ))}
                        </div>
                    </div>
                    <ChatInputForm sendMessage={handleSendMessage} newMessage={newMessage} handleNewMessageChange={handleNewMessageChange} />
                </div>
            </section>

        </div >
    );

}