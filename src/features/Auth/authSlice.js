import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log('action', action.payload);
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.accessToken = null;
    }
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
