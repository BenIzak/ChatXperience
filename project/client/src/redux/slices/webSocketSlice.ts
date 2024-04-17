// src/redux/slices/webSocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState: {
        isConnected: false,
        isConnecting: false,
        error: null,
    },
    reducers: {
        connectStart: state => {
            state.isConnecting = true;
        },
        connectSuccess: state => {
            state.isConnected = true;
            state.isConnecting = false;
            state.error = null;
        },
        connectFailure: (state, action) => {
            state.isConnected = false;
            state.isConnecting = false;
            state.error = action.payload;
        },
        disconnect: state => {
            state.isConnected = false;
            state.isConnecting = false;
            state.error = null;
        }
    }
});

export const { connectStart, connectSuccess, connectFailure, disconnect } = webSocketSlice.actions;

export default webSocketSlice.reducer;
