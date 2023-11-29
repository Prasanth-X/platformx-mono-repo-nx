import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../theme/variable';
import BasicSwitch from './Switch';
import { PrelemImagesProps } from './utils/editTypes';
import CommonImageRender from '../Gallery/CommonImageRender';
import { ImageCropOrder } from '../../utils/constants';

const PrelemImages: React.FC<PrelemImagesProps> = ({
  index,
  imageInstance,
  handleSave,
  sectionToUpdate = 'Images',
  handleGallery,
  selectedImage,
  selectedIndex,
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
  const [imageContent,setImageContent] = useState<any>({
    Thumbnail: content.Url,
    bitStreamId: getBitstreamIdFromUrl(content?.Url),
    auto: true,
  });
  const [originalImage, setOriginalImage] = useState({
    Thumbnail: imageInstance.Url,
    bitStreamId: getBitstreamIdFromUrl(imageInstance?.Url),
    auto: published_images.length ? false : true,
  });
  const [publishedImages, setPublishedImages] = useState(published_images);

  const UpdatePrelemInfo = () => {
    const originalImg = {
      Images: { ...imageInstance },
      published_images: originalPublishImages.current,
    }
    const currentImg = {
      Images: { ...imageContent },
      published_images: publishedImages,
    }
    if (JSON.stringify(originalImg) != JSON.stringify(currentImg)) {
      if (content?.Title != '' && content?.Url != '') {
        handleSave(
          sectionToUpdate,
          {
            Images: { ...content },
            published_images: publishedImages,
            original_image: content,
          },
          index
        );
        const pageDataObj = {
          eventType: 'Prelem Image Setting Saved',
          ImageSaved: true,
        };

        handleImpression(pageDataObj.eventType, pageDataObj);
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
    contentNew[fieldType] = event.target.value;
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
        Title: selectedImage?.Title,
        Description: selectedImage?.Description,
      };
      setContent(contentNew);
      setImageContent({
        Thumbnail: selectedImage.Thumbnail,
        bitStreamId: getBitstreamIdFromUrl(selectedImage?.Thumbnail),
        auto: true,
      });
    }
  }, [selectedImage, publishedImages]);

  const getDisabledState = () => {
    if (
      (JSON.stringify(imageInstance) === JSON.stringify(content) &&
        JSON.stringify(originalPublishImages.current) ===
          JSON.stringify(publishedImages)) ||
      content?.Title == '' ||
      content?.Title?.trim()?.length == 0 ||
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
    <AccordionDetails>
      <>
        <Box key={`${index}_content`}>
          {content?.Url ? (
            <Box sx={{ position: 'relative' }} mb={2}>
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
                  height: '99%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#7470708a',
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
          <Typography
            variant='subtitle1'
            sx={{ display: 'flex', alignimageInstances: 'center' }}
            className='drawer-label'
            mb={1}
          >
            {t('prelem_image_title')}
            <Tooltip
              title={
                <Box m={1}>
                  <Typography
                    sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                    mb={1}
                  >
                    {t('prelem_image_title_tp')}
                  </Typography>
                </Box>
              }
              placement='right'
            >
              <Box>
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: '10px',
                    '&:hover': {
                      color: ThemeConstants.NOTIFICATION_ERROR,
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
            multiline
            value={content?.Title}
            onChange={(e) => handleDataChange(e, 'Title')}
            variant='outlined'
            placeholder={t('page_search_title_placeholder')}
          />
          <Typography
            variant='subtitle1'
            sx={{ display: 'flex', alignimageInstances: 'center' }}
            mt={2}
            mb={1}
            className='drawer-label'
          >
            {t('prelem_image_about')}
            <Tooltip
              title={
                <Box m={1}>
                  <Typography
                    sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                    mb={1}
                  >
                    {t('prelem_image_about_tp')}
                  </Typography>
                </Box>
              }
              placement='right'
            >
              <Box>
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: '10px',
                    '&:hover': {
                      color: ThemeConstants.NOTIFICATION_ERROR,
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
            multiline
            value={content?.Description}
            onChange={(e) => handleDataChange(e, 'Description')}
            variant='outlined'
            placeholder={t('page_info_about_placeholder')}
          />
          <Typography
            variant='subtitle1'
            sx={{
              display: 'flex',
              alignimageInstances: 'center',
              justifyContent: 'space-between',
              textTransform: 'capitalize',
            }}
            mt={2}
            mb={1}
          >
            {t('prelem_image_attribution')}
            <BasicSwitch
              color={ThemeConstants.BLACK_COLOR}
              checked={content?.Attribution}
              onChange={(e: any) => handleAttribution(e, 'Attribution')}
            />
          </Typography>
        </Box>
        {(content?.Title == '' ||
          content?.Title?.trim()?.length == 0 ||
          content?.Url == '') && (
          <Typography
            variant='subtitle2'
            p={1}
            sx={{
              color: ThemeConstants.NOTIFICATION_ERROR,
              textAlign: 'center',
            }}
          >
            {t('mandatory_fields')}
          </Typography>
        )}
        <Box key={`${index}_save`} sx={{ textAlign: 'right' }} mb={2}>
          <Button
            disabled={getDisabledState()}
            variant='contained'
            sx={{
              backgroundColor: ThemeConstants.BLACK_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.BLACK_COLOR,
              },
            }}
            onClick={UpdatePrelemInfo}
          >
            {t('done')}
          </Button>
        </Box>
      </>
    </AccordionDetails>
  );
};
export default PrelemImages;
