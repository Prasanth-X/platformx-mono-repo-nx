import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddImage from '../../../../components/Common/AddImage';
import AutoCompleteText from '../../../../components/Common/AutoCompleteText';
import AutoTextArea from '../../../../components/Common/AutoTextArea';
import '../../../../components/Common/commonStyles/disabledStyles.css';
import { ErrorTooltip } from '../../../../components/Common/ErrorTooltip';
import TextBox from '../../../../components/Common/TextBox';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { IMAGES, SOCIAL_SHARE } from '../../Utils/Constants';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { ComponentProp } from './SocialShare.types';
import useAccess from '../../../../hooks/usePermissions/useAccess';
import { CATEGORY_PAGE } from '../../../../utils/constants';
import {
  ContentType,
  ContentAction,
  Category,
} from '../../../../utils/Enums/ContentType';
const EventSocialShare = ({
  state,
  setState,
  eventWholeRef,
  showGalleryHandle,
  unsavedChanges,
  selectedImage,
}: ComponentProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const { canAccessAction } = useAccess();

  const [imageUrlLink, setImageUrlLink] = useState('');

  const handleOnBlur = (event: any) => {
    unsavedChanges.current = true;
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    eventWholeRef.current = {
      ...eventWholeRef.current,
      [event.target.name]: event.target.value,
    };
  };
  const onUploadClick = (type) => {
    showGalleryHandle(IMAGES, SOCIAL_SHARE);
  };

  useEffect(() => {
    setImageUrlLink(state.socialShareImgURL);
  }, [state.socialShareImgURL]);

  return (
    <>
      <Box id='socialShare' className={classes.mainStyleWrapper}>
        <CommonBoxWithNumber
          number='06'
          title={t('social_share')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiled'>
              <TitleSubTitle
                title={t('choose_image')}
                subTitle={t('page_choose_image')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiled'>
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
                      url={
                        selectedImage !== ''
                          ? selectedImage
                          : state.socialShareImgURL
                      }
                      onUploadClick={onUploadClick}
                      type='Images'
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

            {/* titleEvent */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_ss_title')}
                subTitle={t('event_ss_sub_title')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='short_titleSocialShare'
                maxCharLength={60}
                state={state.short_titleSocialShare}
                placeHolder={t('quiz_title_placeholder')}
                handleOnBlur={handleOnBlur}
              />
            </Grid>

            {/* description*/}
            <Grid item xs={12} sm={5} md={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_ss_des')}
                subTitle={t('event_ss_subdes')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiled'>
              <AutoTextArea
                maxCharLength={160}
                name='short_descriptionSocialShare'
                placeHolder={t('quiz_description_placeholder')}
                state={state.short_descriptionSocialShare}
                handleOnBlur={handleOnBlur}
              />
            </Grid>

            {/* keyword */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t('keywords_title')}
                subTitle={t('quiz_tags_subtitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>

            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <AutoCompleteText
                setSocialShareInfo={setState}
                socialShareInfo={state}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventSocialShare);
