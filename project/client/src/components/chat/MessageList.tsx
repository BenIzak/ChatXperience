import React, { useEffect, useState } from 'react'
import NewMessageForm from '@components/chat/NewMessageForm'
import Message from '@components/chat/Message'
import { Messages } from '@/type'

type MessageListProps = {
    currentChatId: string | undefined
    userID: string
}

type newMessageProps = {
    currentChatId: string
    senderName: string
}

const MessageList: React.FC<MessageListProps> = ({ currentChatId, userID }) => {
    const [messages, setMessages] = useState<Messages[]>([])
    const userName = localStorage.getItem('user_name')

    const [props, setProps] = useState<newMessageProps>({
        currentChatId: currentChatId || 'none',
        senderName: localStorage.getItem('user_name') || 'none',
    })

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentChatId) return // Ne rien faire si aucun chat n'est sélectionné

            const response = await fetch(
                `http://localhost:3000/Chats?id=${currentChatId}`
            )
            const chats = await response.json()
            if (chats.length > 0) {
                const chatMessages = chats[0].messages as Messages[]
                setMessages(chatMessages)
            }
        }

        fetchMessages()
    }, [currentChatId])

    // Afficher un message de bienvenue si aucun chat n'est sélectionné
    if (!currentChatId) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-center text-typo-primary">
                    Bienvenue <span className="font-bold">{userName}</span>,
                    créez ou sélectionnez un chat pour commencer.
                </p>
            </div>
        )
    }

    // auto scroll to bottom
    const messageList = document.getElementById('messageList')
    if (messageList) {
        messageList.scrollTop = messageList.scrollHeight
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col justify-between space-y-4 rounded-xl bg-gray-200 p-4">
            <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
                {messages.map((message) => (
                    <span key={message.id}>
                        <Message
                            key={message.id}
                            time={message.timestamp}
                            text={message.content}
                            username={message.senderName}
                            isCurrent={message.senderId === userID}
                        />
                    </span>
                ))}
            </div>
            <NewMessageForm senderName={props.senderName} />
        </div>
    )
}

export default MessageList
