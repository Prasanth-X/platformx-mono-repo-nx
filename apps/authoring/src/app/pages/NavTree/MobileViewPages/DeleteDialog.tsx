import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIconImage from '../../../assets/images/icons/delete.gif';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function DeleteDialog({
  isDeleteOpen,
  setIsDeleteOpen,
  name,
  setIsOpen,
  handleDeleteMenu,
}) {
  const { t } = useTranslation();
  const handleClose = () => {
    setIsDeleteOpen(false);
  };

  const styles = {
    btn_new_size: {
      minWidth: '158px',
      minHeight: '40px',
    },
  };
  return (
    <div>
      <Dialog
        sx={{
          display: { sm: 'none' },
          '.Platform-x-Dialog-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '10px 10px 0 0',
            width: '100%',
            margin: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        open={isDeleteOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <Box
          sx={{
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ textAlign: 'center', marginTop: '7px' }}>
            <img src={DeleteIconImage} />
          </Box>
          <DialogTitle
            variant='h2medium'
            sx={{
              textAlign: 'center',
              padding: '0px 0px 15px 0px',
            }}
          >
            {t('delete_title')}
          </DialogTitle>
          <Box
            sx={{
              mt: '15px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 8px',
            }}
          >
            <Typography variant='h5regular'>
              {t('article_delete_subtitle')}
            </Typography>
          </Box>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '22px 0 12px',
            }}
          >
            <Button
              variant='contained'
              style={styles.btn_new_size}
              sx={{
                marginRight: '10px',
              }}
              startIcon={<CloseIcon />}
              onClick={() => {
                setIsOpen(true);
                handleClose();
              }}
            >
              {t('no_keep_it')}
            </Button>

            <Button
              variant='redbutton'
              style={styles.btn_new_size}
              startIcon={<DoneIcon />}
              onClick={() => {
                handleDeleteMenu();
                handleClose();
              }}
              autoFocus
            >
              {t('yes_delete_it')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
