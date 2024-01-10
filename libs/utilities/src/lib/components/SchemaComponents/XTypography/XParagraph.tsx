import { Typography, styled } from '@mui/material';
import ThemeConstants from '../../../themes/authoring/variable';
// import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';
// import ThemeConstants from '../../theme/variable';

// const fontStyle = `
// @font-face {
//   font-family: ${ThemeConstants.FONTNAMEPRIMARY};
//   src: url(${InterRegular}) format("truetype");
//   font-display: block;
// }`;

export interface ParagraphProps {
  label: string;
  variant:
  | 'p2bold'
  | 'p2semibold'
  | 'p2medium'
  | 'p2regular'
  | 'p3bold'
  | 'p3semibold'
  | 'p3medium'
  | 'p3regular'
  | 'p4bold'
  | 'p4semibold'
  | 'p4medium'
  | 'p4regular';
  TextAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  style?: any;
}

const StyledParagraph = styled(Typography)(({ theme }) => ({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
  padding: 0,
  margin: 0,
}));

export const XParagraph = ({
  variant,
  label,
  TextAlign,
  style,
  ...rest
}: ParagraphProps) => (
  <>
    {/* <style>{fontStyle}</style> */}
    <StyledParagraph
      variant={variant}
      align={TextAlign}
      {...rest}
      style={style}
    >
      {label}
    </StyledParagraph>
  </>
);
