import React from "react";
import "./TextField.css";
import SearchIcon from "@mui/icons-material/Search";
import chroma from "chroma-js";

const TextField = ({
  label,
  onKeyDown,
  textTransform,
  backgroundColor,
  fontColor,
  spacing,
}) => {
  const tintedColor = chroma(backgroundColor).brighten(1).hex();
  const style = {
    ...(textTransform ? { "--text-transform": textTransform } : {}),
    ...(backgroundColor ? { "--background-color": backgroundColor } : {}),
    ...(backgroundColor ? { "--input-bg": tintedColor } : {}),
    ...(fontColor ? { "--font-color": fontColor } : {}),
    ...(spacing ? { "--spacing": spacing } : {}),
  };
  console.log(tintedColor);
  return (
    <div className="text-field" style={style}>
      <SearchIcon style={{ color: tintedColor }} />
      <input onKeyDown={onKeyDown} type="text" placeholder={label} />
    </div>
  );
};

export default TextField;
