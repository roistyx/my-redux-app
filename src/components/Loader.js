import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loader({ color }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color={color} />
    </Box>
  );
}

export default Loader;
