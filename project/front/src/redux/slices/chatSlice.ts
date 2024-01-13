import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
    img: string;
    time: string;
    text: string;
    isCurrent?: boolean;
};
const initialState = {
    messages: [] as Message[],
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        // autres reducers...
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
