import { MessageProps } from "@/types/messageTypes";

const BASE_URL = 'URL_DE_VOTRE_API';

/**
 * This function connects a user to the API
 * @param email  The email of the user
 * @param password  The password of the user
 * @returns  {Promise<{ token: string, userId: string }>} A promise that resolves to an object containing the token and the user id
 * @throws  {Error} An error if the login fails
 */
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        // Possibilty to add a custom error message
        throw new Error('Erreur lors de la connexion');
    }

    return response.json(); // Suppose que la réponse inclut un token d'authentification et/ou des informations utilisateur
};


/**
 * This function gets all details of a specific user
 * @param userId 
 * @returns 
 */
export const fetchUserDetails = async (userId: string) => {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails de l’utilisateur');
    }
    return response.json();
};

/**
 * This function updates data of a specific user
 * @param userId  The id of the user to update
 * @param userData  The data to update
 * @returns  {Promise<User>} A promise that resolves to the updated user
 */
export const updateUserProfile = async (userId, userData) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Problème lors de la mise à jour du profil");
    }
    return response.json();
};

/**
 * This function gets all users whose name matches the search text
 * @param searchText  The text to search
 * @returns  {Promise<User[]>} A promise that resolves to an array of users
 */
export const searchUsers = async (searchText) => {
    const response = await fetch(`${BASE_URL}/users/search?query=${encodeURIComponent(searchText)}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la recherche des utilisateurs');
    }
    return response.json(); // res { id, name }
};

/**
 * This function gets all discussion data of a specific chat
 * @param chatId  The id of the chat
 * @returns  {Promise<Discussion>} A promise that resolves to the discussion data
 * @throws  {Error} An error if the discussion data cannot be retrieved
 */
export const fetchDiscussionDetails = async (discussionId) => {
    const response = await fetch(`${BASE_URL}/discussions/${discussionId}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails de la discussion');
    }
    return response.json(); // Suppose que la réponse inclut les détails complets de la discussion
};


/**
 * This function gets all chats of a specific user
 * @param userId  The id of the user
 * @returns  {Promise<Chat[]>} A promise that resolves to an array of chats
 */
export const fetchUserChats = async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}/chats`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des discussions');
    }
    return response.json(); //res { chatId, chatName, lastMessage }
};


/**
 * This function gets all messages from the API
 * @returns  {Promise<Message[]>} A promise that resolves to an array of messages
 */
export const fetchMessages = async () => {
    const response = await fetch(`${BASE_URL}/get-messages`);
    if (!response.ok) {
        throw new Error('Problème de réseau');
    }
    return response.json();
};

/**
 * This function sends a message to the API
 * @param messageData  The message to send
 * @returns  {Promise<Message>} A promise that resolves to the message sent
 */
export const postMessage = async (messageData: MessageProps) => {
    const response = await fetch(`${BASE_URL}/post-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    });

    if (!response.ok) {
        throw new Error("Problème d'envoi du message");
    }

    return response.json();
};

// Ajoutez d'autres fonctions API selon vos besoins
