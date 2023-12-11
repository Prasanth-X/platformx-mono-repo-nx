import { Box, Container, Grid, Hidden, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import "./FeatureTiles.css";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./FeatureTiles.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const FeatureTiles = ({ content, analytics, authoringHelper, secondaryArgs }: FeatureTilesProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const ButtonObj1 = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObj1 = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };

  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content?.Button2_Name,
    Button_RedirectURL: content?.Button2_RedirectURL,
    Button_Type: content?.Button2_Type,
    Button_Value: content?.Button2_Value,
    Button_Action: content?.Button2_Action,
    Button_Content: content?.Button2_Content,
  };

  const ButtonObj3 = {
    Button_Name: "Button3_Name",
    Button_RedirectURL: "Button3_RedirectURL",
    Button_Type: "Button3_Type",
    Button_Value: "Button3_Value",
    Button_Action: "Button3_Action",
    Button_Content: "Button3_Content",
  };
  const ButtonDataObj3 = {
    Button_Name: content?.Button3_Name,
    Button_RedirectURL: content?.Button3_RedirectURL,
    Button_Type: content?.Button3_Type,
    Button_Value: content?.Button3_Value,
    Button_Action: content?.Button3_Action,
    Button_Content: content?.Button3_Content,
  };

  const ButtonObj4 = {
    Button_Name: "Button4_Name",
    Button_RedirectURL: "Button4_RedirectURL",
    Button_Type: "Button4_Type",
    Button_Value: "Button4_Value",
    Button_Action: "Button4_Action",
    Button_Content: "Button4_Content",
  };
  const ButtonDataObj4 = {
    Button_Name: content?.Button4_Name,
    Button_RedirectURL: content?.Button4_RedirectURL,
    Button_Type: content?.Button4_Type,
    Button_Value: content?.Button4_Value,
    Button_Action: content?.Button4_Action,
    Button_Content: content?.Button4_Content,
  };

  const ButtonObj5 = {
    Button_Name: "Button5_Name",
    Button_RedirectURL: "Button5_RedirectURL",
    Button_Type: "Button5_Type",
    Button_Value: "Button5_Value",
    Button_Action: "Button5_Action",
    Button_Content: "Button5_Content",
  };
  const ButtonDataObj5 = {
    Button_Name: content?.Button5_Name,
    Button_RedirectURL: content?.Button5_RedirectURL,
    Button_Type: content?.Button5_Type,
    Button_Value: content?.Button5_Value,
    Button_Action: content?.Button5_Action,
    Button_Content: content?.Button5_Content,
  };

  const ButtonObj6 = {
    Button_Name: "Button6_Name",
    Button_RedirectURL: "Button6_RedirectURL",
    Button_Type: "Button6_Type",
    Button_Value: "Button6_Value",
    Button_Action: "Button6_Action",
    Button_Content: "Button6_Content",
  };
  const ButtonDataObj6 = {
    Button_Name: content?.Button6_Name,
    Button_RedirectURL: content?.Button6_RedirectURL,
    Button_Type: content?.Button6_Type,
    Button_Value: content?.Button6_Value,
    Button_Action: content?.Button6_Action,
    Button_Content: content?.Button6_Content,
  };

  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const defaultStructureData = () => {
    let FeatureTilesStructureData;

    const getImg = (index: number) => {
      const ImageCompound_index = `ImageCompound_${index}`;
      const { original_image_relative_path, ext } =
        (content?.ImageCompound && content?.ImageCompound[ImageCompound_index]?.original_image) ||
        {};
      const img = formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        original_image_relative_path,
        ext,
      );
      return img;
    };

    try {
      FeatureTilesStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Heading,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Service",
              name: content?.Title1,
              description: content?.Description1,
              image: getImg(1),
              url: completeButtonUrl(
                content?.Button1_Action,
                content?.Button1_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Service",
              name: content?.Title2,
              description: content?.Description2,
              image: getImg(2),
              url: completeButtonUrl(
                content?.Button2_Action,
                content?.Button2_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Service",
              name: content?.Title3,
              description: content?.Description3,
              image: getImg(3),
              url: completeButtonUrl(
                content?.Button3_Action,
                content?.Button3_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Service",
              name: content?.Title4,
              description: content?.Description4,
              image: getImg(4),
              url: completeButtonUrl(
                content?.Button4_Action,
                content?.Button4_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "Service",
              name: content?.Title5,
              description: content?.Description5,
              image: getImg(5),
              url: completeButtonUrl(
                content?.Button5_Action,
                content?.Button5_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "Service",
              name: content?.Title6,
              description: content?.Description6,
              image: getImg(6),
              url: completeButtonUrl(
                content?.Button6_Action,
                content?.Button6_RedirectURL,
                secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
              ),
            },
          },
        ],
      };
    } catch (e) {
      FeatureTilesStructureData = {};
    }

    return FeatureTilesStructureData;
  };
  const generateStructureData = () => {
    let FeatureTilesStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        FeatureTilesStructureData = JSON.parse(tempSD);
      } else {
        FeatureTilesStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      FeatureTilesStructureData = defaultStructureData();
    }
    return FeatureTilesStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [
    content?.Heading,
    content?.Title1,
    content?.Title2,
    content?.Title3,
    content?.Title4,
    content?.Title5,
    content?.Title6,
    content?.Description1,
    content?.Description2,
    content?.Description3,
    content?.Description4,
    content?.Description5,
    content?.Description6,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
    content?.Button2_Value,
    content?.Button2_RedirectURL,
    content?.Button3_Value,
    content?.Button3_RedirectURL,
    content?.Button4_Value,
    content?.Button4_RedirectURL,
    content?.Button5_Value,
    content?.Button5_RedirectURL,
    content?.Button6_Value,
    content?.Button6_RedirectURL,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.ImageCompound?.ImageCompound_2?.original_image,
    content?.ImageCompound?.ImageCompound_3?.original_image,
    content?.ImageCompound?.ImageCompound_4?.original_image,
    content?.ImageCompound?.ImageCompound_5?.original_image,
    content?.ImageCompound?.ImageCompound_6?.original_image,
  ]);

  usePrelemImpression(analytics, inView);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.featureTilesWrapper} ${globalClasses.prelemType1} prelem prelemType1 featureTilesBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container className='featureTilesBox'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h2medium' component='div' className='heading' id='Heading'>
              {content.Heading}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            {/* <!-- First column --> */}
            <Grid item xs={12} md={12} lg={3} className='nopadding section-one-left'>
              <Grid container className='heightAuto'>
                <Grid item xs={12} md={6} lg={12} className='tilesImageContainer cardItem1'>
                  <Box className='tilesImageInnerWrapper'>
                    <Box className='imageRender'>
                      <ImageRender
                        originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                        publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                        secondaryArgs={secondaryArgs}
                        imgOrder={{
                          1440: "square",
                          1280: "landscape",
                          1024: "card2",
                          768: "square",
                          600: "card1",
                          320: "square",
                        }}
                      />
                    </Box>
                    <Box className='hovereffect'>
                      <Box className='contentwp'>
                        <Typography
                          className='text-truncated-1line'
                          color='textColor'
                          variant='h4medium'
                          component='p'
                          id='Title1'>
                          {content.Title1}
                        </Typography>
                        <Typography
                          color='textColor'
                          className='text-truncated-3line'
                          variant='p4regular'
                          component='p'
                          id='Description1'>
                          {content.Description1}
                        </Typography>
                        <Box>
                          <BasicButton
                            variant='defaultButton2'
                            openButtonEditWindow={
                              authoringHelper?.openButtonEditWindowInAuthoringCB
                            }
                            isAuthoring={analytics?.isAuthoring}
                            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                            analyticsEnabled={analytics?.isAnalyticsEnabled}
                            ButtonObj={ButtonObj1}
                            isEditing={authoringHelper?.isEditing}
                            buttonDataObj={ButtonDataObj1}
                            secondaryArgs={secondaryArgs}
                            style={{
                              margin: 0,
                            }}
                            analytics={analytics}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12} className='tilesImageContainer cardItem2'>
                  <Box className='tilesImageInnerWrapper'>
                    <Box className='imageRender'>
                      <ImageRender
                        originalImage={content?.ImageCompound?.ImageCompound_2?.original_image}
                        publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                        secondaryArgs={secondaryArgs}
                        imgOrder={{
                          1440: "square",
                          1280: "landscape",
                          1024: "card2",
                          768: "square",
                          600: "card1",
                          320: "square",
                        }}
                      />
                    </Box>
                    <Box className='hovereffect'>
                      <Box className='contentwp'>
                        <Typography
                          className='text-truncated-1line'
                          variant='h4medium'
                          color='textColor'
                          component='p'
                          id='Title2'>
                          {content.Title2}
                        </Typography>
                        <Typography
                          color='textColor'
                          className='text-truncated-3line'
                          variant='p4regular'
                          component='p'
                          id='Description2'>
                          {content.Description2}
                        </Typography>
                        <Box>
                          <BasicButton
                            variant='defaultButton2'
                            openButtonEditWindow={
                              authoringHelper?.openButtonEditWindowInAuthoringCB
                            }
                            isAuthoring={analytics?.isAuthoring}
                            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                            analyticsEnabled={analytics?.isAnalyticsEnabled}
                            ButtonObj={ButtonObj2}
                            isEditing={authoringHelper?.isEditing}
                            buttonDataObj={ButtonDataObj2}
                            secondaryArgs={secondaryArgs}
                            style={{
                              margin: 0,
                            }}
                            analytics={analytics}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* <!-- second column --> */}
            <Grid item xs={12} md={12} lg={6} className='nopadding' sx={{ display: "flex" }}>
              <Grid container>
                <Grid item xs={12} md={6} lg={12}>
                  <Grid container>
                    <Grid item xs={12} md={12} lg={12} className='gridPadding'>
                      <Box className='tilesImageInnerWrapper1'>
                        <Box className='imageRender'>
                          <ImageRender
                            originalImage={content?.ImageCompound?.ImageCompound_3?.original_image}
                            publishedImages={
                              content?.ImageCompound?.ImageCompound_3?.published_images
                            }
                            secondaryArgs={secondaryArgs}
                            imgOrder={{
                              1440: "card2",
                              1280: "landscape",
                              1024: "card2",
                              768: "square",
                              600: "card1",
                              320: "square",
                            }}
                          />
                        </Box>
                        <Box className='hovereffect'>
                          <Box className='contentwp middleCard'>
                            <Typography
                              color='textColor'
                              className='text-truncated-1line'
                              variant='h4medium'
                              component='p'
                              id='Title3'>
                              {content.Title3}
                            </Typography>
                            <Typography
                              color='textColor'
                              className='text-truncated-3line'
                              variant='p4regular'
                              component='p'
                              id='Description3'>
                              {content.Description3}
                            </Typography>
                            <Box>
                              <BasicButton
                                variant='defaultButton2'
                                openButtonEditWindow={
                                  authoringHelper?.openButtonEditWindowInAuthoringCB
                                }
                                isAuthoring={analytics?.isAuthoring}
                                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                                analyticsEnabled={analytics?.isAnalyticsEnabled}
                                ButtonObj={ButtonObj3}
                                isEditing={authoringHelper?.isEditing}
                                buttonDataObj={ButtonDataObj3}
                                secondaryArgs={secondaryArgs}
                                style={{
                                  margin: 0,
                                }}
                                analytics={analytics}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Hidden lgUp>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        className='gridPadding'
                        sx={{
                          display: { xs: "none", md: "block", lg: "none" },
                          boxSizing: "border-box",
                        }}>
                        <Box className='columnWrapper'>
                          <Box className='imageRender'>
                            <ImageRender
                              originalImage={
                                content?.ImageCompound?.ImageCompound_6?.original_image
                              }
                              publishedImages={
                                content?.ImageCompound?.ImageCompound_6?.published_images
                              }
                              secondaryArgs={secondaryArgs}
                              imgOrder={{
                                1440: "hero",
                                1280: "landscape",
                                1024: "card2",
                                768: "square",
                                600: "card1",
                                320: "portrait",
                              }}
                            />
                          </Box>
                          <Box className='hovereffect'>
                            <Box className='contentwp'>
                              <Typography
                                color='textColor'
                                className='text-truncated-1line'
                                variant='h4medium'
                                component='p'
                                id='Title6'>
                                {content.Title6}
                              </Typography>
                              <Typography
                                color='textColor'
                                className='text-truncated-3line'
                                variant='p4regular'
                                component='p'
                                id='Description6'>
                                {content.Description6}
                              </Typography>
                              <Box>
                                <BasicButton
                                  variant='defaultButton2'
                                  openButtonEditWindow={
                                    authoringHelper?.openButtonEditWindowInAuthoringCB
                                  }
                                  isAuthoring={analytics?.isAuthoring}
                                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                                  ButtonObj={ButtonObj6}
                                  isEditing={authoringHelper?.isEditing}
                                  buttonDataObj={ButtonDataObj6}
                                  secondaryArgs={secondaryArgs}
                                  style={{
                                    margin: 0,
                                  }}
                                  analytics={analytics}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Grid container>
                    <Grid item xs={12} md={12} lg={6} className='gridPadding'>
                      <Box className='secondColumnLastCard'>
                        <Box className='imageRender'>
                          <ImageRender
                            originalImage={content?.ImageCompound?.ImageCompound_4?.original_image}
                            publishedImages={
                              content?.ImageCompound?.ImageCompound_4?.published_images
                            }
                            secondaryArgs={secondaryArgs}
                            imgOrder={{
                              1440: "square",
                              1280: "landscape",
                              1024: "card2",
                              768: "square",
                              600: "card1",
                              320: "square",
                            }}
                          />
                        </Box>
                        <Box className='hovereffect'>
                          <Box className='contentwp'>
                            <Typography
                              color='textColor'
                              className='text-truncated-1line'
                              variant='h4medium'
                              component='p'
                              id='Title4'>
                              {content.Title4}
                            </Typography>
                            <Typography
                              color='textColor'
                              className='text-truncated-3line'
                              variant='p4regular'
                              component='p'
                              id='Description4'>
                              {content.Description4}
                            </Typography>
                            <Box>
                              <BasicButton
                                variant='defaultButton2'
                                openButtonEditWindow={
                                  authoringHelper?.openButtonEditWindowInAuthoringCB
                                }
                                isAuthoring={analytics?.isAuthoring}
                                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                                analyticsEnabled={analytics?.isAnalyticsEnabled}
                                ButtonObj={ButtonObj4}
                                isEditing={authoringHelper?.isEditing}
                                buttonDataObj={ButtonDataObj4}
                                secondaryArgs={secondaryArgs}
                                style={{
                                  margin: 0,
                                }}
                                analytics={analytics}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} className='gridPadding'>
                      <Box className='secondColumnLastCard'>
                        <Box className='imageRender'>
                          <ImageRender
                            originalImage={content?.ImageCompound?.ImageCompound_5?.original_image}
                            publishedImages={
                              content?.ImageCompound?.ImageCompound_5?.published_images
                            }
                            secondaryArgs={secondaryArgs}
                            imgOrder={{
                              1440: "square",
                              1280: "landscape",
                              1024: "card2",
                              768: "square",
                              600: "card1",
                              320: "square",
                            }}
                          />
                        </Box>
                        <Box className='hovereffect'>
                          <Box className='contentwp'>
                            <Typography
                              className='text-truncated-1line'
                              variant='h4medium'
                              color='textColor'
                              component='p'
                              id='Title5'>
                              {content.Title5}
                            </Typography>
                            <Typography
                              color='textColor'
                              className='text-truncated-3line'
                              variant='p4regular'
                              component='p'
                              id='Description5'>
                              {content.Description5}
                            </Typography>
                            <Box>
                              <BasicButton
                                variant='defaultButton2'
                                openButtonEditWindow={
                                  authoringHelper?.openButtonEditWindowInAuthoringCB
                                }
                                isAuthoring={analytics?.isAuthoring}
                                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                                analyticsEnabled={analytics?.isAnalyticsEnabled}
                                ButtonObj={ButtonObj5}
                                isEditing={authoringHelper?.isEditing}
                                buttonDataObj={ButtonDataObj5}
                                secondaryArgs={secondaryArgs}
                                style={{
                                  margin: 0,
                                }}
                                analytics={analytics}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* <!-- third column --> */}
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              className='nopadding'
              sx={{ display: { md: "none", lg: "block" } }}>
              <Grid item xs={12} md={12} className='gridPadding fullHeight'>
                <Box className='columnWrapper'>
                  <Box className='imageRender'>
                    <ImageRender
                      originalImage={content?.ImageCompound?.ImageCompound_6?.original_image}
                      publishedImages={content?.ImageCompound?.ImageCompound_6?.published_images}
                      secondaryArgs={secondaryArgs}
                      imgOrder={{
                        1440: "card1",
                        1280: "landscape",
                        1024: "card2",
                        768: "square",
                        600: "card1",
                        320: "square",
                      }}
                    />
                  </Box>
                  <Box className='hovereffect'>
                    <Box className='contentwp'>
                      <Typography
                        color='textColor'
                        className='text-truncated-1line'
                        variant='h4medium'
                        component='p'
                        id='Title6'>
                        {content.Title6}
                      </Typography>
                      <Typography
                        color='textColor'
                        className='text-truncated-3line'
                        variant='p4regular'
                        component='p'
                        id='Description6'>
                        {content.Description6}
                      </Typography>
                      <Box>
                        <BasicButton
                          variant='defaultButton2'
                          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                          isAuthoring={analytics?.isAuthoring}
                          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                          analyticsEnabled={analytics?.isAnalyticsEnabled}
                          ButtonObj={ButtonObj6}
                          isEditing={authoringHelper?.isEditing}
                          buttonDataObj={ButtonDataObj6}
                          secondaryArgs={secondaryArgs}
                          style={{
                            margin: 0,
                          }}
                          analytics={analytics}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface FeatureTilesProp {
  content: Content;
  analytics?: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}
interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  bucketName: string;
  gcpUrl: string;
}

interface PrelemBaseEndpoint {
  device?: string;
  buttonBaseUrl?: string;
}

interface MultiSlot {
  onToggleContentGallery: (contentType: string, imageVideoContentGallery: boolean) => void;
}
interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  authoringHoverShow?: boolean;
  isEditPage?: boolean;
}

interface Content {
  Heading?: string;

  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  Button4_Action?: string;
  Button4_Content?: string;
  Button4_Name?: string;
  Button4_RedirectURL?: string;
  Button4_RestEndPonit?: string;
  Button4_Type?: string;
  Button4_Value?: string;

  Button5_Action?: string;
  Button5_Content?: string;
  Button5_Name?: string;
  Button5_RedirectURL?: string;
  Button5_RestEndPonit?: string;
  Button5_Type?: string;
  Button5_Value?: string;

  Button6_Action?: string;
  Button6_Content?: string;
  Button6_Name?: string;
  Button6_RedirectURL?: string;
  Button6_RestEndPonit?: string;
  Button6_Type?: string;
  Button6_Value?: string;

  Title1?: string;
  Title2?: string;
  Title3?: string;
  Title4?: string;
  Title5?: string;
  Title6?: string;

  Description1?: string;
  Description2?: string;
  Description3?: string;
  Description4?: string;
  Description5?: string;
  Description6?: string;

  ContentType?: string;
  TagName?: string;

  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
    ImageCompound_4: ImageCompound;
    ImageCompound_5: ImageCompound;
    ImageCompound_6: ImageCompound;
  };
}

interface ImageCompound {
  original_image: object;
  published_images: PublishedImages[];
}

interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

FeatureTiles.defaultProps = {
  content: {
    Button1_Name: "ICT Certified Course",
    Button1_RedirectURL: "https://www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Get Started",

    Button2_Name: "ICT Certified Course",
    Button2_RedirectURL: "https://www.google.com", // relative page url | link url
    Button2_RestEndPonit: "RestEndPoint 1", // ?
    Button2_Action: "External", // Page |  Link
    Button2_Type: "current window", // current window | new window
    Button2_Value: "Get Started",

    Button3_Name: "ICT Certified Course",
    Button3_RedirectURL: "https://www.google.com", // relative page url | link url
    Button3_RestEndPonit: "RestEndPoint 1", // ?
    Button3_Action: "External", // Page |  Link
    Button3_Type: "current window", // current window | new window
    Button3_Value: "Get Started",

    Button4_Name: "ICT Certified Course",
    Button4_RedirectURL: "https://www.google.com", // relative page url | link url
    Button4_RestEndPonit: "RestEndPoint 1", // ?
    Button4_Action: "External", // Page |  Link
    Button4_Type: "current window", // current window | new window
    Button4_Value: "Get Started",

    Button5_Name: "ICT Certified Course",
    Button5_RedirectURL: "https://www.google.com", // relative page url | link url
    Button5_RestEndPonit: "RestEndPoint 1", // ?
    Button5_Action: "External", // Page |  Link
    Button5_Type: "current window", // current window | new window
    Button5_Value: "Get Started",

    Button6_Name: "ICT Certified Course",
    Button6_RedirectURL: "https://www.google.com", // relative page url | link url
    Button6_RestEndPonit: "RestEndPoint 1", // ?
    Button6_Action: "External", // Page |  Link
    Button6_Type: "current window", // current window | new window
    Button6_Value: "Get Started",

    Heading: "Other Features",

    Title1: "Stories",
    Title2: "Prelems",
    Title3: "Experience Editor",
    Title4: "Authoring",
    Title5: "Insights",
    Title6: "Marketplace",

    Description1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",
    Description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",
    Description3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",
    Description4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",
    Description5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",
    Description6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend",

    ContentType: "ServiceCard",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690296663917/public/png/FeatureTile1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690296663917/public/png/FeatureTile1-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1690296688639/public/png/FeatureTile2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690296688639/public/png/FeatureTile2-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path: "machine_assets/1690296719284/public/png/FeatureTile3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690296719284/public/png/FeatureTile3-card2",
          },
        ],
      },
      ImageCompound_4: {
        original_image: {
          original_image_relative_path: "machine_assets/1690297068162/public/png/FeatureTile4",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-square",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690297068162/public/png/FeatureTile4-card2",
          },
        ],
      },
      ImageCompound_5: {
        original_image: {
          original_image_relative_path: "machine_assets/1690297091063/public/png/FeatureTile5",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690297091063/public/png/FeatureTile5-card2",
          },
        ],
      },
      ImageCompound_6: {
        original_image: {
          original_image_relative_path: "machine_assets/1690297114601/public/png/FeatureTile6",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FeatureTiles",
            Name: "FeatureTiles",
            Title: "FeatureTiles",
            Description: "This is for FeatureTiles",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690297114601/public/png/FeatureTile6-card2",
          },
        ],
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    authoringHoverShow: false,
    isEditPage: false,
  },
  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Feature Tiles",
    pageDesc:
      "This prelem can be used to show features, services, products in cards. It has 3 fixed cards & the number can increase as per the features etc. that we want to show here. This prelem will be authored using ‘Content Types’.",
    pageTags: "Service Box, Features, Products, Cards ",
    prelemTags: "Service Box, Features, Products, Cards ",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default FeatureTiles;
