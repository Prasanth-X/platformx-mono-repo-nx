import { Radio, RadioProps, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
// import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${"InterRegular"}) format("truetype");
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
    <>
      <style>{fontStyle}</style>
      <StyledFormControlLabel
        value={value}
        disabled={disabled}
        control={<Radio size={size} color={color} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    </>
  );
}
