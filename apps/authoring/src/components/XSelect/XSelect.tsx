import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';

interface SelectProps {
  variant: 'outlined' | 'filled';
  size: 'medium' | 'small';
}

export const XSelect = ({ variant, size }: SelectProps) => {
  return (
    <ThemeProvider theme={LightTheme}>
      <FormControl
        variant={variant}
        style={{
          width: '-webkit-fill-available',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          paddingTop: '4px',
        }}
      >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          size={size}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={10}>Ten Ten Ten</MenuItem>
          <MenuItem value={20}>Twenty Ten Ten</MenuItem>
          <MenuItem value={30}>Thirty Ten Ten</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};
export default XSelect;
