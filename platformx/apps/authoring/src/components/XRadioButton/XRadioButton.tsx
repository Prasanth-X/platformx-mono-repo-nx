import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio, RadioProps, styled, ThemeProvider } from '@mui/material';
import LightTheme from '../../theme/lightTheme';
import ThemeConstants from '../../theme/variable';
import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${InterRegular}) format("truetype");
  font-display: block;
}`;
export interface XRadioProps {
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
  disabled?: boolean;
}
const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
}));
export default function XRadioButton({
  labelPlacement,
  label,
  value,
  size,
  color,
  disabled,
}: XRadioProps & RadioProps) {
  return (
    <ThemeProvider theme={LightTheme}>
      <style>{fontStyle}</style>
      <StyledFormControlLabel
        value={value}
        disabled={disabled}
        control={<Radio size={size} color={color} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    </ThemeProvider>
  );
}
