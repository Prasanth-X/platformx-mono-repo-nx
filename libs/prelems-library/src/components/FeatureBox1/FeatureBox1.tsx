import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import "./FeatureBox1.css";
import { useCustomStyle } from "./FeatureBox1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const FeatureBox1 = ({ content, analytics, authoringHelper, secondaryArgs }: FeatureBox1Props) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  // useEffect(() => {
  //   window.addEventListener('change', getOrientation);
  //   return () => window.removeEventListener('change', getOrientation);
  // }, []);
  // const getOrientation = () => {
  //  if()
  // }
  const windowSettings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: false,
    arrow: false,
    //adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          autoPlay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const tabletSettings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    dots: true,
    arrow: false,
  };

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrow: false,
  };

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };

  const defaultStructureData = () => {
    let structureData;
    try {
      structureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title2,
        itemListElement: content?.Slots?.map((item, key) => {
          return {
            "@type": "Recommendation",
            position: key + 1,
            itemReviewed: {
              "@type": "organization",
              name: item?.Title1,
              description: item?.Description,
            },
          };
        }),
      };
    } catch (e) {
      structureData = {};
    }

    return structureData;
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const generateStructureData = () => {
    let structureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        structureData = JSON.parse(tempSD);
      } else {
        structureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      structureData = defaultStructureData();
    }
    return structureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Slots, content?.Title2]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const renderCards = () => {
    return content?.Slots?.map((items, key) => (
      <Card
        onClick={() => {
          if (items?.URL) {
            if (items?.Internal === "true") {
              window.location.assign(items.URL);
            } else {
              window.open(items.URL);
            }
          }
        }}
        key={key}
        className='featureBox1CardContent'>
        <CardContent>
          <Box>
            <Box className='FeatureBox1WhiteBox'>
              <Typography variant='h1bold' className='featureLabel'>
                {items.Title1}
              </Typography>
            </Box>
            <Typography
              variant='p3regular'
              className='threeLineTextEllipsis cardFeatureDescription'>
              {items.Description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const renderCardWrapper = () => {
    if (typeof window !== "undefined") {
      const deviceType = secondaryArgs?.prelemBaseEndpoint?.device;
      if (deviceType) {
        return deviceType === "mobile" ? (
          renderCards()
        ) : (
          <Slider {...sliderSettings}>{renderCards()}</Slider>
        );
      } else {
        return window?.innerWidth < 601 ? (
          renderCards()
        ) : (
          <Slider {...sliderSettings}>{renderCards()}</Slider>
        );
      }
    }
    return null;
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.FeatureBox1Wrapper} ${globalClasses.prelemType1} prelem prelemType1 FeatureBox1`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? `grid_full_width prelem-py`
            : `grid_container  grid_container_nopadding  prelem-py`
        }
        ref={ref}>
        <Typography variant='h2semibold' id='Title2' className='title'>
          {content?.Title2}
        </Typography>
        <Box
          className='featureBox1InnerWrapper'
          sx={{
            height: "100%",
            position: "relative",
            "&:hover": {
              ".add-content-overlay": {
                display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
              },
            },
          }}
          key={Math.random()}>
          {renderCardWrapper()}
          <Box className='ReplaceWrapper add-content-overlay'>
            <Box
              className='WrapperBoxIcons'
              onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
              <AutorenewIcon className='autorenewIcon' />
              <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                Replace
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

interface FeatureBox1Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}
interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
}
interface MultiSlot {
  onToggleContentGallery: () => void;
}
interface PrelemBaseEndpoint {
  device?: string;
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
  Title2: string;
  Slots: FeatureBox1Interface[];
  TagName?: string;
}

interface FeatureBox1Interface {
  Title1: string;
  Description: string;
  URL?: string;
  Internal?: string;
}

FeatureBox1.defaultProps = {
  content: {
    Title2: "Lorem ipsum dolor sit amet",
    Slots: [
      {
        Title1: "01",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
      {
        Title1: "02",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
      {
        Title1: "03",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
      {
        Title1: "04",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
      {
        Title1: "05",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
      {
        Title1: "06",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      },
    ],
    TagName: "Features, Testimonials, Services, Accolades",
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

export default FeatureBox1;
