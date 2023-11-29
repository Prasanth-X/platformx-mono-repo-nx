import CachedIcon from '@mui/icons-material/Cached';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Box, Grid } from '@mui/material';
import { useStyles } from './ImageOnHover.styles';
import CommonPictureComponent from '../../../Gallery/CommonPictureComponent';
export const ImageOnHoverCard = ({
  Url,
  onUploadClick,
  imageCropHandle,
  setIsClickedPublish,
  setOnHover,
  publishedImages
}) => {
  const classes = useStyles();
  const imgOrder = {
    1440: 'hero',
    1280: 'hero',
    1024: 'portrait',
    768: 'portrait',
    600: 'square',
    320: 'square',
  };
  return (
    <Grid container>
      <Grid item xs={12} md={9} lg={5}>
        {/* <Box
          sx={{ position: 'absolute', top: '120px' }}
          onMouseEnter={() => setOnHover(true)}
          onMouseOut={() => setOnHover(false)}
        > */}
        <Box
          className={classes.onHoverImage}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <CommonPictureComponent
            croppedImages={publishedImages}
            imgOrder={imgOrder}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: 'inherit',
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'right',
              //   padding: '10px',
              //   backgroundColor: '#7470708a',
              borderRadius: '5px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsClickedPublish(false);
                  onUploadClick('Images', 'replace');
                }}
              >
                <Box
                  sx={{
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    width: '25px',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '50px',
                    right: '14px',
                  }}
                >
                  <CachedIcon sx={{ color: '#626060' }} />
                </Box>
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={imageCropHandle}>
                <Box
                  sx={{
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    width: '25px',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                  }}
                >
                  <ModeEditOutlinedIcon sx={{ color: '#626060' }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* </Box> */}
      </Grid>
    </Grid>
  );
};
