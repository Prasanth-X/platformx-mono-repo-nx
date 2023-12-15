import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { ThemeConstants } from '@platformx/utilities';
import { InterRegular } from '@platformx/utilities';
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
const StyledButton = styled(LoadingButton)({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
});
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
  <StyledButton
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
);
