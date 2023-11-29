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
import "./ServiceShowcase2.css";
import { useCustomStyle } from "./ServiceShowcase2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

let i = 0;
const ServiceShowcase2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ServiceShowcase2Prop) => {
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
    let ServiceShowcase2StructureData;
    try {
      ServiceShowcase2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        description: content.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl,
        ),
        itemListElement:
          content?.Slots &&
          Object.entries(content?.Slots).map(([key, value]) => {
            return {
              "@type": "ListItem",
              position: key + 1,
              item: {
                "@type": "Service",
                image: formCroppedUrl(
                  gcpUrl,
                  bucketName,
                  value?.IconImage?.Url,
                  value?.IconImage?.ext,
                ),
                name: value?.Title,
                description: value?.Description,
              },
            };
          }),
      };
    } catch (e) {
      ServiceShowcase2StructureData = {};
    }

    return ServiceShowcase2StructureData;
  };
  const generateStructureData = () => {
    let ServiceShowcase2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceShowcase2StructureData = JSON.parse(tempSD);
      } else {
        ServiceShowcase2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceShowcase2StructureData = defaultStructureData();
    }
    return ServiceShowcase2StructureData;
  };

  const windowSettings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: false,
    arrow: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    content?.Title,
    content?.Description,
    content?.Slots,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceshowCase2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 service-showcase2 serviceshowCase2Bg`}>
      {/* <style>{minCss}</style> */}
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container className='gridContainer'>
          <Grid item xs={12} sm={12} md={12} em={8} lg={9} className='serviceShowcaseContent'>
            <Typography variant='h2medium' id='Title'>
              {content.Title}
            </Typography>
            <Typography variant='p3regular' id='Description'>
              {content.Description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} em={4} lg={3} className='alignButton'>
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
            className='editContent'
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
            <Grid container item className={`sliderWp sliderBlock`}>
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
                        className='heightPercenntage'>
                        <Card className='cardWrapper'>
                          <CardContent className='cardContent'>
                            <Box className='boxWrapper'>
                              <Box className='imageWrapper'>
                                <img
                                  src={formCroppedUrl(
                                    gcpUrl,
                                    bucketName,
                                    value?.IconImage?.Url,
                                    value?.IconImage?.ext,
                                  )}
                                  height='46'
                                  width='46'
                                  alt='No image'
                                />
                              </Box>
                              <Typography className='text-truncated-2line title' variant='h4bold'>
                                {value?.Title}
                              </Typography>
                            </Box>
                            <Typography
                              className='text-truncated-5line description'
                              variant='p4regular'
                              sx={{ marginBottom: 0 }}>
                              {value?.Description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Slider>
            </Grid>
            <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
              <Box
                className='pointer'
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
    </div>
  );
};

interface ServiceShowcase2Prop {
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

ServiceShowcase2.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "https://www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",

    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
    ContentType: "ServiceCard",
    Slots: [
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1691659889422/public/png/Service-card1_Innovation_Lab",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
        URL: "www.google.com",
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1691659889422/public/png/Service-card1_Innovation_Lab",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
        URL: "www.google.com",
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1691659889422/public/png/Service-card1_Innovation_Lab",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
          ext: "png",
          Visibility: "public",
          BitStreamId: "",
        },
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
    pageTitle: "Service Showcase 2",
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

export default ServiceShowcase2;
