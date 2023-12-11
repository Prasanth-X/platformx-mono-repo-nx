import { Box, TextField } from "@mui/material";
import React from "react";

interface TextBoxProps {
  placeholder?: string;
}
const TextBox = ({ placeholder }: TextBoxProps) => {
  return (
    <Box>
      <TextField
        variant='filled'
        fullWidth
        placeholder={placeholder}
        inputProps={{
          style: {
            padding: 0,
            margin: "10px 20px",
            border: "none",
          },
        }}
      />
    </Box>
  );
};
export default TextBox;
