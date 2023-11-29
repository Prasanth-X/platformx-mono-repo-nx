import LoadingButton from '@mui/lab/LoadingButton';
import {
  ButtonProps as MuiButtonProps,
  ThemeProvider,
  styled,
} from '@mui/material';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ThemeConstants from '../../theme/variable';
import LightTheme from '../../theme/lightTheme';
import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${InterRegular}) format("truetype");
  font-display: block;
}`;

// Only include variant, size, and color
type ButtonBaseProps = Pick<MuiButtonProps, 'variant'>;

export interface ButtonProps extends ButtonBaseProps {
  variant:
    | 'primaryButton'
    | 'secondaryButton'
    | 'tertiaryButton'
    | 'quaternaryButton'
    | 'quaternaryButtonOutline'
    | 'quinaryButton'
    | 'textButton'
    | 'warningButton'
    | 'warningButtonOutline'
    | 'errorButton'
    | 'errorButtonOutline'
    | 'successButton'
    | 'successButtonOutline';
  startIcon: any;
  disabled?: any;
  onClick?: any;
  className?: string;
  style?: any;
}
const StyledXIconButton = styled(LoadingButton)({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
  '&.onlyIconButton': {
    minWidth: 'auto',
    padding: '12px',
    '& span': {
      margin: 0,
    },
  },
});
export const XIconButton = ({
  variant,
  startIcon,
  disabled,
  className,
  onClick,
  style,
  ...rest
}: ButtonProps) => (
  <ThemeProvider theme={LightTheme}>
    <style>{fontStyle}</style>
    <StyledXIconButton
      variant={variant}
      startIcon={startIcon}
      disabled={disabled}
      onClick={onClick}
      className={`${className} onlyIconButton`}
      style={style}
      {...rest}
    />
  </ThemeProvider>
);
