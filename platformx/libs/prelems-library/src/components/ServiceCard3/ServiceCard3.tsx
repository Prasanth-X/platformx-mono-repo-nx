import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./ServiceCard3.style";
import { prelemTypes } from "../../theme/globalStyle";
import { formCroppedUrl } from "utils/helperFns";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
import usePlatformAnalytics from "../../analytics/index";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";

const ServiceCard3 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard3Prop) => {
  const [contentType] = React.useState("image");
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let ServiceCard3StructureData;
    try {
      ServiceCard3StructureData = {
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
                "@type": "Service",
                Servicetype: value?.Title,
                name: value?.Title,
                Image: formCroppedUrl(
                  secondaryArgs?.gcpUrl,
                  secondaryArgs?.bucketName,
                  value?.IconImage?.Url,
                  value?.IconImage?.ext,
                ),
                key: key,
              },
            };
          }),
      };
    } catch (e) {
      ServiceCard3StructureData = {};
    }

    return ServiceCard3StructureData;
  };
  const generateStructureData = () => {
    let ServiceCard3StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard3StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard3StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard3StructureData = defaultStructureData();
    }
    return ServiceCard3StructureData;
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
      className={`${classes.serviceCard3Wrapper} ${globalClasses.prelemType1} prelem prelemType1 serviceCard3WrapperBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Typography variant='h2semibold' textAlign='center' mb={3} id='Title'>
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
          <Grid container item className='gridMainWrapper'>
            {content?.Slots &&
              Object.entries(content?.Slots).map(([key, value], index) => (
                <Grid
                  item
                  key={key}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  justifyContent='center'
                  alignItems='center'
                  style={{
                    paddingBottom: parseInt(key) === 0 ? "30px" : "0px",
                  }}>
                  <Box
                    onClick={() => {
                      if (value?.URL) {
                        triggerAnalytics(value?.URL, index);
                        if (value?.Internal) {
                          window.location.assign(value.URL);
                        } else {
                          window.open(value.URL);
                        }
                      }
                    }}
                    sx={{
                      cursor: value?.URL ? "pointer" : "auto",
                    }}
                    className='ServiceCardWrapperBox'>
                    <Box className='imageContentWrapper'>
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
                    <CardContent className='ServiceCard3CardContent'>
                      <Typography gutterBottom variant='p3regular'>
                        {value?.Title}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box className='ReplaceWrapper add-content-overlay'>
            <Box
              className='WrapperBoxIcons'
              onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery(contentType, true)}>
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

interface ServiceCard3Prop {
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

ServiceCard3.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    ImageIcon: false,
    ContentType: "ServiceCard",
    Slots: [
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        URL: "https://www.google.com",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690807122991/public/png/Servicecard3_Product-certification testing",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690979714299/public/png/Servicecard3_Power-saver testingΓÇ»",
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
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690883825131/public/png/Servicecard3_Reliability-TestingΓÇ»",
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
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690980479502/public/png/Servicecard3_CI-LOOP Testing Lab",
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
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690980655244/public/png/Servicecard3_Image-Quality Lab",
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
        Title: "Lorem ipsum dolor sit amet",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "https://www.google.com",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690980762177/public/png/Servicecard3_Reliability-testing ΓÇô Production",
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

export default ServiceCard3;
