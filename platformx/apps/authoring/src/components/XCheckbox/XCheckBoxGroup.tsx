/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, RadioProps, styled, ThemeProvider } from '@mui/material';
import LightTheme from '../../theme/lightTheme';
import ThemeConstants from '../../theme/variable';
const InterRegular = require('../../fonts/Inter/Inter-Regular.ttf') as string;

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${InterRegular}) format("truetype");
  font-display: block;
}
.grouprow {
  display: inline-flex;
  flex-direction: row;
}
.groupcolumn {
  display: inline-flex;
  flex-direction: column;
}`;
export interface XCheckBoxGroupProps {
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  value?: string;
  color?:
    | 'primaryColor'
    | 'secondaryColor'
    | 'warningColor'
    | 'successColor'
    | 'errorColor';
  AlignmentVertical?: boolean;
  disabled?: boolean;
}
const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
}));
export default function XRadioGroup({
  labelPlacement,
  label,
  value,
  size,
  color,
  AlignmentVertical,
  disabled,
}: XCheckBoxGroupProps & RadioProps) {
  return (
    <ThemeProvider theme={LightTheme}>
      <style>{fontStyle}</style>
      <Box className={AlignmentVertical ? 'groupcolumn' : 'grouprow'}>
        <StyledFormControlLabel
          value={value}
          disabled={disabled}
          control={<Checkbox size={size} color={color} />}
          label={label}
          labelPlacement={labelPlacement}
        />
        <StyledFormControlLabel
          value={value}
          disabled={disabled}
          control={<Checkbox size={size} color={color} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      </Box>
    </ThemeProvider>
  );
}
