import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Grid, Divider } from '@mui/material';
import ThemeConstants from '../../theme/variable';
import { authInfo } from '../../utils/authConstants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import Pdf from '../../assets/images/pdf.png';

interface Collection {
  Uuid: string;
  Name: string;
}

interface ImageProps {
  Title: string;
  Description: string;
  Thumbnail: string;
  ItemType?: string;
}

const AssetPicker = () => {
  const [collectionsList, setCollectionsList] = useState<Collection[]>([]);
  const [collectionSelected, setCollectionSelected] = useState<Collection>();
  const [images, setImages] = useState<ImageProps[]>([]);
  const [videos, setVideos] = useState<ImageProps[]>([]);
  const [pdfs, setPdfs] = useState<ImageProps[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);
  const [allItems, setAllItems] = useState<ImageProps[]>([]);
  const navigate = useNavigate();
  const [collectionType, setCollectionType] = React.useState('All');
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCollectionType(newValue);
  };

  const getImagesVideosPdfs = (bundlesArr, collectionMode) => {
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
                ItemType: obj.ItemType,
              });
              if (contentArr.length == bundlesArr.length) {
                const newObj: ImageProps[] = [];
                bundlesArr.map((obj1) => {
                  const filterdArr = contentArr.filter((obj2) => {
                    return obj1.Title === obj2.Title;
                  });
                  newObj.push(filterdArr[0]);
                });
                const updateImages: ImageProps[] = [...newObj];
                if (collectionMode == 'Pdfs') {
                  setPdfs(updateImages);
                } else if (collectionMode == 'Image') {
                  setImages(updateImages);
                } else {
                  setVideos(updateImages);
                }
                setLoading(false);
              }
            });
        });
    });
  };

  const getItemsFromCollection = (collectionItem) => {
    setLoading(true);
    fetch(
      `${authInfo.dspaceUri
        }server/api/discover/browses/dateissued/items?scope=${
        collectionItem.Uuid}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollectionType(json._embedded.items[0].metadata['dc.type'][0].value);
        const thumbnailsArr: ImageProps[] = [];
        const collectionMode =
          json._embedded.items[0].metadata['dc.type'][0].value;
        json._embedded.items.map((item, index) => {
          thumbnailsArr.push({
            Title:
              item.metadata['dc.title'] == undefined
                ? ''
                : item.metadata['dc.title'][0].value,
            Description:
              item.metadata['dc.description'] == undefined
                ? ''
                : item.metadata['dc.description'][0].value,
            Thumbnail: item._links.bundles.href,
            ItemType: collectionMode,
          });
          if (json._embedded.items.length == index + 1) {
            getImagesVideosPdfs(thumbnailsArr, collectionMode);
          }
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${authInfo.dspaceUri  }server/api/core/collections`)
      .then((res) => res.json())
      .then((json) => {
        const collectionItemRoot: Collection = {
          Uuid: 'Root',
          Name: 'All Assets',
        };
        setCollectionsList((state) => [...state, collectionItemRoot]);
        json._embedded.collections.map((item, index) => {
          const collectionItem: Collection = {
            Uuid: item.uuid,
            Name: item.name,
          };
          if (index == 0) {
            setCollectionSelected(collectionItem);
          }
          setCollectionsList((state) => [...state, collectionItem]);
          if (json._embedded.collections.length == index + 1) {
            const collectionInitialObj: Collection = {
              Uuid: json._embedded.collections[1].uuid,
              Name: json._embedded.collections[1].name,
            };
            getItemsFromCollection(collectionInitialObj);
          }
        });
      });
  }, []);

  const getImagesAndVideos = (allThumbnails, collectionMode) => {
    const itemsArr: ImageProps[] = [];
    [...allThumbnails].map((item, index) => {
      fetch(item.Thumbnail)
        .then((res) => res.json())
        .then((json) => {
          fetch(json._embedded.bundles[0]._links.bitstreams.href)
            .then((res) => res.json())
            .then((json1) => {
              itemsArr.push({
                Thumbnail: json1._embedded.bitstreams[0]._links.content.href,
                Title: item.Title,
                Description: item.Description,
                ItemType: item.ItemType,
              });
              if (allThumbnails.length == itemsArr.length) {
                setAllItems([...itemsArr]);
                setImages(
                  [...itemsArr].filter((image) => image.ItemType == 'Image')
                );
                setVideos(
                  [...itemsArr].filter((video) => video.ItemType == 'Video')
                );
                setPdfs([...itemsArr].filter((pdf) => pdf.ItemType == 'Pdfs'));
                setLoading(false);
              }
            });
        });
      // }
    });
  };

  const getAllItemsFromCollections = () => {
    setLoading(true);
    setCollectionType('All');
    let collectionCount = 0;
    let allThumbnails: ImageProps[] = [];
    collectionsList.map((collectionItem, collectionIndex) => {
      if (collectionItem.Uuid != 'Root') {
        fetch(
          `${authInfo.dspaceUri
            }server/api/discover/browses/dateissued/items?scope=${
            collectionItem.Uuid}`
        )
          .then((res) => res.json())
          .then((json) => {
            const thumbnailsArr: ImageProps[] = [];
            const collectionMode: string =
              json._embedded.items[0].metadata['dc.type'][0].value;
            json._embedded.items.map((item, index) => {
              thumbnailsArr.push({
                Title:
                  item.metadata['dc.title'] == undefined
                    ? ''
                    : item.metadata['dc.title'][0].value,
                Description:
                  item.metadata['dc.description'] == undefined
                    ? ''
                    : item.metadata['dc.description'][0].value,
                Thumbnail: item._links.bundles.href,
                ItemType: collectionMode,
              });
              if (json._embedded.items.length == index + 1) {
                collectionCount++;
                allThumbnails = allThumbnails.concat(thumbnailsArr);
                if (collectionCount == collectionsList.length - 1) {
                  getImagesAndVideos(allThumbnails, collectionMode);
                }
              }
            });
          });
      }
    });
  };

  const selectedCollection = (item) => {
    setAllItems([]);
    setSelectedImages([]);
    setImages([]);
    setVideos([]);
    setPdfs([]);
    setCollectionSelected(item);
    if (item.Uuid == 'Root') {
      getAllItemsFromCollections();
    } else {
      getItemsFromCollection(item);
    }
  };

  const handleSelectedImage = (selectedItem) => {
    if (selectedImages.includes(selectedItem)) {
      setSelectedImages((current) =>
        current.filter((item) => {
          return item !== selectedItem;
        })
      );
    } else {
      setSelectedImages((state) => [...state, selectedItem]);
    }
  };

  const handleDone = () => {
    navigate('/assets', {
      state: { items: [...selectedImages], collectionType: collectionType },
    });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        zIndex: '9',
      }}
    >
      <Grid container pt={1} pb={1} pl={4} pr={4}>
        <Grid item xs={12} md={3} lg={6} sx={{ margin: 'auto 0' }}>
          <Typography
            variant='h5'
            sx={{ fontSize: ThemeConstants.FONTSIZE_MD }}
          >
            Choose your Asset
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} lg={6} mt={2} sx={{ textAlign: 'right' }}>
          <Button variant='outlined'>Cancel</Button>
          <Button
            sx={{ marginLeft: '20px' }}
            variant='contained'
            disabled={selectedImages.length == 0}
            onClick={handleDone}
          >
            Done
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container pt={2} pl={4}>
        <Grid
          item
          xs={12}
          md={3}
          lg={2}
          sx={{ margin: 'auto 0', borderRight: '1px solid #80808054' }}
        >
          <Typography
            variant='h4'
            sx={{ fontSize: ThemeConstants.FONTSIZE_MD }}
            mb={2}
          >
            HCL-X Assets
          </Typography>
          <Divider />
          <Box
            sx={{
              height: 'calc(100vh - 145px)',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {collectionsList.map((item, key) => {
              return (
                <Typography
                  variant='body1'
                  mt={2}
                  mb={2}
                  sx={{
                    color:
                      collectionSelected == item
                        ? ThemeConstants.RED_COLOR
                        : ThemeConstants.PRIMARY_MAIN_COLOR,
                  }}
                  onClick={() => selectedCollection(item)}
                  key={key}
                >
                  {item.Name}
                </Typography>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={5} lg={10}>
          <TabContext value={collectionType}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
              >
                <Tab label='All' value='All' />
                <Tab label='Image' value='Image' />
                <Tab label='Videos' value='Video' />
                <Tab label='Pdfs' value='Pdfs' />
              </TabList>
            </Box>
            <TabPanel
              value='All'
              sx={{ height: 'calc(100vh - 152px)', overflowY: 'scroll' }}
            >
              <Masonry columns={4} spacing={2}>
                {allItems.map((item, i) =>
                  (<Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
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
                    {item.ItemType == 'Image' ? (
                      <img
                        src={`${item.Thumbnail}`}
                        width='100%'
                        height='100%'
                      />
                    ) : item.ItemType == 'Video' ? (
                      <video controls width='100%' height='100%'>
                        <source src={item.Thumbnail} />
                      </video>
                    ) : (
                      <img
                        src={Pdf}
                        alt={item.Thumbnail}
                        width='100%'
                        height='100%'
                      />
                    )}
                    <Box
                      sx={{
                        backgroundColor: selectedImages.includes(item)
                          ? ThemeConstants.BLACK_COLOR
                          : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedImages.length == 0
                            ? 0
                            : selectedImages.includes(item)
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
                        display: 'flex',
                      }}
                      p={1}
                      className='image-hover-text'
                    >
                      <Box>
                        <Typography
                          variant='body1'
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
                          variant='body2'
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>)
                )}
                {allItems.length == 0 && !loading &&
                  <Box>
                    <Typography variant='body1'>No All Results</Typography>
                  </Box>}
              </Masonry>
              {loading &&
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
                </Box>}
            </TabPanel>
            <TabPanel
              value='Image'
              sx={{ height: 'calc(100vh - 152px)', overflowY: 'scroll' }}
            >
              <Masonry columns={4} spacing={2}>
                {images.map((item, i) =>
                  (<Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
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
                    <img src={`${item.Thumbnail}`} width='100%' height='100%' />
                    <Box
                      sx={{
                        backgroundColor: selectedImages.includes(item)
                          ? ThemeConstants.BLACK_COLOR
                          : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedImages.length == 0
                            ? 0
                            : selectedImages.includes(item)
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
                        display: 'flex',
                      }}
                      p={1}
                      className='image-hover-text'
                    >
                      <Box>
                        <Typography
                          variant='body1'
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
                          variant='body2'
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>)
                )}
                {images.length == 0 && !loading &&
                  <Box>
                    <Typography variant='body1'>No Image Results</Typography>
                  </Box>}
              </Masonry>
              {loading &&
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
                </Box>}
            </TabPanel>
            <TabPanel
              value='Video'
              sx={{ height: 'calc(100vh - 152px)', overflowY: 'scroll' }}
            >
              <Masonry columns={4} spacing={2}>
                {videos.map((item, i) =>
                  (<Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
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
                    <video controls width='100%' height='100%'>
                      <source src={item.Thumbnail} />
                    </video>
                    <Box
                      sx={{
                        backgroundColor: selectedImages.includes(item)
                          ? ThemeConstants.BLACK_COLOR
                          : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedImages.length == 0
                            ? 0
                            : selectedImages.includes(item)
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
                        display: 'flex',
                      }}
                      p={1}
                      className='image-hover-text'
                    >
                      <Box>
                        <Typography
                          variant='body1'
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
                          variant='body2'
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>)
                )}
                {videos.length == 0 && !loading &&
                  <Box>
                    <Typography variant='body1'>No Video Results</Typography>
                  </Box>}
              </Masonry>
              {loading &&
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
                </Box>}
            </TabPanel>
            <TabPanel
              value='Pdfs'
              sx={{ height: 'calc(100vh - 152px)', overflowY: 'scroll' }}
            >
              <Masonry columns={4} spacing={2}>
                {pdfs.map((item, i) =>
                  (<Box
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '.image-hover-text': {
                          backgroundColor: '#0000009e',
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
                    <img
                      src={Pdf}
                      alt={item.Thumbnail}
                      width='100%'
                      height='100%'
                    />
                    <Box
                      sx={{
                        backgroundColor: selectedImages.includes(item)
                          ? ThemeConstants.BLACK_COLOR
                          : ThemeConstants.WHITE_COLOR,
                        opacity:
                          selectedImages.length == 0
                            ? 0
                            : selectedImages.includes(item)
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
                        display: 'flex',
                      }}
                      p={1}
                      className='image-hover-text'
                    >
                      <Box>
                        <Typography
                          variant='body1'
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
                          variant='body2'
                          sx={{ color: ThemeConstants.WHITE_COLOR }}
                        >
                          {item.Description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>)
                )}
                {pdfs.length == 0 && !loading &&
                  <Box>
                    <Typography variant='body1'>No Pdfs Results</Typography>
                  </Box>}
              </Masonry>
              {loading &&
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
                </Box>}
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AssetPicker;
