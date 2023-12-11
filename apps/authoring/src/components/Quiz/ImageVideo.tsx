import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import AddImage from '../Common/AddImage';
import TitleSubTitle from '../Common/TitleSubTitle';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { useCustomStyle } from './Quiz.style';

const ImageVideo = ({ state, setState, showGallery, selectedImage }) => {
  const { t } = useTranslation();
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const [operationType, setOperationType] = useState<string>('choose');
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const updateField = (updatedPartialObj) => {
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    setState(modifiedData);
  };

  const onUploadClick = (type) => {
    showGallery('Images', 'imagevideoURL');
    setOperationType(type);
  };
  const classes = useCustomStyle();
  return (
    <Box id='imageVideo' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='2' scrollRef={scrollToRef} comments={comments}>
        <CommonBoxWithNumber
          number='02'
          title={t('quiz_background_head')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={`${t('add_image')}*`}
                subTitle={t('quiz_image_subtitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <AddImage
                url={state.imagevideoURL}
                onUploadClick={onUploadClick}
                handleChange={handleChange}
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
  );
};

export default React.memo(ImageVideo);
