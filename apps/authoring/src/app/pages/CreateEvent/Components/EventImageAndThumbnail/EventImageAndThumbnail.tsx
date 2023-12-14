import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddImage from '../../../../components/Common/AddImage';
import { ErrorTooltip } from '../../../../components/Common/ErrorTooltip';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import '../../../../components/Common/commonStyles/disabledStyles.css';
import { IMAGES, IMAGE_URL } from '../../Utils/Constants';
import { ComponentProp } from './ImgAndThumbnail.types';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import useAccess from '../../../../hooks/usePermissions/useAccess';
import { CATEGORY_PAGE } from '../../../../utils/constants';
import {
  Category,
  ContentAction,
  ContentType,
} from '../../../../utils/Enums/ContentType';
import Content from '../../../QuizPollEvents';

const EventImageAndThumbnail = ({
  state,
  setState,
  showGalleryHandle,
  setPreviewButton,
  selectedImage,
}: ComponentProp) => {
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState<string>('');
  const { canAccessAction } = useAccess();
  const [imageUrlLink, setImageUrlLink] = useState('');

  const updateField = (updatedPartialObj) => {
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    setState(modifiedData);
  };

  const onUploadClick = (type) => {
    showGalleryHandle(IMAGES, IMAGE_URL);
    setOperationType(type);
  };

  useEffect(() => {
    setImageUrlLink(state.imageUrl);
    if (state.imageUrl) {
      setPreviewButton((prevValue) => {
        if (prevValue) {
          return false;
        }
      });
    }
  }, [state.imageUrl]);
  const classes = useCustomStyle();

  return (
    <>
      <Box id='ImageAndThumbnail' className={classes.mainStyleWrapper}>
        <CommonBoxWithNumber
          number='01'
          title={t('choose_the_image')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t('event_image_tilte')}
                subTitle={t('event_image_subtitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <ErrorTooltip
                component={
                  <Box
                    className={
                      !canAccessAction(
                        Category.Content,
                        ContentType.Event,
                        ContentAction.View
                      ) && 'disable'
                    }
                  >
                    <AddImage
                      url={imageUrlLink}
                      onUploadClick={onUploadClick}
                      type='Images'
                      operationType={operationType}
                      content={selectedImage}
                      updateField={updateField}
                      originalImage={state?.original_image}
                      publishedImages={state?.published_images}
                      isShowCrop={true}
                    />
                  </Box>
                }
                doAccess={
                  !canAccessAction(
                    Category.Content,
                    ContentType.Event,
                    ContentAction.View
                  )
                }
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventImageAndThumbnail);
