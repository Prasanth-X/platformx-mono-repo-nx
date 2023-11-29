import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  updateContentForCard,
  updatePageModel,
  updatePageSettings,
} from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../theme/variable';
import siteLevelSchema from '../../../../utils/siteLevelSettings.json';
import {
  descriptionLength,
  nameLength,
  previewDescriptionLength,
  previewNameLength,
} from '../../utils/constant';
import { PageSeoInformation } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import BasicSwitch from '../Switch';
import './PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
const SEOBasics = ({ setPageId }) => {
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
  };
  const initialSeoInfo = useRef<PageSeoInformation>(data);
  const [seoInfo, setSeoInfo] = useState<PageSeoInformation>(
    initialSeoInfo.current
  );
  const [tags, setTags] = useState<string[]>(seoInfo.SeoKeywords);
  const [keyword, setKeyword] = useState<string>('');
  const seoNameLength = nameLength;
  const seoDescriptionLength = descriptionLength;
  const seoPreviewNameLength = previewNameLength;
  const seoPreviewDescriptionLength = previewDescriptionLength;

  useEffect(() => {
    initialSeoInfo.current = data;
    setSeoInfo(initialSeoInfo.current);
  }, [page?.pageSettings]);

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
    showToastSuccess(`${t('seo_info_toast')} ${t('saved_toast')}`);
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
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title='Basics SEO' />
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_search_preview')}
        </Typography>
        <Box className='seobasicBox'>
          <Typography variant='p4regular'>{seoInfo.SeoURL}</Typography>
          <Typography variant='p4regular' mb='5px' color='#4B9EF9'>
            {seoInfo.SeoTitle.substring(0, seoPreviewNameLength)}
            {seoInfo.SeoTitle.length > seoPreviewNameLength && <span>...</span>}
          </Typography>
          <Typography variant='h7regular'>{seoInfo.SeoDescription}</Typography>
          <Typography variant='h7regular'>{seoInfo.SeoKeywords}</Typography>
        </Box>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_search_title')}
        </Typography>
        <TextField
          size='small'
          multiline
          value={seoInfo.SeoTitle}
          onChange={(e) => handleDataChange(e, 'SeoTitle')}
          variant='outlined'
          placeholder={t('page_search_title_placeholder')}
          inputProps={{ maxLength: seoNameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_search_description')}
        </Typography>
        <TextField
          size='small'
          multiline
          value={seoInfo.SeoDescription}
          onChange={(e) => handleDataChange(e, 'SeoDescription')}
          variant='outlined'
          placeholder={t('page_search_description_placeholder')}
          inputProps={{ maxLength: seoDescriptionLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_search_keywords')}
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
              size='small'
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
            '.Platform-x-Autocomplete-tag': {
              margin: '0 5px 5px 0',
            },
            '& .Platform-x-InputBase-input': {
              width: 0,
              minWidth: '150px',
            },
          }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t('page_search_seokey')}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e, 'SeoBlockIndexing')}
            checked={seoInfo.SeoBlockIndexing}
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={initialSeoInfo.current === seoInfo}
          onClick={saveSeoBasics}
          sx={{ width: '100%' }}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default SEOBasics;
