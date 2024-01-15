import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/types/chatTypes";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [] as Message[],
        currentChat: null,
    },
    reducers: {
        /*
        addMessage: (state, action: PayloadAction<MessageTypes>) => {
            state.messages.push(action.payload);
        },
        */
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        // autres reducers...
    },
});

export const { setMessages, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
