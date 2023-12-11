import { Radio, RadioProps, styled, ThemeProvider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
const InterRegular = require('../../fonts/Inter/Inter-Regular.ttf') as string;

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
