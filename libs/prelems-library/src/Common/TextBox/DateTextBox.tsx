import { TextField } from "@mui/material";
import React from "react";
import "./TextBox.css";

const DateTextBox = ({
  name,
  label,
  required,
  parentHandler,
  helperText,
  error,
  value,
  cssClass,
  isDisabled,
}: any) => {
  const handleChange = (e: any) => {
    parentHandler(e.target);
  };

  return (
    <TextField
      name={name}
      fullWidth
      label={label}
      disabled={isDisabled ? true : false}
      type='date'
      required={required ? true : false}
      onChange={handleChange}
      helperText={helperText}
      error={error}
      value={value}
      className={`custom-textbox date-textbox ${cssClass}`}
      variant='filled'
    />
  );
};
export default DateTextBox;
