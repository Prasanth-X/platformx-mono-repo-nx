import React from 'react';
import { TextField } from '@mui/material';

export interface TextBoxProps {
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
    <TextField
      placeholder={placeholder}
      variant={variant}
      size={labelSize}
      className='titlefield'
      error={error}
      disabled={isDisabled}
      inputProps={{ maxLength }}
    />
  );
};
export default XTextField;
