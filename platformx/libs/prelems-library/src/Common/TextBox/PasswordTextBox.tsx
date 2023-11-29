import { TextField } from "@mui/material";
import React from "react";
import "./TextBox.css";

const PasswordTextBox = ({ name, label, cssClass }: any) => {
  return (
    <TextField
      name={name}
      fullWidth
      label={label}
      type='password'
      className={`custom-textbox password-textbox ${cssClass}`}
      required
      variant='filled'
    />
  );
};
export default PasswordTextBox;
