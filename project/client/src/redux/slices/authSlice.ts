// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
}

const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userId', action.payload.toString());
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export const { setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
