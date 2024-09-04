import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  admin :null ,
  token: localStorage.getItem("token") || null,
  adminToken:localStorage.getItem('adminToken') || null ,
};

const sanitizeEmail = (email) => {
  return email.replace(/@/g, "-at-").replace(/\./g, "-dot-");
};

// const unsanitizeEmail = (sanitizedEmail) => {
//   return sanitizedEmail.replace(/-at-/g, '@').replace(/-dot-/g, '.');
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin(state, action) {
      const {adminToken } = action.payload;
      state.adminToken = adminToken;
      localStorage.setItem("adminToken", adminToken);
    } ,
    setUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", sanitizeEmail(user.email)); 
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      state.adminToken= null; 
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); 
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      
    },
  },
});

export const { setUser, logOut, updateUser , setAdmin } = authSlice.actions;
export default authSlice.reducer;
