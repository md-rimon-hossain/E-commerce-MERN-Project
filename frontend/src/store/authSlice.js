import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUserData: null,
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.loginUserData = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.loginUserData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
