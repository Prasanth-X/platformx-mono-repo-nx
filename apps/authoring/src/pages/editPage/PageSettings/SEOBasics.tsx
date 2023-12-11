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
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  updateContentForCard,
  updatePageModel,
  updatePageSettings,
} from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../theme/variable';
import siteLevelSchema from '../../../utils/siteLevelSettings.json';
import BasicSwitch from '../Switch';
import {
  descriptionLength,
  nameLength,
  previewDescriptionLength,
  previewNameLength,
} from '../utils/constants';
import { PageSeoInformation } from '../utils/editTypes';
const SEOBasics = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const { SeoTitle, SeoDescription, SeoKeywords, SeoURL } = page.pageSettings;
  const { SeoEnable } = page.pageModel;
  const pageInfo = { ...page?.pageSettings };
  const data = {
    SeoTitle:
      SeoTitle != undefined
        ? SeoTitle
        : pageInfo.PageName == undefined
          ? ''
          : `${pageInfo.PageName} | ${siteLevelSchema.siteName}`,
    SeoDescription:
      SeoDescription != undefined
        ? SeoDescription
        : pageInfo.PageDescription == undefined
          ? ''
          : pageInfo.PageDescription,
    SeoKeywords:
      SeoKeywords != undefined
        ? [...page.pageSettings.SeoKeywords]
        : pageInfo.PageTags == undefined
          ? []
          : [...pageInfo.PageTags],
    SeoURL:
      SeoURL != undefined
        ? SeoURL
        : pageInfo.PageURL == undefined
          ? ''
          : pageInfo.PageURL,
    SeoBlockIndexing: SeoEnable != undefined ? SeoEnable : true,
  }
  const initialSeoInfo = useRef<PageSeoInformation>(data)
  const [seoInfo, setSeoInfo] = useState<PageSeoInformation>(initialSeoInfo.current);

  useEffect(() => {
    initialSeoInfo.current = data
    setSeoInfo(initialSeoInfo.current)
  }, [page?.pageSettings])

  const [tags, setTags] = useState<string[]>(seoInfo.SeoKeywords);
  const [keyword, setKeyword] = useState<string>('');
  const seoNameLength = nameLength;
  const seoDescriptionLength = descriptionLength;
  const seoPreviewNameLength = previewNameLength;
  const seoPreviewDescriptionLength = previewDescriptionLength;
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    if (fieldType == 'SeoKeywords') {
      setKeyword(event.target.value);
    } else {
      const seoInfoUpdated = { ...seoInfo };
      seoInfoUpdated[fieldType] = event.target.value;
      setSeoInfo(seoInfoUpdated);
    }
  };
  // Function to handle switch changes
  const handleControlsChange = (event, fieldType) => {
    const seoInfoUpdated = { ...seoInfo };
    seoInfoUpdated[fieldType] = event.target.checked;
    setSeoInfo(seoInfoUpdated);
  };
  const [handleImpression] = usePlatformAnalytics();

  const saveSeoBasics = () => {
    const pageModelNew = { ...page?.pageModel };
    pageModelNew.SeoEnable = seoInfo.SeoBlockIndexing;
    dispatch(updatePageModel(pageModelNew));
    page?.prelemMetaArray?.map((item, index) => {
      dispatch(
        updateContentForCard(
          index,
          'SeoEnabled',
          seoInfo.SeoBlockIndexing,
          undefined
        )
      );
    });
    dispatch(updatePageSettings(seoInfo));
    const pageDataObj = {
      eventType: 'SEOBasics PageSetting Saved',
      SeoBasicsSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
  };
  const getValue = () => {
    if (tags?.length === 1) {
      return tags[0] ? tags : [];
    } else if (tags?.length > 0) {
      return tags;
    }
    return [];
  };
  return (
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Typography
        variant='body1'
        sx={{
          display: 'flex',
          alignimageInstances: 'center',
          textTransform: 'capitalize',
        }}
        mt={2}
        className='drawer-label'
      >
        {t('page_search_preview')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_search_preview_tp')}
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
      <Typography variant='body2' mt={2}>
        {seoInfo.SeoURL}
      </Typography>
      <Typography variant='h6' color='#1a0db1'>
        {seoInfo.SeoTitle.substring(0, seoPreviewNameLength)}
        {seoInfo.SeoTitle.length > seoPreviewNameLength && <span>...</span>}
      </Typography>
      <Typography variant='subtitle2'>
        {seoInfo.SeoDescription.substring(0, seoPreviewDescriptionLength)}
        {seoInfo.SeoDescription.length > seoPreviewDescriptionLength && (
          <span>...</span>
        )}
      </Typography>
      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_search_title')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_search_title_tp')}
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
        value={seoInfo.SeoTitle}
        onChange={(e) => handleDataChange(e, 'SeoTitle')}
        variant='outlined'
        placeholder={t('page_search_title_placeholder')}
        inputProps={{ maxLength: seoNameLength }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_search_description')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_search_description_tp')}
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
        value={seoInfo.SeoDescription}
        onChange={(e) => handleDataChange(e, 'SeoDescription')}
        variant='outlined'
        placeholder={t('page_search_description_placeholder')}
        inputProps={{ maxLength: seoDescriptionLength }}
      />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        {t('page_search_keywords')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_search_keywords')}
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
        value={[...getValue()]}
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim().length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          setTags(updatedtags);
          const seoInfoUpdated = { ...seoInfo };
          seoInfoUpdated.SeoKeywords = updatedtags;
          setSeoInfo(seoInfoUpdated);
        }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map(
            (option: string, index: number) =>
              option && (
                <Box key={index} mt={1}>
                  <Chip
                    variant='outlined'
                    label={option}
                    deleteIcon={<DeleteIcon sx={{ color: '#2d2d39' }} />}
                    sx={{
                      '.Platform-x-Chip-deleteIcon': {
                        color: '#000',
                      },
                    }}
                    {...getTagProps({ index })}
                  />
                </Box>
              )
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            placeholder={t('page_info_tags_placeholder')}
          />
        )}
        sx={{
          '& .Platform-x-InputBase-root': {
            flexWrap: 'wrap',
            width: 'auto',
          },
          '& .Platform-x-InputBase-input': {
            width: 0,
            minWidth: '150px',
          },
          '.Platform-x-Autocomplete-tag': {
            margin: '0 5px 5px 0',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        <Typography variant='subtitle1' sx={{ width: '90%' }}>
          {t('page_search_seokey')}
        </Typography>
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          onChange={(e: any) => handleControlsChange(e, 'SeoBlockIndexing')}
          checked={seoInfo.SeoBlockIndexing}
        />
      </Box>
      <Box sx={{ textAlign: 'right' }} mb={2}>
        <Button
          variant='contained'
          disabled={initialSeoInfo.current === seoInfo}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
            textTransform: 'capitalize',
          }}
          onClick={saveSeoBasics}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default SEOBasics;
