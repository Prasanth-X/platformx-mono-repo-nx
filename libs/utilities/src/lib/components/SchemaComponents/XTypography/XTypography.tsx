import { Typography, styled } from '@mui/material';
// import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';

// const fontStyle = `
// @font-face {
//   font-family: ${ThemeConstants.FONTNAMEPRIMARY};
//   src: url(${InterRegular}) format("truetype");
//   font-display: block;
// }`;

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
  | 'h4medium'
  | 'h5medium';
  TextAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  style?: unknown;
}

const StyledTypography = styled(Typography)(() => ({
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
  <>
    {/* <style>{fontStyle}</style> */}
    <StyledTypography
      variant={variant}
      align={TextAlign}
      {...rest}
    // style={style}
    >
      {label}
    </StyledTypography>
  </>
);
