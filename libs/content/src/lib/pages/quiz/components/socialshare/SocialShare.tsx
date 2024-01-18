import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import AddImage from '../Common/AddImage';
// import AutoCompleteText from '../Common/AutoCompleteText';
// import AutoTextArea from '../Common/AutoTextArea';
// import TextBox from '../Common/TextBox';
// import TitleSubTitle from '../Common/TitleSubTitle';
// import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { useCustomStyle } from '../../quiz.style';
import { AddImage, AutoCompleteText, AutoTextArea, CommonBoxWithNumber, TextBox, TitleSubTitle, relativeImageURL } from '@platformx/utilities';

const SocialShare = ({
  showGallery,
  state,
  setState,
  quizRef,
  unsavedChanges,
  setFieldChanges,
  selectedImage,
}) => {
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState<string>('replace');
  const [socialShareInfo, setSocialShareInfo] = useState({
    url: '',
    title: '',
    description: '',
    tags: [],
  });
  const handleChange = () => {
    setFieldChanges(true);
    unsavedChanges.current = true;
  };
  const handleOnBlur = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    quizRef.current = {
      ...quizRef.current,
      [event.target.name]: event.target.value,
    };
    unsavedChanges.current = true;
  };
  const onUploadClick = (type) => {
    showGallery('Images', 'socialShareImgURL');
    setOperationType(type);
    unsavedChanges.current = true;
  };
  const classes = useCustomStyle();
  return (
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
              subTitle={t('choose_your_image')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiled'>
            <AddImage
              // url={
              //   selectedImage.Thumbnail
              //     ? selectedImage.Thumbnail
              //     : state.socialShareImgURL
              // }
              url={relativeImageURL(state.socialShareImgURL)}
              onUploadClick={onUploadClick}
              handleChange={handleChange}
              type='Images'
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
            <TitleSubTitle
              title={t('quiz_ss_title')}
              subTitle={t('quiz_ss_subtitle')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} className='textFiled'>
            <TextBox
              name='titleSocialShare'
              placeHolder={t('quiz_title_placeholder')}
              handleOnBlur={handleOnBlur}
              handleChange={handleChange}
              maxCharLength={120}
              state={state.titleSocialShare}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className='leftFiled'>
            <TitleSubTitle
              title={t('quiz_ss_description')}
              subTitle={t('quiz_ss_subdescription')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiled'>
            <AutoTextArea
              name='descriptionSocialShare'
              placeHolder={t('quiz_description_placeholder')}
              handleOnBlur={handleOnBlur}
              handleChange={handleChange}
              maxCharLength={400}
              state={state.descriptionSocialShare}
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('quiz_tags_title')}
              subTitle={t('quiz_tags_subtitle')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
            <AutoCompleteText
              socialShareInfo={state}
              setSocialShareInfo={setState}
            />
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default memo(SocialShare);
