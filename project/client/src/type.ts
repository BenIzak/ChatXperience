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

export interface DBChat {
    id: string;
    creator_id: string;
    name: string;
    public: boolean;
    description: string;
    participants: string[] | null;
    created_at: string;
    updated_at: string;
}

/**
 * Interface representing a message in a chat.
 */
export interface Messages {
    id: string;
    user_id: string;
    group_id: string;
    content: string;
    created_at: string;
    updated_at: string;
}
