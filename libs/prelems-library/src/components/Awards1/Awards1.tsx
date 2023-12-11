import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import InfiniteLooper from "../InfiniteLooper/InfiniteLooper";
import "./Award1.css";
import AwardCards from "./AwardCards";
import { useCustomStyle } from "./Awards1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import usePlatformAnalytics from "../../analytics/index";

const Awards1 = ({ content, analytics, authoringHelper, secondaryArgs }: Awards1Props) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  const [handleTrack] = usePlatformAnalytics();
  const { bucketName, gcpUrl } = secondaryArgs;
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const triggerAnalytics = (url: string, index: number) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: index + 1,
        contentType: "Awards",
        contentTitle: content?.title,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
    }
  };

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [awards, setAwards] = useState<AwardsLogoProps[]>([]);
  const [isHover, setIsHover] = useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  useEffect(() => {
    if (content?.Slots) {
      setAwards(content?.Slots);
    }
  }, [content]);
  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const onClickCard = (url: string, index: number) => {
    if (url) {
      triggerAnalytics(url, index);
      window.open(url, "_blank");
    }
  };

  usePrelemImpression(analytics, inView);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.awards1Wrapper} ${globalClasses.prelemType3} prelem prelemType3 awards1 awards1Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={ref} className='centerText'>
          <Box className='headingWrapper'>
            <Typography
              className='headingWordWrap'
              id='title'
              variant='h2medium'
              color='tertiaryTitle'>
              {content?.title}
            </Typography>
          </Box>
          <Box
            className='awardWrapper'
            // sx={{
            //   "&:hover": {
            //     ".add-content-overlay": {
            //       display: authoringHelper?.isEditing ? "flex" : "none",
            //     },
            //   },
            // }}
          >
            {awards.length > 3 || (awards.length > 1 && screenWidth < 768) ? (
              authoringHelper?.isEditing ? (
                <>
                  <AwardCards
                    onClickCard={onClickCard}
                    handleMouseOut={handleMouseOut}
                    handleMouseOver={handleMouseOver}
                    awards={awards}
                    secondaryArgs={secondaryArgs}
                  />
                </>
              ) : (
                <>
                  <InfiniteLooper
                    playState={isHover ? "paused" : "running"}
                    speed={`${authoringHelper?.isModalShow ? awards.length * 18 : 0}`}
                    direction='left'>
                    <AwardCards
                      onClickCard={onClickCard}
                      handleMouseOut={handleMouseOut}
                      handleMouseOver={handleMouseOver}
                      awards={awards}
                      secondaryArgs={secondaryArgs}
                    />
                  </InfiniteLooper>
                </>
              )
            ) : (
              <Box className='cardWrapper'>
                {awards.map((item, index) => {
                  if (item?.title && item?.sub_title) {
                    return (
                      <Card
                        key={`${item?.title}_${index.toString()}`}
                        className='cardItem'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>
                        <CardContent className='noPadding'>
                          <Box className='cardContent'>
                            <Typography variant='h5medium' className='title'>
                              {item?.title}
                            </Typography>
                          </Box>
                          <Box className='centerItem title'>
                            <Typography variant='h5bold'>{item?.sub_title}</Typography>
                          </Box>
                        </CardContent>
                        <Box className='cardActionWrapper'>
                          <CardActionArea
                            sx={{
                              cursor: item?.url ? "pointer" : "default",
                            }}>
                            <Link component='image' onClick={() => onClickCard(item?.url, index)}>
                              <CardMedia
                                component='img'
                                image={formCroppedUrl(
                                  gcpUrl,
                                  bucketName,
                                  item?.logo,
                                  item?.ImageVideoData?.ext,
                                )}
                                className='cardMedia'
                              />
                            </Link>
                          </CardActionArea>
                        </Box>
                      </Card>
                    );
                  } else {
                    return (
                      <Card
                        key={`${item?.title}_${index.toString()}`}
                        className='card'
                        elevation={0}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>
                        <CardActionArea
                          sx={{
                            cursor: item?.url ? "pointer" : "default",
                          }}>
                          <Link component='image' onClick={() => onClickCard(item?.url, index)}>
                            <CardMedia
                              component='img'
                              image={formCroppedUrl(
                                gcpUrl,
                                bucketName,
                                item?.logo,
                                item?.ImageVideoData?.ext,
                              )}
                              className='cardImg'
                            />
                          </Link>
                        </CardActionArea>
                      </Card>
                    );
                  }
                })}
              </Box>
            )}
            <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
              <Box
                className='pointer'
                sx={{ cursor: "pointer" }}
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("awards", true)}>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

interface Awards1Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
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
  isModalShow?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface AwardsLogoProps {
  title?: string;
  sub_title?: string;
  logo?: string;
  url?: string;
  ImageVideoData?: {
    ext?: string;
  };
}

interface Content {
  title?: string;
  Slots?: AwardsLogoProps[];
}

Awards1.defaultProps = {
  content: {
    title: "An Award Winning Platform Recognised By Analysts",
    Slots: [
      {
        title: "The EMEA Paragon Award",
        sub_title: "2018",
        url: "https://www.google.com/",
        logo: "machine_assets/1690887467529/public/png/Awards_logo_1",
        ImageVideoData: {
          Name: "Idea Days",
          Url: "machine_assets/1690887467529/public/png/Awards_logo_1",
          Title: "Idea Days",
          Description: "This is for Idea Days",
          AltText: "Imagecard2",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        title: "AVA Digital Awards",
        sub_title: "2019",
        url: "https://www.google.com/",
        logo: "machine_assets/1690887467529/public/png/Awards_logo_1",
        ImageVideoData: {
          Name: "Idea Days",
          Url: "machine_assets/1690887467529/public/png/Awards_logo_1",
          Title: "Idea Days",
          Description: "This is for Idea Days",
          AltText: "Imagecard2",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        title: "N Sports Business Awards",
        sub_title: "2019",
        url: "https://www.google.com/",
        logo: "machine_assets/1690887467529/public/png/Awards_logo_1",
        ImageVideoData: {
          Name: "Idea Days",
          Url: "machine_assets/1690887467529/public/png/Awards_logo_1",
          Title: "Idea Days",
          Description: "This is for Idea Days",
          AltText: "Imagecard2",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        title: "UK Cloud Awards",
        sub_title: "2019",
        url: "https://www.google.com/",
        logo: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/3bf9382d-1f22-4908-a4b9-ed0f674e0a62/content",
        ImageVideoData: {},
      },
    ],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    isModalShow: true,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },

  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Awards 1",
    pageDesc:
      "This prelem can be used to display the awards or logos. Users can add URLs to the logos. Clicking on the URLs will take the user to the link in the new tab",
    pageTags: "Awards, Brands, Logos, Logo, Brand, Award",
    prelemTags: "IAwards, Brands, Logos, Logo, Brand, Award",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};
export default Awards1;
