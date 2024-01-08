import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { DialogList } from './EmbedDialog.types';
import CardContent from './CardContent';
import React from 'react';

export default function EmbedDialog({
  isDialogOpen,
  closeEmbedButtonHandle,
  setSelectedItem,
  contentType,
}: DialogList) {
  return (
    <Box className="embedmodal">
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={closeEmbedButtonHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            maxWidth: { xs: '97%', sm: '1080px' },
            width: '97%',
            margin: { xs: '0px' },
            overflow: 'hidden',
          },
        }}
        sx={{
          display: { xs: 'block', md: 'block' },
        }}
      >
        <Box
          sx={{
            paddingLeft: '20px',
            marginTop: '8px',
            marginLeft: { xs: 'initial', md: 'auto' },
            position: 'absolute',
            right: '-10px',
          }}
        >
          <Box
            sx={{ textAlign: 'right', cursor: 'pointer', zIndex: '99999' }}
            mt={1}
            mr={3}
            onClick={closeEmbedButtonHandle}
          >
            <CloseIcon />
          </Box>
        </Box>
        <CardContent selectedItem={setSelectedItem} contentType={contentType} />
      </Dialog>
    </Box>
  );
}
