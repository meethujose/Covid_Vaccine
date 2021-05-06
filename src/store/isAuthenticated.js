import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const isAuthenticated = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    isAuth(state) {
      state.isAuth = !state.isAuth;
    },
  },
});

export const { isAuth } = isAuthenticated.actions;
export default isAuthenticated.reducer;
