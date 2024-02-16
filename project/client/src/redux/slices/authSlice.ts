// src/redux/slices/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null; // Update the type to allow null
    userId: number | null; // Update the type to allow null
}

const initialState: AuthState = {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    token: localStorage.getItem('token'),
    userId: Number(localStorage.getItem('user_id')),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        verifyAuth: (state) => {
            state.isAuthenticated = Boolean(localStorage.getItem('token'));
            state.token = localStorage.getItem('token');
            state.userId = Number(localStorage.getItem('user_id'));
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            const { token, userId } = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', userId);
            state.isAuthenticated = true;
            state.token = token;
            state.userId = Number(userId);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
        },
    },
});

export const { loginSuccess, verifyAuth, logout } = authSlice.actions;

export default authSlice.reducer;
