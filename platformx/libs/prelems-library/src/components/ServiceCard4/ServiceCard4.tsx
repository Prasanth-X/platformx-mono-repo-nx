import AutorenewIcon from "@mui/icons-material/Autorenew";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Container, Slide, Typography } from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import { useCustomStyle } from "./ServiceCard4.style";
import { prelemTypes } from "../../theme/globalStyle";
import "./ServiceCard4.css";

// ts-ignore
const ServiceCard4 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
ServiceCard4Props) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [handleImpression] = usePlatformAnalytics();
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);

  const firstRender = useRef(true);

  const { ref: ref1, inView: inView1 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const { ref: ref4, inView: inView4 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const { ref: ref5, inView: inView5 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const { ref: ref6, inView: inView6 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <KeyboardBackspaceIcon />
        <Typography variant='h5regular'>
          {activeSlide > 9 ? "" : 0}
          {activeSlide}/{content?.Slots?.length > 9 ? "" : 0}
          {content?.Slots?.length}
        </Typography>
      </div>
    );
  };
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <EastIcon />
      </div>
    );
  };

  const windowSettings = {
    dots: false,
    infinite: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: any) => setActiveSlide(current + 1),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const tabletSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };
  const defaultObj = {
    pageId: analytics?.pageId,
    pageTitle: analytics?.pageTitle,
    pageDesc: analytics?.pageDesc,
    pageTags: analytics?.pageTags,
    prelemID: analytics?.prelemId,
    prelemTitle: analytics?.prelemTitle,
    prelemTags: analytics?.prelemTags,
    prelemPosition: analytics?.prelemPosition,
  };

  const defaultStructureData = () => {
    let serviceCardStructureData;
    try {
      serviceCardStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        itemListElement: content?.Slots?.map((item: any, key: any) => {
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": "ImageObject",
              contentUrl: item.Image_1.Url,
              name: item?.Title,
              Description: item?.Description,
            },
          };
        }),
      };
    } catch (e) {
      serviceCardStructureData = {};
    }

    return serviceCardStructureData;
  };

  const generateStructureData = () => {
    let serviceCardStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        serviceCardStructureData = JSON.parse(tempSD);
      } else {
        serviceCardStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      serviceCardStructureData = defaultStructureData();
    }
    return serviceCardStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.Slots]);

  useEffect(() => {
    if (
      (!analytics?.isAuthoring &&
        analytics?.isAnalyticsEnabled &&
        enableImpressionTracking &&
        inView1) ||
      inView2 ||
      inView3 ||
      inView4 ||
      inView5 ||
      inView6
    ) {
      const prelemImpressionObj = {
        eventType: "Prelem Impression",
        ...defaultObj,
      };

      handleImpression("Prelem Impression", prelemImpressionObj);
      setEnableImpressionTracking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView1, inView2, inView3, inView4, inView5, inView6, analytics?.isAnalyticsEnabled]);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      className={`${classes.ServiceCard4Wrapper} ${globalClasses.prelemType1} prelem prelemType1 ServiceCard4`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={authoringHelper?.innerRef} className='ServiceCard4Slider'>
          <Box
            sx={{
              position: "relative",
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.isEditing ? "flex !important" : "none",
                },
              },
            }}>
            <Slider {...windowSettings}>
              {content?.Slots?.map((item, index) => {
                return (
                  <Box key={index}>
                    <Box ref={eval(`ref${index + 1}`)} className='slider-wrapper'>
                      <Box className='contentWrapper'>
                        <Slide
                          direction='left'
                          in={secondaryArgs?.editState ? true : eval(`inView${index + 1}`)}
                          timeout={1500}>
                          <Typography variant='h1semibold'>{item?.Title}</Typography>
                        </Slide>
                        <Slide
                          direction='right'
                          in={secondaryArgs?.editState ? true : eval(`inView${index + 1}`)}
                          timeout={1500}>
                          <Typography variant='h3semibold'>{item?.Title}</Typography>
                        </Slide>
                        <Slide
                          direction='right'
                          in={secondaryArgs?.editState ? true : eval(`inView${index + 1}`)}
                          timeout={1800}>
                          <Typography variant='p3regular' id='Description'>
                            {item?.Description}
                          </Typography>
                        </Slide>
                      </Box>
                      <Slide
                        direction='left'
                        in={secondaryArgs?.editState ? true : eval(`inView${index + 1}`)}
                        timeout={1500}>
                        <Box className='imageWrapper' id='Image'>
                          <img alt='card4' src={item?.Image_1?.Url} />
                        </Box>
                      </Slide>
                    </Box>
                  </Box>
                );
              })}
            </Slider>
            <Box className='rightBgWrapper'></Box>
            <Box className='ReplaceWrapper add-content-overlay'>
              <Box
                className='WrapperBoxIcons'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("image", true)}>
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

interface ServiceCard4Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
  //secondaryArgs?: {};
}

interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
}

interface PrelemBaseEndpoint {
  device?: string;
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
  innerRef: any;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  isEditing: boolean;
  lastSavedStructuredData?: string;
  authoringHoverShow?: boolean;
  isEditPage?: boolean;
}

interface ContentProps {
  Title?: string;
  Description?: string;
  Image_1?: {
    Name: string;
    Url: string;
    Title: string;
    Description: string;
    AltText: string;
  };
  TagName?: string;
}
interface Content {
  Slots: ContentProps[];
  TagName?: string;
}

ServiceCard4.defaultProps = {
  content: {
    Slots: [
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
    ],
    TagName: "About us, Service Box, Features, Products, Cards",
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
  },
};

export default ServiceCard4;
