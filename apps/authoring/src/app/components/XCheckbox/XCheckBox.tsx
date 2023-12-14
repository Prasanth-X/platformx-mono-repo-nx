import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/system';
import { LightTheme } from '@platformx/utilities';
import { ThemeConstants } from '@platformx/utilities';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { InterRegular } from '@platformx/utilities';

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${InterRegular}) format("truetype");
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
}

export default function XCheckBox({
  labelPlacement,
  // variant,
  label,
  value,
  size,
  color,
}: XCheckBoxProps) {
  return (
    <ThemeProvider theme={LightTheme}>
      <style>{fontStyle}</style>
      <FormControlLabel
        value={value}
        control={<Checkbox size={size} color={color} />}
        // variant="outlined"
        label={label}
        labelPlacement={labelPlacement}
      />
    </ThemeProvider>
  );
}
