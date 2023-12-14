import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ErrorTooltip } from '../../../../components/Common/ErrorTooltip';
import Icons from '../../../../components/Icons';

type HeadButtonProps = {
  variant: any;
  icon?: any;
  onclickHandler: () => void;
  canAccess: boolean;
  isDisabled: boolean;
  text: string;
  iconType?: string;
};
export const HeadButton = ({
  variant,
  canAccess,
  icon: Icon,
  isDisabled,
  onclickHandler,
  text,
  iconType = 'save',
}: HeadButtonProps) => {
  const theme = useTheme();
  const less_than_600 = useMediaQuery(theme.breakpoints.down('sm'));
  const getBreakPoint = () => {
    return less_than_600;
  };
  return (
    <ErrorTooltip
      component={
        getBreakPoint() ? (
          <Icons
            nameIcon={iconType}
            enable={canAccess ? !isDisabled : canAccess}
            styleObject={{
              color: isDisabled ? '#cccccc' : '#2d2d39',
              pointerEvents: isDisabled ? 'none' : '',
              borderRadius: 0,
            }}
            listIndx={iconType}
            handleClick={onclickHandler}
          />
        ) : (
          <Button
            variant={variant}
            // startIcon={<Icon />}
            className="sm"
            // sx={{
            //   '&:disabled': {
            //     color: '#89909a',
            //     backgroundColor: variant == 'contained' ? '#e6eaed' : '',
            //   },
            //   fontSize: '12px !important',
            // }}
            onClick={() => onclickHandler()}
            disabled={canAccess ? isDisabled : !canAccess}
          >
            {text}
          </Button>
        )
      }
      doAccess={!canAccess}
    />
  );
};
