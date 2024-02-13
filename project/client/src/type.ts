/**
 * Interface representing a chat, which could be either private or a group.
 */
export interface Chat {
    id: string;
    name: string;
    type: 'private' | 'group';
    lastMessageDate: string;
    creator: string;
    participants: string[];
    messages: Messages[];
}

/**
 * Interface representing a message in a chat.
 */
export interface Messages {
    id: string;
    content: string;
    senderName: string;
    senderId: string;
    chatId: string;
    timestamp: string;
}
