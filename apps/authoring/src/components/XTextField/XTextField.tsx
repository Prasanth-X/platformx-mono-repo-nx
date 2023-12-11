import React from 'react';
import { TextField, styled, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';

interface TextBoxProps {
  maxLength?: number;
  error?: boolean;
  isDisabled?: boolean;
  variant: 'outlined' | 'filled';
  labelSize?: 'small' | 'medium';
  placeholder?: string;
}

export const XTextField = ({
  maxLength,
  error,
  isDisabled,
  variant,
  labelSize = 'small',
  placeholder = 'Write your text here',
}: TextBoxProps) => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <TextField
        placeholder={placeholder}
        variant={variant}
        size={labelSize}
        className="titlefield"
        error={error}
        disabled={isDisabled}
        inputProps={{ maxLength }}
      />
    </ThemeProvider>
  );
};
export default XTextField;
