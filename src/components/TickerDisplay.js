import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Between } from "../layouts/Line.js";
import chroma from "chroma-js";
import "./TickerDisplay.css";

function TickerDisplay({ style: { backgroundColor } }) {
  const tintedColor = chroma(backgroundColor).brighten(1).hex();
  console.log(backgroundColor, tintedColor);

  const style = {
    ...(backgroundColor ? { "--background-color": tintedColor } : {}),
  };
  const { stockData } = useSelector((state) => state.search);
  function price() {
    return Number.parseFloat(stockData.regularMarketChangePercent).toFixed(2);
  }
  return (
    <div style={style} className="ticker">
      <h1>{stockData.displayName}</h1>
      <h2>{stockData.regularMarketPrice}</h2>
      <h3>{price()}%</h3>
    </div>
  );
}

export default TickerDisplay;
