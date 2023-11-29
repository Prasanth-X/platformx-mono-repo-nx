import { ArrowUpward, Cached, Delete, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { updatePageSettings } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import siteLevelSchema from '../../../../utils/siteLevelSettings.json';
import { PageSocialShareInformation } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import { useStyles } from '../PrelemSettings/PrelemSettings.styles';
import './PageSettings.css';
import TwitterSettings from './TwitterSettings';
interface socialShareinsting {
  handleGallery?: any;
  selectedImage?: any;
  handleImageDelete?: any;
  confirmImageDelete?: any;
  selectedSection?: any;
  setPageId?: any;
}
const SocialShare = ({
  handleGallery,
  selectedImage,
  handleImageDelete,
  confirmImageDelete,
  selectedSection,
  setPageId,
}: socialShareinsting) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const pageInfo = { ...page?.pageSettings };
  const {
    SocialOgTitle,
    SocialOgDescription,
    SocialOgSiteName,
    SocialOgType,
    SocialOgURL,
    SocialOgLocale,
    SocialOgImage,
    PageName,
    PageDescription,
    PageURL,
  } = pageInfo;
  const data = {
    SocialOgTitle:
      SocialOgTitle !== undefined
        ? SocialOgTitle
        : PageName === undefined
        ? ''
        : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgDescription:
      SocialOgDescription !== undefined
        ? SocialOgDescription
        : PageDescription === undefined
        ? ''
        : PageDescription,
    SocialOgSiteName:
      SocialOgSiteName !== undefined
        ? SocialOgSiteName
        : PageName === undefined
        ? ''
        : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgType: SocialOgType !== undefined ? SocialOgType : t('Website'),
    SocialOgURL:
      SocialOgURL !== undefined
        ? SocialOgURL
        : PageURL === undefined
        ? ''
        : PageURL,
    SocialOgLocale: SocialOgLocale !== undefined ? SocialOgLocale : t('en_US'),
    SocialOgImage: SocialOgImage !== undefined ? SocialOgImage : '',
  };
  const initialSocialShare = useRef<PageSocialShareInformation>(data);
  const [socialShareInfo, setSocialShareInfo] =
    useState<PageSocialShareInformation>(initialSocialShare.current);
  const ogTypes = [t('website'), t('article')];
  const ogLocale = [t('page_en_us'), t('page_en_gb'), t('page_en_fr')];
  const socialShareNameLength = 250;
  const socialShareDescriptionLength = 1000;
  const socialSharePreviewNameLength = 166;
  const socialSharePreviewDescriptionLength = 78;
  const classes = useStyles()();

  useEffect(() => {
    if (page?.pageSettings) {
      initialSocialShare.current = {
        ...initialSocialShare.current,
        ...page.pageSettings,
      };
      setSocialShareInfo(initialSocialShare.current);
    }
  }, [page?.pageSettings]);
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    const socialShareInfoUpdated = { ...socialShareInfo };
    socialShareInfoUpdated[fieldType] = event.target.value.trim();
    setSocialShareInfo(socialShareInfoUpdated);
  };
  //Function to open local image selection window
  const onUploadClick = () => {
    handleGallery(true, 'Images', 'social share');
  };
  const [handleImpression] = usePlatformAnalytics();
  const saveSocialShare = () => {
    dispatch(updatePageSettings(socialShareInfo));
    const pageDataObj = {
      eventType: 'SocialShare PageSetting Saved',
      socialShareSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    showToastSuccess(`${t('social_share_info_toast')} ${t('saved_toast')}`);
  };

  useEffect(() => {
    if (selectedImage.Thumbnail !== '' && selectedSection === 'social share') {
      const socialShareInfoUpdated = { ...socialShareInfo };
      socialShareInfoUpdated.SocialOgImage = selectedImage.Thumbnail;
      setSocialShareInfo(socialShareInfoUpdated);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (confirmImageDelete && selectedSection === 'social share') {
      const socialShareInfoUpdated = { ...socialShareInfo, SocialOgImage: '' };
      setSocialShareInfo(socialShareInfoUpdated);
    }
  }, [confirmImageDelete]);

  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title='Social Share' />
      <Box
        className='rowBox'
        sx={{ border: '1px solid #D9DBE9', borderRadius: '4px' }}
      >
        {socialShareInfo.SocialOgImage === '' ? (
          <Box className={classes.uploadImageBox} onClick={onUploadClick}>
            <Typography className='switchbox' variant='p4regular'>
              <Box className={classes.blackRoundIcon}>
                <ArrowUpward />
              </Box>
              {t('page_choose_image')}
            </Typography>
          </Box>
        ) : (
          <Box className={classes.imageBox}>
            <img
              src={socialShareInfo.SocialOgImage}
              alt='image file'
              width='100%'
              style={{ height: 'auto' }}
            />
            <Box className={classes.imageBoxInner}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
                  <Box className={classes.blackRoundIcon}>
                    <Cached />
                  </Box>
                  <Typography className='labelbox' variant='p4regular'>
                    {t('replace')}
                  </Typography>
                </Box>
                <Box
                  ml={3}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleImageDelete('social share')}
                >
                  <Box className={classes.blackRoundIcon}>
                    <Delete />
                  </Box>
                  <Typography className='labelbox' variant='p4regular'>
                    {t('delete')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Box className='rowBox' sx={{ padding: '10px 0px 0px 14px' }}>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgURL ? socialShareInfo.SocialOgURL : ''}
          </Typography>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgTitle.substring(
              0,
              socialSharePreviewNameLength
            )}
            {socialShareInfo.SocialOgTitle.length >
              socialSharePreviewNameLength && <span>...</span>}
          </Typography>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgDescription.substring(
              0,
              socialSharePreviewDescriptionLength
            )}
            {socialShareInfo.SocialOgDescription.length >
              socialSharePreviewDescriptionLength && <span>...</span>}
          </Typography>
        </Box>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_seo_title')}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgTitle}
          onChange={(e) => handleDataChange(e, 'SocialOgTitle')}
          size='small'
          variant='outlined'
          placeholder={t('page_search_title_placeholder')}
          inputProps={{ maxLength: socialShareNameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_seo_description')}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgDescription}
          onChange={(e) => handleDataChange(e, 'SocialOgDescription')}
          size='small'
          variant='outlined'
          placeholder={t('page_info_about_placeholder')}
          inputProps={{ maxLength: socialShareDescriptionLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_seo_url')}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgImage}
          onChange={(e) => handleDataChange(e, 'SocialOgImage')}
          size='small'
          variant='outlined'
          placeholder={t('page_seo_url_placeholder')}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box className='rowBox'>
        <TwitterSettings
          handleImageDelete={handleImageDelete}
          handleGallery={handleGallery}
          selectedImage={selectedImage}
          selectedSection={selectedSection}
          confirmImageDelete={confirmImageDelete}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_ogsite')}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgSiteName}
          onChange={(e) => handleDataChange(e, 'SocialOgSiteName')}
          size='small'
          variant='outlined'
          placeholder={t('page_info_about_placeholder')}
          inputProps={{ maxLength: socialShareNameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_ogtype')}
        </Typography>
        <FormControl size='small' variant='outlined' sx={{ width: '100%' }}>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={socialShareInfo.SocialOgType}
            size='small'
            variant='outlined'
            onChange={(e) => handleDataChange(e, 'SocialOgType')}
            IconComponent={() => <ExpandMore />}
          >
            {ogTypes.map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  key={index}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 0, 0, 0.16)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.16)',
                    },
                  }}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_ogurl')}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgURL}
          onChange={(e) => handleDataChange(e, 'SocialOgURL')}
          variant='outlined'
          size='small'
          placeholder={t('page_ogurl_placeholder')}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_oglocal')}
        </Typography>
        <FormControl size='small' variant='outlined' sx={{ width: '100%' }}>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            size='small'
            variant='outlined'
            value={socialShareInfo.SocialOgLocale}
            onChange={(e) => handleDataChange(e, 'SocialOgLocale')}
            IconComponent={() => <ExpandMore />}
          >
            {ogLocale.map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  key={index}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 0, 0, 0.16)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.16)',
                    },
                  }}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={initialSocialShare.current === socialShareInfo}
          sx={{ width: '100%' }}
          onClick={saveSocialShare}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default SocialShare;
