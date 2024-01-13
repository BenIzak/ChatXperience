// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@redux/slices/chatSlice";
import { RootState } from "@redux/store";
import { MessageProps } from "@/types/messageTypes";
// import { fetchMessages } from "@/api/api";
import Message from "@/components/chat/Message";
import { testMessages } from "@/api/testData";
import ChatList from "@/components/chat/ChatLinsing";


export default function ChatPage() {
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
            isCurrent: true
        };

        dispatch(addMessage(message));
        setNewMessage('');
    };

    // if (isLoading) return 'Chargement...';
    // if (error) return 'Une erreur est survenue.';

    return (
        <div className="w-full h-full flex flex-row justify-center items-center p-4 border border-stroke bg-[#F8FAFC] dark:border-dark-3 dark:bg-dark-2 rounded-lg overflow-hidden">
            <ChatList />
            <div className="w-full h-full flex flex-col justify-center items-center">
                <section className="w-full h-full bg-white dark:bg-dark">
                    <div className="w-full h-full border flex flex-col justify-between  border-stroke bg-[#F8FAFC] dark:border-dark-3 dark:bg-dark-2 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between border-b border-stroke bg-white p-4">
                            <div className="flex items-center">
                                <div className="mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
                                    <img
                                        src="https://cdn.tailgrids.com/2.0/image/dashboard/images/chat-box/chat-box-03/image-01.jpg"
                                        alt="avatar"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-base font-medium text-dark dark:text-white">
                                        Robert Henry
                                    </h5>
                                    <p className="text-sm text-body-color dark:text-dark-6">
                                        Lase seen 5min ago
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-full flex flex-col justify-end space-y-4 p-4 overflow-y-auto">
                            <div className="flex flex-col space-y-4">
                                {combinedMessages.map((msg: MessageProps, index: number) => (
                                    <Message
                                        key={index}
                                        img={msg.img}
                                        time={msg.time}
                                        text={msg.text}
                                        isCurrent={msg.isCurrent}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <form
                                className="flex items-center justify-between space-x-[14px] rounded-md bg-white p-4 shadow-team-3 dark:bg-dark-2 dark:shadow-box-dark"
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            >

                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={handleNewMessageChange}
                                        placeholder="Type something here..."
                                        className="h-11 w-full rounded-[5px] border border-stroke bg-transparent pl-[18px] pr-12 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6"
                                    />
                                </div>

                                <button className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-5 text-base font-medium text-white hover:bg-blue-dark">
                                    <span className="hidden pr-[10px] sm:inline"> Send </span>
                                    <span>
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

            </div >
        </div >
    )
}





