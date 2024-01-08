import { CardMedia } from '@mui/material';
import { formCroppedUrl } from '@platformx/utilities';
import React from 'react';
import { BREAKPOINTS, RATIOS } from '../utils/constants';

const PictureComponent = (props: any = {}) => {
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
    extension
  } = props;

  return (
    <CardMedia
      component='picture'
      sx={{
        aspectRatio: {
          xs: RATIOS[imgOrder['320']],
          sm: RATIOS[imgOrder['600']],
          md: RATIOS[imgOrder['768']],
          em: RATIOS[imgOrder['1024']],
          lg: RATIOS[imgOrder['1280']],
          xl: RATIOS[imgOrder['1440']],
        },
        height: 'inherit',
        borderRadius: 'inherit',
      }}
    >
      {BREAKPOINTS.map(({ breakpoint, ratio }, key) => {
        const img = croppedImages.find(
          (x: { aspect_ratio: any; }) => x.aspect_ratio === (imgOrder[breakpoint] || ratio)
        );
        const {
          folder_path
        } = img || {};
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
        alt='cropped-img'
        // src={defaultImage}
        src='https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/f425d35c-9825-4ba2-9a2c-0be82dd2efbe/content' //x-site-image as default
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

export default React.memo(PictureComponent);