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
import NoResults from '../../../../assets/images/no-results.png';
import { fetchAllMultislotContentList } from '../../../../services/contentGallery/contentGallery.api';
import ThemeConstants from '../../../../theme/variable';
import { ContentGalleryTypes } from '../../../../utils/constants';

import { ContentProps } from './utils/contentGalleryTypes';
import { authInfo } from '../../../../utils/authConstants';

const ContentGallery = ({
  handleSelectedContent,
  onToggleContentGallery,
  contentType,
}) => {
  const { t } = useTranslation();
  const contentArray = contentType.includes('Select')
    ? ContentGalleryTypes
    : contentType;
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
    bucketName: authInfo.gcpBucketName
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
      <Grid container pt={2} pb={2} pl={4} pr={4}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            margin: 'auto 0',
            paddingBottom: { xs: '20px', sm: '20px', lg: '5px' },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontSize: ThemeConstants.FONTSIZE_H4,
              fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
              fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
              color: ThemeConstants.BLACK_COLOR,
            }}
          >
            {t('prelem_choose_content')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{ paddingBottom: { xs: '20px', sm: '20px', display: 'flex' } }}
        >
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <FormControl fullWidth>
              <TextField
                className='contentTypeCard'
                sx={{
                  ml: 5,
                  backgroundColor: '#f5f6f8',
                  height: '50px',
                  '.Platform-x-Input-root:before': {
                    borderBottom: '2px solid #2d2d39',
                  },
                  '.Platform-x-Input-root:after': {
                    borderBottom: '2px solid #000000',
                  },
                  '.Platform-x-Input-root.Mui-disabled:before': {
                    borderBottom: '2px solid #c3c3cb',
                  },
                  '.Platform-x-InputBase-root.Platform-x-OutlinedInput-root': {
                    borderTopRightRadius: '0px !important',
                    borderBottomRightRadius: '0px !important',
                  },
                }}
                variant='outlined'
                placeholder={t('search')}
                value={search}
                onChange={onSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
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

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControl fullWidth>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter}
                style={{
                  backgroundColor: '#f5f6f8',
                  height: '50px',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
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
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          sx={{ margin: '0 0 1.25rem 0', display: 'flex' }}
        >
          <Box justifyContent='end'>
            <Button
              sx={{ textTransform: 'capitalize', ml: 1 }}
              variant='outlined'
              onClick={() => onToggleContentGallery(-1)}
            >
              {t('cancel')}
            </Button>

            <Button
              variant='contained'
              sx={{
                padding: selectedIndex === -1 ? '14px' : '11px',
                marginLeft: '20px',
                boxShadow: 'none',
                ':hover': { boxShadow: 'none' },
                textTransform: 'capitalize',
                ml: 1,
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
            variant='h3'
            sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
          >
            Failed to fetch results
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ height: 'calc(100vh - 90px)', overflowY: 'scroll' }}
          id='scrollableDiv'
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
              <Typography variant='overline' display='block' gutterBottom>
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
