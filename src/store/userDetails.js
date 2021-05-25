import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id :null,
  is_admin:null,
  first_name:null,
  last_name:null,
  user_data:null,
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUserDetails : (state, action) => {
      console.log('This is from store', action.payload)
      state.user_id = action.payload.user_id;
      state.is_admin = action.payload.is_admin;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.user_data = action.payload.user_data;
    }
  },
});

export const { addUserDetails } = userDetails.actions;
export default userDetails.reducer;
