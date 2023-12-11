import { useMutation } from '@apollo/client';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  showToastError,
  showToastSuccess,
} from '../../../../../components/toastNotification/toastNotificationReactTostify';
import {
  publish_article,
  update_article,
} from '../../../../../services/article/article.api';
import ThemeConstants from '../../../../../theme/variable';
import { authInfo } from '../../../../../utils/authConstants';
import { handleHtmlTags } from '../../../../../utils/helperFunctions';
import { SocialShareInfoProps } from '../../../../articles/utils/types';

const ArticleSocialShare = ({
  handleGallery,
  selectedImage,
  handleImageDelete,
  confirmImageDelete,
  selectedSection,
  selectedArticle,
  setSelectedArticle,
  articleSettingsPanelState,
  getArticle,
}) => {
  const { t, i18n } = useTranslation();
  const [socialShareInfo, setSocialShareInfo] = useState<SocialShareInfoProps>({
    SeoTitle: '',
    SocialOgTitle: '',
    SocialOgDescription: '',
    SocialOgSiteName: '',
    SocialOgType: '',
    SocialOgURL: '',
    // SocialOgLocale: "",
    SocialOgImage: '',
    SocialOgTwitterTitle: '',
    SocialOgTwitterDescription: '',
    SocialOgTwitterImage: '',
    SocialOgTwitterURL: '',
    SocialTwitterCardSize: '',
    PageTags: [],
  });
  const socialShareNameLength = 100;
  const socialShareDescriptionLength = 200;
  const [updateMutate] = useMutation(update_article);
  const [publishsavedmutate] = useMutation(publish_article);

  useEffect(() => {
    setSocialShareInfo({
      SeoTitle:
        selectedArticle?.ArticleSettings?.SeoTitle != ''
          ? selectedArticle?.ArticleSettings?.SeoTitle
          : selectedArticle?.Title,
      SocialOgTitle:
        selectedArticle?.ArticleSettings?.SocialOgTitle != ''
          ? selectedArticle?.ArticleSettings?.SocialOgTitle
          : selectedArticle?.Title,
      SocialOgDescription:
        selectedArticle?.ArticleSettings?.SocialOgDescription != ''
          ? selectedArticle?.ArticleSettings?.SocialOgDescription
          : selectedArticle?.Description != ''
          ? handleHtmlTags(selectedArticle?.Description)
          : '',
      SocialOgSiteName:
        selectedArticle?.ArticleSettings?.SocialOgSiteName != undefined
          ? selectedArticle?.ArticleSettings?.SocialOgSiteName
          : '',
      SocialOgType:
        selectedArticle?.ArticleSettings?.SocialOgType != undefined
          ? selectedArticle?.ArticleSettings?.SocialOgType
          : 'Website',
      SocialOgURL:
        selectedArticle?.ArticleSettings?.SocialOgURL != ''
          ? selectedArticle?.ArticleSettings?.SocialOgURL
          : selectedArticle?.Page_State === 'DRAFT'
          ? selectedArticle?.CurrentPageURL
          : `${authInfo.publishUri + i18n.language}/` +
            `article/${selectedArticle?.CurrentPageURL}`,
      // SocialOgLocale:
      // selectedArticle?.ArticleSettings?.SocialOgLocale != undefined
      //     ? selectedArticle?.ArticleSettings?.SocialOgLocale
      //     : "en_US",
      SocialOgImage:
        selectedArticle?.ArticleSettings?.SocialOgImage != ''
          ? selectedArticle?.ArticleSettings?.SocialOgImage
          : selectedArticle?.Banner,
      SocialOgTwitterTitle:
        selectedArticle?.ArticleSettings?.SocialOgTwitterTitle != ''
          ? selectedArticle?.ArticleSettings?.SocialOgTwitterTitle
          : selectedArticle?.Title,
      SocialOgTwitterDescription:
        selectedArticle?.ArticleSettings?.SocialOgTwitterDescription != ''
          ? selectedArticle?.ArticleSettings?.SocialOgTwitterDescription
          : handleHtmlTags(selectedArticle?.Description),
      SocialOgTwitterImage:
        selectedArticle?.ArticleSettings?.SocialOgTwitterImage != ''
          ? selectedArticle?.ArticleSettings?.SocialOgTwitterImage
          : selectedArticle?.Banner,
      SocialOgTwitterURL:
        selectedArticle?.ArticleSettings?.SocialOgTwitterURL != ''
          ? selectedArticle?.ArticleSettings?.SocialOgTwitterURL
          : selectedArticle?.Page_State === 'DRAFT'
          ? selectedArticle?.CurrentPageURL
          : `${authInfo.publishUri + i18n.language}/` +
            `article/${selectedArticle?.CurrentPageURL}`,
      SocialTwitterCardSize:
        selectedArticle?.ArticleSettings?.SocialTwitterCardSize != ''
          ? selectedArticle?.ArticleSettings?.SocialTwitterCardSize
          : 'summary_large_image',
      PageTags:
        selectedArticle?.ArticleSettings?.PageTags != undefined
          ? selectedArticle?.ArticleSettings?.PageTags
          : [],
    });
  }, [selectedArticle]);

  const getDisabledState = () => {
    if (
      JSON.stringify(selectedArticle?.ArticleSettings?.SocialOgTitle) ===
        JSON.stringify(socialShareInfo?.SocialOgTitle) &&
      JSON.stringify(selectedArticle?.ArticleSettings?.SocialOgDescription) ===
        JSON.stringify(socialShareInfo?.SocialOgDescription) &&
      JSON.stringify(selectedArticle?.ArticleSettings?.SocialOgImage) ===
        JSON.stringify(socialShareInfo?.SocialOgImage) &&
      JSON.stringify(selectedArticle?.ArticleSettings?.PageTags) ===
        JSON.stringify(socialShareInfo?.PageTags)
    ) {
      return true;
    } else {
      return false;
    }
  };
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

  //Function to open local image selection window
  const onUploadClick = () => {
    handleGallery(true, 'Images', 'social share');
  };

  const publishArticle = () => {
    const articleToSend = {
      Page: selectedArticle.Page,
      ParentPageURL: selectedArticle.ParentPageURL,
      CurrentPageURL: selectedArticle.CurrentPageURL,
      // Page_LastModifiedBy: username
    };
    publishsavedmutate({
      variables: {
        input: articleToSend,
      },
    })
      .then((resp) => {
        showToastSuccess(`${t('article')} ${t('updated_toast')}`);
        getArticle(0, 10);
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
    if (
      socialShareInfo.SocialOgTitle == '' ||
      socialShareInfo.SocialOgDescription == '' ||
      socialShareInfo.SocialOgImage == '' ||
      socialShareInfo.PageTags.length == 0
    ) {
      showToastError(t('mandatory_fileds_toast'));
    } else {
      const updatedArticle = {
        ...selectedArticle,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        ArticleSettings: {
          ...selectedArticle?.ArticleSettings,
          SeoKeywords: [],
        },
      };
      updatedArticle.ArticleSettings = { ...socialShareInfo };
      setSelectedArticle(() => ({ ...updatedArticle }));
      updateMutate({
        variables: {
          input: updatedArticle,
        },
      }).then((resp) => {
        if (
          selectedArticle.Page_State &&
          selectedArticle.Page_State === 'DRAFT'
        ) {
          showToastSuccess(`${t('article')} ${t('updated_toast')}`);
        } else {
          publishArticle();
        }
      });
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(socialShareInfo?.SocialOgURL);
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

  return (
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Box sx={{ border: '2px solid #e2e2e2', borderRadius: '5px' }} mt={2}>
        {socialShareInfo?.SocialOgImage == '' ? (
          <Box
            sx={{
              borderRadius: '5px',
              border: 'dashed 2px #707070',
              padding: '20px',
              cursor: 'pointer',
              height: '147px',
              backgroundColor: '#f5f6f8',
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={onUploadClick}
            // mb={2}
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
                <ArrowUpwardIcon style={{ color: '#fff' }} />
              </Box>
              {t('page_choose_image')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: 'relative' }}>
            <img
              src={socialShareInfo?.SocialOgImage}
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
                backgroundColor: '#7470708a',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ cursor: 'pointer' }} onClick={onUploadClick}>
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
                    <CachedIcon sx={{ color: '#626060' }} />
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
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('article_seo_title')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('article_seo_title_tp')}
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
        value={socialShareInfo?.SocialOgTitle}
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
        {t('article_seo_about')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('article_seo_about')}
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
        value={socialShareInfo?.SocialOgDescription}
        onChange={(e) => handleDataChange(e, 'SocialOgDescription')}
        variant='outlined'
        placeholder={t('page_search_description_placeholder')}
        inputProps={{ maxLength: socialShareDescriptionLength }}
      />

      <Typography variant='subtitle1' mt={2} mb={1}>
        {t('article_seo_url')}
      </Typography>
      <TextField
        multiline
        value={socialShareInfo?.SocialOgURL}
        // onChange={(e) => handleDataChange(e, 'PageURL')}
        variant='outlined'
        placeholder={t('article_seo_url_placeholder')}
        sx={{
          '.Platform-x-OutlinedInput-root': { color: '#1a0db1' },
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position='start'>
              <ContentCopyRoundedIcon
                sx={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '18px',
                  backgroundColor: '#fff',
                }}
                onClick={() => handleCopyURL()}
              />
            </InputAdornment>
          ),
        }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignimageInstances: 'center',
          textTransform: 'capitalize',
        }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('Keywords')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('article_keywords_tp')}
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
                  key={index}
                  variant='outlined'
                  label={option}
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
          <TextField
            {...params}
            variant='outlined'
            placeholder={
              socialShareInfo?.PageTags?.length > 0
                ? ''
                : t('page_info_tags_placeholder')
            }
          />
        )}
        sx={{
          '.Platform-x-OutlinedInput-root ': {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px',
          },
          '.Platform-x-Autocomplete-tag': {
            height: '40px',
            margin: '0 5px 5px 0',
          },
          '.Platform-x-Chip-label': {
            padding: '0 5px',
          },
          '.Platform-x-InputBase-input': {
            padding: 0,
            width: '150px',
          },
        }}
      />
      <Divider sx={{ marginTop: '20px' }} />

      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={getDisabledState()}
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
export default ArticleSocialShare;
