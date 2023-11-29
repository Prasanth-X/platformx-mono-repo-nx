import { Box, Dialog, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { showToastSuccess } from '../../components/toastNotification/toastNotificationReactTostify';
import ThemeConstants from '../../theme/variable';
//import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import { useTranslation } from 'react-i18next';
import CommonImageRender from '../../pages/Gallery/CommonImageRender';
import Gallery from '../../pages/Gallery/Gallery';
import { Store } from '../../store/ContextStore';

interface ImageProps {
  Url?: string;
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
  bitStreamId?: string;
}
interface VideoDetails {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
  Transcript: boolean;
  CC: boolean;
}
interface VideoProps {
  Url?: string;
  Thumbnail?: string;
  Title: string;
}
//setShowImageupload,
export const DspaceSelectorBanner = ({
  updateField,
  handleEnableArticlePreview,
  originalImage,
  publishedImages,
  id
}) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { article } = state;
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');
  const [content, setContent] = useState<ImageProps | VideoProps | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<string>('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
    bitStreamId: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const setImageOrVideoToDefault = () => {
      // setSelectedImage({
      //   Title: '',
      //   Thumbnail: '',
      //   Description: '',
      //   bitStreamId: '',
      // });
    setSelectedVideo({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
  };
  //const [contentGalleryStatus, setContentGalleryStatus] = useState(false);
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [isImageOrVideoDeletePopop, setIsImageOrVideoDeletePopup] =
    useState(false);
  //Toggle Gallery from gallery file
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };
  const handleGallery = (toggleState, gallerysType, index, type) => {
    if (gallerysType == 'Images') {
      setSelectedImageIndex(index);
    }
    toggleGallery(toggleState, gallerysType);
    if (gallerysType == 'Videos') {
      setSelectedVideoIndex(index);
    }
    setSelectedOperation(type);
  };
  const onUploadClick = (imageIndex, type) => {
    handleGallery(true, 'Images', imageIndex, type);
    setOperationType(type);
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
    setContent({
      Url: image.Thumbnail,
      Title: image.Title,
      Description: image.Description,
      bitStreamId: image.bitStreamId,
    });
    updateField({ Banner: image.Thumbnail });
    handleEnableArticlePreview('banner', image.Thumbnail);
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };
  //Toggle Gallery from settings file
  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({
      Title: '',
      Description: '',
      Thumbnail: '',
      bitStreamId: '',
    });
    setGalleryState(toggleState);
    setGalleryType(type);
  };
  // Functions to handle Image/Video delete
  const deleteImageOrVideoCloseButtonHandle = () => {
    setIsImageOrVideoDeletePopup(false);
    setConfirmImageOrVideoDelete(false);
  };
  const deleteImageOrVideoConfirmButtonHandle = () => {
    setIsImageOrVideoDeletePopup(false);
    setConfirmImageOrVideoDelete(true);
    showToastSuccess(
      `${t(galleryType == 'Images' ? ' image' : ' video')} ${t(
        'deleted_toast'
      )}`
    );
  };

  const handleDelete = (type) => {
    setGalleryType(type);
    //setIsImageOrVideoDeletePopup(true);
    setConfirmImageOrVideoDelete(false);
  };

  const handleImageDelete = (index, type) => {
    if (type == 'Images') {
      setSelectedImageIndex(index);
    }
    if (type == 'Videos') {
      setSelectedVideoIndex(index);
    }
    handleDelete(type);
    setSelectedOperation('delete');
  };

  useEffect(() => {
    if (id && (originalImage && Object.keys(originalImage).length !== 0)) {
      setContent({
        Url: originalImage.Thumbnail,
        Title: '',
        Description: '',
        bitStreamId: originalImage.bitStreamId,
      });
      setSelectedImage({
        Thumbnail: originalImage.Thumbnail,
        Title: '',
        Description: '',
        bitStreamId: originalImage.bitStreamId,
      });
    }
  }, [id, originalImage]);

  const resetSelectedImage = () => {
    setContent({
      Url: '',
      Title: '',
      Description: '',
      bitStreamId: '',
    });
    setSelectedImage({
      Thumbnail: '',
      Title: '',
      Description: '',
      bitStreamId: '',
    });
  }

  return (
    <>
      <Dialog fullScreen open={galleryState}>
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType}
          handleVideoSelected={handleSelectedVideo}
        />
      </Dialog>
      {selectedImage?.Thumbnail ?
        <Box
          sx={{
            zIndex: 998,
            // height: { xs:'107px', sm: '200px', md: '256px', em: '342px', lg: '427px', xl: '480px'},
            aspectRatio: {
              xs: '9 / 16',
              sm: '2 / 3',
              md: '1 / 1',
              em: '4 / 3',
              lg: '16 / 9',
              xl: '3 / 1',
            },
            overflowY: 'none',
            position: 'relative',
          }}
        >
          <CommonImageRender
            content={selectedImage}
            imgOrder={{ 1440: 'hero', 1280: 'landscape', 1024: 'card2', 768: 'square', 600: 'card1', 320: 'portrait' }}
            updateField={updateField}
            originalImage={originalImage}
            publishedImages={publishedImages}
            operationType={operationType}
            resetSelectedImage={resetSelectedImage}
          />
          {/*   <img
            src={content?.Url}
            style={{ width: '100%', height: '440px', objectFit: 'cover' }}
          /> */}
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              // left: '20px',
              // right: '20px',
              width: '100%',
              // height: { xs:'130px', md: '256px', em: '480px'},
              aspectRatio: {
                xs: '9 / 16',
                sm: '2 / 3',
                md: '1 / 1',
                em: '4 / 3',
                lg: '16 / 9',
                xl: '3 / 1',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7470708a',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => onUploadClick(0, 'replace')}
              //onClick={() => onUploadClick(index, 'replace')}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: '#fff',
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
              {/* <Box
              ml={3}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleImageDelete(index, 'Images')}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                }}
              >
                <DeleteIcon sx={{ color: '#626060' }} />
              </Box>
              <Typography
                mt={1}
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_XS,
                  color: ThemeConstants.WHITE_COLOR,
                }}
              >
                Delete
              </Typography>
            </Box>  */}
            </Box>
          </Box>
        </Box>
        :
        <Box
          sx={{
            //height: { xs:'107px', sm: '200px', md: '256px', em: '342px', lg: '427px', xl: '480px'},
            aspectRatio: {
              xs: '9 / 16',
              sm: '2 / 3',
              md: '1 / 1',
              em: '4 / 3',
              lg: '16 / 9',
              xl: '3 / 1',
            },
            overflowY: 'none',
          }}
        >
          <Box
            sx={{
              borderRadius: '5px',
              border: 'dashed 2px #707070',
              padding: '20px',
              cursor: 'pointer',
              aspectRatio: {
                xs: '9 / 16',
                sm: '2 / 3',
                md: '1 / 1',
                em: '4 / 3',
                lg: '16 / 9',
                xl: '3 / 1',
              },
              // height: { xs:'107px', sm: '200px', md: '256px', em: '342px', lg: '427px', xl: '480px'},
              backgroundColor: '#f5f6f8',
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => onUploadClick(0, 'choose')}
          >
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: { xs: '0 0 10px 0', sm: '0 15px 0 0' },
                }}
              >
                <ArrowUpwardIcon style={{ color: '#fff' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textTransform: 'capitalize',
                }}
              >
                {t('upload_image')}
                <Typography variant='h7regular'>
                  <span
                    style={{ color: '#374fd5', textTransform: 'capitalize' }}
                  >
                    {t('choose')}
                  </span>{' '}
                  {t('drag_and_drop')}
                </Typography>
              </Box>
            </Typography>
          </Box>
        </Box>}
    </>
  );
};
