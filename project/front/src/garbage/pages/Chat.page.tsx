
import ChatList from "@/components/chat/ChatLinsing";
import Chat from "@/components/chat/Chat";

export default function ChatPage() {

    return (
        <div className="w-full h-full flex flex-row justify-center items-center p-4 border text-color-primary-50 border-stroke bg-[#F8FAFC] dark:border-dark-3 dark:bg-dark-2 rounded-lg overflow-hidden">
            <ChatList />
            <Chat />
        </div >
    )
}





