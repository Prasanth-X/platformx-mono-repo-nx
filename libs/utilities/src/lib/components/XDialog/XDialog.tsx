import { IconButton, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import DialogCloseIcon from '../../assets/svg/DialogCloseIcon.svg'
import FormatSubtitle from './FormatSubtitle'
import {
  XDialogActions,
  XDialogButton,
  XDialogContent,
  XDialogImageContainer,
} from './XDialog.styles'
// import { XDialogProps } from './XDialog.types'

const XDialog = ({
  handleClose,
  handleConfirm,
  open,
  title,
  subTitle,
  subTitle2,
  imageIcon,
  leftButtonText,
  rightButtonText,
}: any) => {
  const dispatch = useDispatch()
  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            justifyContent: 'center',
            paddingBottom: '30px',
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
            },
          },
          textAlign: 'center',
        }}
      >
        <IconButton
          className='popupCloseIcon'
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <img src={DialogCloseIcon} />
        </IconButton>
        <XDialogImageContainer>
          <img src={imageIcon} />
        </XDialogImageContainer>
        {title && (
          <DialogTitle
            id='alert-dialog-title'
            variant='h4bold'
            width={'auto'}
            sx={{
              textAlign: 'center',
              padding: '19px 0 24px 0px',
            }}
          >
            {title}
          </DialogTitle>
        )}
        {subTitle && (
          <XDialogContent sx={{ paddingBottom: '0px', paddingTop: '0px' }}>
            <Typography variant='h5regular' width={'auto'}>
              <FormatSubtitle text={subTitle}></FormatSubtitle>
            </Typography>
          </XDialogContent>
        )}

        {subTitle2 && (
          <XDialogContent sx={{ paddingTop: '0px', paddingBottom: '0px', }}>
            <Typography variant='h5regular' width={'auto'}>
              <FormatSubtitle text={subTitle2}></FormatSubtitle>
            </Typography>
          </XDialogContent>
        )}

        <XDialogActions>
          <XDialogButton
            variant='outlined'
            sx={{
              marginRight: '12px',
            }}
            onClick={() => {
              if (handleClose) handleClose();
            }}
          >
            {leftButtonText}
          </XDialogButton>

          <XDialogButton
            variant='contained'
            onClick={() => {
              if (handleConfirm && handleClose) {
                handleConfirm();
                handleClose();
              }
            }}
            autoFocus
          >
            {rightButtonText}
          </XDialogButton>
        </XDialogActions>
      </Dialog>
    </div>
  )
}
export default memo(XDialog)
