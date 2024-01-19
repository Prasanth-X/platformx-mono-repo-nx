/* eslint-disable @typescript-eslint/no-unused-vars */
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, CardMedia, Container, Tab, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getImage } from "@platformx/utilities";
import Slider from "react-slick";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { useCustomStyle } from "./ImageAndVideoGallery.style";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import "../../Style.css";
import prelemTypes from "../../globalStyle";
import "./ImageAndVideoGallery.css";

// ts-ignore
const ImageAndVideoGallery = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
ContactUsProp) => {
  const [contentType, setContentType] = useState("image");
  const [indexPos, setIndexPos] = useState(0);
  const [open, setOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<any>();
  const windowSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "60px",
          arrows: false,
        },
      },
    ],
  };
  const tabletSettings = {
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    arrows: false,
  };

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };
  const handleOpen = (data: any, indexPosition: number) => {
    if (authoringHelper?.isModalShow) {
      setOpen(true);
      setIndexPos(indexPosition);
      setGalleryData(data);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setContentType(newValue);
  };

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ImageVideoGalleryUsStructureData;
    try {
      const videoListItem: any = content?.Tab_2?.Gallery.map((v) => ({
        ...v,
        VideoObject: true,
      }));
      const imageListItem: any = content?.Tab_1?.Gallery.map((v) => ({
        ...v,
        VideoObject: false,
      }));
      const mergedListItem = [...videoListItem, ...imageListItem];
      ImageVideoGalleryUsStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: mergedListItem?.map((item: any, key: any) => {
          const Content = { Thumbnail: item };
          const formedUrl = getImage(Content, secondaryArgs);
          const { imageUrl } = formedUrl;
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": item?.VideoObject ? "VideoObject" : "ImageObject",
              contentUrl: imageUrl,
              ...(item?.VideoObject === "VideoObject" && {
                thumbnail: imageUrl,
              }),
              name: item?.Name,
            },
          };
        }),
      };
    } catch (e) {
      ImageVideoGalleryUsStructureData = {};
    }

    return ImageVideoGalleryUsStructureData;
  };

  const generateStructureData = () => {
    let ImageVideoGalleryUsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ImageVideoGalleryUsStructureData = JSON.parse(tempSD);
      } else {
        ImageVideoGalleryUsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ImageVideoGalleryUsStructureData = defaultStructureData();
    }
    return ImageVideoGalleryUsStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Tab_1, content?.Tab_2, content?.Tab_1?.Gallery, content?.Tab_2?.Gallery]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.imageAndVideoGalleryWrapper} ${globalClasses.prelemType1} prelem prelemType1 image-video-gallery imageAndVideoGalleryBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Box>
          <Box className='textCenter'>
            <Typography variant='h2semibold' id={"Title"}>
              {content.Title}
            </Typography>
            <TabContext value={contentType}>
              <Box>
                <TabList
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { display: "none" },
                  }}
                  className='buttonsWrapper'>
                  <Tab label={content?.Tab_1?.Title} value='image' className='tab-image tab-item' />
                  <Tab label={content?.Tab_2?.Title} value='video' className='tab-video tab-item' />
                </TabList>
              </Box>
              <Box
                className='positionRelative'
                // sx={{
                //   "&:hover": {
                //     ".add-content-overlay": {
                //       display: authoringHelper?.authoringHoverShow
                //         ? "flex"
                //         : "none",
                //     },
                //   },
                // }}
              >
                <TabPanel value='image' className='tabPanelWrapper'>
                  <Slider {...sliderSettings}>
                    {content?.Tab_1?.Gallery.map((item, index) => {
                      const Content = { Thumbnail: item };
                      const formedUrl = getImage(Content, secondaryArgs);
                      const { imageUrl, color } = formedUrl;
                      return (
                        <Box key={index}>
                          <Box
                            className='imgBoxWrapper'
                            onClick={() => handleOpen(content?.Tab_1?.Gallery, index)}>
                            <CardMedia
                              component={imageUrl ? "img" : "div"}
                              image={imageUrl ? imageUrl : ""}
                              sx={{ backgroundColor: color ? color : "" }}
                              alt={item?.AltText}
                            />
                          </Box>
                          <Typography variant='p3regular'>{item?.Title}</Typography>
                        </Box>
                      );
                    })}
                  </Slider>
                </TabPanel>
                <TabPanel value='video' className='tabPanelWrapper'>
                  <Slider {...sliderSettings}>
                    {content?.Tab_2?.Gallery.map((item, index) => {
                      const Content = { Thumbnail: { ...item, Url: item?.Thumbnail } };
                      const formedUrl = getImage(Content, secondaryArgs);
                      const { imageUrl, color } = formedUrl;
                      return (
                        <Box key={index}>
                          <Box
                            className='imgBoxWrapper'
                            onClick={() => handleOpen(content?.Tab_2?.Gallery, index)}>
                            <CardMedia
                              component={imageUrl ? "img" : "div"}
                              image={imageUrl ? imageUrl : ""}
                              sx={{ backgroundColor: color ? color : "" }}
                              alt='galleryimg'
                            />
                            <Box className={`positionAbsolute video-player-overlay`}>
                              <Box>
                                <PlayArrowRoundedIcon className='playIconSize' />
                              </Box>
                            </Box>
                          </Box>
                          <Typography variant='p3regular'>{item.Title}</Typography>
                        </Box>
                      );
                    })}
                  </Slider>
                </TabPanel>
                <Box className={authoringHelper?.isEditing ? "replaceWrapper" : "hideElementClass"}>
                  <Box
                    className='replaceIconWrapper'
                    onClick={() =>
                      secondaryArgs?.multiSlot?.onToggleContentGallery(contentType, true)
                    }>
                    <AutorenewIcon />
                    <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                      Replace
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabContext>
          </Box>
          {open && (
            <ImageVideoGalleryModalSlider
              openModal={open}
              indexPos={indexPos}
              handleClose={handleClose}
              sliderData={galleryData}
              contentType={contentType}
              secondaryArgs={secondaryArgs}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

interface ContactUsProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}

interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl?: string;
  bucketName?: string;
  prelemImpressionSchema?: string;
  clickImpressionSchema?: string;
}

interface PrelemBaseEndpoint {
  device?: string;
  language?: string;
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
  isEditing: boolean;
  lastSavedStructuredData?: string;
  isModalShow?: boolean;
  authoringHoverShow?: boolean;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  isEditPage?: boolean;
}

interface GallerySliderProps {
  Thumbnail: string | undefined;
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  AltText: string;
  ext: string;
}

interface Content {
  Title?: string;
  Tab_1?: {
    Title?: string;
    Type?: string;
    Gallery: GallerySliderProps[];
  };
  Tab_2?: {
    Title?: string;
    Type?: string;
    Gallery: GallerySliderProps[];
  };
}

ImageAndVideoGallery.defaultProps = {
  content: {
    Title: "Lorem ispumdolor",
    Tab_1: {
      Title: "Images",
      Type: "Image-Gallery",
      Gallery: [
        {
          Name: "image1",
          Url: "machine_assets/1690187501280/public/png/ImageAndVideoCard1",
          Title: "Nullam sem ex, gravida quis dui et",
          Description: "This is for HeroBanner",
          AltText: "ProductSummary",
          ext: "png",
        },
        {
          Name: "image1",
          Url: "machine_assets/1690188371171/public/png/ImageAndVideoCard2",
          Title: "Nullam sem ex, gravida quis dui et",
          Description: "This is for HeroBanner",
          AltText: "ProductSummary",
          ext: "png",
        },
        {
          Name: "image1",
          Url: "machine_assets/1690188403295/public/png/ImageAndVideoCard3",
          Title: "Nullam sem ex, gravida quis dui et",
          Description: "This is for HeroBanner",
          AltText: "ProductSummary",
          ext: "png",
        },
      ],
    },
    Tab_2: {
      Title: "Videos",
      Type: "Video-Gallery",
      Gallery: [
        {
          Name: "video1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/70ab30f2-7498-4a22-9f43-c66a06c5e1a4/content",
          Title: "video1",
          Description: "This is for HeroBanner",
          Thumbnail: "machine_assets/1690191297455/public/png/Videomessagefromleadership_thumpnail",
          ext: "png",
        },
        {
          Name: "video1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/222ba388-4da7-456a-9957-fd5a13c93c86/content",
          Title: "Nullam sem ex, gravida quis dui et",
          Description: "This is for HeroBanner",
          Thumbnail: "machine_assets/1690191297455/public/png/Videomessagefromleadership_thumpnail",
          ext: "png",
        },
        {
          Name: "video1",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/a2457636-668a-4463-883a-ecd367872c02/content",
          Title: "Nullam sem ex, gravida quis dui et",
          Description: "This is for HeroBanner",
          Thumbnail: "machine_assets/1690191297455/public/png/Videomessagefromleadership_thumpnail",
          ext: "png",
        },
      ],
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isModalShow: true,
    authoringHoverShow: false,
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      device: "",
    },
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ImageAndVideoGallery;
