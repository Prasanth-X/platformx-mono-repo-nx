import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
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
  Icon: any;
  disabled?: boolean;
  onClick?: any;
  className?: string;
  style?: any;
}
const StyledXHoverTextButton = styled(LoadingButton)({
  fontFamily: ThemeConstants.FONTNAMEPRIMARY,
  '&.onhoverbutton': {
    minWidth: 'auto',
    transition: 'width 2s',
    padding: '12px',
    display: 'flex',
    '& span': {
      margin: 0,
    },
    '& .buttonLabel': {
      transition: 'width 2s',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 0,
      marginLeft: 0,
    },
    '&:hover .buttonLabel': {
      width: 'auto',
      transition: 'width 2s',
      marginLeft: '8px',
      marginRight: '8px',
    },
  },
});
export const XHoverTextButton = ({
  label,
  variant,
  Icon,
  disabled,
  className,
  onClick,
  style,
  ...rest
}: ButtonProps) => (
  <>
    {/* <style>{fontStyle}</style> */}
    <StyledXHoverTextButton
      variant={variant}
      startIcon={Icon}
      disabled={disabled}
      onClick={onClick}
      className={`${className} onhoverbutton`}
      style={style}
      {...rest}
    >
      <Box className='buttonLabel'>{label}</Box>
    </StyledXHoverTextButton>
  </>
);
