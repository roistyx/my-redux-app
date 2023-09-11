import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClearStockData } from "../features/Search/searchSlice.js";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Between } from "../layouts/Line.js";
import chroma from "chroma-js";
import "./TickerDisplay.css";

function TickerDisplay({ style: { backgroundColor } }) {
  const dispatch = useDispatch();

  const tintedColor = chroma(backgroundColor).brighten(1).hex();

  const style = {
    ...(backgroundColor ? { "--background-color": tintedColor } : {}),
  };
  const { stockData } = useSelector((state) => state.search);
  function price() {
    return Number.parseFloat(stockData.previousClose).toFixed(2);
  }

  const handleClearStockData = (e) => {
    e.preventDefault();
    dispatch(setClearStockData());
  };

  return (
    <div style={style} className="ticker">
      <h1>{stockData.company_name}</h1>
      <h2>{"$" + stockData.previous_close}</h2>
      {/* <h3>{price()}%</h3> */}
      <IconButton
        aria-label="clear"
        color="primary"
        onClick={handleClearStockData}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default TickerDisplay;
