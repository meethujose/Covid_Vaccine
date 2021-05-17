import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
};

const _authToken = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    authToken(state,action) {
      state.authToken = action.payload;
      
    },
  },
});

export const { authToken } = _authToken.actions;
export default _authToken.reducer;