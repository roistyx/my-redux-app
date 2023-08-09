import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  symbol: "",
  datesQuery: "",
  searchStatus: "idle",
  searchError: null,
  stockData: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setStockData: (state, action) => {
      state.stockData = action.payload;
    },
    setDates: (state, action) => {
      state.datesQuery = action.payload;
    },
  },
});

export const { setSearchSymbol, setDates, setStockData } = searchSlice.actions;

export default searchSlice.reducer;
