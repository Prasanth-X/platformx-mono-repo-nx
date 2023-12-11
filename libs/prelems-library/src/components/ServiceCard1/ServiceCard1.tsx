import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import "./ServiceCard1.css";
import { useCustomStyle } from "./ServiceCard1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { formCroppedUrl } from "utils/helperFns";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import usePlatformAnalytics from "../../analytics/index";

const ServiceCard1 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard1Prop) => {
  const [contentType] = React.useState("image");
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let ServiceCard1StructureData;
    try {
      ServiceCard1StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        itemListElement:
          content?.Slots &&
          Object.entries(content?.Slots).map(([key, value], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                contentUrl: formCroppedUrl(
                  secondaryArgs?.gcpUrl,
                  secondaryArgs?.bucketName,
                  value?.IconImage?.Url,
                  value?.IconImage?.ext,
                ),
                name: value?.Title,
                key: key,
              },
            };
          }),
      };
    } catch (e) {
      ServiceCard1StructureData = {};
    }

    return ServiceCard1StructureData;
  };
  const generateStructureData = () => {
    let ServiceCard1StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard1StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard1StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard1StructureData = defaultStructureData();
    }
    return ServiceCard1StructureData;
  };
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          infinite: true,
          centerMode: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          centerMode: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Slots]);

  usePrelemImpression(analytics, inView);
  const [handleTrack] = usePlatformAnalytics();
  const triggerAnalytics = (url: string, index: number) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        contentType: "Service Card",
        contentTitle: content?.Slots[index]?.Title,
        contentUrl: url,
        prelemSlotNumber: index + 1,
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

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceCard1Wrapper} ${globalClasses.prelemType1} prelem prelemType1 serviceCard1WrapperBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Typography variant='h2semibold' textAlign='center' id='Title'>
          {content?.Title}
        </Typography>

        <Box
          sx={{
            position: "relative",
            "&:hover": {
              ".add-content-overlay": {
                display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
              },
            },
          }}>
          {/* For Desktop and TAB*/}
          <Box ref={ref} className='service-card1'>
            <Slider {...settings} className='service-cards1-container'>
              {content?.Slots &&
                Object.entries(content?.Slots).map(([key, value], index) => (
                  <Grid
                    item
                    key={key}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    justifyContent='center'
                    alignItems='center'
                    paddingBottom={2}
                    paddingTop={2}
                    spacing={10}>
                    <Card
                      className='cardBoxWrapper'
                      onClick={() => {
                        triggerAnalytics(value?.URL, index);
                        if (value?.Internal) {
                          window.location.assign(value.URL);
                        } else {
                          window.open(value.URL);
                        }
                      }}
                      sx={{
                        cursor: value?.URL ? "pointer" : "auto",
                      }}>
                      <Box className='cardMediaWrapper'>
                        <CardMedia
                          component='img'
                          image={formCroppedUrl(
                            secondaryArgs?.gcpUrl,
                            secondaryArgs?.bucketName,
                            value?.IconImage?.Url,
                            value?.IconImage?.ext,
                          )}
                          alt={value?.IconImage?.AltText}
                        />
                      </Box>
                      <Typography variant='p3regular' className='description'>
                        {value?.Title}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
            </Slider>
          </Box>

          <Box className='ReplaceWrapper add-content-overlay'>
            <Box
              className='WrapperBoxIcons'
              onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery(contentType, true)}>
              {/* <AutorenewIcon className={classes.replaceIconWrapper} /> */}
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

interface ServiceCard1Prop {
  content: Content;
  analytics?: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}
interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl?: string;
  bucketName?: string;
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
  Title?: string;
  ImageIcon?: boolean;
  ContentType?: string;
  Slots?: [
    {
      Title: string;
      URL: string;
      Internal: boolean;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
    {
      Title: string;
      URL: string;
      Internal: boolean;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
    {
      Title: string;
      URL: string;
      Internal: boolean;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
  ];
  TagName?: string;
}

ServiceCard1.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    ImageIcon: false,
    ContentType: "ServiceCard",
    Slots: [
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690804485842/public/png/Service-card1_Innovation Lab",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          visibility: "public",
        },
        URL: "https://www.google.com",
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        URL: "https://www.google.com",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690804803214/public/png/Servicecard1_Hardware-design",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          visibility: "public",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690805028435/public/png/Servicecard1_Scrum-methodology",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          visibility: "public",
        },
        URL: "https://www.google.com",
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "https://www.google.com",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690805563694/public/png/Servicecard1_Mechanical-design",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          visibility: "public",
        },
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Full Width Image",
    pageDesc:
      "This prelem can be used to house a full width image. It can be used anywhere in the website to add an element of beautification to it.",
    pageTags: "Image, Full Width Image",
    prelemTags: "Image, Full Width Image",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      device: "",
    },
    editState: false,
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ServiceCard1;
