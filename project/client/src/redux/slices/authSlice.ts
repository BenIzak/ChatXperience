// src/redux/slices/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
}

const initialState: AuthState = {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        verifyAuth: (state) => {
            state.isAuthenticated = Boolean(localStorage.getItem('token'));
        },
        setUser: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user_id', action.payload.id);
            localStorage.setItem('user_name', action.payload.name);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_name')
            localStorage.removeItem('currentChat')
        },
    },
});

export const { setUser, verifyAuth, logout } = authSlice.actions;

export default authSlice.reducer;
