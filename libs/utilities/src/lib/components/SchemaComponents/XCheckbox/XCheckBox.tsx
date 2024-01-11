import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${"InterRegular"}) format("truetype");
  font-display: block;
}`;
export interface XCheckBoxProps {
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  size?: 'small' | 'medium';
  label?: string;
  value?: string;
  color?:
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'default';
  handleChange?: any;
  checked?: boolean;
  name?: string;
}

export default function XCheckBox({
  labelPlacement,
  // variant,
  label,
  value,
  size,
  color,
  handleChange,
  checked = false,
  name,
}: XCheckBoxProps) {
  return (
    <>
      <style>{fontStyle}</style>
      <FormControlLabel
        value={value}
        control={<Checkbox size={size}
          color={color}
          onChange={handleChange}
          checked={checked}
          name={name} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    </>
  );
}
