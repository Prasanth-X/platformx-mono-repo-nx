import { createStyles, makeStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      transform: 'rotate(180deg)',
    },
  })
);
export default function MediaTray({ showGallery }) {
  const [showTray, setShowTray] = useState(false);
  const classes = useStyles();
  const openGallery = (type) => {
    setShowTray(false);
    showGallery(type);
  };
  return (
    <Box sx={{ display: 'flex', zIndex: 999, opacity: 1 }}>
      <IconButton
        color='primary'
        aria-label='upload picture'
        component='label'
        sx={{ padding: 0, alignSelf: 'flex-end' }}
        onClick={() => setShowTray(!showTray)}
      >
        {showTray ?
          <CancelOutlinedIcon />
         :
          <AddCircleOutlineIcon sx={{ color: '#ced3d9' }} />}
      </IconButton>
      {showTray ?
        <>
          <Box
            sx={{
              // width: '128px',
              // height: '64px',
              // zIndex: 999,
              // opacity: 1,
              backgroundColor: 'white',
              // margin: '27px 1352px 0 23px',
              marginLeft: '10px',
              // padding: '18.5px 23.8px 21.5px 23.5px',
              borderRadius: '3px',
              boxShadow: '6px 16px 17px 0 rgba(206, 211, 217, 0.67)',
              zIndex: 1,
            }}
          >
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => openGallery('Images')}
            >
              <ImageIcon />
            </IconButton>
            <IconButton
              color='primary'
              aria-label='upload video'
              component='label'
              onClick={() => openGallery('Videos')}
            >
              <VideocamIcon />
            </IconButton>
            <IconButton
              color='primary'
              aria-label='upload content'
              component='label'
              onClick={() => openGallery('content')}
            >
              <WbIncandescentIcon className={classes.rotateIcon} />
            </IconButton>
          </Box>
        </>
       : null}
    </Box>
  );
}
