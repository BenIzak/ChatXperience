import { User } from '@/api';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userDetails: User | null;
}

const initialState: UserState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.userDetails = action.payload;
    },
},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;