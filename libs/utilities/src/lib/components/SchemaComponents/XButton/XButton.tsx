import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  ButtonProps as MuiButtonProps,
  styled
} from '@mui/material';
// import InterRegular from '../../fonts/Inter/Inter-Regular.ttf';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';
// const fontStyle = `
// @font-face {
//   font-family: ${ThemeConstants.FONTNAMEPRIMARY};
//   src: url(${InterRegular}) format("truetype");
//   font-display: block;
// }`;

// Only include variant, size, and color
type ButtonBaseProps = Pick<MuiButtonProps, 'variant'>;

export interface ButtonProps extends ButtonBaseProps {
  label?: string;
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
  loading?: boolean;
  loadingPosition?: 'start' | 'end' | 'center';
  startIcon?: boolean;
  endIcon?: boolean;
  disabled?: any;
  onClick?: any;
  className?: string;
  style?: any;
}

const StyledButton = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  position?: string;
}>(({ position }) => ({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
  '.MuiLoadingButton-loadingIndicator': {
    position: position === 'center' ? 'absolute' : 'initial',
    ...(position === 'start' && {
      paddingRight: '8px',
    }),
    ...(position === 'end' && {
      paddingLeft: '8px',
    }),
  },
}));
export const XButton = ({
  label,
  variant,
  loading = false,
  loadingPosition,
  startIcon,
  endIcon,
  disabled,
  className,
  onClick,
  style,
  ...rest
}: ButtonProps) => (
  <>
    {/* <style>{fontStyle}</style> */}
    <StyledButton
      position={loadingPosition}
      variant={variant}
      loading={loading}
      loadingPosition={loadingPosition}
      startIcon={startIcon && <SaveIcon />}
      endIcon={endIcon && <SaveIcon />}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={style}
      {...rest}
    >
      {label}
    </StyledButton>
  </>
);
