import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

export default function BasicDateRangeField({ onChange }) {
  // const handleChange = (event) => {
  //   console.log(event[0].$y);
  // };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["MultiInputDateRangeField", "SingleInputDateRangeField"]}>
        <SingleInputDateRangeField
          type="text"
          onChange={onChange}
          label="Start - End"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
