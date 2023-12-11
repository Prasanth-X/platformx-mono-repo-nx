import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageModel } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../theme/variable';
import BackButton from '../BackButton/BackButton';
import './PageSettings.css';

const AdvancedSeo = ({ setPageId }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const imagePreviewTypes = ['Standard', 'Large', 'None'];
  const tagsPrefilled = !page?.pageModel.Others
    ? ''
    : JSON.parse(page?.pageModel.Others);
  const {
    noindex,
    nofollow,
    nosnippet,
    noarchive,
    noimageindex,
    Characters,
    Seconds,
    CanonicalURL,
  } = tagsPrefilled;
  const data = [
    {
      tagState: tagsPrefilled !== '' ? noindex : false,
      tagName: 'noindex',
      id: 'page_noindex',
    },
    {
      tagState: tagsPrefilled !== '' ? nofollow : false,
      tagName: 'nofollow',
      id: 'page_nofollow',
    },
    {
      tagState: tagsPrefilled !== '' ? nosnippet : false,
      tagName: 'nosnippet',
      id: 'page_nosnippet',
    },
    {
      tagState: tagsPrefilled !== '' ? noarchive : false,
      tagName: 'noarchive',
      id: 'page_noarchive',
    },
    {
      tagState: tagsPrefilled !== '' ? noimageindex : false,
      tagName: 'noimageindex',
      id: 'page_noimageindex',
    },
    {
      tagState:
        tagsPrefilled !== '' ? tagsPrefilled['max-image-preview'] : false,
      tagName: 'max-image-preview',
      previewType: imagePreviewTypes[0],
      id: 'page_max_image_preview',
    },
    {
      tagState: tagsPrefilled !== '' ? tagsPrefilled['max-snippet'] : false,
      tagName: 'max-snippet',
      characters: -1,
      id: 'page_max_snippet',
    },
    {
      tagState: tagsPrefilled !== '' ? Characters : false,
      tagName: 'Characters',
      seconds: -1,
      id: 'page_characters',
    },
    {
      tagState:
        tagsPrefilled !== '' ? tagsPrefilled['max-video-preview'] : false,
      tagName: 'max-video-preview',
      seconds: -1,
      id: 'page_max_video_preview',
    },
    {
      tagState: tagsPrefilled !== '' ? Seconds : false,
      tagName: 'Seconds',
      seconds: -1,
      id: 'page_seconds',
    },
  ];
  const initialTags = useRef(data);

  const [tags, setTags] = useState(initialTags.current);
  const pageInfo = { ...page?.pageSettings };
  const { PageURL } = pageInfo;
  const initialCanonical = useRef(
    tagsPrefilled == '' ? (PageURL == undefined ? '' : PageURL) : CanonicalURL
  );
  const [canonicalURL, setCanonicalURL] = useState<string>(
    tagsPrefilled == '' ? (PageURL == undefined ? '' : PageURL) : CanonicalURL
  );

  useEffect(() => {
    initialTags.current = data;
    setTags(initialTags.current);
    initialCanonical.current =
      tagsPrefilled == ''
        ? PageURL == undefined
          ? ''
          : PageURL
        : CanonicalURL;
    setCanonicalURL(initialCanonical.current);
  }, [page?.pageModel.Others, page?.pageSettings]);

  const handleTagCheckChange = (e, index) => {
    const tagsUpdated = [...tags];
    tagsUpdated[index].tagState = e.target.checked;
    setTags(tagsUpdated);
    if (
      tagsUpdated[index].tagName === 'max-image-preview' &&
      tagsUpdated[index].tagState === false
    ) {
      tagsUpdated[index].previewType = imagePreviewTypes[0];
    }
    if (
      tagsUpdated[index].tagName === 'max-snippet' &&
      tagsUpdated[index].tagState === false
    ) {
      tagsUpdated[index].characters = -1;
    }
    if (
      tagsUpdated[index].tagName === 'max-video-preview' &&
      tagsUpdated[index].tagState === false
    ) {
      tagsUpdated[index].seconds = -1;
    }
  };

  const handleDataChange = (event, index) => {
    const tagsUpdated = [...tags];
    if (tagsUpdated[index].tagName === 'max-snippet') {
      tagsUpdated[index].characters = event.target.value;
    }
    if (tagsUpdated[index].tagName === 'max-video-preview') {
      tagsUpdated[index].seconds = event.target.value;
    }
    setTags(tagsUpdated);
  };

  const handlePreviewChange = (event, index) => {
    const tagsUpdated = [...tags];
    tagsUpdated[index].previewType = event.target.value;
    setTags(tagsUpdated);
  };
  // Function to close toast notification
  const [handleImpression] = usePlatformAnalytics();
  const saveAdvancedSeo = () => {
    const advSeoObj: any = {};
    tags.map((item) => {
      advSeoObj[item.tagName] = item.tagState;
    });
    advSeoObj.CanonicalURL = canonicalURL;
    const pageModelNew = { ...page?.pageModel };
    pageModelNew.Others = JSON.stringify(advSeoObj);
    dispatch(updatePageModel(pageModelNew));
    const pageDataObj = {
      eventType: 'AdvanceSeo PageSetting Saved',
      advanceSeoSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
  };
  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title='Advanced SEO' />
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_meta_tag')}
        </Typography>
        <FormGroup>
          {tags.map((tag, index) => {
            return (
              <Box key={index}>
                <Typography className='labelbox' variant='p4regular'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tag.tagState}
                        sx={{
                          color: ThemeConstants.BLACK_COLOR,
                          '&.Mui-checked': {
                            color: ThemeConstants.BLACK_COLOR,
                          },
                        }}
                        onChange={(e) => handleTagCheckChange(e, index)}
                      />
                    }
                    label={
                      <Typography variant='p4regular'>{t(tag.id)}</Typography>
                    }
                  />
                </Typography>
                {tag.tagState == true && tag.tagName == 'max-image-preview' ? (
                  <FormControl variant='standard' sx={{ width: '100%' }}>
                    <Select
                      variant='outlined'
                      size='small'
                      labelId='demo-simple-select-standard-label'
                      id='demo-simple-select-standard'
                      value={tag.previewType}
                      onChange={(e) => handlePreviewChange(e, index)}
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
                      {imagePreviewTypes.map((type, key) => {
                        return (
                          <MenuItem
                            value={type}
                            key={key}
                            sx={{
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 0, 0, 0.16)',
                              },
                              '&.Mui-selected:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.16)',
                              },
                            }}
                          >
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  <></>
                )}
                {tag.tagState == true && tag.tagName == 'max-snippet' ? (
                  <Box>
                    <Typography className='labelbox' variant='p4regular'>
                      Characters
                    </Typography>
                    <TextField
                      value={tag.characters}
                      onChange={(e) => handleDataChange(e, index)}
                      variant='outlined'
                      size='small'
                      type='number'
                      placeholder='write characters here'
                      inputProps={{ min: -1 }}
                    />
                  </Box>
                ) : (
                  <></>
                )}
                {tag.tagState == true && tag.tagName == 'max-video-preview' ? (
                  <Box>
                    <Typography className='labelbox' variant='p4regular'>
                      Seconds
                    </Typography>
                    <TextField
                      value={tag.seconds}
                      onChange={(e) => handleDataChange(e, index)}
                      variant='outlined'
                      size='small'
                      type='number'
                      placeholder='write seconds here'
                      inputProps={{ min: -1 }}
                      sx={{
                        width: '100%',
                        '.Platform-x-Input-root:after': {
                          borderBottom: `1px solid ${ThemeConstants.BLACK_COLOR}`,
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </FormGroup>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('page_canonical_url')}
        </Typography>
        <TextField
          size='small'
          multiline
          value={canonicalURL}
          onChange={(e) => setCanonicalURL(e.target.value)}
          variant='outlined'
          placeholder={t('canonical_url')}
        />
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={
            initialTags.current === tags &&
            initialCanonical.current === canonicalURL
          }
          onClick={saveAdvancedSeo}
          sx={{ width: '100%' }}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default AdvancedSeo;
