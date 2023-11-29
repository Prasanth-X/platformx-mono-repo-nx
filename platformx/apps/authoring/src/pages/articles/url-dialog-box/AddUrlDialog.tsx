import { Box, Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import ThemeConstants from '../../../theme/variable';

interface DialogList {
  titledata: string;
  isDialogOpen: boolean;
  closeButtonHandle: () => void;
  doneButtonHandle: (any) => void;
}

export default function AddUrlDialog({
  titledata = '',
  isDialogOpen,
  closeButtonHandle,
  doneButtonHandle,
}: DialogList) {
  const [title, setTitle] = useState(titledata);

  return (
    <div>
      <Dialog
        fullWidth
        open={isDialogOpen}
        maxWidth='sm'
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.Platform-x-Dialog-paper': {
            margin: { xs: '20px', xl: '30px' },
          },
          textAlign: 'center',
        }}
      >
        <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              textAlign: 'center',
              padding: { md: '70px 195px 24px' }
            }}
          >
          ADD URL
        </DialogTitle>

        <DialogContent>
          <Box sx={{ textAlign: 'center' }} mb={3}>
            <TextField
              autoFocus
              value={title}
              onChange={(e:any) => setTitle(e.target.value)}
              placeholder="Paste your url"
              margin="dense"
              id="name"
              type="text"
              variant="outlined"
              autoComplete="off"
              sx={{
                '.Platform-x-Input-root:after': {
                  borderBottom: '10px solid #000000',
                },
                '.Platform-x-FormControl-root': {
                  marginTop: '0px',
                },
                width: '65%',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '73px',
          }}
        >
          <Button
              variant="outlined"
              sx={{
                marginRight: '20px',
              }}
              onClick={closeButtonHandle}
            >
            Cancel
          </Button>
          <Button
              variant="contained"
              onClick={() => doneButtonHandle(title)}
              autoFocus
            >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
