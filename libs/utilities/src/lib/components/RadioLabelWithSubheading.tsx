import { FormControlLabel, Radio, Typography } from '@mui/material';
import ThemeConstants from '../themes/authoring/lightTheme/lightThemeVariable';
export const RadioLabelWithSubheading = ({
  value,
  label = '',
  subTitle = '',
}: any) => {
  return (
    <>
      <FormControlLabel
        sx={{
          '.Platform-x-FormControlLabel-label': {
            fontSize: ThemeConstants.FONTSIZE_H5,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
          },
          marginRight: '30px',
        }}
        value={value}
        control={<Radio />}
        label={label}
      />
      <Typography
        variant="h6regular"
        sx={{
          color: '#5c6574',
          paddingLeft: '30px',
          display: 'block',
          marginTop: '-8px',
        }}
      >
        {subTitle}
      </Typography>
    </>
  );
};
