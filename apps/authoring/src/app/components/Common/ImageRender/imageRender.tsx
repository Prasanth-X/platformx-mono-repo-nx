import { Box } from '@mui/system';
import React from 'react';

interface PictureRenderProps {
  imageUrl: string;
  imageExt: string;
}

const PictureRender: React.FC<PictureRenderProps> = ({
  imageUrl,
  imageExt,
}) => {
  const gcpUrl = process.env.NX_GCP_URL;
  const bucketName = process.env.NX_BUCKET_NAME;

  const webpImageUrl = `${gcpUrl}/${bucketName}/${imageUrl}.webp`;
  const fallbackImageUrl = `${gcpUrl}/${bucketName}/${imageUrl}.${imageExt}`;

  return (
    <Box>
      <picture>
        <source srcSet={webpImageUrl} type="image/webp" />
        <source srcSet={fallbackImageUrl} type="image/jpeg" />
        <img
          src={fallbackImageUrl}
          alt="page-setting"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </picture>
    </Box>
  );
};

export default PictureRender;
