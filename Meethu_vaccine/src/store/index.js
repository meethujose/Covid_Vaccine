import { configureStore } from "@reduxjs/toolkit";
import empAddUpdateSlice from "./empAddUpdate";
import vaccineAddUpdateSlice from "./vaccineAddUpdate";
import testAddUpdateSlice from './testResult';
import isAuthenticated from "./isAuthenticated";
import _authToken from "./token";

const store = configureStore({
  reducer: {
    testResult: testAddUpdateSlice,
    vaccine:vaccineAddUpdateSlice,
    emp: empAddUpdateSlice,
    isAuth: isAuthenticated,
    authToken: _authToken,

  },
});

export default store;
