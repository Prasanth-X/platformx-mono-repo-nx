import { Box, Radio, RadioProps, ThemeProvider, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LightTheme } from '@platformx/utilities';
import { ThemeConstants } from '@platformx/utilities';
import { InterRegular } from '@platformx/utilities';

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
export interface XRadioGroupProps {
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
}: XRadioGroupProps & RadioProps) {
  return (
    <ThemeProvider theme={LightTheme}>
      <style>{fontStyle}</style>
      <Box className={AlignmentVertical ? 'groupcolumn' : 'grouprow'}>
        <StyledFormControlLabel
          value={value}
          disabled={disabled}
          control={<Radio size={size} color={color} />}
          label={label}
          labelPlacement={labelPlacement}
        />
        <StyledFormControlLabel
          value={value}
          disabled={disabled}
          control={<Radio size={size} color={color} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      </Box>
    </ThemeProvider>
  );
}
