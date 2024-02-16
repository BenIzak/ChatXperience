import { useEffect, useState } from 'react'
import MessageList from './MessageList'
import formatDateString from '@/hooks/useDateFormat'
import { Chat } from '@/type'
import Modal from './Modal'
import CreateGroupForm from '../group/CreateGroupForm'
import { createGroup } from '@/api/services/group'
import { CreateGroupRequest } from '@/api'

const ChatList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [chatList, setChatList] = useState<Chat[]>([])
    const [currentChat, setCurrentChat] = useState<string | undefined>(
        undefined
    )
    const userID = localStorage.getItem('user_id') || ''

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch('http://localhost:3000/Chats')
            const chats: Chat[] = await response.json()
            chats.sort(
                (a, b) =>
                    new Date(b.lastMessageDate).getTime() -
                    new Date(a.lastMessageDate).getTime()
            )

            setChatList(chats)
        }

        fetchChats()
    }, [currentChat, userID])

    const handleSelectChat = (chatId: string) => {
        setCurrentChat(chatId)
        localStorage.setItem('currentChat', chatId)
    }
    const openModal = () => {
        setIsModalOpen(true)
        console.log('open modal')
    }

    const onSubmit = async (request: CreateGroupRequest, token: string) => {
        try {
            const response = await createGroup(request, token)
            if (response.success) {
                console.log('Group created successfully')
            } else {
                console.error('Failed to create group:', response.message)
            }
        } catch (error) {
            console.error('Failed to create group:', error)
        }
        setIsModalOpen(false)
    }

    const onCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {isModalOpen && (
                <Modal
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    onValidate={() => {}}
                >
                    <CreateGroupForm onSubmit={onSubmit} onCancel={onCancel} />
                </Modal>
            )}
            <div className="flex h-full w-full flex-row gap-4">
                <div className="flex h-full w-1/4 flex-col rounded-xl bg-gray-200 p-4">
                    <ul className="h-full w-full overflow-y-auto">
                        <li>
                            {chatList.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleSelectChat(chat.id)}
                                    className="group flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-gray-100"
                                >
                                    <div className="max-w-fit-content flex w-full flex-col gap-1">
                                        <div className="caption-primary flex justify-between font-medium text-typo-primary">
                                            <span className="flex items-center  gap-2 font-medium text-typo-primary">
                                                <span className="mr-2 flex h-8 w-8 items-center justify-center text-typo-reverse">
                                                    <i
                                                        className={`fa-duotone text-xl text-primary-500 transition-transform group-hover:scale-125
                                                     ${chat.type === 'private' ? 'fa-user' : 'fa-users'}`}
                                                    ></i>
                                                </span>
                                                <h5 className="mr-2 truncate whitespace-normal font-semibold">
                                                    {chat.name}
                                                </h5>
                                            </span>
                                            <span className="my-auto h-full text-right text-xs text-body-color">
                                                {formatDateString(
                                                    chat.lastMessageDate,
                                                    'short'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </li>
                    </ul>
                    <div>
                        <button
                            onClick={openModal}
                            className="btn-primary w-full"
                        >
                            create chat
                        </button>
                    </div>
                </div>

                <div className="flex h-full w-3/4 flex-col">
                    <MessageList currentChatId={currentChat} userID={userID} />
                </div>
            </div>
        </>
    )
}

export default ChatList
