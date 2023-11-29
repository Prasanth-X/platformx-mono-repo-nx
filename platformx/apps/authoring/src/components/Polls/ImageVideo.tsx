import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import { AddImageBackgroundColor } from '../Common/AddImageBackgroundColor';
import TitleSubTitle from '../Common/TitleSubTitle';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

export const ImageVideo = ({
  state,
  setState,
  showGallery,
  pollRef,
  selectedImage,
}) => {
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState<string>('choose');
  const [isImg, setImg] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('');
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const handleRefresh = () => {
    setBackgroundColor('');
    setImg(false);
    setState({
      ...state,
      ['imagevideoURL']: '',
      ['socialShareImgURL']: '',
      ['colorCode']: '',
      ['thumbnailURL']: '',
    });
    pollRef.current = {
      ...pollRef.current,
      ['socialShareImgURL']: '',
    };
  };
  const handleColorPallete = (color) => {
    // qusUnsavedChanges.current = true
    setBackgroundColor(color);
    setImg(false);
    setState({
      ...state,
      ['imagevideoURL']: '',
      ['thumbnailURL']: '',
      ['socialShareImgURL']: '',
      ['colorCode']: color,
    });
    pollRef.current = {
      ...pollRef.current,
      ['socialShareImgURL']: '',
    };
  };
  const onUploadClick = (type) => {
    showGallery('Images', 'imagevideoURL');
    setOperationType(type);
    setImg(true);
    setState({
      ...state,
      ['colorCode']: '',
    });
  };
  useEffect(() => {
    if (state.colorCode !== '') {
      setImg(false);
      setBackgroundColor(state.colorCode);
    }
  }, [state.colorCode]);

  const updateField = (updatedPartialObj) => {
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    setState(modifiedData);
  };
  const classes = useCustomStyle();
  return (
    <>
      <Box id='imageVideo' className={classes.mainStyleWrapper}>
        <CommentWrapper
          elementId='2'
          scrollRef={scrollToRef}
          comments={comments}
        >
          <CommonBoxWithNumber
            number='02'
            title={t('poll_bg_header')}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t('subhead')}
          >
            <Grid container>
              <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                <TitleSubTitle
                  title={t('poll_bg_title')}
                  subTitle={t('poll_bg_subtitle')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                <AddImageBackgroundColor
                  state={state.imagevideoURL}
                  isImg={isImg}
                  onUploadClick={onUploadClick}
                  backgroundColor={backgroundColor}
                  handleColorPallete={handleColorPallete}
                  handleRefresh={handleRefresh}
                  label={t('quiz_image_placeholder')}
                  operationType={operationType}
                  content={selectedImage}
                  updateField={updateField}
                  originalImage={state?.original_image}
                  publishedImages={state?.published_images}
                  isShowCrop={true}
                />
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </CommentWrapper>
      </Box>
    </>
  );
};
