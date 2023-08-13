import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import searchReducer from "../features/Search/searchSlice";
import newsReducer from "../features/News/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    news: newsReducer,
  },
});
