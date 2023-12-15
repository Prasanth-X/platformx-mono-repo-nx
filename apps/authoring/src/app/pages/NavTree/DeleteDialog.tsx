import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/images/icons/delete.gif';
import { Store } from '../../store/ContextStore';

export default function DeleteDialog({
  handleListClose,
  handleDeleteMenu,
  isDeleteDialog,
  setisdeleteDialog,
  title,
  subTitle,
}) {
  const { t } = useTranslation();
  const { state } = useContext(Store);
  const { page } = state;
  const navigate = useNavigate();
  const onHandleClose = () => {
    setisdeleteDialog(false);
  };
  const styles = {
    btn_new_size: {
      minWidth: '190px',
      minHeight: '50px',
    },
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={isDeleteDialog}
        onClose={onHandleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.Platform-x-Dialog-paper': {
            maxWidth: { xs: '800px', xl: '800px' },
          },
          textAlign: 'center',
        }}
      >
        <Box
          sx={{ textAlign: 'center', color: '#fd0c0d', margin: '71px 0 4px' }}
        >
          <img src={DeleteIcon} />
        </Box>
        {title ?
          <DialogTitle
            id='alert-dialog-title'
            variant='h2medium'
            sx={{
              textAlign: 'center',
              padding: '0px 0px 23px 0px',
            }}
          >
            {title}
          </DialogTitle>
         :
          ''}
        {subTitle ?
          <DialogContent
            sx={{
              textAlign: 'center',
              padding: '10px 20px',
              maxWidth: 420,
              margin: 'auto',
            }}
          >
            <Typography variant='h5regular'>{subTitle}</Typography>
          </DialogContent>
         :
          ''}

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '61px 0 74px',
          }}
        >
          <Button
            variant='contained'
            style={styles.btn_new_size}
            sx={{
              marginRight: '12px',
            }}
            startIcon={<CloseIcon />}
            onClick={onHandleClose}
          >
            {t('no_keep_it')}
          </Button>

          <Button
            variant='redbutton'
            style={styles.btn_new_size}
            startIcon={<DoneIcon />}
            onClick={() => {
              handleDeleteMenu();
              onHandleClose();
            }}
            autoFocus
          >
            {t('yes_delete_it')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
