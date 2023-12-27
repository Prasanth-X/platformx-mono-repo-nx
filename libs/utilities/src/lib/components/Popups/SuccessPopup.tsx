/* eslint-disable */
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/images/icons/righttick.svg';

export default function PlateformXDialogSuccess({
  isDialogOpen,
  title,
  subTitle,
  closeButtonText,
  confirmButtonText,
  closeButtonHandle,
  confirmButtonHandle,
}) {
  const navigate = useNavigate();
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
            },
            '.Platform-x-DialogContent-root': {
              overflowY: 'hidden !important',
            },
            '.Platform-x-DialogActions-root': {
              margin: '20px 0 0 0 !important',
            },
            '.Platform-x-Dialog-paper': {
              maxWidth: { xs: '100%', sm: '700px', lg: '800px' },
              width: { xs: '100%', sm: '700px', lg: '800px' },
              margin: { xs: '0px' },
              position: { xs: 'absolute', md: 'inherit' },
              bottom: { xs: 0 },
              borderBottomLeftRadius: { xs: 0, md: 4 },
              borderBottomRightRadius: { xs: 0, md: 4 },
            },
            textAlign: 'center',
          }}
        >
          {/* <Box
                    sx={{ textAlign: 'right', cursor: 'pointer' }}
                    mt={1}
                    mr={3}
                    onClick={

                        closeButtonHandle
                    }
                >
                    <CloseIcon />
                </Box> */}
          <Box
            sx={{
              textAlign: 'center',
              color: '#fd0c0d',
              margin: { xs: 0, md: '71px 0 4px' },
            }}
          >
            <Box
              sx={{
                width: { xs: '90px', md: '100px' },
                height: { xs: '90px', md: '100px' },
                margin: 'auto !important',
              }}
            >
              <img src={DeleteIcon} style={{ width: '100%' }} />
            </Box>
          </Box>
          {title ? (
            <DialogTitle
              id="alert-dialog-title"
              variant="h2medium"
              sx={{
                textAlign: 'center',
                padding: { xs: '0', md: '23px 0px' },
              }}
            >
              {title}
            </DialogTitle>
          ) : (
            ''
          )}
          {subTitle ? (
            <Box
              sx={{
                textAlign: 'center',
                padding: { xs: '10px 0', md: '10px 20px' },
                maxWidth: 700,
                margin: 'auto',
              }}
            >
              <Typography variant="h5regular">{subTitle}</Typography>
            </Box>
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
            {closeButtonText ? (
              <Button
                variant="outlined"
                sx={{
                  marginRight: '12px',
                  minWidth: { xs: '158px', md: '190px' },
                  minHeight: { xs: '40px', md: '50px' },
                }}
                startIcon={<ListIcon />}
                onClick={closeButtonHandle}
              >
                {closeButtonText}
              </Button>
            ) : (
              ''
            )}
            {confirmButtonText ? (
              <Button
                variant="contained"
                sx={{
                  minWidth: { xs: '158px', md: '190px' },
                  minHeight: { xs: '40px', md: '50px' },
                }}
                startIcon={<AddIcon />}
                onClick={() => {
                  closeButtonHandle();
                  confirmButtonHandle();
                }}
                autoFocus
              >
                {confirmButtonText}
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
