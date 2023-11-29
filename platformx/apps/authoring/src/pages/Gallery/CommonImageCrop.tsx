import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { postRequest } from '../../services/config/request';
import { breakpoints } from '../../utils/constants';
import { nullToObject } from '../../utils/helperFunctions';
import SelectedImageCrop from './SelectedImageCrop';

const CommonImageCrop = (props: any = {}) => {
  const {
    open,
    cropImages = {},
    backTo,
    doneCropCompleted,
  } = nullToObject(props);
  const [doneLoader, setDoneLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { Thumbnail, bitStreamId } = cropImages || {};
  const [crop1, setCrop1] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [crop2, setCrop2] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [crop3, setCrop3] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [crop4, setCrop4] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [crop5, setCrop5] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [crop6, setCrop6] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleDone = async () => {
    setDoneLoader(true);
    const payload = {
      url: Thumbnail,
      bitstreamId: bitStreamId,
      visibility: 'public',
      crop_hints: [
        {
          aspect_ratio: 'landscape',
          crop_vertex: crop1,
        },
        {
          aspect_ratio: 'square',
          crop_vertex: crop2,
        },
        {
          aspect_ratio: 'portrait',
          crop_vertex: crop3,
        },
        {
          aspect_ratio: 'hero',
          crop_vertex: crop4,
        },
        {
          aspect_ratio: 'card1',
          crop_vertex: crop5,
        },
        {
          aspect_ratio: 'card2',
          crop_vertex: crop6,
        },
      ],
    };
    const response = await postRequest(
      'api/v1/assets/image/manual-crop',
      payload
    );
    const { images = '', ext, original_image_relative_path = '', visibility = '' } = nullToObject(response);
    if (images?.length > 0) {
      showToastSuccess('Image Cropped Successfully');
      setDoneLoader(false);
      doneCropCompleted(images, ext, original_image_relative_path, visibility);
    } else {
      showToastError('Cropping Failed');
      setDoneLoader(false);
      doneCropCompleted('');
    }
  };
  const ImageBox = styled('div')({
    background: '#f5f6f8',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  });

  const onCropChangeFunc = (data, index) => {
    if (index === 'crop1') {
      setCrop1(data);
    } else if (index === 'crop2') {
      setCrop2(data);
    } else if (index === 'crop3') {
      setCrop3(data);
    } else if (index === 'crop4') {
      setCrop4(data);
    } else if (index === 'crop5') {
      setCrop5(data);
    } else {
      setCrop6(data);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={backTo}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Grid
        container
        sx={{
          borderBottom: '1px solid #ced3d9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: { xs: '10px 15px', md: '0px 24px' },
        }}
      >
        <Grid xs={12} md={8}>
          <Typography variant='h4bold'>Crop your Image</Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            textAlign: { xs: 'left', md: 'right' },
            padding: { xs: '10px 0', md: '8px' },
          }}
        >
          <Button
            variant='outlined'
            onClick={() => backTo()}
            sx={{ marginRight: '18px' }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <LoadingButton
            onClick={() => handleDone()}
            loading={doneLoader}
            loadingPosition='start'
            variant='contained'
            disabled={isLoading}
            startIcon={<DoneIcon />}
          >
            Done
          </LoadingButton>
        </Grid>
      </Grid>
      <DialogContent>
        <Box
          className='wholecontainer'
          sx={{
            background: { xs: '#f7f7f7', sm: '#fff' },
            padding: { xs: '11px', sm: '0px' },
          }}
        >
          {isLoading && (
            <Box
              sx={{
                marginTop: '350px',
                marginBottom: '100px',
                textAlign: 'center',
                position: 'absolute',
                zIndex: '99',
                left: '0',
                right: '0',
              }}
            >
              <CircularProgress
                style={{
                  width: '80px',
                  height: '80px',
                  color: '#2d2d39',
                }}
              />
            </Box>
          )}
          <>
            <Grid container spacing={1}>
              {breakpoints.map(
                ({ aspectRatio, ratioName, aspectRatioName }, key) => {
                  return (
                    <Grid
                      xs={12}
                      md={6}
                      em={4}
                      sx={{ padding: '8px' }}
                      key={key}
                    >
                      <SelectedImageCrop
                        // zoom={zoom}
                        crop={`crop${key + 1}`}
                        aspect={aspectRatio}
                        ratio={`${ratioName}(${aspectRatioName})`}
                        imageSrc={Thumbnail}
                        onCropChange={onCropChangeFunc}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          </>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CommonImageCrop);
