import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddImage from '../../../components/Common/AddImage';
import AutoCompleteText from '../../../components/Common/AutoCompleteText';
import AutoTextArea from '../../../components/Common/AutoTextArea';
import TextBox from '../../../components/Common/TextBox';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import { useStyles } from './SocialShare.styles';

function SocialShare({
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  setShow,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const onUploadClick = (type) => {
    showGallery('Images', 'social_img');
    // setOperationType(type);
    setShow(false);
  };
  const handleOnBlur = (event) => {
    setState(
      {
        ...state,
        CommonFields: {
          ...state.CommonFields,
          settings: {
            ...state.CommonFields.settings,
            [event.target.name]: event.target.value,
          },
        },
      } || {}
    );
  };
  return (
    <>
      <Box className={classes.container}>
        <TitleSubTitle
          title={t('choose_image')}
          subTitle={t('choose_your_image')}
          titleVarient='h6medium'
          subTitleVarient='h7regular'
        />
      </Box>
      <AddImage
        direction='column'
        diffIcon={true}
        url={state?.CommonFields?.settings?.socialog_image || ''}
        onUploadClick={onUploadClick}
        // handleChange={handleChange}
        // type='Images'
      />

      <Box className={classes.container}>
        <TitleSubTitle
          title={t('article_seo_title')}
          subTitle={t('quiz_ss_subtitle')}
          titleVarient='h6medium'
          subTitleVarient='h7regular'
        />
      </Box>
      <TextBox
        name='socialog_title'
        placeHolder={t('quiz_title_placeholder')}
        handleOnBlur={handleOnBlur}
        // handleChange={handleChange}
        maxCharLength={120}
        state={state?.CommonFields?.settings?.socialog_title || ''}
      />

      <Box className={classes.container}>
        <TitleSubTitle
          title={t('article_seo_about')}
          subTitle={t('quiz_ss_subdescription')}
          titleVarient='h6medium'
          subTitleVarient='h7regular'
        />
      </Box>
      <AutoTextArea
        name='socialog_description'
        placeHolder={t('quiz_description_placeholder')}
        handleOnBlur={handleOnBlur}
        // handleChange={handleChange}
        maxCharLength={400}
        state={state?.CommonFields?.settings?.socialog_description || ''}
      />

      <Box className={classes.container}>
        <TitleSubTitle
          title={t('quiz_tags_title')}
          subTitle={t('quiz_tags_subtitle')}
          titleVarient='h6medium'
          subTitleVarient='h7regular'
        />
      </Box>
      <AutoCompleteText
        socialShareInfo={socialOgTags}
        setSocialShareInfo={setSocialOgTags}
      />
    </>
  );
}

export default SocialShare;
