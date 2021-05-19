import { configureStore } from "@reduxjs/toolkit";
import empAddUpdateSlice from "./empAddUpdate";
import vaccineAddUpdateSlice from "./vaccineAddUpdate";
import testAddUpdateSlice from "./testResult";
import isAuthenticated from "./isAuthenticated";
import _authToken from "./token";
import userData from "./userData";
const store = configureStore({
  reducer: {
    testResult: testAddUpdateSlice,
    vaccine: vaccineAddUpdateSlice,
    emp: empAddUpdateSlice,
    isAuth: isAuthenticated,
    authToken: _authToken,
    userData: userData,
  },
});

export default store;
