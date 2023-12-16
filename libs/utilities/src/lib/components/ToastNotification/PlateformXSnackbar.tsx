import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackbarList {
  isDefaultOpen?: boolean;
  message?: string;
  messageType: 'success' | 'info' | 'warning' | 'error';
  onCloseButtonClick?: () => void;
}

export default function PlateformXSnackbar({
  isDefaultOpen,
  message = '',
  messageType,
  onCloseButtonClick,
}: SnackbarList) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isDefaultOpen}
        autoHideDuration={4000}
        onClose={onCloseButtonClick}
      >
        <Alert
          onClose={onCloseButtonClick}
          severity={messageType}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
