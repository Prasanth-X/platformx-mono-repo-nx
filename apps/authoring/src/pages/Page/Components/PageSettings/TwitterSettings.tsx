import { ArrowUpward, Cached, Delete } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageSettings } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import siteLevelSchema from '../../../../utils/siteLevelSettings.json';
import { useStyles } from '../PrelemSettings/PrelemSettings.styles';
import './PageSettings.css';

import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import {
  descriptionLength,
  largePreviewDescriptionLength,
  nameLength,
  previewNameLength,
  smallPreviewDescriptionLength,
  smallPreviewNameLength,
} from '../../utils/constant';
import { PageTwitterInformation } from '../../utils/editTypes';
interface TwitterSettingsinsting {
  handleGallery?: any;
  selectedImage?: any;
  selectedSection?: any;
  handleImageDelete?: any;
  confirmImageDelete?: any;
}

const TwitterSettings = ({
  handleGallery,
  selectedImage,
  selectedSection,
  handleImageDelete,
  confirmImageDelete,
}: TwitterSettingsinsting) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const pageInfo = { ...page?.pageSettings };
  const {
    SocialOgTwitterTitle,
    SocialOgTwitterDescription,
    SocialOgTwitterImage,
    SocialOgTwitterURL,
    SocialTwitterCardSize,
    PageName,
    PageDescription,
    PageURL,
  } = pageInfo;
  const data = {
    SocialOgTwitterTitle:
      SocialOgTwitterTitle != undefined
        ? SocialOgTwitterTitle
        : PageName == undefined
        ? ''
        : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterDescription:
      SocialOgTwitterDescription != undefined
        ? SocialOgTwitterDescription
        : PageDescription == undefined
        ? ''
        : PageDescription,
    SocialOgTwitterImage:
      SocialOgTwitterImage != undefined ? SocialOgTwitterImage : '',
    SocialOgTwitterURL:
      SocialOgTwitterURL != undefined
        ? SocialOgTwitterURL
        : PageURL == undefined
        ? ''
        : PageURL,
    SocialTwitterCardSize:
      SocialTwitterCardSize != undefined
        ? SocialTwitterCardSize
        : 'summary_large_image',
  };
  const initialTwitter = useRef(data);
  const [twitterInfo, setTwitterInfo] = useState<PageTwitterInformation>(
    initialTwitter.current
  );
  const [expanded, setExpanded] = React.useState<string | false>('page-info');
  const twitterNameLength = nameLength;
  const twitterDescriptionLength = descriptionLength;
  const twitterLargePreviewNameLength = previewNameLength;
  const twitterLargePreviewDescriptionLength = largePreviewDescriptionLength;
  const twitterSmallPreviewNameLength = smallPreviewNameLength;
  const twitterSmallPreviewDescriptionLength = smallPreviewDescriptionLength;
  const classes = useStyles(twitterInfo.SocialTwitterCardSize)();

  useEffect(() => {
    if (selectedImage.Thumbnail != '' && selectedSection == 'twitter share') {
      const twitterInfoUpdated = { ...twitterInfo };
      twitterInfoUpdated.SocialOgTwitterImage = selectedImage.Thumbnail;
      setTwitterInfo(twitterInfoUpdated);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (confirmImageDelete && selectedSection == 'twitter share') {
      const twitterInfoUpdated = { ...twitterInfo, SocialOgTwitterImage: '' };
      setTwitterInfo(twitterInfoUpdated);
    }
  }, [confirmImageDelete]);

  useEffect(() => {
    if (page?.pageSettings) {
      initialTwitter.current = {
        ...initialTwitter.current,
        ...page.pageSettings,
      };
      setTwitterInfo(initialTwitter.current);
    }
  }, [page?.pageSettings]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    const twitterInfoUpdated = { ...twitterInfo };
    twitterInfoUpdated[fieldType] = event.target.value;
    setTwitterInfo(twitterInfoUpdated);
  };
  //Function to open local image selection window
  const onUploadClick = () => {
    handleGallery(true, 'Images', 'twitter share');
  };
  const saveTwitterInfo = () => {
    dispatch(updatePageSettings(twitterInfo));
    showToastSuccess(`${t('twitter_settings_info_toast')} ${t('saved_toast')}`);
  };

  return (
    <Accordion
      expanded={expanded === 'twitter-setings'}
      onChange={handleChange('twitter-setings')}
      sx={{
        boxShadow: 'none',
        minHeight: 0,
        '&.Mui-expanded': {
          margin: '0px',
          minHeight: 0,
        },
        '& .Platform-x-AccordionSummary-root': {
          padding: 0,
          margin: '0 !important',
          minHeight: '0 !important',
        },
      }}
    >
      <AccordionSummary
        sx={{
          '&.mui-expanded': {
            minHeight: 0,
            margin: '0',
          },
          '& .Platform-x-AccordionSummary-content': {
            margin: '0 !important',
          },
        }}
        expandIcon={
          <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
        }
        aria-controls="twitter-setings-content"
        id="twitter-setings-header"
      >
        <Typography className="labelbox" variant="p4bold">
          {t('page_twitter_title')}
        </Typography>
      </AccordionSummary>
      <Box className="rowBox">
        {twitterInfo.SocialTwitterCardSize == 'summary_large_image' ? (
          <Box>
            {twitterInfo.SocialOgTwitterImage == '' ? (
              <Box className={classes.uploadImageBox} onClick={onUploadClick}>
                <Typography className="switchbox" variant="p4regular">
                  <Box className={classes.blackRoundIcon}>
                    <ArrowUpward />
                  </Box>
                  {t('page_choose_image')}
                </Typography>
              </Box>
            ) : (
              <Box className={classes.imageBox}>
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  style={{ height: 'auto' }}
                />
                <Box className={classes.imageBoxInner}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
                      <Box className={classes.blackRoundIcon}>
                        <Cached />
                      </Box>
                      <Typography className="labelbox" variant="p4regular">
                        {t('replace')}
                      </Typography>
                    </Box>
                    <Box
                      ml={3}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleImageDelete('twitter share')}
                    >
                      <Box className={classes.blackRoundIcon}>
                        <Delete />
                      </Box>
                      <Typography className="labelbox" variant="p4regular">
                        {t('delete')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            <Box className="rowBox">
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterTitle.substring(
                  0,
                  twitterLargePreviewNameLength
                )}
                {twitterInfo.SocialOgTwitterTitle.length >
                  twitterLargePreviewNameLength && <span>...</span>}
              </Typography>
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterDescription.substring(
                  0,
                  twitterLargePreviewDescriptionLength
                )}
                {twitterInfo.SocialOgTwitterDescription.length >
                  twitterLargePreviewDescriptionLength && <span>...</span>}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box mt={2} className={classes.TwiterInfoImageBox}>
            {twitterInfo.SocialOgTwitterImage && (
              <Box className={classes.imageBoxInner}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
                    <Box className={classes.blackRoundIcon}>
                      <Cached />
                    </Box>
                    <Typography className="labelbox" variant="p4regular">
                      {t('replace')}
                    </Typography>
                  </Box>
                  <Box
                    ml={3}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleImageDelete('twitter share')}
                  >
                    <Box className={classes.blackRoundIcon}>
                      <Delete />
                    </Box>
                    <Typography className="labelbox" variant="p4regular">
                      {t('delete')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box className={classes.TwiterInfoBox}>
              {twitterInfo.SocialOgTwitterImage == '' ? (
                <Box className={classes.uploadImageBox} onClick={onUploadClick}>
                  <Typography className="switchbox" variant="p4regular">
                    <Box className={classes.blackRoundIcon}>
                      <ArrowUpward />
                    </Box>
                    {t('page_choose_image')}
                  </Typography>
                </Box>
              ) : (
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  alt="image file"
                  width="100%"
                  style={{ height: 'auto' }}
                />
              )}
            </Box>
            <Box p={1} className={classes.imageTitle}>
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterTitle.substring(
                  0,
                  twitterSmallPreviewNameLength
                )}
                {twitterInfo.SocialOgTwitterTitle.length >
                  twitterSmallPreviewNameLength && <span>...</span>}
              </Typography>
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterDescription.substring(
                  0,
                  twitterSmallPreviewDescriptionLength
                )}
                {twitterInfo.SocialOgTwitterDescription.length >
                  twitterSmallPreviewDescriptionLength && <span>...</span>}
              </Typography>
              <Typography className="labelbox" variant="p4regular">
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
            </Box>
          </Box>
        )}
        <Box className="rowBox">
          <Typography className="labelbox" variant="p4regular">
            {t('page_twitter_size')}
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={twitterInfo.SocialTwitterCardSize}
              onChange={(e) => handleDataChange(e, 'SocialTwitterCardSize')}
            >
              <FormControlLabel
                value="summary"
                control={<Radio />}
                label={t('small')}
                sx={{
                  '.Platform-x-FormControlLabel-label': {
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_SM,
                      xl: ThemeConstants.FONTSIZE_DEFAULT,
                    },
                    textTransform: 'capitalize',
                  },
                }}
              />
              <FormControlLabel
                value="summary_large_image"
                control={<Radio />}
                label={t('large')}
                sx={{
                  '.Platform-x-FormControlLabel-label': {
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_SM,
                      xl: ThemeConstants.FONTSIZE_DEFAULT,
                    },
                    textTransform: 'capitalize',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className="rowBox">
          <Typography className="labelbox" variant="p4regular">
            {t('page_twitter_ogtitle')}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterTitle}
            onChange={(e) => handleDataChange(e, 'SocialOgTwitterTitle')}
            variant="outlined"
            size="small"
            placeholder={t('page_search_title_placeholder')}
            inputProps={{ maxLength: twitterNameLength }}
          />
        </Box>
        <Box className="rowBox">
          <Typography className="labelbox" variant="p4regular">
            {t('page_twitter_ogdescription')}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterDescription}
            onChange={(e) => handleDataChange(e, 'SocialOgTwitterDescription')}
            variant="outlined"
            size="small"
            placeholder={t('page_info_about_placeholder')}
            inputProps={{ maxLength: twitterDescriptionLength }}
          />
        </Box>
        <Box className="rowBox">
          <Typography className="labelbox" variant="p4regular">
            {t('page_twitter_url')}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterImage}
            onChange={(e) => handleDataChange(e, 'SocialOgTwitterImage')}
            variant="outlined"
            size="small"
            placeholder={t('page_seo_url_placeholder')}
            inputProps={{ readOnly: true }}
          />
        </Box>
        <Box className="rowBox">
          <Button
            variant="contained"
            disabled={initialTwitter.current === twitterInfo}
            sx={{ width: '100%' }}
            onClick={saveTwitterInfo}
          >
            {t('done')}
          </Button>
        </Box>
      </Box>
    </Accordion>
  );
};
export default TwitterSettings;
