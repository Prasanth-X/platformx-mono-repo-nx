import { ThemeProvider, Typography, styled } from '@mui/material';
import LightTheme from '../../theme/lightTheme';
import ThemeConstants from '../../theme/variable';
const InterRegular = require('../../fonts/Inter/Inter-Regular.ttf') as string;

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${InterRegular}) format("truetype");
  font-display: block;
}`;

export interface TypographyProps {
  label: string;
  variant:
    | 'h2bold'
    | 'h2semibold'
    | 'h2regular'
    | 'h2medium'
    | 'h3bold'
    | 'h3semibold'
    | 'h3regular'
    | 'h3medium'
    | 'h4bold'
    | 'h4semibold'
    | 'h4regular'
    | 'h4medium';
  TextAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  style?: any;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
  padding: 0,
  margin: 0,
}));

export const XTypography = ({
  variant,
  label,
  TextAlign,
  style,
  ...rest
}: TypographyProps) => (
  <ThemeProvider theme={LightTheme}>
    <style>{fontStyle}</style>
    <StyledTypography
      variant={variant}
      align={TextAlign}
      {...rest}
      style={style}
    >
      {label}
    </StyledTypography>
  </ThemeProvider>
);
