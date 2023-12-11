import { useLazyQuery } from '@apollo/client';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ContentTypeCard from 'platform-x-prelems/prelems/ContentTypeCard';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoResults from '../../assets/images/no-results.png';
import { fetchAllMultislotContentList } from '../../services/contentGallery/contentGallery.api';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import {
  ContentGalleryTypes,
  ContentGalleryTypes1,
} from '../../utils/constants';

import { ContentProps } from './utils/contentGalleryTypes';
import { authInfo } from '../../utils/authConstants';

const contentReturn = (fromPage = '', contentType = []) => {
  if (fromPage === 'content' && contentType.includes('Select')) {
    return ContentGalleryTypes1;
  } else if (contentType.includes('Select')) {
    return ContentGalleryTypes;
  }
  return contentType;
};

const ContentGallery = ({
  fromPageContentType = '',
  handleSelectedContent,
  onToggleContentGallery,
  contentType,
}) => {
  const { t } = useTranslation();
  const contentArray = contentReturn(fromPageContentType, contentType);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<ContentProps>({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(
    contentArray.length > 0 ? contentArray[0] : 'ALL'
  );
  const [items, setItems] = useState<ContentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const isError = false;
  const secondaryArgs = {
    gcpUrl: authInfo.gcpUri,
    bucketName: authInfo.gcpBucketName,
  };

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const handleSelectedItem = (item, index) => {
    if (selectedItem == item) {
      setSelectedItem({});
      setSelectedIndex(-1);
    } else {
      setSelectedItem(item);
      setSelectedIndex(index);
    }
  };
  const [fetchMultiSlotContentList] = useLazyQuery(
    fetchAllMultislotContentList
  );

  const handleDone = () => {
    handleSelectedContent(selectedItem);
  };
  const getAllContentTypes = (fil, sear) => {
    setLoading(true);
    fetchMultiSlotContentList({
      variables: {
        filter: fil,
        searchTerm: sear,
        tags: [],
        pagination: { start: 0, rows: 25 },
      },
    }).then((res) => {
      if (res?.data?.authoring_getDynamicContentSearch) {
        setLoading(false);

        setItems(res?.data?.authoring_getDynamicContentSearch);
      } else {
        setLoading(false);
      }
    });
  };

  const handleSearchChange = useCallback(
    debounce((fil, sear) => getAllContentTypes(fil, sear)),
    []
  );

  useEffect(() => {
    handleSearchChange(filter, search);
  }, [filter, search]);

  const getContentType = (item, index) => {
    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          height: { xs: 'auto', md: '255px' },
          ':hover': {
            '.hoverOverlay': {
              backgroundColor: 'rgba(0,0,0,0.5)',
              '&.selected': {
                backgroundColor: 'rgba(0,0,0,0.8)',
              },
            },
          },
        }}
        onClick={(e) => handleSelectedItem(item, index)}
        key={index}
        p={2}
      >
        <ContentTypeCard content={item} secondaryArgs={secondaryArgs} />
        <Box
          className={`hoverOverlay ${
            index === selectedIndex ? 'selected' : ''
          }`}
          sx={{
            ...(selectedIndex >= 0 && {
              backgroundColor:
                index === selectedIndex
                  ? 'rgba(0,0,0,0.8)'
                  : 'rgba(207,207,207,0.52)',
            }),
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            m: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          p={1}
        >
          <Box>
            {index === selectedIndex && (
              <CheckCircleOutlineIcon
                style={{
                  color: ThemeConstants.WHITE_COLOR,
                  fontSize: ThemeConstants.FONTSIZE_XXXL,
                }}
              />
            )}
          </Box>
        </Box>
      </Grid>
    );
  };

  const onSearchChange = (e) => {
    const { value } = e.currentTarget;
    setSearch(value);
  };

  const resetSearch = () => {
    setSearch('');
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        zIndex: '3',
      }}
    >
      <Grid
        container
        sx={{
          padding: '15px',
          borderBottom: '1px solid #d9dbe9',
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          em={3}
          lg={3}
          sx={{
            margin: 'auto 0',
          }}
        >
          <Typography variant="h4bold">{t('prelem_choose_content')}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          em={5}
          lg={6}
          sx={{
            padding: {
              xs: '10px 0',
              sm: '0',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                style={{
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                }}
                onChange={handleFilterChange}
              >
                {contentArray.map((type, key) => {
                  return (
                    <MenuItem value={type} key={key}>
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <FormControl fullWidth>
              <TextField
                className="contentTypeCard"
                sx={{
                  '.Platform-x-InputBase-root.Platform-x-OutlinedInput-root': {
                    borderTopLeftRadius: '0px !important',
                    borderBottomLeftRadius: '0px !important',
                    borderLeft: 0,
                  },
                }}
                variant="outlined"
                placeholder={t('search')}
                value={search}
                onChange={onSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {search !== '' && (
                        <CloseRoundedIcon
                          onClick={resetSearch}
                          sx={{
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '18px',
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={4}
          lg={3}
          container
          spacing={0}
          direction="column"
          alignItems="end"
          justifyContent="center"
          sx={{
            display: 'flex',
            marginTop: { xs: '0px', sm: '10px', em: '0' },
          }}
        >
          <Box justifyContent="end">
            <Button
              variant="secondaryButton"
              onClick={() => onToggleContentGallery(-1)}
            >
              {t('cancel')}
            </Button>

            <Button
              variant="primaryButton"
              sx={{
                padding: selectedIndex === -1 ? '14px' : '11px',
                marginLeft: '12px',
              }}
              disabled={selectedIndex === -1}
              onClick={handleDone}
            >
              {t('save')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {isError ? (
        <Box
          sx={{
            marginTop: '200px',
            marginBottom: '100px',
            textAlign: 'center',
          }}
        >
          <img src={NoResults} />
          <Typography
            variant="h3"
            sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
          >
            Failed to fetch results
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ height: 'calc(100vh - 90px)', overflowY: 'scroll' }}
          id="scrollableDiv"
        >
          {loading ? (
            <Box
              sx={{
                marginTop: '100px',
                marginBottom: '100px',
                textAlign: 'center',
              }}
            >
              <CircularProgress
                style={{
                  width: '80px',
                  height: '80px',
                  color: ThemeConstants.PRIMARY_MAIN_COLOR,
                }}
              />
            </Box>
          ) : items?.length === 0 ? (
            <Box
              sx={{
                marginTop: '100px',
                marginBottom: '100px',
                textAlign: 'center',
              }}
            >
              <Typography variant="overline" display="block" gutterBottom>
                {t('no_results')}
              </Typography>
            </Box>
          ) : (
            <Grid container sx={{ backgroundColor: '#f7f7f7' }}>
              {items?.map((item, index) => {
                if (
                  item &&
                  [
                    'ImageGallery',
                    'VideoGallery',
                    'Accolades',
                    'ServiceCard',
                    'Gallery',
                    'Article',
                    'VOD',
                    'Testimonial',
                    'FAQ',
                    'Awards',
                    'Poll',
                    'Quiz',
                    'Event',
                  ].includes(item.ContentType || '')
                )
                  return getContentType(item, index);
              })}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

ContentGallery.defaultProps = {
  contentType: ['Select'],
};

export default ContentGallery;
