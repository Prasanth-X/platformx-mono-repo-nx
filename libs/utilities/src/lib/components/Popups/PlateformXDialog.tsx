import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '../../assets/svg/errorPopupIcon.svg';
import DialogCloseIcon from '../../assets/svg/DialogCloseIcon.svg';
import { Box, Button, Typography, IconButton } from '@mui/material';

export default function PlateformXDialog({
  isDialogOpen,
  title,
  subTitle,
  closeButtonText,
  confirmButtonText,
  selectedItem = {},
  confirmButtonHandle,
  closeButtonHandle = () => { },
}: any) {
  return (
    <>
      <div className="deletePopupContaniner">
        <Dialog
          fullWidth={true}
          open={isDialogOpen}
          onClose={closeButtonHandle}
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
            className="popupCloseIcon"
            edge="end"
            color="inherit"
            onClick={closeButtonHandle}
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
            <img src={DeleteIcon} />
          </Box>
          {title ? (
            <DialogTitle
              id="alert-dialog-title"
              variant="h4bold"
              sx={{
                textAlign: 'center',
                padding: '19px 0 24px 0px',
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
                padding: '0px 20px 0px 20px',
                maxWidth: 420,
                margin: 'auto',
              }}
            >
              <Typography variant="h5regular">{subTitle}</Typography>
            </DialogContent>
          ) : (
            ''
          )}

          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: { xs: '10px 0', md: '61px 0 74px' },
            }}
          >
            {confirmButtonText ? (
              <Button
                variant="redbutton"
                sx={{
                  marginRight: '12px',
                  minWidth: { xs: '120px', md: '120px' },
                  minHeight: { xs: '40px', md: '47px' },
                }}
                onClick={() => {
                  closeButtonHandle();
                  confirmButtonHandle(selectedItem);
                }}
                autoFocus
              >
                {confirmButtonText}
              </Button>
            ) : (
              ''
            )}
            {closeButtonText ? (
              <Button
                variant="contained"
                sx={{
                  minWidth: { xs: '120px', md: '120px' },
                  minHeight: { xs: '40px', md: '47px' },
                }}
                onClick={() => {
                  closeButtonHandle();
                }}
              >
                {closeButtonText}
              </Button>
            ) : (
              ''
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
