import EditIcon from '@mui/icons-material/Edit';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, MenuItem, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { BasicSwitch, ThemeConstants } from '@platformx/utilities';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoreDialog({
  checked,
  onChange,
  handleDelete,
  first_name,
  last_name,
  handleEditUser,
  user_id,
  action_pending,
  handleReSendMail,
  disabled = false,
}: any) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const styles = `
  .singlebr_vod {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
     
     h2.singlebr_vod{
      margin: 16px 24px;
      padding: 0;
     }`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <style>{styles}</style>

      <MoreVertIcon
        color={disabled ? 'disabled' : 'inherit'}
        onClick={() => !disabled && handleClickOpen()}
      />
      <Dialog
        sx={{
          display: { em: 'none' },
          '.Platform-x-Dialog-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '10px 10px 0 0',
            width: '100%',
            margin: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            maxWidth: '100%',
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          // className={!canDelete && 'disable'}
          sx={{ display: 'flex', flexDirection: 'column', margin: '12px' }}
          onClick={() => {
            handleClose();
            handleDelete();
          }}
        >
          <Box sx={{ margin: '12px' }}>
            <Typography variant="h4medium" color="BLACK_COLOR_VARIANT1">
              {first_name}
            </Typography>
            <Typography variant="h4medium" color="BLACK_COLOR_VARIANT1">
              {' '}
              {last_name}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
            onClick={(e) => handleEditUser(e, user_id)}
          >
            <Box className="edit-Box">
              <EditIcon />
            </Box>
            <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
              {t('edit')}
            </Box>
          </Box>

          {action_pending ? (
            <Box>
              <MenuItem
                className="icons"
                sx={{ paddingLeft: { xs: '12px' } }}
                onClick={() => handleReSendMail()}
              >
                <Box
                  sx={{
                    width: '40px',
                    display: 'flex',
                    marginRight: '10px',
                    justifyContent: 'center',
                  }}
                >
                  {' '}
                  <ForwardToInboxIcon />
                </Box>
                <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                  {t('resend_invite')}
                </Box>
              </MenuItem>
            </Box>
          ) : (
            <Box
              className="boxbasicswitch"
              sx={{ display: 'flex', alignItems: 'center', margin: '12px' }}
              onClick={() => onChange(checked)}
            >
              <BasicSwitch
                checked={checked}
                onChange={() => onChange(checked)}
                color={checked ? ThemeConstants.GREEN_COLOR : 'red'}
              />

              <Box sx={{ marginRight: '10px' }}>
                <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                  {checked ? (
                    <Typography>{t('activate')}</Typography>
                  ) : (
                    <Typography>{t('deactivate')}</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>
    </div>
  );
}
