import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  showToastSuccess
} from '../../components/toastNotification/toastNotificationReactTostify';
import ThemeConstants from '../../theme/variable';
//import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from 'react-i18next';
import Gallery2 from './Gallery2';

interface ImageProps {
  Url?: string;
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
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
export const DspaceSelector = ({
  editorState,
  contentState,
  setEditorState,
  setShowImageupload,
  appendHtmlforAsset,
}) => {
  const { t } = useTranslation();
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');
  const [content, setContent] = useState<ImageProps | VideoProps | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<string>('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('replace');
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
    setSelectedVideo({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
  };
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [isImageOrVideoDeletePopop, setIsImageOrVideoDeletePopup] =
    useState(false);
  useEffect(() => {
    if (
      (operationType == 'choose' || operationType == 'replace') &&
      // selectedIndex == index &&
      selectedImage.Thumbnail != ''
    ) {
      const contentNew = {
        ...content,
        Url: selectedImage?.Thumbnail,
        Title: selectedImage?.Title,
        Description: selectedImage?.Description,
      };
      setContent(contentNew);
    }
  }, [selectedImage]);
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
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };
  //Toggle Gallery from settings file
  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({ Title: '', Description: '', Thumbnail: '' });
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
  return (
    <>
      {galleryState &&
        <Gallery2
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType}
          handleVideoSelected={handleSelectedVideo}
          // editorState={editorState}
          // setEditorState={setEditorState}
          // contentState={contentState}
        />}
      {/* {contentGalleryStatus && (
        <ContentGallery
          handleSelectedContent={handleSelectedContent}
          onToggleContentGallery={onToggleContentGallery}
        />
      )} setShowImageupload(false),*/}
      {content?.Url ? (
        appendHtmlforAsset(
          `<img src='${content?.Url}' width="100%" height="250px"/>`
        ),
        setShowImageupload(false)
      ) :
        //   <Box sx={{ /*position: 'relative' */}} mb={2}>
        // <img
        //   src={content?.Url}
        //   style={{ width: '100%', height: '250px' }}
        // />
        // <Box
        //   sx={{
        //     position: 'absolute',
        //     top: '0',
        //     width: '100%',
        //     height: '99%',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     backgroundColor: '#7470708a',
        //   }}
        // >
        //   <Box sx={{ display: 'flex' }}>
        //     <Box
        //       sx={{ cursor: 'pointer' }}
        //       onClick={() => onUploadClick(0, 'replace')}
        //       //onClick={() => onUploadClick(index, 'replace')}
        //     >
        //       <Box
        //         sx={{
        //           borderRadius: '50%',
        //           backgroundColor: '#fff',
        //           width: '40px',
        //           height: '40px',
        //           display: 'flex',
        //           alignItems: 'center',
        //           justifyContent: 'center',
        //           margin: 'auto',
        //         }}
        //       >
        //         <CachedIcon sx={{ color: '#626060' }} />
        //       </Box>
        //       <Typography
        //         mt={1}
        //         sx={{
        //           fontSize: ThemeConstants.FONTSIZE_XS,
        //           color: ThemeConstants.WHITE_COLOR,
        //         }}
        //       >
        //         Replace
        //       </Typography>
        //     </Box>
        /* <Box
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
            </Box>
      //     </Box>
      //   </Box>
              </Box>*/
        <Box
          sx={{
            borderRadius: '5px',
            border: 'dashed 2px #707070',
            padding: '20px',
            cursor: 'pointer',
            height: '147px',
            backgroundColor: '#f5f6f8',
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={() => onUploadClick(0, 'choose')}
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
                backgroundColor: '#000',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              mr={2}
            >
              <ArrowUpwardIcon style={{ color: '#fff' }} />
            </Box>
            {t('page_choose_image')}
          </Typography>
        </Box>}
    </>
  );
};