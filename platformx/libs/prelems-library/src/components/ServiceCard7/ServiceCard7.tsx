import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import "./ServiceCard7.css";
import { useCustomStyle } from "./ServiceCard7.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

let i = 0;
const ServiceCard7 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard7Prop) => {
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
  const { bucketName, gcpUrl } = secondaryArgs;
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let ServiceCard7StructureData;
    try {
      ServiceCard7StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Secondary_Title,
        description: content.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
        ),
        itemListElement:
          content?.Slots &&
          Object.entries(content?.Slots).map(([, value], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                contentUrl: formCroppedUrl(
                  gcpUrl,
                  bucketName,
                  value?.IconImage?.Url,
                  value?.IconImage?.ext,
                ),
                name: value?.Title,
                Description: value?.Description,
                url: completeButtonUrl(
                  content?.Button1_Action,
                  content?.Button1_RedirectURL,
                  secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
                ),
              },
            };
          }),
      };
    } catch (e) {
      ServiceCard7StructureData = {};
    }

    return ServiceCard7StructureData;
  };
  const generateStructureData = () => {
    let ServiceCard7StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard7StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard7StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard7StructureData = defaultStructureData();
    }
    return ServiceCard7StructureData;
  };

  const windowSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: true,
    arrow: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    arrows: false,
  };

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrows: false,
  };

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Primary_Title,
    content?.Secondary_Title,
    content?.Description,
    content?.Other_Title1,
    content?.Other_Title2,
    content?.Other_Description1,
    content?.Other_Description2,
    content?.Button1_Name,
    content?.Button1_Type,
    content?.Slots,
  ]);

  usePrelemImpression(analytics, inView);

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceCard7wrapper} ${globalClasses.prelemType1} prelem prelemType1 service-card7 serviceCard7Bg`}>
      {/* <style>{minCss}</style> */}
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} className='headingContainer'>
            <Typography
              variant='labelbold'
              color='secondaryLabel'
              className='line'
              id='Primary_Title'
              component='div'>
              {content.Primary_Title}
            </Typography>
            <Typography
              variant='h2medium'
              color='secondaryTitle'
              component='div'
              id='Secondary_Title'>
              {content.Secondary_Title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container item>
              <Grid item xs={12} sm={12} md={6} lg={6} className='gap'>
                <Typography
                  color='secondaryParagraph'
                  variant='p3medium'
                  id='Other_Title1'
                  component='div'>
                  {content.Other_Title1}
                </Typography>
                <Typography
                  className='textcolor'
                  variant='h3bold'
                  id='Other_Description1'
                  component='div'>
                  {content.Other_Description1}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className='gap'>
                <Typography
                  color='secondaryTitle'
                  variant='p3medium'
                  id='Other_Title2'
                  component='div'>
                  {content.Other_Title2}
                </Typography>
                <Typography
                  className='textcolor'
                  variant='h3bold'
                  id='Other_Description2'
                  component='div'>
                  {content.Other_Description2}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className='serviceCardWrapper'
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
            <Grid container item className={`blockItem service-card2`}>
              <Box className='slider-container1-wrapper'>
                <Slider {...sliderSettings} className='slider-container1'>
                  {content?.Slots &&
                    Object.entries(content?.Slots).map(([key, value]) => {
                      if (i === 3) {
                        i = 1;
                      } else {
                        i = i + 1;
                      }
                      return (
                        <Grid
                          item
                          key={key}
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          justifyContent='left'
                          alignItems='left'
                          paddingBottom={2}
                          className='heightAuto'>
                          <Card className='card'>
                            <CardContent className='cardcontent'>
                              <Box className='imgWrapper'>
                                <img
                                  alt='card7'
                                  src={formCroppedUrl(
                                    gcpUrl,
                                    bucketName,
                                    value?.IconImage?.Url,
                                    value?.IconImage?.ext,
                                  )}
                                  width='42'
                                  height='42'
                                />
                              </Box>
                              <Box className='boxContainer'>
                                <Typography className='text-truncated-2line title' variant='h4bold'>
                                  {value?.Title}
                                </Typography>
                                <Typography
                                  className='text-truncated-4line cardDescription'
                                  variant='p3regular'>
                                  {value?.Description}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                </Slider>
                <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
                  <Box
                    className='pointer'
                    onClick={() =>
                      secondaryArgs?.multiSlot?.onToggleContentGallery("Images", true)
                    }>
                    <AutorenewIcon className='autorenewIcon' />
                    <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                      Replace
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className='boxFullRow'>
                  <Typography
                    component='div'
                    className='description'
                    variant='h4semibold'
                    id='Description'>
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
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

interface ServiceCard7Prop {
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
  Primary_Title?: string;
  Secondary_Title?: string;
  Other_Title1?: string;
  Other_Title2?: string;
  Other_Description1: string;
  Other_Description2: string;
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
      Button1_Action?: string;
      Button1_Name?: string;
      Button1_RedirectURL?: string;
      Button1_RestEndPonit?: string;
      Button1_Type?: string;
      Button1_Value?: string;
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
      Button1_Action?: string;
      Button1_Name?: string;
      Button1_RedirectURL?: string;
      Button1_RestEndPonit?: string;
      Button1_Type?: string;
      Button1_Value?: string;
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
      Button1_Action?: string;
      Button1_Name?: string;
      Button1_RedirectURL?: string;
      Button1_RestEndPonit?: string;
      Button1_Type?: string;
      Button1_Value?: string;
    },
  ];
  TagName?: string;
}

ServiceCard7.defaultProps = {
  content: {
    Button1_Name: "ICT Certified Course",
    Button1_RedirectURL: "https://www.google.com", // relative page url | link url
    Button1_RestEndPonit: "button1_restmentpoint", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Get Started",

    Primary_Title: "Prelems",
    Secondary_Title: "Deliver digital experiences like never before",
    Other_Title1: "More than",
    Other_Title2: "Success Projects",
    Other_Description1: "1000+ Prelems",
    Other_Description2: "10+",
    Description: "We Have all the services to help your bussiness",
    ContentType: "ServiceCard",
    Slots: [
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "www.google.com",
        IconImage: {
          Name: "ServiceCard",
          Url: "machine_assets/1690950561034/public/png/Diversity_icon",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          Attribution: false,
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "www.google.com",
        IconImage: {
          Name: "ServiceCard",
          Url: "machine_assets/1690949746985/public/png/Round_icon",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          Attribution: false,
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "www.google.com",
        IconImage: {
          Name: "ServiceCard",
          Url: "machine_assets/1690949715831/public/png/Arrow_circle",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          Attribution: false,
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "www.google.com",
        IconImage: {
          Name: "ServiceCard",
          Url: "machine_assets/1690949582877/public/png/Settings_accessibility",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          Attribution: false,
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
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
    pageTitle: "Business Showcase With Cards",
    pageDesc:
      "This prelem can be used to show features, services, products in cards. It has 3 fixed cards & the number can increase as per the features etc. that we want to show here. This prelem will be authored using ‘Content Types’.",
    pageTags: "Service Box, Features, Products, Cards ",
    prelemTags: "Service Box, Features, Products, Cards ",
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

export default ServiceCard7;
