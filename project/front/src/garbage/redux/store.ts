import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import chatReducer from "@redux/slices/chatSlice";

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    // ...autres reducers
});

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
