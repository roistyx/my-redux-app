import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import searchReducer from "../features/Search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});
