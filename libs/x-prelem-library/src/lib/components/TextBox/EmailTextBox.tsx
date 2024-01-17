import { TextField } from "@mui/material";
import React from "react";
import "./TextBox.css";

const EmailTextBox = ({
  name,
  label,
  required,
  handleChange,
  helperText,
  error,
  value,
  cssClass,
}: any) => {
  return (
    <TextField
      name={name}
      fullWidth
      type='email'
      label={label}
      error={error}
      value={value}
      variant='outlined'
      helperText={helperText}
      required={required ? true : false}
      onChange={handleChange}
      className={`custom-textbox email-textbox ${cssClass}`}
    />
  );
};
export default EmailTextBox;
