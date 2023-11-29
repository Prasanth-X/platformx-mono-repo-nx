import { useMutation } from '@apollo/client';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  showToastError,
  showToastSuccess,
} from '../../../../components/toastNotification/toastNotificationReactTostify';
import { publish_vod, update_vod } from '../../../../services/vod/vod.api';
import ThemeConstants from '../../../../theme/variable';
import { authInfo } from '../../../../utils/authConstants';
import { getSubDomain, handleHtmlTags, trimString } from '../../../../utils/helperFunctions';
import { AutoText, useStyles } from './vodSocialShare.styles';
import { SocialShareProps } from './vosSocialShare.types';

const VodSocialShare = ({
  handleGallery,
  selectedImage,
  handleImageDelete,
  confirmImageDelete,
  selectedSection,
  selectedVod,
  setSelectedVod,
  vodSettingsPanelState,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [socialShareInfo, setSocialShareInfo] = useState<SocialShareProps>({
    SeoTitle: '',
    SocialOgTitle: '',
    SocialOgDescription: '',
    SocialOgSiteName: '',
    SocialOgType: '',
    SocialOgURL: '',
    SocialOgLocale: '',
    SocialOgImage: '',
    SocialOgTwitterTitle: '',
    SocialOgTwitterDescription: '',
    SocialOgTwitterImage: '',
    SocialOgTwitterURL: '',
    SocialTwitterCardSize: '',
    PageTags: [],
    SeoDescription: '',
    SeoKeywords: [],
  });
  const socialShareNameLength = 100;
  const socialShareDescriptionLength = 160;
  const [updateMutate] = useMutation(update_vod);
  const [publishsavedmutate] = useMutation(publish_vod);

  useEffect(() => {
    setSocialShareInfo({
      SeoTitle:
        selectedVod?.PageSettings?.SeoTitle != ''
          ? selectedVod?.PageSettings?.SeoTitle
          : selectedVod?.Title,
      SocialOgTitle:
        selectedVod?.PageSettings?.SocialOgTitle != ''
          ? selectedVod?.PageSettings?.SocialOgTitle
          : selectedVod?.Title,
      SocialOgDescription:
        selectedVod?.PageSettings?.SocialOgDescription != ''
          ? selectedVod?.PageSettings?.SocialOgDescription
          : selectedVod?.Description != ''
          ? handleHtmlTags(selectedVod?.Description)
          : '',
      SeoDescription:
        selectedVod?.PageSettings?.SocialOgDescription != ''
          ? selectedVod?.PageSettings?.SocialOgDescription
          : selectedVod?.Description != ''
          ? handleHtmlTags(selectedVod?.Description)
          : '',
      SocialOgSiteName:
        selectedVod?.PageSettings?.SocialOgSiteName != undefined
          ? selectedVod?.PageSettings?.SocialOgSiteName
          : '',
      SocialOgType:
        selectedVod?.PageSettings?.SocialOgType != undefined
          ? selectedVod?.PageSettings?.SocialOgType
          : 'Website',
      SocialOgURL:
        selectedVod?.PageSettings?.SocialOgURL != ''
          ? selectedVod?.PageSettings?.SocialOgURL
          : `${getSubDomain()}/${i18n.language}/` +
            `video${selectedVod?.CurrentPageURL}`,
      SocialOgLocale:
        selectedVod?.PageSettings?.SocialOgLocale != undefined
          ? selectedVod?.PageSettings?.SocialOgLocale
          : 'en_US',
      SocialOgImage:
        selectedVod?.PageSettings?.SocialOgImage != ''
          ? selectedVod?.PageSettings?.SocialOgImage
          : selectedVod?.Thumbnail,
      SocialOgTwitterTitle:
        selectedVod?.PageSettings?.SocialOgTwitterTitle != ''
          ? selectedVod?.PageSettings?.SocialOgTwitterTitle
          : selectedVod?.Title,
      SocialOgTwitterDescription:
        selectedVod?.PageSettings?.SocialOgTwitterDescription != ''
          ? selectedVod?.PageSettings?.SocialOgTwitterDescription
          : handleHtmlTags(selectedVod?.Description),
      SocialOgTwitterImage:
        selectedVod?.PageSettings?.SocialOgTwitterImage != ''
          ? selectedVod?.PageSettings?.SocialOgTwitterImage
          : selectedVod?.Thumbnail,
      SocialOgTwitterURL:
        selectedVod?.PageSettings?.SocialOgTwitterURL != ''
          ? selectedVod?.PageSettings?.SocialOgTwitterURL
          : selectedVod?.Page_State === 'DRAFT'
          ? selectedVod?.CurrentPageURL
          : `${getSubDomain()}/${i18n.language}/${
              selectedVod?.CurrentPageURL
            }`,
      SocialTwitterCardSize:
        selectedVod?.PageSettings?.SocialTwitterCardSize != ''
          ? selectedVod?.PageSettings?.SocialTwitterCardSize
          : 'summary_large_image',
      PageTags:
        selectedVod?.PageSettings?.PageTags != undefined
          ? selectedVod?.PageSettings?.PageTags
          : [],
      SeoKeywords:
        selectedVod?.PageSettings?.PageTags != undefined
          ? selectedVod?.PageSettings?.PageTags
          : [],
    });
  }, [selectedVod]);

  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    const socialShareInfoUpdated = event.target.value;
    if (fieldType === 'SocialOgTitle') {
      setSocialShareInfo(() => ({
        ...socialShareInfo,
        SocialOgTitle: socialShareInfoUpdated,
        SocialOgTwitterTitle: socialShareInfoUpdated,
      }));
    }
    if (fieldType === 'SocialOgDescription') {
      setSocialShareInfo(() => ({
        ...socialShareInfo,
        SocialOgDescription: socialShareInfoUpdated,
        SocialOgTwitterDescription: socialShareInfoUpdated,
      }));
    }
  };

  const updateStructureData = () => {
    const VodStructureData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VideoObject',
          contentUrl: selectedVod?.DsapceVideoUrl,
          name: socialShareInfo?.SocialOgTitle
            ? trimString(handleHtmlTags(socialShareInfo?.SocialOgTitle), 100)
            : '',
          description: socialShareInfo?.SocialOgDescription
            ? trimString(
                handleHtmlTags(socialShareInfo?.SocialOgDescription),
                200
              )
            : '',
          embedUrl: selectedVod?.DsapceVideoUrl,
          thumbnailUrl: {
            '@id': socialShareInfo?.SocialOgImage,
          },
        },
      ],
    };
    return VodStructureData;
  };

  useEffect(() => {
    updateStructureData();
  }, [socialShareInfo]);
  //Function to open local image selection window
  const onUploadClick = () => {
    handleGallery(true, 'Images', 'social share');
  };

  const updateDraftVodSocialShareSetting = () => {
    const updatedVod = { ...selectedVod };
    const structureData = updateStructureData();
    updatedVod.StructureData = JSON.stringify(structureData);
    updatedVod.PageSettings = {
      ...socialShareInfo,
      SeoDescription: socialShareInfo?.SocialOgDescription,
      SeoKeywords: socialShareInfo?.PageTags,
    };
    setSelectedVod(() => ({ ...updatedVod }));
    updateMutate({
      variables: {
        input: updatedVod,
      },
    }).then((resp) => {
      showToastSuccess(`${t('vod')} ${t('updated_toast')}`);
    });
  };

  const updatePublishVodSocialShareSetting = () => {
    const updatedVod = { ...selectedVod };
    const structureData = updateStructureData();
    updatedVod.StructureData = JSON.stringify(structureData);
    updatedVod.PageSettings = {
      ...socialShareInfo,
      SeoDescription: socialShareInfo?.SocialOgDescription,
      SeoKeywords: socialShareInfo?.PageTags,
    };
    setSelectedVod(() => ({ ...updatedVod }));
    const requestdto = {
      page: selectedVod.Page,
      parentpageurl: selectedVod.ParentPageURL,
      currentpageurl: selectedVod.CurrentPageURL,
    };
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    publishsavedmutate({
      variables: {
        input: requestdto,
        vodRequest: updatedVod,
        timeZone: timeZone,
      },
    })
      .then((resp) => {
        showToastSuccess(`${t('vod')} ${t('updated_toast')}`);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };

  const saveSocialShare = () => {
    if (selectedVod.Page_State && selectedVod.Page_State === 'DRAFT') {
      updateDraftVodSocialShareSetting();
    }
    if (selectedVod.Page_State && selectedVod.Page_State === 'PUBLISH') {
      updatePublishVodSocialShareSetting();
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(
      selectedVod?.Page_State === 'DRAFT'
        ? selectedVod?.CurrentPageURL
        : `${getSubDomain()}/${i18n.language}/${
            selectedVod?.CurrentPageURL
          }`
    );
  };
  useEffect(() => {
    if (selectedImage.Thumbnail != '' && selectedSection == 'social share') {
      const socialShareInfoUpdated = { ...socialShareInfo };
      socialShareInfoUpdated.SocialOgImage = selectedImage.Thumbnail;
      socialShareInfoUpdated.SocialOgTwitterImage = selectedImage.Thumbnail;
      setSocialShareInfo(socialShareInfoUpdated);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (confirmImageDelete && selectedSection == 'social share') {
      const socialShareInfoUpdated = { ...socialShareInfo, SocialOgImage: '' };
      setSocialShareInfo(socialShareInfoUpdated);
    }
  }, [confirmImageDelete]);
  const getDisabledState = () => {
    if (socialShareInfo?.SocialOgTitle) {
      if (
        JSON.stringify(selectedVod?.PageSettings?.SocialOgTitle) ===
          JSON.stringify(socialShareInfo?.SocialOgTitle) &&
        JSON.stringify(selectedVod?.PageSettings?.SocialOgDescription) ===
          JSON.stringify(socialShareInfo?.SocialOgDescription) &&
        JSON.stringify(selectedVod?.PageSettings?.SocialOgImage) ===
          JSON.stringify(socialShareInfo?.SocialOgImage) &&
        JSON.stringify(selectedVod?.PageSettings?.PageTags) ===
          JSON.stringify(socialShareInfo?.PageTags)
      ) {
        return true;
      } else {
        return false;
      }
    }
    {
      return true;
    }
  };

  return (
    <Box className={classes.socialShareContainer}>
      <Box className={classes.socialOgImageContainer} mt={2}>
        {socialShareInfo?.SocialOgImage == '' ? (
          <Box className={classes.noImage} onClick={onUploadClick}>
            <Typography variant='h5regular' className={classes.noImageText}>
              <Box className={classes.arrowUpContainer} mr={2}>
                <ArrowUpwardIcon className={classes.arrowUpIcon} />
              </Box>
              {t('page_choose_image')}
            </Typography>
          </Box>
        ) : (
          <Box className={classes.hasImage}>
            <img
              src={socialShareInfo?.SocialOgImage}
              alt='image file'
              width='100%'
            />
            <Box className={classes.imageReplaceContainer}>
              <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
                <Box className={classes.cashedIconContainer}>
                  <CachedIcon />
                </Box>
                <Typography variant='h7regular' className={classes.replaceText}>
                  {t('replace')}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Typography
        variant='subtitle1'
        className={`${classes.titleLabel} drawer-label`}
      >
        {t('vod_ss_title')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography variant='h7regular' mb={1}>
                {t('vod_ss_title_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon className={classes.iconHover} />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo?.SocialOgTitle}
        onChange={(e) => handleDataChange(e, 'SocialOgTitle')}
        variant='outlined'
        placeholder={t('page_search_title_placeholder')}
        inputProps={{ maxLength: socialShareNameLength }}
      />
      <Typography
        variant='subtitle1'
        className={`${classes.titleLabel} drawer-label`}
      >
        {t('vod_ss_about')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography variant='h7regular' mb={1}>
                {t('vod_ss_about_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon className={classes.iconHover} />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={socialShareInfo?.SocialOgDescription}
        onChange={(e) => handleDataChange(e, 'SocialOgDescription')}
        variant='outlined'
        placeholder={t('page_search_description_placeholder')}
        inputProps={{ maxLength: socialShareDescriptionLength }}
      />

      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant='subtitle1'
        className={`${classes.titleLabel} drawer-label`}
      >
        {t('Keywords')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography variant='h7regular' mb={1}>
                {t('vod_keywords_tp')}
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon className={classes.iconHover} />
          </Box>
        </Tooltip>
      </Typography>
      <Autocomplete
        multiple
        id='tags-filled'
        value={
          socialShareInfo?.PageTags?.length > 0
            ? [...socialShareInfo.PageTags]
            : []
        }
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim().length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          const pageInfoUpdated = { ...socialShareInfo };
          pageInfoUpdated.PageTags = updatedtags;
          setSocialShareInfo(pageInfoUpdated);
        }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map(
            (option: string, index: number) =>
              option && (
                <Chip
                  variant='outlined'
                  label={option}
                  key={index}
                  deleteIcon={
                    <DeleteIcon
                      sx={{ color: ThemeConstants.PRIMARY_MAIN_COLOR }}
                    />
                  }
                  sx={{
                    '.Platform-x-Chip-deleteIcon': {
                      color: ThemeConstants.BLACK_COLOR,
                    },
                  }}
                  {...getTagProps({ index })}
                />
              )
          )
        }
        renderInput={(params) => (
          <AutoText
            {...params}
            variant='outlined'
            placeholder={
              socialShareInfo?.PageTags?.length > 0
                ? ''
                : t('page_info_tags_placeholder')
            }
          />
        )}
      />
      <Divider sx={{ marginTop: '20px' }} />

      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={getDisabledState()}
          onClick={saveSocialShare}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default VodSocialShare;
