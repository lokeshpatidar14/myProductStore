// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    logOut(state) {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, logOut } = authSlice.actions;
export default authSlice.reducer;
