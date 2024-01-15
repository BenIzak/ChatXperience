// export type chatMember = {
//     id: string;
//     username: string;
//     email: string;
//     status: boolean;
//     lastConnection: Date;
// };

// export type PrivateChatInfo = {
//     chatId: string;
//     typeOfChat: 'private';
//     lastSeen: string;
//     interlocutorId: string;
// };

// export type GroupChatInfo = {
//     chatId: string;
//     typeOfChat: 'group';
//     groupName: string;
//     groupMembers: chatMember[];
// };

// export type ChatInfo = PrivateChatInfo | GroupChatInfo;



// export type MessageReceived = {
//     messageId: string;
//     chatId: string;
//     senderId: string;
//     text: string;
//     timestamp: Date;
// };


// /**
//  *  this type is used to define the props of the Chat component
//  */
// export type MessageSent = {
//     time: string;
//     text: string;
//     senderId: string;
//     chatId: string;
// };


// // Types pour les chats
// export type Chat = {
//     chatId: string;
//     type: 'private' | 'group';
//     members: chatMember[];
// };

// // Redux state
// export interface ChatState {
//     messages: MessageReceived[];
//     currentChat: Chat | null;
// }


export type ChatMember = {
    id: string;
    username: string;
    email: string;
    status: boolean;
    lastConnection: string; // Format ISO string recommandé
};

export type ChatType = 'private' | 'group';

export type ChatInfo = {
    chatId: string;
    type: ChatType;
    lastSeen?: string; // Pour les chats privés
    interlocutorId?: string; // Pour les chats privés
    groupName?: string; // Pour les groupes
    groupMembers?: ChatMember[]; // Pour les groupes
};

export type Message = {
    messageId: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: string; // ISO string pour les dates
    isSent?: boolean; // Distinguer les messages envoyés des reçus
};

export type Chat = {
    chatId: string;
    type: ChatType;
    members: ChatMember[];
};

// Redux state pour la gestion des chats
export interface ChatState {
    messages: Message[];
    currentChat: Chat | null;
    connectionStatus: 'connected' | 'disconnected' | 'connecting';
    error?: string;
}

export type WebSocketState = {
    isConnected: boolean;
    isReconnecting: boolean;
    lastError?: Error;
};
