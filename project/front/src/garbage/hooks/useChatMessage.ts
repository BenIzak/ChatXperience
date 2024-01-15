// Exemple d'utilisation de useQuery dans hooks/useChatMessages.ts
import { useQuery } from '@tanstack/react-query';

export const useChatMessages = (chatId: any) => {
    return useQuery(['chat', chatId], fetchChatMessages);
};
