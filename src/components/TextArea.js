import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import _, { replace } from "lodash";

export default function MaxHeightTextarea({
  defaultValue,
  placeholder,
  maxRows,
  ariaLabel,
  width,
  onChange,
}) {
  // console.log(cleanedText);

  // const searchText =
  //   "The retail giant’s customers can now seamlessly incorporate their favorite Starbucks items into their Drive-Up orders,";
  // const largeText = cleanedText;

  // function removeBeforeAndKeepAfter(searchText, largeText) {
  //   const index = largeText.indexOf(searchText);

  //   if (index !== -1) {
  //     return largeText.substring(index + searchText.length);
  //   } else {
  //     return "Search text not found!";
  //   }
  // }

  // console.log(removeBeforeAndKeepAfter(searchText, largeText));

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 500px;
    resize: vertical;
    font-family: arial;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <StyledTextarea
      maxRows={maxRows}
      aria-label={ariaLabel}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
