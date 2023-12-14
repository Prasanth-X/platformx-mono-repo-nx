import { useMutation } from '@apollo/client';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeedIcon from '@mui/icons-material/Feed';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NearMeIcon from '@mui/icons-material/NearMe';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Divider, Grid, Typography } from '@mui/material/';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePrelemData } from '../../services/page/page.api';
import {
  updateContentForCard,
  updateContentHandleForCard,
  updateContentHandleForLivestream,
  updatePrelemContent,
} from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import PrelemBrightcoveVideo from './PrelemBrightcoveVideo';
import PrelemEcom from './PrelemEcom';
import PrelemImages from './PrelemImages';
import PrelemSEO from './PrelemSEO';
import PrelemTestimonials from './PrelemTestimonials';
import PrelemTwitter from './PrelemTwitter';
import PrelemVideos from './PrelemVideos';
import PrelemAdvanced from './prelemAdvanced';
import PrelemAnalytics from './prelemAnalytics';
import { keyTypesSettings } from './utils/constants';

const PrelemSettings = ({
  handleClose,
  handleUpdatedPrelemModelChild,
  selectedPrelemIndex,
  toggleGallery,
  selectedImage,
  selectedVideo,
  handleDelete,
  confirmImageOrVideoDelete,
}) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [mutatePrelemContentQuery] = useMutation(updatePrelemData);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [prelemModelData, setPrelemModelData] = useState(
    page.prelemMetaArray[selectedPrelemIndex]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<string>('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<string>('');

  const getPublishedImageArr = (index: number) => {
    if (prelemModelData?.content?.ImageCompound) {
      return prelemModelData.content.ImageCompound[`ImageCompound_${index + 1}`]
        .published_images;
    } else {
      return prelemModelData.content.published_images;
    }
  };
  useEffect(() => {
    const keyTypes = new Set(keyTypesSettings);
    const contentKeys = Object.keys(prelemModelData?.content)?.sort();
    for (const el of contentKeys) {
      const accordionToBeExpanded = el.toLowerCase();
      if (keyTypes.has(accordionToBeExpanded)) {
        setExpanded(accordionToBeExpanded);
        break;
      } else if (prelemModelData?.content?.PlayerType === 'brightcove') {
        setExpanded('livestream');
      } else {
        setExpanded('seo');
      }
    }
  }, []);
  const handleSave = (sectionToUpdate, data, index) => {
    if (sectionToUpdate == 'EcomHandle') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.ApiEndPoint =
        data?.apiEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.OauthEndPoint =
        data?.oauthEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.Password =
        data?.password;
      page.prelemMetaArray[selectedPrelemIndex].content.Username =
        data?.userName;
    } else if (sectionToUpdate == 'TwitterHandle') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.TwitterHandle = data;
    } else if (sectionToUpdate === 'Testimonials') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.Testimonials = data;
    } else if (sectionToUpdate === 'Livestream') {
      dispatch(
        updateContentHandleForLivestream(
          selectedPrelemIndex,
          sectionToUpdate,
          data
        )
      );
      page.prelemMetaArray[selectedPrelemIndex].content = {
        ...page.prelemMetaArray[selectedPrelemIndex].content,
        ...data,
      };
    } else if (sectionToUpdate === 'Images') {
      dispatch(
        updateContentForCard(
          selectedPrelemIndex,
          sectionToUpdate,
          data.Images,
          index
        )
      );
    } else {
      dispatch(
        updateContentForCard(selectedPrelemIndex, sectionToUpdate, data, index)
      );
    }
    if (
      [
        'Images',
        'Videos',
        'TwitterHandle',
        'Livestream',
        'Testimonials',
      ].includes(sectionToUpdate)
    ) {
      let updateContent = page.prelemMetaArray[selectedPrelemIndex].content;
      if (sectionToUpdate === 'Images') {
        updateContent = {
          ...page.prelemMetaArray[selectedPrelemIndex].content,
          published_images: data.published_images,
          original_image: data.original_image,
        };
      }
      updatePrelemContent(
        dispatch,
        mutatePrelemContentQuery,
        // page.prelemMetaArray[selectedPrelemIndex].content,
        updateContent,
        selectedPrelemIndex,
        prelemModelData.DocumentPath,
        prelemModelData.DocumentCreationPath,
        prelemModelData.DocumentType,
        prelemModelData.InstanceId
      );
    } else {
      return;
    }
    handleUpdatedPrelemModelChild();
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    setPrelemModelData(page.prelemMetaArray[selectedPrelemIndex]);
  }, [page.prelemMetaArray[selectedPrelemIndex]]);
  useEffect(() => {
    if (prelemModelData?.content?.Testimonials != undefined)
      setExpanded('testimonials');
  }, [prelemModelData]);
  const handleGallery = (toggleState, galleryType, index, type) => {
    // handleGallery(true, 'Images', imageIndex, type);
    if (galleryType == 'Images') {
      setSelectedImageIndex(index);
    }
    toggleGallery(toggleState, galleryType);
    if (galleryType == 'Videos') {
      setSelectedVideoIndex(index);
    }
    setSelectedOperation(type);
  };
  return (
    <Grid container sx={{ marginTop: '0' }}>
      <Grid item md={8} sx={{ backgroundColor: 'transparent' }}></Grid>
      <Grid item sm={12} md={4} sx={{ backgroundColor: '#f5f5f5' }}>
        <Typography
          variant="subtitle1"
          sx={{
            padding: '10px 25px 10px 25px',
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textTransform: 'uppercase',
            color: ThemeConstants.WHITE_COLOR,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
          }}
        >
          {t('page_prelem_setting')}
          <CloseIcon
            sx={{ color: ThemeConstants.WHITE_COLOR, cursor: 'pointer' }}
            onClick={handleClose}
          />
        </Typography>
        <Box
          sx={{
            height: 'calc(100vh - 150px)',
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {prelemModelData?.PrelemId == 'Prelem_066' && (
            <Accordion
              expanded={expanded == 'Ecom'}
              onChange={handleChange('Ecom')}
              sx={{
                boxShadow: 'none',
                '&.Mui-expanded': {
                  margin: '0px',
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
                }
                aria-controls="Ecom-content"
                id="Ecom-header"
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_DEFAULT,
                      xl: ThemeConstants.FONTSIZE_MD,
                    },
                  }}
                >
                  <NearMeIcon
                    sx={{
                      color: ThemeConstants.BLACK_COLOR,
                      cursor: 'pointer',
                      marginRight: '10px',
                      textTransform: 'capitalize',
                    }}
                  />
                  Data Source
                </Typography>
              </AccordionSummary>
              <Divider />
              <PrelemEcom
                index={selectedPrelemIndex}
                EcomHandle={prelemModelData?.content}
                handleSave={handleSave}
              />
            </Accordion>
          )}
          {prelemModelData?.content?.TwitterHandle != undefined && (
            <Accordion
              expanded={expanded == 'twitterhandle'}
              onChange={handleChange('twitterhandle')}
              sx={{
                boxShadow: 'none',
                '&.Mui-expanded': {
                  margin: '0px',
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
                }
                aria-controls="twitter-content"
                id="twitter-header"
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_DEFAULT,
                      xl: ThemeConstants.FONTSIZE_MD,
                    },
                  }}
                >
                  <TwitterIcon
                    sx={{
                      color: ThemeConstants.BLACK_COLOR,
                      cursor: 'pointer',
                      marginRight: '10px',
                      textTransform: 'capitalize',
                    }}
                  />
                  {t('prelem_twitter_handle')}
                </Typography>
              </AccordionSummary>
              <Divider />
              <PrelemTwitter
                index={selectedPrelemIndex}
                twitterHandle={prelemModelData.content.TwitterHandle}
                handleSave={handleSave}
              />
            </Accordion>
          )}
          <Divider />
          {prelemModelData?.content?.Testimonials != undefined && (
            <Fragment>
              <Accordion
                expanded={expanded == 'testimonials'}
                onChange={handleChange('testimonials')}
                sx={{
                  boxShadow: 'none',
                  '&.Mui-expanded': {
                    margin: '0px',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: ThemeConstants.BLACK_COLOR }}
                    />
                  }
                  aria-controls="images-content"
                  id="images-header"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                    }}
                  >
                    <FeedIcon
                      sx={{
                        color: ThemeConstants.BLACK_COLOR,
                        cursor: 'pointer',
                        marginRight: '10px',
                        textTransform: 'capitalize',
                      }}
                    />
                    {t('testimonials')}
                  </Typography>
                </AccordionSummary>
                <Divider />
                <PrelemTestimonials
                  data={prelemModelData.content.Testimonials}
                  sectionToUpdate="Testimonials"
                  handleSave={handleSave}
                />
              </Accordion>
              <Divider />
            </Fragment>
          )}
          {prelemModelData?.content?.Images != undefined && (
            <Fragment>
              <Accordion
                expanded={expanded == 'images'}
                onChange={handleChange('images')}
                sx={{
                  boxShadow: 'none',
                  '&.Mui-expanded': {
                    margin: '0px',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: ThemeConstants.BLACK_COLOR }}
                    />
                  }
                  aria-controls="images-content"
                  id="images-header"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                      textTransform: 'capitalize',
                    }}
                  >
                    <CollectionsIcon
                      sx={{
                        color: ThemeConstants.BLACK_COLOR,
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    />
                    {t('prelem_images')}
                  </Typography>
                </AccordionSummary>
                <Divider />
                {Object.entries(prelemModelData.content.Images).map(
                  ([key, value], index) => {
                    return (
                      <PrelemImages
                        key={`Image_${index + 1}`}
                        index={`Image_${index + 1}`}
                        imageInstance={
                          prelemModelData?.content?.Images?.[
                            `Image_${index + 1}`
                          ]
                        }
                        handleSave={handleSave}
                        sectionToUpdate="Images"
                        handleGallery={handleGallery}
                        selectedIndex={selectedImageIndex}
                        selectedImage={
                          selectedImageIndex == `Image_${index + 1}` &&
                          (selectedOperation == 'replace' ||
                            selectedOperation == 'choose')
                            ? selectedImage
                            : { Thumbnail: '', Title: '', Description: '' }
                        }
                        published_images={getPublishedImageArr(index)}
                      />
                    );
                  }
                )}
              </Accordion>
              <Divider />
            </Fragment>
          )}
          {prelemModelData?.content?.Videos != undefined &&
            prelemModelData?.PrelemName !== 'Image & Video Gallery' && (
              <Fragment>
                <Accordion
                  expanded={expanded == 'videos'}
                  onChange={handleChange('videos')}
                  sx={{
                    boxShadow: 'none',
                    '&.Mui-expanded': {
                      margin: '0px',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: ThemeConstants.BLACK_COLOR }}
                      />
                    }
                    aria-controls="videos-content"
                    id="videos-header"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: {
                          xs: ThemeConstants.FONTSIZE_DEFAULT,
                          xl: ThemeConstants.FONTSIZE_MD,
                        },
                        textTransform: 'capitalize',
                      }}
                    >
                      <YouTubeIcon
                        sx={{
                          color: ThemeConstants.BLACK_COLOR,
                          cursor: 'pointer',
                          marginRight: '10px',
                        }}
                      />
                      {t('prelem_video')}
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  {Object.entries(prelemModelData.content.Videos).map(
                    ([key, value]) => {
                      return (
                        <PrelemVideos
                          key={key}
                          index={key}
                          playerFlow={prelemModelData?.content?.PlayerType}
                          videoInstance={value}
                          handleSave={handleSave}
                          sectionToUpdate="Videos"
                          handleGallery={handleGallery}
                          selectedIndex={selectedVideoIndex}
                          selectedVideo={
                            selectedVideoIndex == key &&
                            (selectedOperation == 'replace' ||
                              selectedOperation == 'choose')
                              ? selectedVideo
                              : { Thumbnail: '', Title: '', Description: '' }
                          }
                        />
                      );
                    }
                  )}
                </Accordion>
                <Divider />
              </Fragment>
            )}
          {prelemModelData?.content?.PlayerType === 'brightcove' && (
            <Fragment>
              <Accordion
                expanded={expanded === 'livestream'}
                onChange={handleChange('livestream')}
                sx={{
                  boxShadow: 'none',
                  '&.Mui-expanded': {
                    margin: '0px',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: ThemeConstants.BLACK_COLOR }}
                    />
                  }
                  aria-controls="twitter-content"
                  id="twitter-header"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                      textTransform: 'capitalize',
                    }}
                  >
                    <YouTubeIcon
                      sx={{
                        color: ThemeConstants.BLACK_COLOR,
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    />
                    {t('brightcove_video')}
                  </Typography>
                </AccordionSummary>
                <Divider />
                <PrelemBrightcoveVideo
                  index={selectedPrelemIndex}
                  videoObj={{
                    VideoID: prelemModelData?.content?.VideoID,
                    PlayerID: prelemModelData?.content?.PlayerID,
                    AccountID: prelemModelData?.content?.AccountID,
                  }}
                  handleSave={handleSave}
                />
              </Accordion>
              <Divider />
            </Fragment>
          )}
          {prelemModelData?.content?.TwitterHandle == undefined && (
            <Fragment>
              <Accordion
                expanded={expanded == 'seo'}
                onChange={handleChange('seo')}
                sx={{
                  boxShadow: 'none',
                  '&.Mui-expanded': {
                    margin: '0px',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: ThemeConstants.BLACK_COLOR }}
                    />
                  }
                  aria-controls="seo-content"
                  id="seo-header"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                      textTransform: 'uppercase',
                    }}
                  >
                    <FindInPageIcon
                      sx={{
                        color: ThemeConstants.BLACK_COLOR,
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    />
                    {t('page_prelem_seo')}
                  </Typography>
                </AccordionSummary>
                <Divider />
                <PrelemSEO
                  handleSave={handleSave}
                  seoEnabled={prelemModelData.SeoEnabled}
                  structureData={prelemModelData.StructuredData}
                />
              </Accordion>
              <Divider />
            </Fragment>
          )}
          <Accordion
            expanded={expanded == 'advanced'}
            onChange={handleChange('advanced')}
            sx={{
              boxShadow: 'none',
              '&.Mui-expanded': {
                margin: '0px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
              }
              aria-controls="advanced-content"
              id="advanced-header"
            >
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_MD,
                  },
                  textTransform: 'capitalize',
                }}
              >
                <RocketLaunchIcon
                  sx={{
                    color: ThemeConstants.BLACK_COLOR,
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
                {t('advanced')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <PrelemAdvanced />
          </Accordion>
          <Divider />
          <Accordion
            expanded={expanded == 'analytics'}
            onChange={handleChange('analytics')}
            sx={{
              boxShadow: 'none',
              '&.Mui-expanded': {
                margin: '0px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
              }
              aria-controls="analytics-content"
              id="analytics-header"
            >
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_MD,
                  },
                  textTransform: 'capitalize',
                }}
              >
                <AnalyticsIcon
                  sx={{
                    color: ThemeConstants.BLACK_COLOR,
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
                {t('analytics')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <PrelemAnalytics
              analyticsInfo={prelemModelData.AnalyticsEnabled}
              prelemIndex={selectedPrelemIndex}
            />
          </Accordion>
          <Divider />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PrelemSettings;
