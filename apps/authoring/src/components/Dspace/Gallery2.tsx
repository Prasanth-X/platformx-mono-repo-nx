import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Masonry from '@mui/lab/Masonry';
import { Box, Button, Grid, Select, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/images/no-results.png';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { authInfo } from '../../utils/authConstants';
// import { AtomicBlockUtils, EditorState } from 'draft-js';
import { useTranslation } from 'react-i18next';

interface ImageProps {
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
}

const Gallery2 = ({
  handleImageSelected,
  toggleGallery,
  galleryMode,
  handleVideoSelected,
  // editorState,
  // setEditorState,
  // contentState
}) => {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(false);
  const startIndex = useRef<number>(0);
  const [rows, setRows] = useState<number>(14);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [doneLoader, setDoneLoader] = useState<boolean>(false);
  const imageListProps = {
    sort: 'dc.date.accessioned,DESC',
    page: startIndex.current,
    size: rows,
    scope: authInfo.dspaceImagesUuid,
  };
  const [selectedImage, setSelectedImage] = useState<ImageProps>({
    Thumbnail: '',
    Title: '',
    Description: '',
  });

  const videoListProps = {
    sort: 'dc.date.accessioned,DESC',
    page: startIndex.current,
    size: rows,
    scope: authInfo.dspaceVideosUuid,
  };
  const [selectedVideo, setSelectedVideo] = useState<ImageProps>({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const categoryRef = useRef<string>('All');

  const getImages = (thumbnailsArr) => {
    const imagesArr: ImageProps[] = [];
    thumbnailsArr.map((obj, i) => {
      fetch(obj.Thumbnail)
        .then((res) => res.json())
        .then((json) => {
          imagesArr.push({
            Thumbnail: json._links.content.href,
            Title: obj.Title,
            Description: obj.Description,
            Author: obj.Author,
            Bundles: obj.Bundles,
          });
          if (imagesArr.length == thumbnailsArr.length) {
            setIsLoading(false);
            setIsLazyLoad(true);
            const newObj: ImageProps[] = [];
            thumbnailsArr.map((obj1) => {
              const filterdArr = imagesArr.filter((obj2) => {
                return obj1.Title === obj2.Title;
              });
              newObj.push(filterdArr[0]);
            });
            const updateImages: ImageProps[] = images.concat(newObj);
            setImages(() => updateImages);
          }
        });
    });
  };

  const getVideos = (bundlesArr) => {
    const contentArr: ImageProps[] = [];
    bundlesArr.map((obj) => {
      fetch(obj.Thumbnail)
        .then((res) => res.json())
        .then((json) => {
          fetch(json._embedded.bundles[0]._links.bitstreams.href)
            .then((res) => res.json())
            .then((json1) => {
              contentArr.push({
                Thumbnail: json1._embedded.bitstreams[0]._links.content.href,
                Title: obj.Title,
                Description: obj.Description,
                Author: obj.Author,
              });
              if (contentArr.length == bundlesArr.length) {
                setIsLoading(false);
                setIsLazyLoad(true);
                const newObj: ImageProps[] = [];
                bundlesArr.map((obj1) => {
                  const filterdArr = contentArr.filter((obj2) => {
                    return obj1.Title === obj2.Title;
                  });
                  newObj.push(filterdArr[0]);
                });
                const updateImages: ImageProps[] = images.concat(newObj);
                setImages(() => updateImages);
              }
            });
        });
    });
  };

  const handleSelectedImage = (selectedItem) => {
    if (selectedImage == selectedItem) {
      setSelectedImage({
        Thumbnail: '',
        Title: '',
        Description: '',
      });
    } else {
      setSelectedImage(selectedItem);
    }
  };

  const handleSelectedVideo = (selectedItem) => {
    if (selectedVideo == selectedItem) {
      setSelectedVideo({
        Thumbnail: '',
        Title: '',
        Description: '',
      });
    } else {
      setSelectedVideo(selectedItem);
    }
  };

  const handleDone = () => {
    setDoneLoader(true);
    if (galleryMode == 'Images') {
      fetch(selectedImage.Bundles != undefined ? selectedImage.Bundles : '')
        .then((res) => res.json())
        .then((json) => {
          //bitstreams call
          const imgIndex = json._embedded.bundles.findIndex(
            (x) => x.name == 'ORIGINAL'
          );
          const bitstream =
            json._embedded.bundles[imgIndex]._links.bitstreams.href;
          fetch(bitstream)
            .then((res) => res.json())
            .then((json1) => {
              const imageSelected = {
                ...selectedImage,
                Thumbnail: json1._embedded.bitstreams[0]._links.content.href,
              };
              handleImageSelected(imageSelected);
              setDoneLoader(false);
              toggleGallery(false, 'done');
              // if (!editorState) {
              //   const edditorState = editorState;
              //   const contentStateWithEntity = contentState.createEntity(
              //     "image",
              //     "IMMUTABLE",
              //     { src: imageSelected.Thumbnail }
              //   );
              //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
              //   const newEditorState =
              //     EditorState.set(
              //       editorState,
              //       { currentContent: contentStateWithEntity },
              //       "create-entity"
              //     );
              //   setEditorState(AtomicBlockUtils.insertAtomicBlock(
              //     newEditorState,
              //     entityKey,
              //     " "
              //   ));
              // }
            });
        });
    }
    if (galleryMode == 'Videos') {
      fetch(selectedVideo.Bundles != undefined ? selectedVideo.Bundles : '')
        .then((res) => res.json())
        .then((json) => {
          const bitstream = json._embedded.bundles[0]._links.bitstreams.href;
          fetch(bitstream)
            .then((res) => res.json())
            .then((json1) => {
              const videoUrl =
                json1._embedded.bitstreams[0]._links.content.href;
              const videoSelected = {
                ...selectedVideo,
                Url: videoUrl,
              };
              handleVideoSelected(videoSelected);
              setDoneLoader(false);
              toggleGallery(false, 'done');
            });
        });
    }
  };

  const getData = (nextIndex) => {
    fetch(
      `${authInfo.dspaceUri}server/api/discover/search/objects?sort=${
        galleryMode === 'Images' ? imageListProps.sort : videoListProps.sort
      }&page=${nextIndex}&size=${
        galleryMode === 'Images' ? imageListProps.size : videoListProps.size
      }&scope=${
        galleryMode === 'Images' ? imageListProps.scope : videoListProps.scope
      }&dsoType=ITEM`
    )
      .then((res) => res.json())
      .then(
        (json) => {
          if (json._embedded.searchResult._embedded.objects.length != 0) {
            const imageObjects = json._embedded.searchResult._embedded.objects;
            const thumbnailsArr: object[] = [];
            imageObjects.map((obj, i) => {
              thumbnailsArr.push({
                Bundles: obj._embedded.indexableObject._links.bundles.href,
                Thumbnail: obj._embedded.indexableObject._links.thumbnail.href,
                Title:
                  obj._embedded.indexableObject.metadata['dc.title'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata['dc.title'][0]
                        .value,
                Description:
                  obj._embedded.indexableObject.metadata['dc.description'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.description'
                      ][0].value,
                Author:
                  obj._embedded.indexableObject.metadata[
                    'dc.contributor.author'
                  ] == undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.contributor.author'
                      ][0].value,
              });
              if (
                thumbnailsArr.length ==
                json._embedded.searchResult._embedded.objects.length
              ) {
                getImages(thumbnailsArr);
              }
            });
          } else {
            setIsLazyLoad(false);
          }
        },
        (err) => {
          setIsError(true);
          setIsLoading(false);
        }
      );
  };

  const searchGallery = (index) => {
    const imageSearchProps = {
      sort: 'score,DESC',
      page: index,
      size: 10,
      configuration: 'administrativeView',
      query: searchValue,
      embed: 'thumbnail',
      scope: authInfo.dspaceImagesUuid,
    };
    const videoSearchProps = {
      sort: 'score,DESC',
      page: index,
      size: 10,
      configuration: 'administrativeView',
      query: searchValue,
      embed: 'thumbnail',
      scope: authInfo.dspaceVideosUuid,
    };
    if (galleryMode == 'Images') {
      fetch(
        `${authInfo.dspaceUri}server/api/discover/search/objects?sort=${imageSearchProps.sort}&page=${imageSearchProps.page}&size=${imageSearchProps.size}&configuration=${imageSearchProps.configuration}&query=${imageSearchProps.query}&scope=${imageSearchProps.scope}&embed=${imageSearchProps.embed}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json._embedded.searchResult._embedded.objects.length != 0) {
            const imageObjects = json._embedded.searchResult._embedded.objects;
            const thumbnailsArr: object[] = [];
            imageObjects.map((obj, i) => {
              thumbnailsArr.push({
                Bundles: obj._embedded.indexableObject._links.bundles.href,
                Thumbnail: obj._embedded.indexableObject._links.thumbnail.href,
                Title:
                  obj._embedded.indexableObject.metadata['dc.title'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata['dc.title'][0]
                        .value,
                Description:
                  obj._embedded.indexableObject.metadata['dc.description'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.description'
                      ][0].value,
                Author:
                  obj._embedded.indexableObject.metadata[
                    'dc.contributor.author'
                  ] == undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.contributor.author'
                      ][0].value,
              });
              if (
                thumbnailsArr.length ==
                json._embedded.searchResult._embedded.objects.length
              ) {
                getImages(thumbnailsArr);
              }
            });
          } else {
            setIsLazyLoad(false);
          }
        });
    } else {
      fetch(
        `${authInfo.dspaceUri}server/api/discover/search/objects?sort=${videoSearchProps.sort}&page=${videoSearchProps.page}&size=${videoSearchProps.size}&configuration=${videoSearchProps.configuration}&query=${videoSearchProps.query}&scope=${videoSearchProps.scope}&embed=${videoSearchProps.embed}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json._embedded.searchResult._embedded.objects.length != 0) {
            const imageObjects = json._embedded.searchResult._embedded.objects;
            const thumbnailsArr: object[] = [];
            imageObjects.map((obj, i) => {
              thumbnailsArr.push({
                Thumbnail: obj._embedded.indexableObject._links.bundles.href,
                Title:
                  obj._embedded.indexableObject.metadata['dc.title'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata['dc.title'][0]
                        .value,
                Description:
                  obj._embedded.indexableObject.metadata['dc.description'] ==
                  undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.description'
                      ][0].value,
                Author:
                  obj._embedded.indexableObject.metadata[
                    'dc.contributor.author'
                  ] == undefined
                    ? ''
                    : obj._embedded.indexableObject.metadata[
                        'dc.contributor.author'
                      ][0].value,
              });
              if (
                thumbnailsArr.length ==
                json._embedded.searchResult._embedded.objects.length
              ) {
                getVideos(thumbnailsArr);
              }
            });
          } else {
            setIsLazyLoad(false);
          }
        });
    }
  };

  const searchCategory = (index, searchText) => {
    const imageCategoryProps = {
      category: 'title',
      sort: `dc.${
        categoryRef.current == 'title' ? 'title' : 'contributor.author'
      },default,DESC`,
      page: index,
      size: 10,
      startsWith: searchText,
      scope: authInfo.dspaceImagesUuid,
    };
    const videoCategoryProps = {
      category: 'title',
      sort: `dc.${
        categoryRef.current == 'title' ? 'title' : 'contributor.author'
      },default,DESC`,
      page: index,
      size: 10,
      startsWith: searchText,
      scope: authInfo.dspaceVideosUuid,
    };
    if (galleryMode == 'Images') {
      fetch(
        `${authInfo.dspaceUri}server/api/discover/browses/${imageCategoryProps.category}/items?scope=${imageCategoryProps.scope}&sort=${imageCategoryProps.sort}&page=${imageCategoryProps.page}&size=${imageCategoryProps.size}&startsWith=${imageCategoryProps.startsWith}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json._embedded.items.length != 0) {
            const imageObjects = json._embedded.items;
            const thumbnailsArr: object[] = [];
            imageObjects.map((obj, i) => {
              thumbnailsArr.push({
                Bundles: obj._links.bundles.href,
                Thumbnail: obj._links.thumbnail.href,
                Title:
                  obj.metadata['dc.title'] == undefined
                    ? ''
                    : obj.metadata['dc.title'][0].value,
                Description:
                  obj.metadata['dc.description'] == undefined
                    ? ''
                    : obj.metadata['dc.description'][0].value,
                Author:
                  obj.metadata['dc.contributor.author'] == undefined
                    ? ''
                    : obj.metadata['dc.contributor.author'][0].value,
              });
              if (thumbnailsArr.length == json._embedded.items.length) {
                getImages(thumbnailsArr);
              }
            });
          } else {
            setIsLazyLoad(false);
          }
        });
    } else {
      fetch(
        `${authInfo.dspaceUri}server/api/discover/browses/${videoCategoryProps.category}/items?scope=${videoCategoryProps.scope}&sort=${videoCategoryProps.sort}&page=${videoCategoryProps.page}&size=${videoCategoryProps.size}&startsWith=${videoCategoryProps.startsWith}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json._embedded.items.length != 0) {
            const imageObjects = json._embedded.items;
            const thumbnailsArr: object[] = [];
            imageObjects.map((obj, i) => {
              thumbnailsArr.push({
                Thumbnail: obj._links.bundles.href,
                Title:
                  obj.metadata['dc.title'] == undefined
                    ? ''
                    : obj.metadata['dc.title'][0].value,
                Description:
                  obj.metadata['dc.description'] == undefined
                    ? ''
                    : obj.metadata['dc.description'][0].value,
                Author:
                  obj.metadata['dc.contributor.author'] == undefined
                    ? ''
                    : obj.metadata['dc.contributor.author'][0].value,
              });
              if (thumbnailsArr.length == json._embedded.items.length) {
                getVideos(thumbnailsArr);
              }
            });
          } else {
            setIsLazyLoad(false);
          }
        });
    }
  };

  useEffect(() => {
    getData(startIndex.current);
    if (startIndex.current == 0) {
      setIsLoading(true);
    }
  }, []);

  const fetchMoreData = () => {
    const nextIndex = startIndex.current + 1;
    startIndex.current = nextIndex;
    if (categoryRef.current == 'All') {
      if (searchValue) {
        searchGallery(startIndex.current);
      } else {
        getData(startIndex.current);
      }
    } else {
      searchCategory(startIndex.current, searchValue);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    // do stuff
    if (e.key == 'Enter') {
      setIsLazyLoad(false);
      const button = e.target as HTMLButtonElement;
      setSearchValue(button.value);
      startIndex.current = 0;
      setIsLoading(true);
      if (startIndex.current == 0) {
        setImages(() => images.splice(0, images.length));
      }
      if (categoryRef.current != 'All') {
        searchCategory(startIndex.current, searchValue);
      } else {
        if (searchValue == '') {
          getData(startIndex.current);
        } else {
          searchGallery(startIndex.current);
        }
      }
    }
  };

  const handleResetInputFilter = () => {
    setIsLazyLoad(false);
    setSearchValue('');
    startIndex.current = 0;
    setIsLoading(true);
    if (startIndex.current == 0) {
      setImages(() => images.splice(0, images.length));
    }
    if (categoryRef.current != 'All') {
      searchCategory(startIndex.current, '');
    } else {
      getData(startIndex.current);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCategory = (event) => {
    setIsLazyLoad(false);
    categoryRef.current = event.target.value;
    startIndex.current = 0;
    setIsLoading(true);
    if (startIndex.current == 0) {
      setImages(() => images.splice(0, images.length));
    }
    if (categoryRef.current != 'All') {
      searchCategory(startIndex.current, searchValue);
    } else {
      if (searchValue == '') {
        getData(startIndex.current);
      } else {
        searchGallery(startIndex.current);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        zIndex: '999',
      }}
    >
      <Grid container pt={2} pb={2} pl={4} pr={4}>
        <Grid item xs={12} md={3} lg={3} sx={{ margin: 'auto 0' }}>
          <Typography
            variant="h5"
            sx={{ fontSize: ThemeConstants.FONTSIZE_LG }}
          >
            {galleryMode == 'Images'
              ? t('page_choose_image')
              : t('video_subtitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={5} sx={{ margin: 'auto 0' }}>
          <Box sx={{ display: 'none' }} mt={1}>
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="start">
                    <CloseRoundedIcon
                      sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '18px',
                        backgroundColor: '#fff',
                      }}
                      onClick={handleResetInputFilter}
                    />
                  </InputAdornment>
                ),
              }}
              value={searchValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              sx={{
                width: { xs: '80%', sm: '80%', md: '50%', lg: '100%' },
                '.Platform-x-InputBase-root': {
                  height: '50px',
                  fontSize: ThemeConstants.FONTSIZE_MD,
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                },
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
            />
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={categoryRef.current}
                onChange={handleCategory}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  height: '50px',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderLeft: '0px solid #fff',
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} lg={4} mt={2} sx={{ textAlign: 'right' }}>
          <Button
            variant="outlined"
            onClick={() => toggleGallery(false, 'cancel')}
          >
            {t('cancel')}
          </Button>
          <LoadingButton
            onClick={handleDone}
            loading={doneLoader}
            loadingPosition="start"
            sx={{
              marginLeft: '20px',
              '&:disabled': {
                backgroundColor:
                  selectedImage.Thumbnail != '' || selectedVideo.Thumbnail != ''
                    ? '#000'
                    : '',
              },
            }}
            disabled={
              selectedImage.Thumbnail == '' && selectedVideo.Thumbnail == ''
            }
            variant="contained"
          >
            {t('save')}
          </LoadingButton>
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
          {isLoading && (
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
          )}
          <InfiniteScroll
            dataLength={images != undefined ? images.length : 0}
            next={fetchMoreData}
            hasMore={isLazyLoad}
            loader={
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
            }
            style={{ overflow: 'hidden' }}
            scrollableTarget="scrollableDiv"
          >
            {galleryMode == 'Images' && (
              <Masonry columns={4} spacing={2}>
                {images.map((item: any, i) => (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
                          display: 'flex',
                          top: '0%',
                          left: '0%',
                          right: '0%',
                          bottom: '0%',
                        },
                      },
                    }}
                    onClick={() => handleSelectedImage(item)}
                    key={i}
                  >
                    <img src={`${item.Thumbnail}`} width="100%" height="100%" />
                    <Box
                      sx={{
                        backgroundColor:
                          item.Thumbnail == selectedImage.Thumbnail
                            ? ThemeConstants.BLACK_COLOR
                            : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedImage.Thumbnail == ''
                            ? 0
                            : item.Thumbnail == selectedImage.Thumbnail
                            ? 0.5
                            : 0.6,
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        padding: '2%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      p={1}
                    >
                      <Box>
                        <CheckCircleOutlineIcon
                          style={{
                            color: ThemeConstants.WHITE_COLOR,
                            fontSize: ThemeConstants.FONTSIZE_XXXL,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        padding: '7%',
                        display: 'none',
                      }}
                      p={1}
                      className="image-hover-text"
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Title.replaceAll('%20', ' ')}
                        </Typography>
                        <Box
                          sx={{
                            width: '40px',
                            height: '2px',
                            backgroundColor: ThemeConstants.WHITE_COLOR,
                            margin: '12px 0px',
                          }}
                        ></Box>
                        <Typography
                          variant="body2"
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Masonry>
            )}
            {galleryMode == 'Videos' && (
              <Masonry columns={4} spacing={2}>
                {images.map((item: any, i) => (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
                          display: 'flex',
                          top: '0%',
                          left: '0%',
                          right: '0%',
                          bottom: '0%',
                        },
                      },
                    }}
                    onClick={() => handleSelectedVideo(item)}
                    key={i}
                  >
                    {/* <video controls width="100%" height="100%" >
                      <source src={item.Thumbnail} />
                    </video> */}
                    <img src={`${item.Thumbnail}`} width="100%" height="100%" />
                    <Box
                      sx={{
                        backgroundColor:
                          item.Thumbnail == selectedVideo.Thumbnail
                            ? ThemeConstants.BLACK_COLOR
                            : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedVideo.Thumbnail == ''
                            ? 0
                            : item.Thumbnail == selectedVideo.Thumbnail
                            ? 0.5
                            : 0.6,
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        padding: '2%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      p={1}
                    >
                      <Box>
                        <CheckCircleOutlineIcon
                          style={{
                            color: ThemeConstants.WHITE_COLOR,
                            fontSize: ThemeConstants.FONTSIZE_XXXL,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        padding: '7%',
                        display: 'none',
                      }}
                      p={1}
                      className="image-hover-text"
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Title.replaceAll('%20', ' ')}
                        </Typography>
                        <Box
                          sx={{
                            width: '40px',
                            height: '2px',
                            backgroundColor: ThemeConstants.WHITE_COLOR,
                            margin: '12px 0px',
                          }}
                        ></Box>
                        <Typography
                          variant="body2"
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Masonry>
            )}
          </InfiniteScroll>
        </Box>
      )}
    </Box>
  );
};

export default Gallery2;
