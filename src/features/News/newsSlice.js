import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: "",
};

export const newsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
