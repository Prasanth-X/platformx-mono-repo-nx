import { CardMedia } from '@mui/material';
import React from 'react';
import { breakpoints, ratios } from '@platformx/utilities';
import { formCroppedUrl } from '../../utils/helperFunctions';

const CommonPictureComponent = (props: any = {}) => {
  const {
    croppedImages = [],
    imgOrder = {
      1440: 'hero',
      1280: 'landscape',
      1024: 'card2',
      768: 'square',
      600: 'card1',
      320: 'portrait',
    },
    extension,
  } = props;

  return (
    <CardMedia
      component="picture"
      sx={{
        aspectRatio: {
          xs: ratios[imgOrder['320']],
          sm: ratios[imgOrder['600']],
          md: ratios[imgOrder['768']],
          em: ratios[imgOrder['1024']],
          lg: ratios[imgOrder['1280']],
          xl: ratios[imgOrder['1440']],
        },
        height: 'inherit',
        borderRadius: 'inherit',
      }}
    >
      {breakpoints.map(({ breakpoint, ratio }, key) => {
        const img = croppedImages.find(
          (x) => x.aspect_ratio === (imgOrder[breakpoint] || ratio)
        );
        const { folder_path } = img || {};
        return (
          <>
            <source
              media={`(min-width:${breakpoint}px)`} //webp images for all breakpoints
              srcSet={formCroppedUrl(folder_path, 'webp')}
            />
            <source
              media={`(min-width:${breakpoint}px)`} //images with original extension
              srcSet={formCroppedUrl(folder_path, extension)}
            />
          </>
        );
      })}
      <img
        alt="cropped-img"
        // src={defaultImage}
        src="https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/f425d35c-9825-4ba2-9a2c-0be82dd2efbe/content" //x-site-image as default
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'inherit',
        }}
      />
    </CardMedia>
  );
};

export default React.memo(CommonPictureComponent);
