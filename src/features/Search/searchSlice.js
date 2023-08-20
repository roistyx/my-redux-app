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
      localStorage.setItem("stockData", JSON.stringify(action.payload));
      state.stockData = action.payload;
    },
    setDates: (state, action) => {
      state.datesQuery = action.payload;
    },
    setClearStockData: (state) => {
      localStorage.removeItem("stockData");
      state.stockData = [];
    },
  },
});

export const { setSearchSymbol, setDates, setStockData, setClearStockData } =
  searchSlice.actions;

export default searchSlice.reducer;
