import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
} from '@mui/material';
import FormatSubtitle from '../../Modal/FormatSubtitle';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Success from '../../../assets/svg/successPopupIcon.svg';
import DialogCloseIcon from '../../../assets/svg/DialogCloseIcon.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function LoadingTextModal({
  isDialogOpen,
  subTitle,
  successText,
  changeDialogState,
  closeButtonHandle,
}) {
  const { t } = useTranslation();
  const [loadingState, setLoadingState] = useState('pending');
  const [dialogState, setDialogState] = useState(isDialogOpen);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoadingState('success');
      // setTimeout(() => {
      //   setDialogState(false);
      //   changeDialogState(false);
      // },4000);
    }, 6000);
  }, []);
  return (
    <div>
      <Dialog
        fullWidth
        open={dialogState}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.Platform-x-Paper-root': {
            padding: '25px !important',
          },
          '.Platform-x-Box-root': {
            margin: '5px',
          },
          '.Platform-x-DialogContent-root': {
            overflowY: 'hidden !important',
          },
          '.Platform-x-DialogActions-root': {
            margin: '0 !important',
          },
          '.Platform-x-Dialog-paper': {
            maxWidth: { xs: '100%', sm: '600px', lg: '650px' },
            width: { xs: '100%', sm: '600px', lg: '650px' },
            margin: { xs: '0px' },
            position: { xs: 'absolute', md: 'relative' },
            bottom: { xs: 0 },
            borderBottomLeftRadius: { xs: 0, md: 4 },
            borderBottomRightRadius: { xs: 0, md: 4 },
            '& .popupCloseIcon': {
              position: 'absolute',
              right: '20px',
              top: '10px',
            }
          },
          textAlign: 'center',
        }}
      >
        <IconButton
          className='popupCloseIcon'
          edge="end"
          color="inherit"
          onClick={closeButtonHandle}
          aria-label="close"
        >
          <img src={DialogCloseIcon} />
        </IconButton>
        <Box mt={2}>
          {loadingState == 'pending' ? (
            <CircularProgress color='inherit' />
          ) : (
            <img src={Success} />
          )}
        </Box>
        {subTitle ? (
          <DialogContent
            sx={{
              textAlign: 'center',
              padding: '10px 20px 20px 20px',
            }}
          >
            <Typography
              variant='h5semibold'
              sx={{
                '&:first-letter': {
                  textTransform: 'capitalize',
                },
              }}
            >
              <FormatSubtitle
                text={loadingState == 'pending' ? subTitle : successText}
              ></FormatSubtitle>
            </Typography>
          </DialogContent>
        ) : (
          ''
        )}
        {loadingState == 'success' && (
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: { xs: '10px 0', md: '61px 0 74px' },
              paddingBottom: {md: '30px'}
            }}
          >
            <Button
              variant='contained'
              sx={{
                marginRight: '12px',
                minWidth: { xs: '120px', md: '120px' },
                minHeight: { xs: '40px', md: '47px' },
              }}
              onClick={() => {
                navigate('/page-list');
              }}
            >
              {t('go_to_listing')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
