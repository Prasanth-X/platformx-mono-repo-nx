import { Typography } from '@mui/material';
import React from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

const SelectedImageCrop = (props: any = {}) => {
  const {
    crop = '',
    aspect = 0,
    ratio = '',
    imageSrc = '',
    onCropChange,
    isLoading = true,
    setIsLoading,
  } = props;

  const onChange = (cropper: any) => {
    const {
      height = 0,
      left = 0,
      top = 0,
      width = 0,
    } = cropper.getCoordinates() || {};
    const cropVertex = [
      {
        x: left,
        y: top,
      },
      {
        x: width + left,
        y: top,
      },
      {
        x: left,
        y: height + top,
      },
      {
        x: width + left,
        y: height + top,
      },
    ];
    onCropChange(cropVertex, crop);
  };

  const onError = (cropper: any) => {
    console.error('Image is not loading', cropper);
    // if(isLoading) setIsLoading(false);
  };

  const onReady = () => {
    if (isLoading) setIsLoading(false);
  };

  const defaultSize = ({ imageSize, visibleArea }: { imageSize: any, visibleArea: any }) => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  return (

    <div className='crop-container'>
      <Cropper
        src={imageSrc}
        stencilProps={{
          aspectRatio: aspect,
        }}
        defaultSize={defaultSize}
        onChange={onChange}
        className="cropper"
        onReady={onReady}
        onError={onError}
      />
      <Typography
        variant='h4bold'
        sx={{ padding: { xs: '5px 0', md: '14px 0' }, textAlign: 'center' }}
      >
        {ratio}
      </Typography>
    </div>
  );
};

export default React.memo(SelectedImageCrop);
