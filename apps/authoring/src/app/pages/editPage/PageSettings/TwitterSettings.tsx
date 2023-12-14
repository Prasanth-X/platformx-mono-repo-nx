import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageSettings } from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import siteLevelSchema from '../../../utils/siteLevelSettings.json';
import {
  descriptionLength,
  largePreviewDescriptionLength,
  nameLength,
  previewNameLength,
  smallPreviewDescriptionLength,
  smallPreviewNameLength,
} from '../utils/constants';
import { PageTwitterInformation } from '../utils/editTypes';
const TwitterSettings = ({
  handleGallery,
  selectedImage,
  selectedSection,
  handleImageDelete,
  confirmImageDelete,
}) => {
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
  };

  return (
    <Accordion
      expanded={expanded === 'twitter-setings'}
      onChange={handleChange('twitter-setings')}
      sx={{
        boxShadow: 'none',
        '&.Mui-expanded': {
          margin: '0px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
        }
        aria-controls="twitter-setings-content"
        id="twitter-setings-header"
      >
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: {
              xs: ThemeConstants.FONTSIZE_DEFAULT,
              xl: ThemeConstants.FONTSIZE_MD,
            },
          }}
        >
          {t('page_twitter_title')}
        </Typography>
      </AccordionSummary>
      <Divider />
      <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {twitterInfo.SocialTwitterCardSize == 'summary_large_image' ? (
          <Box
            sx={{
              border: `2px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: '5px',
            }}
            mt={2}
          >
            {twitterInfo.SocialOgTwitterImage == '' ? (
              <Box
                sx={{
                  borderRadius: '5px',
                  border: `dashed 2px ${ThemeConstants.LIGHT_GREY_COLOR}`,
                  padding: '20px',
                  cursor: 'pointer',
                  height: '147px',
                  backgroundColor: '#f5f6f8',
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
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: '#000',
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
            ) : (
              <Box sx={{ position: 'relative' }}>
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  alt="image file"
                  width="100%"
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
                      onClick={() => handleImageDelete('twitter share')}
                    >
                      <Box
                        sx={{
                          borderRadius: '50%',
                          backgroundColor: '#fff',
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
              </Box>
            )}
            <Box m={2}>
              <Typography variant="subtitle2" mt={2}>
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD }}
              >
                {twitterInfo.SocialOgTwitterTitle.substring(
                  0,
                  twitterLargePreviewNameLength
                )}
                {twitterInfo.SocialOgTwitterTitle.length >
                  twitterLargePreviewNameLength && <span>...</span>}
              </Typography>
              <Typography variant="subtitle2">
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
          <Box
            mt={2}
            sx={{
              display: 'flex',
              borderRadius: '10px',
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: ThemeConstants.WHITE_COLOR,
              position: 'relative',
            }}
          >
            {twitterInfo.SocialOgTwitterImage && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  width: '100%',
                  height: '99%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ThemeConstants.LIGHT_GREY_COLOR,
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
                    onClick={() => handleImageDelete('twitter share')}
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
                      {t('dalete')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
                borderRadius: '9px 0px 0px 9px',
                flex: 3,
              }}
            >
              {twitterInfo.SocialOgTwitterImage == '' ? (
                <Box
                  sx={{
                    borderRadius: '5px',
                    border: `dashed 2px ${ThemeConstants.LIGHT_GREY_COLOR}`,
                    padding: '20px',
                    cursor: 'pointer',
                    height: '147px',
                    backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={onUploadClick}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: ThemeConstants.FONTSIZE_SM,
                      color: ThemeConstants.PRIMARY_MAIN_COLOR,
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        backgroundColor: ThemeConstants.BLACK_COLOR,
                        width: '40px',
                        height: '30px',
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
              ) : (
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  alt="image file"
                  width="100%"
                />
              )}
            </Box>
            <Box p={1} sx={{ flex: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD }}
              >
                {twitterInfo.SocialOgTwitterTitle.substring(
                  0,
                  twitterSmallPreviewNameLength
                )}
                {twitterInfo.SocialOgTwitterTitle.length >
                  twitterSmallPreviewNameLength && <span>...</span>}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: ThemeConstants.FONTSIZE_SM }}
              >
                {twitterInfo.SocialOgTwitterDescription.substring(
                  0,
                  twitterSmallPreviewDescriptionLength
                )}
                {twitterInfo.SocialOgTwitterDescription.length >
                  twitterSmallPreviewDescriptionLength && <span>...</span>}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
              >
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
            </Box>
          </Box>
        )}
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignimageInstances: 'center' }}
          mt={2}
          mb={1}
          className="drawer-label"
        >
          {t('page_twitter_size')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('card_size_tp')}
                </Typography>
              </Box>
            }
            placement="right"
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
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignimageInstances: 'center' }}
          mt={2}
          mb={1}
          className="drawer-label"
        >
          {t('page_twitter_ogtitle')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('page_twitter_ogtitle_tp')}
                </Typography>
              </Box>
            }
            placement="right"
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
          value={twitterInfo.SocialOgTwitterTitle}
          onChange={(e) => handleDataChange(e, 'SocialOgTwitterTitle')}
          variant="outlined"
          placeholder={t('page_search_title_placeholder')}
          inputProps={{ maxLength: twitterNameLength }}
        />
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignimageInstances: 'center' }}
          mt={2}
          mb={1}
          className="drawer-label"
        >
          {t('page_twitter_ogdescription')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('page_twitter_ogdescription_tp')}
                </Typography>
              </Box>
            }
            placement="right"
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
          value={twitterInfo.SocialOgTwitterDescription}
          onChange={(e) => handleDataChange(e, 'SocialOgTwitterDescription')}
          variant="outlined"
          placeholder={t('page_info_about_placeholder')}
          inputProps={{ maxLength: twitterDescriptionLength }}
        />
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignimageInstances: 'center' }}
          mt={2}
          mb={1}
          className="drawer-label"
        >
          {t('page_twitter_url')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('page_twiter_url_tp')}
                </Typography>
              </Box>
            }
            placement="right"
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
          value={twitterInfo.SocialOgTwitterImage}
          onChange={(e) => handleDataChange(e, 'SocialOgTwitterImage')}
          variant="outlined"
          placeholder={t('page_seo_url_placeholder')}
          inputProps={{ readOnly: true }}
        />
        <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
          <Button
            variant="contained"
            disabled={initialTwitter.current === twitterInfo}
            sx={{
              backgroundColor: ThemeConstants.BLACK_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.BLACK_COLOR,
              },
              textTransform: 'capitalize',
            }}
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
