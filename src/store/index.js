import { configureStore } from "@reduxjs/toolkit";
import empAddUpdateSlice from "./empAddUpdate";
import isAuthenticated from "./isAuthenticated";

const store = configureStore({
  reducer: {
    emp: empAddUpdateSlice,
    isAuth: isAuthenticated,
  },
});

export default store;
