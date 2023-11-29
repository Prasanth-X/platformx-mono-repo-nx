import { useTranslation } from "react-i18next";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Button, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import { completeButtonUrl, completeButtonUrl2, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./ServiceCard6.style";
import "./ServiceCard6.css";
import "../../service/i18n";
import { useTheme } from "@mui/material/styles";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
import usePlatformAnalytics from "../../analytics/index";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";

let i = 0;
const ServiceCard6 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard6Prop) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const BACKGROUND = [
    theme.palette.prelemType1.ACCENTS.VARIANT6.BACKGROUND,
    theme.palette.prelemType1.ACCENTS.VARIANT5.BACKGROUND,
    theme.palette.prelemType1.ACCENTS.VARIANT4.BACKGROUND,
  ];
  const ICON_BACKGROUND = [
    theme.palette.overlay["bgOverlay"],
    theme.palette.overlay["bgOverlay"],
    theme.palette.overlay["bgOverlay"],
  ];

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
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let ServiceCard6StructureData;
    try {
      ServiceCard6StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        headline: content?.Title,
        description: content.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
        ),
        itemListElement:
          content?.Slots &&
          content?.Slots.map((value, index) => {
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
                Description: value?.Description,
                url: completeButtonUrl2(
                  value?.Internal,
                  value?.URL,
                  secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
                ),
              },
            };
          }),
      };
    } catch (e) {
      ServiceCard6StructureData = {};
    }

    return ServiceCard6StructureData;
  };
  const generateStructureData = () => {
    let ServiceCard6StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard6StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard6StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard6StructureData = defaultStructureData();
    }
    return ServiceCard6StructureData;
  };

  const sliderSettings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const themeCss = `
  @charset 'UTF-8';.slick-dots,.slick-next,.slick-prev{position:absolute;display:block;padding:0}.slick-dots li button:before,.slick-next:before,.slick-prev:before{font-family:slick;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-loading .slick-list{background:url(ajax-loader.gif) center center no-repeat #fff}@font-face{font-family:slick;font-weight:400;font-style:normal;src:url(fonts/slick.eot);src:url(fonts/slick.eot?#iefix) format('embedded-opentype'),url(fonts/slick.svg#slick) format('svg')}.slick-next,.slick-prev{font-size:0;line-height:0;top:50%;width:20px;height:20px;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%);cursor:pointer;color:transparent;border:none;outline:0;background:0 0}.slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1}.slick-next.slick-disabled:before,.slick-prev.slick-disabled:before{opacity:.25}.slick-next:before,.slick-prev:before{font-size:20px;line-height:1;opacity:.75;color:#fff}.slick-prev{left:-25px}[dir=rtl] .slick-prev{right:-25px;left:auto}.slick-prev:before{content:'←'}.slick-next:before,[dir=rtl] .slick-prev:before{content:'→'}.slick-next{right:-25px}[dir=rtl] .slick-next{right:auto;left:-25px}[dir=rtl] .slick-next:before{content:'←'}.slick-dotted.slick-slider{margin-bottom:30px}.slick-dots{bottom:-25px;width:100%;margin:0;list-style:none;text-align:center}.slick-dots li{position:relative;display:inline-block;width:20px;height:20px;margin:0 5px;padding:0;cursor:pointer}.slick-dots li button{font-size:0;line-height:0;display:block;width:20px;height:20px;padding:5px;cursor:pointer;color:transparent;border:0;outline:0;background:0 0}.slick-dots li button:focus,.slick-dots li button:hover{outline:0}.slick-dots li button:focus:before,.slick-dots li button:hover:before{opacity:1}.slick-dots li button:before{font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;content:'•';opacity:.25;color:#000}.slick-dots li.slick-active button:before{opacity:.75;color:#000}
  `;
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
  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceCard6Wrapper} ${globalClasses.prelemType1} prelem prelemType1 serviceCard6 serviceCard6Bg`}>
      <style>{themeCss}</style>
      <Container
        ref={ref}
        className={
          authoringHelper?.isEditPage
            ? `grid_full_width prelem-py`
            : `right_grid_container noPadding  prelem-py`
        }>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} ml={4} lg={4} className='firstColumnWrapper'>
            <Typography variant='h2medium' id='Title'>
              {content.Title}
            </Typography>
            <Typography variant='p3regular' id='Description'>
              {content.Description}
            </Typography>
            <Box>
              <BasicButton
                variant='primaryButton1'
                openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                isAuthoring={analytics?.isAuthoring}
                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                analyticsEnabled={analytics?.isAnalyticsEnabled}
                ButtonObj={ButtonObj1}
                isEditing={authoringHelper?.isEditing}
                buttonDataObj={ButtonDataObj1}
                secondaryArgs={secondaryArgs}
                analytics={analytics}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            ml={8}
            lg={8}
            className='secondColumnWrapper'
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
            <Grid container item className={`service-card6 sliderWrapper`}>
              <Slider {...sliderSettings} className='slider-container1'>
                {content?.Slots &&
                  Object.entries(content?.Slots).map(([key, value], index) => {
                    if (i === 3) {
                      i = 1;
                    } else {
                      i = i + 1;
                    }
                    return (
                      <Grid item key={key} xs={12} sm={12} md={12} lg={12} justifyContent='left'>
                        <Card
                          className={`servicecardsix cardWrapper`}
                          sx={{ backgroundColor: BACKGROUND[i - 1] }}>
                          <CardContent className='cardContent'>
                            <Box
                              className='cardItem'
                              sx={{
                                backgroundColor: `rgba(${ICON_BACKGROUND[i - 1]})`,
                              }}>
                              <img
                                src={formCroppedUrl(
                                  secondaryArgs?.gcpUrl,
                                  secondaryArgs?.bucketName,
                                  value?.IconImage?.Url,
                                  value?.IconImage?.ext,
                                )}
                                alt={value?.IconImage?.AltText}
                                width='25px'
                                height='25px'
                                className='cardItemImg'
                              />
                            </Box>
                            <Typography variant='h3bold' className='singlebr'>
                              {value?.Title}
                            </Typography>
                            <Typography variant='p3regular' className={`sixbr gap`}>
                              {value?.Description}
                            </Typography>
                            <Button
                              variant='defaultButton1'
                              className='bottomAlign'
                              onClick={() => {
                                if (value?.URL) {
                                  triggerAnalytics(value.URL, index);
                                  if (value?.Internal) {
                                    window.location.assign(value.URL);
                                  } else {
                                    window.open(value.URL);
                                  }
                                }
                              }}>
                              {t("know_more")}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Slider>
            </Grid>
            <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
              <Box
                sx={{ cursor: "pointer", textAlign: "center" }}
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("Images", true)}>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

interface ServiceCard6Prop {
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
  Title?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  ImageIcon?: boolean;
  ContentType?: string;
  Slots?: [
    {
      Title: string;
      Description: string;
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
      Description: string;
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
      Description: string;
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

ServiceCard6.defaultProps = {
  content: {
    Button1_Name: "ICT Certified Course",
    Button1_RedirectURL: "https://www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Get Started",

    Title: "Deliver digital experiences like never before",
    Description:
      "Pre-built Elements (we call them “Prelems”) are the “Lego Blocks” of X. Go to market fast with our rich library of Prelems. Each Prelem comes with out-of-box modern UX, analytics, accessibility & SEO support",
    ContentType: "ServiceCard",
    Slots: [
      {
        Button1_RestEndPoint: "",
        Internal: "true",
        Button1_Name: "Lorem ipsum",
        Title: "Lorem ipsum dolor sit amet",
        Button1_Action: "external",
        Button1_Value: "Lorem ipsum",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690807122991/public/png/Servicecard3_Product-certification testing",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
        Button1_Type: "current window",
        Button1_RedirectURL: "www.google.com",
        URL: "www.google.com",
      },
      {
        Button1_RestEndPoint: "",
        Internal: "true",
        Button1_Name: "Lorem ipsum",
        Title: "Lorem ipsum dolor sit amet",
        Button1_Action: "external",
        Button1_Value: "Lorem ipsum",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690807122991/public/png/Servicecard3_Product-certification testing",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
        Button1_Type: "current window",
        Button1_RedirectURL: "www.google.com",
        URL: "www.google.com",
      },
      {
        Button1_RestEndPoint: "",
        Internal: "true",
        Button1_Name: "Lorem ipsum",
        Title: "Lorem ipsum dolor sit amet",
        Button1_Action: "external",
        Button1_Value: "Lorem ipsum",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690807122991/public/png/Servicecard3_Product-certification testing",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
        Button1_Type: "current window",
        Button1_RedirectURL: "www.google.com",
        URL: "www.google.com",
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
    pageTitle: "Service Card 6",
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

export default ServiceCard6;
