// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice';
import userReducer from '@/redux/slices/userSlice';
import webSocketReducer from '@/redux/slices/webSocketSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        webSocket: webSocketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
