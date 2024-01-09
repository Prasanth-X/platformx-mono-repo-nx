import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCustomStyle } from './AcceptRejectButton.styles';
import { ADMIN_ACTIONS_BUTTON } from './Utils/constant';
export default function AcceptRejectButton({
  variant,
  onClick = () => {},
}: any) {
  const classes = useCustomStyle();
  const { t } = useTranslation();
  return (
    <Button
      className={`${classes.acceptRejectButtonWrapper} acceptRejectButton`}
      variant={
        variant === ADMIN_ACTIONS_BUTTON.SUCCESS
          ? 'successButtonOutline'
          : 'redbutton'
      }
      color={variant}
      startIcon={
        variant === ADMIN_ACTIONS_BUTTON.SUCCESS ? (
          <DoneRoundedIcon className="buttonIcon" color="success" />
        ) : (
          <CloseRoundedIcon className="buttonIcon" color="error" />
        )
      }
      onClick={onClick}
    >
      <Typography className="buttonText" variant="p4medium">
        {variant === ADMIN_ACTIONS_BUTTON.SUCCESS
          ? t(ADMIN_ACTIONS_BUTTON.APPROVE)
          : t(ADMIN_ACTIONS_BUTTON.REJECT)}
      </Typography>
    </Button>
  );
}
