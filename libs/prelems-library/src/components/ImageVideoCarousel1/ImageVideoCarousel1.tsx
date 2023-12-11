import AutorenewIcon from "@mui/icons-material/Autorenew";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import "../../Style.css";
import progressiveLoader2 from "../../assets/progressiveLoader2.gif";
import { formCroppedUrl } from "../../utils/helperFns";
import { useCustomStyle } from "./ImageVideoCarousel1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ImageVideoCarousel1 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ImageVideoCarousel1Props) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { bucketName, gcpUrl } = secondaryArgs;
  const [cardArr, setCardArr] = useState(content?.Slots);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  const [loaded, setIsLoaded] = useState(false);
  usePrelemImpression(analytics, inView);

  const [active, setActive] = useState<number>(0);
  const [playVideo, setPlayVideo] = useState(false);
  const playVodEnable = () => {
    if (!authoringHelper?.isEditing) setPlayVideo(true);
  };
  const handleChange = (panel: number) => {
    if (
      (cardArr[active]?.Thumbnail &&
        cardArr[panel]?.Thumbnail &&
        (playVideo || cardArr[active]?.Thumbnail !== cardArr[panel]?.Thumbnail)) ||
      (!(cardArr[active]?.Thumbnail && cardArr[panel]?.Thumbnail) &&
        cardArr[active]?.Url !== cardArr[panel]?.Url)
    ) {
      setIsLoaded(false);
    }
    setActive(panel);
    setPlayVideo(false);
  };
  useEffect(() => {
    if (content?.Slots) {
      setCardArr(content?.Slots);
    }
  }, [content?.Slots]);

  const defaultStructureData = () => {
    let ImageVideoCarouselStructureData;
    try {
      ImageVideoCarouselStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: content?.Slots.slice(0, 6)?.map((item: any, index: number) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": item?.Thumbnail ? "VideoObject" : "ImageObject",
              ...(!item?.Thumbnail && {
                image: formCroppedUrl(gcpUrl, bucketName, item?.Url, item?.ext),
                description: item?.Description,
              }),
              ...(item?.Thumbnail && {
                name: item?.Name,
                description: item?.Description,
                thumbnailURL: formCroppedUrl(gcpUrl, bucketName, item?.Thumbnail, item?.ext),
              }),
              contenturl: item?.Url,
            },
          };
        }),
      };
    } catch (e) {
      ImageVideoCarouselStructureData = {};
    }

    return ImageVideoCarouselStructureData;
  };

  const generateStructureData = () => {
    let ImageVideoCarouselStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ImageVideoCarouselStructureData = JSON.parse(tempSD);
      } else {
        ImageVideoCarouselStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ImageVideoCarouselStructureData = defaultStructureData();
    }
    return ImageVideoCarouselStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Slots, content?.title, content?.sub_title]);

  function handleImageLoad() {
    setIsLoaded(true);
  }

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.imageVideoCarousel1Wrapper} ${globalClasses.prelemType1} prelem prelemType1 image-video-carousel1 imageVideoCarousel1Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Typography variant='h2medium' className='centerText' id='title' component='h2'>
          {content?.title}
        </Typography>
        <Typography variant='p3regular' component='p' className='centerText' id='sub_title'>
          {content?.sub_title}
        </Typography>
        <Grid
          className='gridWrapper'
          container
          // sx={{
          //   "&:hover": {
          //     ".add-content-overlay": {
          //       display: authoringHelper?.authoringHoverShow ? "flex" : "none",
          //     },
          //   },
          // }}
        >
          <Grid item xs={12} em={3} className='leftSideBarWrapper'>
            {cardArr?.length > 0 &&
              cardArr.slice(0, 6).map((item: any, index: number) => (
                <Typography
                  key={index}
                  variant={active === index ? "p2bold" : "p2regular"}
                  component='h3'
                  // className="TitleHead"
                  onClick={() => {
                    if (active !== index) {
                      return handleChange(index);
                    }
                    return;
                  }}
                  className={`TitleHead leftsideBar afterHeading  ${
                    active === index ? "active" : ""
                  }`}>
                  {item?.Title}
                </Typography>
              ))}
          </Grid>
          <Grid
            item
            em={9}
            xs={12}
            sx={{
              pl: { em: "30px" },
              pr: { md: "0px", em: "0px" },
            }}
            className='rightimagevideo'>
            {/* Right Side */}
            {cardArr[active]?.Thumbnail ? (
              playVideo ? (
                <Box className='thumbnail'>
                  <ReactPlayer
                    url={cardArr[active]?.Url}
                    height='100%'
                    width='100%'
                    className='react-player-wrap'
                    controls
                    config={{
                      file: { attributes: { controlsList: "nodownload" } },
                    }}
                    // light={cardArr[active]?.Thumbnail}
                    playing={true}
                  />
                </Box>
              ) : (
                <Box className='imgWrapper'>
                  <img
                    alt='carousel1'
                    src={formCroppedUrl(
                      gcpUrl,
                      bucketName,
                      cardArr[active]?.Thumbnail,
                      cardArr[active]?.ext,
                    )}
                    onLoad={() => handleImageLoad()}
                    className='imgProp'
                    style={{
                      display: loaded ? "block" : "none",
                    }}
                  />
                  {loaded && (
                    <Box onClick={playVodEnable} className='videoEnable'>
                      <Box className='iconWrapper'>
                        <PlayArrowRoundedIcon onClick={playVodEnable} className='playIcon' />
                      </Box>
                    </Box>
                  )}
                  {!loaded ? (
                    <Box className='imageWrapper1'>
                      <img src={progressiveLoader2} alt='Loading...' height='200' width='400' />
                    </Box>
                  ) : null}
                </Box>
              )
            ) : (
              <>
                <CardMedia
                  component='img'
                  image={formCroppedUrl(
                    gcpUrl,
                    bucketName,
                    cardArr[active]?.Url,
                    cardArr[active]?.ext,
                  )}
                  alt={cardArr[active]?.AltText}
                  onLoad={() => handleImageLoad()}
                  className='imgProp2'
                  sx={{
                    display: loaded ? "block" : "none",
                  }}
                />
                {!loaded && (
                  <Box className='imgWrapper2'>
                    <img src={progressiveLoader2} alt='Loading...' height='200' width='400' />
                  </Box>
                )}
              </>
            )}
          </Grid>
          <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
            <Box
              className='pointer'
              onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("gallery", true)}>
              <AutorenewIcon className='autorenewIcon' />
              <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                Replace
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

interface ImageVideoCarousel1Props {
  content: Content;
  secondaryArgs?: any;
  authoringHelper?: AuthoringHelper;
  analytics: Analytics;
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
  authoringHoverShow?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface Content {
  title?: string;
  sub_title?: string;
  Slots: ImageVideoContent[];
}

interface ImageVideoContent {
  AltText?: string;
  Attribution?: boolean;
  Description?: string;
  Name?: string;
  Title?: string;
  Url?: string;
  Thumbnail?: string;
  ext?: string;
}

ImageVideoCarousel1.defaultProps = {
  content: {
    title: "EveryThing can be built with X",
    sub_title: "Design and launch your website fast & no coding required.",
    Slots: [
      {
        Name: "Product picture",
        Url: "machine_assets/1690001744940/public/png/ProductDetails",
        Title: "Product picture",
        Description: "This is for Product picture",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        Visibility: "public",
        BitStreamId: "",
      },
      {
        Name: "Eiffel Tower picture",
        Url: "machine_assets/1691664938347/public/jpeg/paris4",
        Title: "Eiffel Tower picture",
        Description: "This is for Eiffel Tower picture",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "jpg",
        Visibility: "public",
        BitStreamId: "",
      },
      {
        Name: "Jerusalem picture",
        Url: "machine_assets/1691665176112/public/jpeg/Jerusalem",
        Title: "Jerusalem picture",
        Description: "This is for Jerusalem picture",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "jpg",
        Visibility: "public",
        BitStreamId: "",
      },
      {
        Name: "Nature",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/89d9b6a5-f414-4acd-bd07-4ed129d3a02c/content",
        Title: "Nature",
        Description: "Nature",
        Thumbnail: "machine_assets/1691564831874/public/png/production-ID_4063585",
        ext: "png",
        Visibility: "public",
        BitStreamId: "",
      },
      {
        Name: "Celebration",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/f506d7da-4c61-405a-abd5-d36e11e64f86/content",
        Title: "Celebration",
        Description: "Celebration",
        Thumbnail: "machine_assets/1691564923823/public/jpeg/shutterstock_1062019390",
        ext: "jpg",
        Visibility: "public",
        BitStreamId: "",
      },
      {
        Name: "Mercedes-Benz ",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/31fbb570-4a68-4978-8b19-34d34691b2b5/content",
        Title: "Mercedes-Benz",
        Description: "Mercedes-Benz",
        Thumbnail: "machine_assets/1691564968966/public/jpeg/mercedes-benz-1470136__340",
        ext: "jpg",
        Visibility: "public",
        BitStreamId: "",
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
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    authoringHoverShow: false,
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Image Video Carousel 1",
    pageDesc:
      "This prelem can be used to create a carousel of image(s)/video(s). It can have a min of 3 items & max of 6 items. It can be used to give a snippet of the service(s)/product(s) via image(s)/video(s).",
    pageTags: "Images, Videos, Carousel",
    prelemTags: ["Images", "Videos", "Carousel"],
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

export default ImageVideoCarousel1;
