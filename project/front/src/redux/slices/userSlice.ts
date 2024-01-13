import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    name: '',
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.isAuthenticated = true;
        },
        clearUsername: (state) => {
            state.name = '';
            state.isAuthenticated = false;
        },
        // autres reducers...
    },
});

export const { setUsername, clearUsername } = userSlice.actions;
export const userReducer = userSlice.reducer;
