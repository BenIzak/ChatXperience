import { useState } from 'react'
type Message = {
    id: string
    content: string
    senderName: string
    senderId: string
    chatId: string
    timestamp: string // Format ISO pour la date et l'heure du message
}

type newMessageProps = {
    senderName: string
}


const NewMessageForm: React.FC<newMessageProps> = ({ senderName }) => {
    const [message, setMessage] = useState('')
    const [currentChatId, setCurrentChatId] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        setCurrentChatId(localStorage.getItem('currentChat')!)

        // Récupérer le chat actuel
        const chatResponse = await fetch(
            `http://localhost:3000/Chats/${currentChatId}`
        )
        const chat = await chatResponse.json()
        console.log(chat) // Ajoute ceci pour inspecter l'objet chat

        if (!chat.messages) {
            chat.messages = [] // Initialiser le tableau de messages si ce n'est pas déjà fait
        }

        // Créer un nouveau message
        const newMessage: Message = {
            id: Date.now().toString(),
            content: message,
            senderName: senderName,
            senderId: localStorage.getItem('user_id')!,
            chatId: currentChatId,
            timestamp: new Date().toISOString(),
        }

        // Ajouter le nouveau message au chat
        chat.messages.push(newMessage)

        // Mettre à jour le chat avec les nouveaux messages
        const updateResponse = await fetch(
            `http://localhost:3000/Chats/${currentChatId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chat),
            }
        )

        if (updateResponse.ok) {
            setMessage('')
            // Optionnellement, rafraîchir les messages affichés
        }
    }

    const openEmojiPicker = () => {
        console.log('openEmojiPicker')
    }

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
