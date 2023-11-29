import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Box, Fab, IconButton } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './MediaTray.styles';

export default function MediaTray({ showGallery }) {
  const [showTray, setShowTray] = useState(false);
  const classes = useStyles();
  const openGallery = (type) => {
    setShowTray(false);
    showGallery(type);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        zIndex: 999,
        opacity: 1,
        //minWidth: '200px'
      }}
    >
      <IconButton
        color='primary'
        aria-label='upload picture'
        component='label'
        sx={{
          padding: 0,
          alignSelf: 'flex-end',
          display: { xs: 'none', sm: 'flex' },
        }}
        onClick={() => setShowTray(!showTray)}
      >
        {showTray ? (
          <CancelOutlinedIcon />
        ) : (
          <AddCircleOutlineIcon sx={{ color: '#14142B' }} />
        )}
      </IconButton>
      <Fab
        sx={{
          position: 'fixed',
          bottom: '4%',
          right: '5%',
          zIndex: 99,
          display: { xs: 'flex', sm: 'none' },
          backgroundColor: '#14142B',
        }}
        size='medium'
        color='primary'
        aria-label='add'
        onClick={() => setShowTray(!showTray)}
      >
        {showTray ? (
          <ClearRoundedIcon sx={{ color: '#FFFFFF' }} />
        ) : (
          <AddIcon sx={{ color: '#FFFFFF' }} />
        )}
      </Fab>
      {showTray ? (
        <>
          <Box
            sx={{
              zIndex: { xs: 99, sm: 1 },
              display: { xs: 'flex', sm: 'unset' },
              flexDirection: { xs: 'column', sm: 'unset' },
            }}
            className={classes.plusIconBox}
          >
            <IconButton
              className={classes.iconBoxCta}
              color='primary'
              aria-label='upload content'
              component='label'
              onClick={() => openGallery('content')}
            >
              <EmojiObjectsOutlinedIcon />
            </IconButton>
            <IconButton
              className={classes.iconBoxCta}
              color='primary'
              aria-label='upload video'
              component='label'
              onClick={() => openGallery('Videos')}
            >
              <VideocamOutlinedIcon />
            </IconButton>
            <IconButton
              className={classes.iconBoxCta}
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => openGallery('Images')}
            >
              <ImageOutlinedIcon />
            </IconButton>
          </Box>
        </>
      ) : null}
    </Box>
  );
}
