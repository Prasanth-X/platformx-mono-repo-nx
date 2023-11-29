import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddImage from '../Common/AddImage';
import AutoCompleteText from '../Common/AutoCompleteText';
import AutoTextArea from '../Common/AutoTextArea';
import TextBox from '../Common/TextBox';
import TitleSubTitle from '../Common/TitleSubTitle';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const SocialShare = ({
  showGallery,
  state,
  setState,
  pollRef,
  unsavedChanges,
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
  const handleChange = (event, key) => {
    unsavedChanges.current = true;
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    pollRef.current = {
      ...pollRef.current,
      [event.target.name]: event.target.value,
    };
  };
  const onUploadClick = (type) => {
    showGallery('Images', 'socialShareImgURL');
    setOperationType(type);
  };
  const classes = useCustomStyle();
  return (
    <Box id='socialShare' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='07'
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
            <AddImage
              url={
                selectedImage.Thumbnail
                  ? selectedImage.Thumbnail
                  : state.socialShareImgURL
              }
              onUploadClick={onUploadClick}
              handleChange={handleChange}
              type='Images'
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
            <TitleSubTitle
              title={t('poll_ss_title')}
              subTitle={t('quiz_ss_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} className='textFiled'>
            <TextBox
              name='titleSocialShare'
              placeHolder={t('quiz_title_placeholder')}
              handleChange={handleChange}
              maxCharLength={120}
              state={state.titleSocialShare}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className='leftFiled'>
            <TitleSubTitle
              title={t('poll_ss_description')}
              subTitle={t('quiz_ss_subdescription')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiled'>
            <AutoTextArea
              name='descriptionSocialShare'
              placeHolder={t('quiz_description_placeholder')}
              handleChange={handleChange}
              maxCharLength={400}
              state={state.descriptionSocialShare}
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('quiz_tags_title')}
              subTitle={t('quiz_tags_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
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
export default SocialShare;
