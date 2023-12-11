import { useLazyQuery } from '@apollo/client';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';
import TagIcon from '@mui/icons-material/Tag';
import {
  Badge,
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  ListItem,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../Common/Loader';
import { IconListViewSvg } from '../../../../assets/svg';
import { showToastError } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { fetchTagList } from '../../../../services/common/tags.aps';
import { fetchAllMultislotContentList } from '../../../../services/contentGallery/contentGallery.api';
import ThemeConstants from '../../../../theme/variable';
import { hasOwnProp } from '../../../../utils/helper';
import GalleryItems from '../../../ContentGallery/GalleryItems';
import GalleryItemSearchResults from './GalleryItemSearchResult';
import GalleryLeftSideBar from './GalleryLeftSideBar';
import { ContentProps, TagMagic } from './utils/contentGalleryTypes';

const DynamicContentGallery = ({
  handleSelectedContent,
  onToggleContentGallery,
  selectedFilters,
}) => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [rows] = useState<number>(20);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(false);
  const [isHideSearchBox, setHideSearchBox] = useState<boolean>(false);
  const [isShowItems, setShowItems] = useState<boolean>(true);
  const [isShowCategory, setShowCategory] = useState<boolean>(false);
  const [tagData, setTagData] = useState<any>({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [items, setItems] = useState<ContentProps[]>([]);
  const [searchItems, setSearchItems] = useState<ContentProps[]>([]);
  const [isSuggestionEnabled, setSuggestionEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [selectedTag, setselectedTag] = useState<any>([]);
  const tagRef = useRef<any>({
    tags: [],
  });
  const [tagObj, setTagObj] = useState<TagMagic>();
  const [fetchMultiSlotContentList] = useLazyQuery(
    fetchAllMultislotContentList
  );
  const [runFetchTagList] = useLazyQuery(fetchTagList);
  const isError = false;
  const inlineCss = `
.vod-cat .Platform-x-FormControlLabel-label{
  background-color: #e6eaed;
  padding: 9px 10px;
  border-radius: 3px;
  margin: 0px;
  font-size: 12px;
}
.Platform-x-FormControlLabel-root.vod-cat{
  margin-left: 0px;
  margin-right: 10px;
}
.vod-cat .Mui-checked + .Platform-x-FormControlLabel-label {
  background-color: #000;
  color: #fff;
  border-radius: 3;
}

.vod-cat .Platform-x-ButtonBase-root.Platform-x-Checkbox-root{
  display: none;
}
.vod-cat .Platform-x-ButtonBase-root.Platform-x-Checkbox-root.Mui-checked{
  display: none;
  background-color: #000;
  color: #fff;
  border-radius: 0;
  padding-left: 0;
  padding-top: 6px;
  padding-bottom: 6px;

}
.vod-cat .Platform-x-SvgIcon-root{
  font-size: 12px;
}
.Platform-x-Paper-root.Platform-x-Paper-elevation {
  border-radius:0px !important;
}
.Platform-x-Paper-root.Platform-x-Paper-elevation.contenttype_card{
    border-radius:5px !important;
}
.Platform-x-ButtonBase-root.Platform-x-AccordionSummary-root.Mui-expanded {
  background: #f5f6f8;
  min-height: 0px;
  border-radius:0px !important;
}
.Platform-x-InputBase-root{
  min-height: 40px !important;
  font-size: 14px;
}
 `;
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  const getTagData = () => {
    runFetchTagList({
      variables: { start: 0, rows: 1000 },
    })
      .then((res) => {
        if (res?.data?.authoring_getTagsList) {
          setTagData(res?.data?.authoring_getTagsList);
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
    // }
  };

  const backToContentHandel = () => {
    setHideSearchBox(false);
  };
  const mobileSearchIconHandel = () => {
    setHideSearchBox(true);
  };
  const handleDone = () => {
    const queryParam = {
      filter: filter,
      tags: tagRef?.current?.tags,
      searchTerm: search,
      pagination: {
        start: 0,
        rows: 4,
      },
    };
    handleSelectedContent({ slots: items, queryParam });
  };

  const getSearchSuggestions = (fil, sear) => {
    fetchMultiSlotContentList({
      variables: {
        filter: fil,
        searchTerm: sear,
        tags: tagRef?.current?.tags,
        pagination: { start: 0, rows: 20 },
        isSuggestive: true,
      },
    }).then((res) => {
      if (res?.data?.authoring_getDynamicContentSearch) {
        setSearchItems(res?.data?.authoring_getDynamicContentSearch);
        setSuggestionEnabled(true);
      }
    });
  };

  const getAllContentTypes = (fil, sear) => {
    setLoading(true);
    setStartIndex(0);
    fetchMultiSlotContentList({
      variables: {
        filter: fil,
        searchTerm: sear,
        tags: tagRef?.current?.tags,
        pagination: { start: 0, rows: rows },
        isSuggestive: false,
      },
    }).then((res) => {
      if (res?.data?.authoring_getDynamicContentSearch) {
        setLoading(false);
        setItems(res?.data?.authoring_getDynamicContentSearch);
        if (res?.data?.authoring_getDynamicContentSearch?.length < 18) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
      } else {
        setLoading(false);
      }
    });
  };

  const fetchMoreContentTypes = (fil, sear, index) => {
    setLoading(true);
    fetchMultiSlotContentList({
      variables: {
        filter: fil,
        searchTerm: sear,
        tags: tagRef?.current?.tags,
        pagination: { start: index, rows: rows },
        isSuggestive: false,
      },
    })
      .then((res) => {
        if (res?.data?.authoring_getDynamicContentSearch) {
          const newData = [
            ...items,
            ...(res?.data?.authoring_getDynamicContentSearch || {}),
          ];
          setItems(() => newData);
          if (res?.data?.authoring_getDynamicContentSearch?.length < 18) {
            setIsLazyLoad(false);
          } else {
            setIsLazyLoad(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showToastError(t('api_error_toast'));
      });
  };

  const handleTagOnChange = (event) => {
    let tagsArray: any = tagRef?.current?.tags;
    const copyObj = tagObj ? JSON.parse(JSON.stringify(tagObj)) : {};
    const { id: keye, value: val } = event.target;
    if (event.target.checked) {
      tagsArray = [...tagsArray, event.target.value];
      if (tagObj && hasOwnProp(tagObj, 'id')) {
        const tempObj = [...tagObj[keye], val];
        copyObj[keye] = tempObj;
        setTagObj(copyObj);
      } else {
        copyObj[keye] = [val];
        setTagObj(copyObj);
      }
    } else {
      tagsArray.splice(tagsArray.indexOf(event.target.value), 1);
      if (tagObj && tagObj[keye].length > 1) {
        tagObj[keye].splice(tagObj[keye].indexOf(val), 1);
        copyObj[keye] = tagObj[keye];
        setTagObj(copyObj);
      } else {
        delete copyObj[keye];
        setTagObj(copyObj);
      }
    }
    tagRef.current = { ...tagRef.current, tags: tagsArray };
    setselectedTag(tagsArray);
    getAllContentTypes(filter, search);
  };

  const clearTag = () => {
    setselectedTag([]);
    tagRef.current = { ...tagRef.current, tags: [] };
    setTagObj({});
    getTagData();
    getAllContentTypes(filter, search);
  };
  const fetchMoreData = () => {
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    fetchMoreContentTypes(filter, search, nextIndex);
  };

  const handleSearchChange = useCallback(
    debounce((fil, sear) => getSearchSuggestions(fil, sear)),
    []
  );
  useEffect(() => {
    const tagsArray = selectedFilters?.tags;
    const searchTerm = selectedFilters?.searchTerm;
    setselectedTag(tagsArray);
    setSearch(searchTerm);
    tagRef.current = { ...tagRef.current, tags: tagsArray };

    getAllContentTypes(filter, searchTerm);
  }, [filter]);

  useEffect(() => {
    if (Object.keys(tagData).length == 0) {
      getTagData();
    }
    const closeDropdown: Parameters<Document['addEventListener']>[1] = (
      event: any
    ) => {
      const hasClass = event?.target?.classList.contains('suggestionitems');
      if (!hasClass) {
        setSuggestionEnabled(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const categoryClickHandle = () => {
    if (isShowItems) {
      setShowItems(false);
    } else {
      setShowItems(true);
    }
    if (isShowCategory) {
      setShowCategory(false);
    } else {
      setShowCategory(true);
    }
  };

  const backButtonHandle = () => {
    setShowCategory(false);
    setShowItems(true);
  };
  const onSearchChange = (e) => {
    const { value } = e.currentTarget;
    setSearch(value);
    if (value.length > 3) {
      handleSearchChange(filter, value);
    }
  };
  const handleKeyPress = async (e) => {
    if (e.key == 'Enter') {
      getAllContentTypes(filter, e.target.value);
      setSearch(e.target.value);
      setSuggestionEnabled(false);
    }
  };

  const resetSearch = () => {
    setSearch('');

    setSearchItems([]);
    setSuggestionEnabled(false);
    getAllContentTypes(filter, '');
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };
  const handlePageSearch = async (pageSearchName) => {
    setSearch(pageSearchName);
    getAllContentTypes(filter, pageSearchName);
    setSearchItems([]);
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh',
        zIndex: '3',
      }}
    >
      {loading && <Loader />}
      {isHideSearchBox && (
        <Grid
          container
          pt={2}
          pb={2}
          pl={4}
          pr={4}
          sx={{
            display: { xs: 'flex', em: 'none' },
          }}
        >
          <Grid
            item
            xs={10}
            sm={10}
            sx={{
              margin: 'auto 0',
              paddingBottom: { xs: '20px', sm: '20px' },
            }}
          >
            <FormControl fullWidth>
              <TextField
                sx={{
                  backgroundColor: '#f5f6f8',
                  height: '40px',
                  '.Platform-x-Input-root:before': {
                    borderBottom: '2px solid #2d2d39',
                  },
                  '.Platform-x-Input-root:after': {
                    borderBottom: '2px solid #000000',
                  },
                  '.Platform-x-Input-root.Mui-disabled:before': {
                    borderBottom: '2px solid #c3c3cb',
                  },
                  'Platform-x-OutlinedInput-root': {
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                  },
                }}
                variant='outlined'
                placeholder='Search'
                value={search}
                onChange={onSearchChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <ArrowBackIosIcon onClick={backToContentHandel} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {search && (
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
          <Grid
            item
            xs={2}
            sm={1}
            sx={{
              margin: 'auto 0',
              paddingBottom: { xs: '20px', sm: '20px' },
              display: 'flex',
            }}
          ></Grid>
        </Grid>
      )}
      {!isHideSearchBox && (
        <Grid
          container
          pt={2}
          pb={2}
          pl={2}
          pr={6}
          sx={{
            display: { xs: 'flex', em: 'none' },
          }}
        >
          <Grid
            item
            xs={9}
            sm={10}
            sx={{
              margin: 'auto 0',
              paddingBottom: { xs: '20px', sm: '20px' },
              display: 'flex',
            }}
          >
            <ArrowBackIosIcon onClick={() => onToggleContentGallery(-1)} />
            <Typography variant='h4medium'>
              {t('prelem_choose_content')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sm={1}
            sx={{
              margin: 'auto 0',
              paddingBottom: { xs: '20px', sm: '20px' },
              display: 'flex',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontSize: ThemeConstants.FONTSIZE_LG,
                marginRight: '20px',
                marginLeft: '26px',
              }}
              onClick={mobileSearchIconHandel}
            >
              <SearchIcon />
            </Typography>
            <Typography
              variant='h5'
              sx={{ fontSize: ThemeConstants.FONTSIZE_LG, cursor: 'pointer' }}
              onClick={categoryClickHandle}
            >
              {selectedTag?.length > 0 ? (
                <Badge badgeContent={selectedTag.length} color='error'>
                  <TagIcon />
                </Badge>
              ) : (
                <TagIcon />
              )}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        pt={2}
        pb={2}
        pl={4}
        pr={4}
        sx={{
          display: { xs: 'none', em: 'flex' },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          em={3}
          lg={3}
          sx={{
            margin: 'auto 0',
            paddingBottom: { xs: '20px', sm: '20px', lg: '5px' },
          }}
        >
          <Typography
            variant='h4bold'
            sx={{
              padding: '0 0 10px 0px',

              textTransform: 'capitalize',
            }}
          >
            {t('prelem_choose_content')}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={6}
          lg={6}
          sx={{
            paddingTop: '5px',
            paddingBottom: { xs: '20px', sm: '20px', display: 'flex' },
          }}
        >
          <Grid item xs={12} sm={12} em={8} lg={8}>
            <FormControl fullWidth>
              <TextField
                className='contentTypeCard'
                sx={{
                  ml: 5,
                  backgroundColor: '#f5f6f8',
                  height: '40px',
                  '.Platform-x-Input-root:before': {
                    borderBottom: '2px solid #2d2d39',
                  },
                  '.Platform-x-Input-root:after': {
                    borderBottom: '2px solid #000000',
                  },
                  '.Platform-x-Input-root.Mui-disabled:before': {
                    borderBottom: '2px solid #c3c3cb',
                  },
                }}
                variant='outlined'
                placeholder='Search'
                value={search}
                onChange={onSearchChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {search && (
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

          <Grid item xs={12} sm={12} em={4} lg={4}></Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={3}
          lg={3}
          container
          spacing={0}
          direction='column'
          alignItems='end'
          justifyContent='end'
          sx={{ margin: '0 0 1.25rem 0', display: 'flex' }}
        >
          <Box justifyContent='end'>
            <Button
              variant='outlined'
              startIcon={<CloseIcon />}
              sx={{
                paddingTop: '6px !important',
                paddingBottom: '6px !important',
                textTransform: 'capitalize',
              }}
              onClick={() => onToggleContentGallery(-1)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='contained'
              startIcon={<CheckIcon />}
              sx={{
                marginLeft: '20px',
                boxShadow: 'none',
                ':hover': { boxShadow: 'none' },
                paddingTop: '6px !important',
                paddingBottom: '6px !important',
                textTransform: 'capitalize',
              }}
              // disabled={items.length > 0 ? false : true}
              disabled={false}
              onClick={handleDone}
            >
              {t('save')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <style>{inlineCss}</style>
        {isShowCategory && (
          <Grid
            container
            xs={12}
            // sm={3}
            em={3}
            xl={2}
            lg={2}
            sx={{ display: { xs: 'block', em: 'none' } }}
          >
            <Box
              sx={{
                padding: '15px',
                backgroundColor: '#ced3d9',
              }}
            >
              <Stack direction='row' alignItems='center' gap={1}>
                <Box component='span'>
                  <ArrowBackIosIcon onClick={backButtonHandle} />
                </Box>
                <Typography variant='h4medium' component='span'>
                  CATEGORIES
                </Typography>
                <Box
                  component='span'
                  sx={{
                    margin: '0px 15px 0px 0',
                    // float: 'right',
                    right: '0',
                    position: 'absolute',
                  }}
                >
                  <SearchIcon />
                </Box>
              </Stack>
            </Box>
            {tagData &&
              tagData?.length > 0 &&
              tagData.map((categories, index) => {
                return (
                  <GalleryLeftSideBar
                    key={index}
                    categoriesdata={categories}
                    updateTagField={handleTagOnChange}
                    selectedTags={selectedTag}
                    selectedTagCounts={tagObj}
                  />
                );
              })}
          </Grid>
        )}

        <Grid
          container
          xs={12}
          // sm={3}
          em={3}
          xl={2}
          lg={2}
          sx={{
            backgroundColor: '#ced3d9',
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: 'calc(100vh - 100px)',
            // height: '620px',
            display: { xs: 'none', em: 'block' },
          }}
        >
          <Box
            sx={{
              padding: '16px 0 16px 32px',
              backgroundColor: '#ced3d9',
            }}
          >
            <Typography variant='h6bold'>CATEGORIES</Typography>

            <Box
              component='span'
              sx={{
                margin: '0px 15px 0px 0',
                float: 'right',
              }}
            >
              <SearchIcon />
            </Box>
          </Box>
          {tagData &&
            tagData?.length > 0 &&
            tagData.map((categories, index) => {
              return (
                <GalleryLeftSideBar
                  key={index}
                  categoriesdata={categories}
                  updateTagField={handleTagOnChange}
                  selectedTags={selectedTag}
                  selectedTagCounts={tagObj}
                />
              );
            })}
        </Grid>

        {isShowItems && (
          <Grid
            item
            xs={12}
            // sm={12}
            em={9}
            xl={10}
            lg={10}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              border: '1px solid #ccc',
            }}
          >
            {tagRef.current && tagRef?.current?.tags?.length > 0 ? (
              <Box
                sx={{
                  padding: '4px 14px 0px 14px',
                  border: '1px solid #ced3d9',
                  borderTop: 'none',
                  display: { xs: 'block', em: 'flex' },
                  alignItems: 'center',
                  position: { xs: 'fixed', sm: 'fixed', em: 'initial' },
                  top: { em: '0' },
                  bottom: { xs: '0' },
                  left: { xs: '0' },
                  background: { xs: '#fff' },
                  zIndex: { xs: '9999999' },
                  width: { xs: '100%' },
                }}
              >
                <Box
                  sx={{
                    padding: '20px 20px 20px 4px',
                    display: { xs: 'block', em: 'none' },
                  }}
                >
                  <Box component='span'>Selected Tags</Box>
                  <Box
                    component='span'
                    sx={{
                      float: 'right',
                      display: 'inline-block',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#374fd5',
                      textDecoration: 'underline',
                    }}
                    onClick={() => clearTag()}
                  >
                    Clear tags
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    width: { xs: '100%', em: '90%' },
                    display: 'inline-block',
                    paddingBottom: { xs: '20px', em: '0px' },
                  }}
                >
                  {tagRef.current &&
                    tagRef?.current?.tags?.length > 0 &&
                    tagRef?.current?.tags.map((tags, index) => {
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            display: 'inline-block',
                            width: 'auto',
                            margin: '8px 10px 10px 0',
                            color: ThemeConstants.WHITE_COLOR,
                            borderRadius: '3px',
                            fontSize: ThemeConstants.FONTSIZE_H7,
                            // letterSpacing: '.5px',
                            lineHeight: '1.5',
                            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                            padding: '9px 10px',
                          }}
                        >
                          {tags}
                        </ListItem>
                      );
                    })}
                </Box>
                <Box
                  component='span'
                  sx={{
                    float: 'right',
                    position: 'absolute',
                    right: '0',
                    width: { em: '10%', lg: '8%', xl: '7%' },
                    display: { xs: 'none', em: 'inline-block' },
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#374fd5',
                    textDecoration: 'underline',
                  }}
                  onClick={() => clearTag()}
                >
                  Clear tags
                </Box>
              </Box>
            ) : (
              ''
            )}
            <Box
              sx={{
                padding: '14px 35px 10px 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_H4,
                  fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
                  fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
                  color: ThemeConstants.PRIMARY_MAIN_COLOR,
                  display: {
                    xs: 'none',
                    em: 'block',
                    // em: 'block',
                    // lg: 'block',
                  },
                }}
              >
                Search Results
              </Typography>
              <Typography
                component='span'
                sx={{
                  display: {
                    xs: 'block',
                    em: 'none',
                    // em: 'none',
                    // lg: 'none',
                  },
                }}
                variant='h4medium'
              >
                Recently added
              </Typography>

              <Box
                component='span'
                sx={{
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  // margin: '0px 0px 0px 230.6px',
                  padding: '5px',
                  pointerEvents: 'auto',
                  borderRadius: '3px',
                  border: 'solid 1px #ced3d9',
                  backgroundColor: '#fff',
                }}
              >
                <IconListViewSvg />
              </Box>
            </Box>

            <Box
              sx={{
                paddingRight: '8px',
                paddingLeft: '8px',
                margin: ' 0px .7rem 0px 0px',
              }}
            >
              <GalleryItems
                galleryObj={items}
                error={isError}
                loading={loading}
                fetchMoreData={fetchMoreData}
                isLazyLoad={isLazyLoad}
              />
            </Box>
            {isSuggestionEnabled && searchItems?.length > 0 ? (
              <Box
                sx={{
                  position: {
                    xs: 'absolute',
                    sm: 'absolute',
                    em: 'absolute',
                  },
                  top: '70px',
                  left: {
                    xs: '33px',
                    sm: '33px',
                    em: '220px',
                    lg: '415px',
                  },
                  width: { xs: '70%', sm: '70%', em: '46%', lg: '32%' },
                  zIndex: '999999',
                }}
                className='searchsuggestion'
              >
                <GalleryItemSearchResults
                  searchResults={searchItems}
                  handlePageSearch={handlePageSearch}
                />
              </Box>
            ) : (
              ''
            )}
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          display: { xs: isShowCategory ? 'none' : 'block', em: 'none' },
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: '9999999',
        }}
      >
        <Box sx={{ margin: '0 25px 25px 0' }} onClick={handleDone}>
          <Fab size='large' color='primary' aria-label='add'>
            <DoneIcon style={{ color: '#fff' }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export default DynamicContentGallery;
