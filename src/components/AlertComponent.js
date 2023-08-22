import React from "react";
import Alert from "@mui/material/Alert";

function AlertComponent({ severity, children }) {
  return <Alert severity={severity}>{children}</Alert>;
}

export default AlertComponent;
