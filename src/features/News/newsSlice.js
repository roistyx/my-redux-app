import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: "",
  error: false,
};

export const newsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNews, setError } = newsSlice.actions;

export default newsSlice.reducer;
