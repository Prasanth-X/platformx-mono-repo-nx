import { createTheme } from '@mui/material/styles';
import ThemeConstants from './prelemVariableLight';

const PrelemTheme = createTheme({
  palette: {
    primary: {
      main: ThemeConstants.PRIMARY_MAIN_COLOR,
    },
    secondary: {
      main: ThemeConstants.SECONDARY_MAIN_COLOR,
    },
    common: {
      white: ThemeConstants.WHITE_COLOR,
      black: ThemeConstants.BLACK_COLOR,
      // ... other color constants
    },
  },
  components: {
    // Example overrides for specific components
    MuiButton: {
      styleOverrides: {
        root: {
          color: ThemeConstants.WHITE_COLOR, // Example: use WHITE_COLOR constant
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: ThemeConstants.BLACK_COLOR, // Example: use BLACK_COLOR constant
        },
      },
    },
  },
});

export default PrelemTheme;
