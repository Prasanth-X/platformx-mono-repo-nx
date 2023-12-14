import { FormControlLabel, Radio } from '@mui/material';
import { ThemeConstants } from '@platformx/utilities';

const RadioControlLabel = ({ value, label = '', disabled = false }) => {
  return (
    <FormControlLabel
      sx={{
        '.Platform-x-FormControlLabel-label': {
          fontSize: ThemeConstants.FONTSIZE_SM,
        },
        marginRight: '30px',
      }}
      value={value}
      control={<Radio />}
      label={label ? label : value}
      disabled={disabled}
    />
  );
};
export default RadioControlLabel;
