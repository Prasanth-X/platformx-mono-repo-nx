import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Success from '../../assets/images/icons/successIcon.svg';
import WarningIcon from '../../assets/svg/warningIcon.svg';
import DialogCloseIcon from '../../assets/svg/DialogCloseIcon.svg';
import FormatSubtitle from './FormatSubtitle';
import { DialogList } from './uitls/dialogTypes';

export default function PlateformXDialog({
  disableConfirmButton = false,
  isDialogOpen,
  title,
  subTitle,
  closeButtonText,
  confirmButtonText,
  closeButtonHandle,
  confirmButtonHandle,
  crossButtonHandle,
  closeIcon,
  modalType,
  pageUrl,
  type = 'page',
  isCreateUser = false,
}: DialogList) {
  const navigate = useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl != undefined ? pageUrl : '');
  };
  const viewButtonHandle = () => {
    if (modalType == 'publish') {
      window.open(pageUrl, '_blank');
    }
    if (modalType == 'save') {
      navigate('/preview-page/desktop');
    }
    // if (modalType == 'draft') {
    //   navigate('/vod-preview');
    // }
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={modalType ? crossButtonHandle : closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.Platform-x-Paper-root': {
            padding: '25px !important',
          },
          '.Platform-x-Box-root': {
            margin: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.Platform-x-DialogContent-root': {
            overflowY: 'hidden !important',
          },
          '.Platform-x-DialogActions-root': {
            margin: '20px 0 0 0 !important',
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
        {/* {modalType == 'unsavedChanges' ? (
          <Box
            sx={{ textAlign: 'right', cursor: 'pointer' }}
            mt={1}
            mr={3}
            onClick={
              modalType == 'unsavedChanges'
                ? crossButtonHandle
                : closeButtonHandle
            }
          >
            {!isCreateUser && <CloseIcon />}
          </Box>
        ) : (
          ''
        )} */}
        <IconButton
          className='popupCloseIcon'
          edge="end"
          color="inherit"
          onClick={modalType == 'unsavedChanges'? crossButtonHandle : closeButtonHandle}
          aria-label="close"
        >
          <img src={DialogCloseIcon} />
        </IconButton>
        <Box
          sx={{
            textAlign: 'center',
            color: '#fd0c0d',
            margin: { xs: 0, md: '71px 0 4px' },
            height: '120px',
          }}
        >
          <img src={modalType === 'publish' || modalType === 'draft' ? Success : WarningIcon} />
        </Box>
        {title ? (
          <DialogTitle
            id='alert-dialog-title'
            variant='h4bold'
            sx={{
              textAlign: 'center',
              padding: modalType ? '0px 0px' : '16px 24px',
              paddingTop: modalType === 'unsavedWarning' ? '50px' : '0px',
              textTransform: 'capitalize',
              paddingBottom: '24px',
            }}
          >
            {title}
          </DialogTitle>
        ) : (
          ''
        )}
        {subTitle ? (
          <DialogContent
            sx={{
              textAlign: 'center',
              padding: '0px 20px',
            }}
          >
            <Typography
              variant='h5regular'
              sx={{
                '&:first-letter': {
                  textTransform: 'capitalize',
                },
              }}
            >
              <FormatSubtitle text={subTitle}></FormatSubtitle>
            </Typography>
          </DialogContent>
        ) : (
          ''
        )}
        {pageUrl ? (
          <Box sx={{ textAlign: 'center' }} mb={3}>
            <TextField
              autoFocus
              defaultValue={pageUrl}
              placeholder='Example: About Us'
              margin='dense'
              id='name'
              type='text'
              variant='standard'
              autoComplete='off'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleCopy}>
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
                '.Platform-x-FormControl-root': {
                  marginTop: '0px',
                },
                width: '65%',
                marginTop: '20px',
              }}
            />
          </Box>
        ) : (
          ''
        )}
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '30px',
          }}
        >
          {closeButtonText ? (
            <Button
              variant='outlined'
              sx={{
                marginRight: '12px',
                textTransform: 'capitalize',
              }}
              onClick={
                modalType == 'save' || modalType == 'publish' /* ||
                modalType == 'draft'*/
                  ? viewButtonHandle
                  : closeButtonHandle
              }
            >
              {closeButtonText}
            </Button>
          ) : (
            ''
          )}
          {confirmButtonText ? (
            <Button
              type='button'
              disabled={disableConfirmButton}
              variant='contained'
              onClick={confirmButtonHandle}
              autoFocus
              sx={{
                textTransform: 'capitalize',
              }}
            >
              {confirmButtonText}
            </Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
