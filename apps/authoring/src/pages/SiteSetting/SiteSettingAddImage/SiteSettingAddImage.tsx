import React from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ThemeConstants from '../../../theme/variable';
import { useTranslation } from 'react-i18next';
import CommonImageRender from '../../Gallery/CommonImageRender';
import UploadImageIcon from '../../../assets/UploadImageIcon.svg';
import { useSiteSettingAddImageStyle } from './SiteSettingAddImage.style';
interface ImageProps {
  url?: any;
  onUploadClick?: any;
  handleChange?: any;
  type?: any;
  operationType?: string;
  content?: any;
  updateField?: any;
  originalImage?: any;
  publishedImages?: any;
  isShowCrop?: boolean;
}
const AddImage = ({
  url,
  onUploadClick,
  operationType,
  content,
  updateField,
  originalImage,
  publishedImages,
  isShowCrop = false,
  type,
}: ImageProps) => {
  const { t } = useTranslation();
  const classes = useSiteSettingAddImageStyle();
  return (
    <Box>
      {url ? (
        <Box className={classes.container} mb={2}>
          {isShowCrop ? (
            <CommonImageRender
              content={content}
              imgOrder={{
                1440: 'hero',
                1280: 'landscape',
                1024: 'card2',
                768: 'square',
                600: 'card1',
                320: 'portrait',
              }}
              updateField={updateField}
              originalImage={originalImage}
              publishedImages={publishedImages}
              operationType={operationType}
            />
          ) : (
            <img className={classes.img} src={url} />
          )}
          <Box className={classes.replaceBox}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => onUploadClick('replace', type)}
              >
                <Box
                  sx={{ backgroundColor: 'white' }}
                  className={classes.cachedBox}
                >
                  <CachedIcon />
                </Box>
                <Typography mt={1} className={classes.replaceTypo}>
                  {t('replace')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            className={classes.uploadBox}
            onClick={() => onUploadClick('choose')}
          >
            <Box className={classes.uploadIconBox} mr={2}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={UploadImageIcon} />
                <Typography
                  variant='h5medium'
                  component='h5'
                  className={classes.uploadTypo}
                >
                  {t('upload_image')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default React.memo(AddImage);
