import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import ThemeConstants from '../../../../theme/variable';
import { ImageCropOrder } from '../../../../utils/constants';
import CommonImageRender from '../../../Gallery/CommonImageRender';
import { PrelemImagesProps } from '../../utils/editTypes';
import '../PageSettings/PageSettings.css';
import BasicSwitch from '../Switch';

const PrelemImages: React.FC<PrelemImagesProps> = ({
  index,
  imageInstance,
  setPageId,
  handleSave,
  sectionToUpdate = 'ImageCompound',
  handleGallery,
  selectedImage,
  selectedIndex,
  original_images,
  published_images = [],
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(imageInstance);
  const [handleImpression] = usePlatformAnalytics();
  const [operationType, setOperationType] = useState<string>('');
  const originalPublishImages = useRef<any>(published_images);
  const getBitstreamIdFromUrl = (url: string) => {
    return url ? url.split('/')[7] : '';
  };
  const [imageContent, setImageContent] = useState<any>({
    Thumbnail: content?.original_image_relative_path,
    bitStreamId: getBitstreamIdFromUrl(content?.Url),
    auto: true,
    ext: imageInstance?.ext,
    Visibility: imageInstance?.Visibility,
  });
  const [originalImage, setOriginalImage] = useState({
    Thumbnail: imageInstance?.original_image_relative_path,
    bitStreamId: getBitstreamIdFromUrl(imageInstance?.Url),
    auto: published_images.length ? false : true,
    ext: imageInstance?.ext,
    Visibility: imageInstance?.Visibility,
  });
  const [publishedImages, setPublishedImages] = useState(published_images);

  const UpdatePrelemInfo = () => {
    const originalImg = {
      Images: { ...imageInstance },
      published_images: originalPublishImages.current,
    };
    const currentImg = {
      Images: { ...imageContent },
      published_images: publishedImages,
    };
    if (JSON.stringify(originalImg) != JSON.stringify(currentImg)) {
      if (content?.Title != '' && content?.Url != '') {
        handleSave(
          sectionToUpdate,
          {
            ImageCompound : {
              published_images: publishedImages,
              original_image: {...content, bitStreamId: originalImage?.bitStreamId, ext: originalImage?.ext},
            }
          },
          index
        );
        const pageDataObj = {
          eventType: 'Prelem Image Setting Saved',
          ImageSaved: true,
        };

        handleImpression(pageDataObj.eventType, pageDataObj);
        showToastSuccess(`${t('prelem_image_info_toast')} ${t('saved_toast')}`);
      }
    }
  };
  const handleAttribution = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew[fieldType] = event.target.checked;
    setContent(contentNew);
  };
  const handleDataChange = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew.MetaFields[fieldType] = event.target.value;
    setContent(contentNew);
  };
  useEffect(() => {
    setContent(imageInstance);
  }, [imageInstance]);
  const onUploadClick = (imageIndex, type) => {
    handleGallery(true, 'Images', imageIndex, type);
    setOperationType(type);
  };
  useEffect(() => {
    if (
      (operationType === 'choose' || operationType === 'replace') &&
      selectedIndex === index &&
      selectedImage.Thumbnail != ''
    ) {
      const contentNew = {
        ...content,
        Url: selectedImage?.Thumbnail,
        // Title: selectedImage?.Title,
        // Description: selectedImage?.Description,
        MetaFields : {...content?.MetaFields, Title: selectedImage.Title, Description: selectedImage.Description }
      };
      setContent(contentNew);
      setImageContent({
        Thumbnail: selectedImage.Thumbnail,
        bitStreamId: getBitstreamIdFromUrl(selectedImage?.Thumbnail),
        auto: true,
      });
    }
  }, [selectedImage]);

  const getDisabledState = () => {
    if (
      (JSON.stringify(imageInstance) === JSON.stringify(content) &&
        JSON.stringify(originalPublishImages.current) ===
          JSON.stringify(publishedImages)) ||
      content?.MetaFields?.Title == '' ||
      content?.MetaFields?.Title?.trim()?.length == 0 ||
      content?.Url == ''
    ) {
      return true;
    } else {
      return false;
    }
  };
  const updateField = (updatedPartialObj) => {
    const { original_image = {}, published_images = [] } =
      updatedPartialObj || {};

    setOriginalImage(original_image);
    setPublishedImages(published_images);
  };
  return (
    <Box className="ImageSecWp">
      <Box className='rowBox'>
        {content?.original_image_relative_path ? (
          <Box sx={{
            position: 'relative',
            '& img': {
              display: 'flex',
              height: 'initial !important',
              borderRadius: '5px !important',
            },
          }}
          mb={2}>
            <CommonImageRender
              content={imageContent}
              imgOrder={ImageCropOrder}
              updateField={updateField}
              originalImage={originalImage}
              publishedImages={publishedImages}
              operationType={operationType}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#7470708a',
                borderRadius: '5px',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onUploadClick(index, 'replace')}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: ThemeConstants.WHITE_COLOR,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <CachedIcon sx={{ color: '#626060' }} />
                  </Box>
                  <Typography
                    mt={1}
                    sx={{
                      fontSize: ThemeConstants.FONTSIZE_XS,
                      color: ThemeConstants.WHITE_COLOR,
                    }}
                  >
                    {t('replace')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: '5px',
              border: `dashed 2px ${ThemeConstants.LIGHT_GREY_COLOR}`,
              padding: '20px',
              cursor: 'pointer',
              height: '147px',
              backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => onUploadClick(index, 'choose')}
            mb={2}
          >
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                mr={2}
              >
                <ArrowUpwardIcon
                  style={{ color: ThemeConstants.WHITE_COLOR }}
                />
              </Box>
              {t('choose_your_image')}
            </Typography>
          </Box>
        )}
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('prelem_image_title')}
        </Typography>
        <TextField
          multiline
          value={content?.MetaFields?.Title}
          onChange={(e) => handleDataChange(e, 'Title')}
          variant='outlined'
          size='small'
          placeholder={t('page_search_title_placeholder')}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('prelem_image_about')}
        </Typography>
        <TextField
          multiline
          value={content?.MetaFields?.Description}
          onChange={(e) => handleDataChange(e, 'Description')}
          variant='outlined'
          size='small'
          placeholder={t('page_info_about_placeholder')}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t('prelem_image_attribution')}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            checked={content?.Attribution}
            onChange={(e: any) => handleAttribution(e, 'Attribution')}
          />
        </Typography>
      </Box>
      {(content?.MetaFields?.Title == '' ||
        content?.MetaFields?.Title?.trim()?.length == 0 ||
        content?.Url == '') && (
        <Typography
          variant='p4regular'
          sx={{
            color: ThemeConstants.NOTIFICATION_ERROR,
          }}
        >
          {t('mandatory_fields')}
        </Typography>
      )}
      <Box className='rowBox' key={`${index}_save`}>
        <Button
          variant='contained'
          disabled={getDisabledState()}
          sx={{ width: '100%' }}
          onClick={UpdatePrelemInfo}
        >
          {t('done')}
        </Button>
      </Box>
      <Box className='rowBox deviderBox'>
        <hr />
      </Box>
    </Box>
  );
};
export default PrelemImages;
