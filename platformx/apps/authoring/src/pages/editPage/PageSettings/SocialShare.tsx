import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageSettings } from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../theme/variable';
import siteLevelSchema from '../../../utils/siteLevelSettings.json';
import { PageSocialShareInformation } from '../utils/editTypes';
import TwitterSettings from './TwitterSettings';
const SocialShare = ({
  handleGallery,
  selectedImage,
  handleImageDelete,
  confirmImageDelete,
  selectedSection,
}) => {
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
    SocialOgLocale:
      SocialOgLocale !== undefined ? SocialOgLocale : t('en_US'),
    SocialOgImage: SocialOgImage !== undefined ? SocialOgImage : '',
  }
  const initialSocialShare = useRef<PageSocialShareInformation>(data)
  const [socialShareInfo, setSocialShareInfo] =
    useState<PageSocialShareInformation>(initialSocialShare.current);


  const ogTypes = [t('website'), t('article')];
  const ogLocale = [t('page_en_us'), t('page_en_gb'), t('page_en_fr')];
  const socialShareNameLength = 250;
  const socialShareDescriptionLength = 1000;
  const socialSharePreviewNameLength = 166;
  const socialSharePreviewDescriptionLength = 78;

  useEffect(() => {
    if (page?.pageSettings) {
      initialSocialShare.current = { ...initialSocialShare.current, ...page.pageSettings }
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
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Box sx={{ border: '2px solid #e2e2e2', borderRadius: '5px' }} mt={2}>
        {socialShareInfo.SocialOgImage === '' ?
          <Box
            sx={{
              borderRadius: '5px',
              border: `dashed 2px ${ThemeConstants.LIGHT_GREY_COLOR}`,
              padding: '20px',
              cursor: 'pointer',
              height: '147px',
              backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={onUploadClick}
            mb={2}
          >
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                textTransform: 'capitalize',
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                mr={2}
              >
                <ArrowUpwardIcon
                  style={{ color: ThemeConstants.WHITE_COLOR }}
                />
              </Box>
              {t('page_choose_image')}
            </Typography>
          </Box>
          :
          <Box sx={{ position: 'relative' }}>
            <img
              src={socialShareInfo.SocialOgImage}
              alt='image file'
              width='100%'
            />
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                width: '100%',
                height: '99%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(112, 112, 112, 0.7)',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: ThemeConstants.WHITE_COLOR,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <CachedIcon
                      sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
                    />
                  </Box>
                  <Typography
                    mt={1}
                    sx={{
                      fontSize: ThemeConstants.FONTSIZE_XS,
                      color: ThemeConstants.WHITE_COLOR,
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('replace')}
                  </Typography>
                </Box>
                <Box
                  ml={3}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleImageDelete('social share')}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: ThemeConstants.WHITE_COLOR,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <DeleteIcon
                      sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
                    />
                  </Box>
                  <Typography
                    mt={1}
                    sx={{
                      fontSize: ThemeConstants.FONTSIZE_XS,
                      color: ThemeConstants.WHITE_COLOR,
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('delete')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>}
        <Box m={2}>
          <Typography variant='subtitle2' mt={2}>
            {socialShareInfo.SocialOgURL ? socialShareInfo.SocialOgURL : ''}
          </Typography>
          <Typography
            variant='h6'
            sx={{ fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD }}
          >
            {socialShareInfo.SocialOgTitle.substring(
              0,
              socialSharePreviewNameLength
            )}
            {socialShareInfo.SocialOgTitle.length >
              socialSharePreviewNameLength && <span>...</span>}
          </Typography>
          <Typography variant='subtitle2'>
            {socialShareInfo.SocialOgDescription.substring(
              0,
              socialSharePreviewDescriptionLength
            )}
            {socialShareInfo.SocialOgDescription.length >
              socialSharePreviewDescriptionLength && <span>...</span>}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_seo_title')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_seo_title_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo.SocialOgTitle}
        onChange={(e) => handleDataChange(e, 'SocialOgTitle')}
        variant='outlined'
        placeholder={t('page_search_title_placeholder')}
        inputProps={{ maxLength: socialShareNameLength }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_seo_description')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_seo_des_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo.SocialOgDescription}
        onChange={(e) => handleDataChange(e, 'SocialOgDescription')}
        variant='outlined'
        placeholder={t('page_info_about_placeholder')}
        inputProps={{ maxLength: socialShareDescriptionLength }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_seo_url')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_seo_url_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo.SocialOgImage}
        onChange={(e) => handleDataChange(e, 'SocialOgImage')}
        variant='outlined'
        placeholder={t('page_seo_url_placeholder')}
        inputProps={{ readOnly: true }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <TwitterSettings
        handleImageDelete={handleImageDelete}
        handleGallery={handleGallery}
        selectedImage={selectedImage}
        selectedSection={selectedSection}
        confirmImageDelete={confirmImageDelete}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_ogsite')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_ogsite')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo.SocialOgSiteName}
        onChange={(e) => handleDataChange(e, 'SocialOgSiteName')}
        variant='outlined'
        placeholder={t('page_info_about_placeholder')}
        inputProps={{ maxLength: socialShareNameLength }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_ogtype')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_ogtype')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={socialShareInfo.SocialOgType}
          onChange={(e) => handleDataChange(e, 'SocialOgType')}
          sx={{
            '&:after': {
              borderBottom: `2px solid ${ThemeConstants.BLACK_COLOR}`,
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.16)',
            },
          }}
          IconComponent={() => <ExpandMoreIcon />}
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
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_ogurl')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_ogurl')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo.SocialOgURL}
        onChange={(e) => handleDataChange(e, 'SocialOgURL')}
        variant='outlined'
        placeholder={t('page_ogurl_placeholder')}
        inputProps={{ readOnly: true }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_oglocal')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_oglocal')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <FormControl variant='outlined' sx={{ width: '100%' }}>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={socialShareInfo.SocialOgLocale}
          onChange={(e) => handleDataChange(e, 'SocialOgLocale')}
          sx={{
            '&:after': {
              borderBottom: `2px solid ${ThemeConstants.BLACK_COLOR}`,
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.16)',
            },
          }}
          IconComponent={() => <ExpandMoreIcon />}
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
      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={initialSocialShare.current === socialShareInfo}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
            textTransform: 'capitalize',
          }}
          onClick={saveSocialShare}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default SocialShare;
