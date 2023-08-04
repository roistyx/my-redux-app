import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  searchQuery: "",
  datesQuery: "",
  searchStatus: "idle",
  searchError: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDates: (state, action) => {
      state.datesQuery = action.payload;
    },
  },
});

export const { setSearchQuery, setDates } = searchSlice.actions;

export default searchSlice.reducer;
