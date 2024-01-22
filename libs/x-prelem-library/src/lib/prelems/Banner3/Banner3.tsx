import { Box, Container, Grid, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./Banner3.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Banner3 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner3Prop) => {
  const theme = useTheme();
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
    Button_Name: content.Button1_Name,
    Button_RedirectURL: content.Button1_RedirectURL,
    Button_Type: content.Button1_Type,
    Button_Value: content.Button1_Value,
    Button_Action: content.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content.Button2_Name,
    Button_RedirectURL: content.Button2_RedirectURL,
    Button_Type: content.Button2_Type,
    Button_Value: content.Button2_Value,
    Button_Action: content.Button2_Action,
    Button_Content: content?.Button2_Content,
  };

  const ButtonObj3 = {
    Button_Name: "Button3_Name",
    Button_RedirectURL: "Button3_RedirectURL",
    Button_Type: "Button3_Type",
    Button_Value: "Button3_Value",
    Button_Action: "Button3_Action",
    Button_Content: "Button3_Content",
  };
  const ButtonDataObj3 = {
    Button_Name: content.Button3_Name,
    Button_RedirectURL: content.Button3_RedirectURL,
    Button_Type: content.Button3_Type,
    Button_Value: content.Button3_Value,
    Button_Action: content.Button3_Action,
    Button_Content: content?.Button3_Content,
  };

  const ButtonObj4 = {
    Button_Name: "Button4_Name",
    Button_RedirectURL: "Button4_RedirectURL",
    Button_Type: "Button4_Type",
    Button_Value: "Button4_Value",
    Button_Action: "Button4_Action",
    Button_Content: "Button4_Content",
  };
  const ButtonDataObj4 = {
    Button_Name: content.Button4_Name,
    Button_RedirectURL: content.Button4_RedirectURL,
    Button_Type: content.Button4_Type,
    Button_Value: content.Button4_Value,
    Button_Action: content.Button4_Action,
    Button_Content: content?.Button4_Content,
  };

  const ButtonObj5 = {
    Button_Name: "Button5_Name",
    Button_RedirectURL: "Button5_RedirectURL",
    Button_Type: "Button5_Type",
    Button_Value: "Button5_Value",
    Button_Action: "Button5_Action",
    Button_Content: "Button5_Content",
  };
  const ButtonDataObj5 = {
    Button_Name: content.Button5_Name,
    Button_RedirectURL: content.Button5_RedirectURL,
    Button_Type: content.Button5_Type,
    Button_Value: content.Button5_Value,
    Button_Action: content.Button5_Action,
    Button_Content: content?.Button5_Content,
  };

  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let Banner3StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      Banner3StructureData = {
        "@context": "http://schema.org/",
        "@type": "Service",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: content?.Title,
          description: content?.Description,
          image: img,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button1_Value,
                url: completeButtonUrl(
                  content?.Button1_Action,
                  content?.Button1_RedirectURL,
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button2_Value,
                url: completeButtonUrl(
                  content?.Button2_Action,
                  content?.Button2_RedirectURL,
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button3_Value,
                url: completeButtonUrl(
                  content?.Button3_Action,
                  content?.Button3_RedirectURL,
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button4_Value,
                url: completeButtonUrl(
                  content?.Button4_Action,
                  content?.Button4_RedirectURL,
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button5_Value,
                url: completeButtonUrl(
                  content?.Button5_Action,
                  content?.Button5_RedirectURL,
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            },
          ],
        },
      };
    } catch (e) {
      Banner3StructureData = {};
    }
    return Banner3StructureData;
  };

  const genrateStructureData = () => {
    let Banner3StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner3StructureData = JSON.parse(tempSD);
      } else {
        Banner3StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner3StructureData = defaultStructureData();
    }
    return Banner3StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title,
    content?.Subtitle,
    content?.Description,
    content?.Button1_RedirectURL,
    content?.Button2_RedirectURL,
    content?.Button3_RedirectURL,
    content?.Button4_RedirectURL,
    content?.Button5_RedirectURL,
    content?.Button1_Value,
    content?.Button2_Value,
    content?.Button3_Value,
    content?.Button4_Value,
    content?.Button5_Value,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  return (
    <div ref={authoringHelper?.innerRef}>
      <Grid container ref={ref}>
        <Box
          className={`${classes.banner3MainWrapper} ${globalClasses.prelemType2} prelem prelemType2 banner3Props`}>
          <ImageRender
            originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
            publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
            secondaryArgs={secondaryArgs}
            imgOrder={{
              1440: "hero",
              1280: "landscape",
              1024: "card2",
              768: "square",
              600: "card1",
              320: "portrait",
            }}
          />
          <Box className='banner3Overlay'></Box>

          <Box className='banner3ContentWrapper'>
            <Container
              className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}>
              <Box>
                <Typography variant='h2semibold' color='textColor' id='Title'>
                  {content.Title}
                </Typography>
                <Typography variant='p1regular' color='textColor' id='Subtitle'>
                  {content.Subtitle}
                </Typography>
                <Typography variant='p3regular' color='textColor' id='Description'>
                  {content.Description}
                </Typography>
              </Box>
              <Grid container className='buttonsWrapper'>
                <Grid item xs={6} sm={5} md={3.5}>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='secondaryButton2'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj1}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj1}
                    secondaryArgs={secondaryArgs}
                    style={{
                      color: theme.palette.textColor,
                      borderColor: theme.palette.textColor,
                      background: "transparent",
                    }}
                    analytics={analytics}
                  />
                </Grid>
                <Grid item xs={6} sm={5} md={3.5}>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='secondaryButton2'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj2}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj2}
                    secondaryArgs={secondaryArgs}
                    style={{
                      color: theme.palette.textColor,
                      borderColor: theme.palette.textColor,
                      background: "transparent",
                    }}
                    analytics={analytics}
                  />
                </Grid>
                <Grid item xs={6} sm={5} md={3.5}>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='secondaryButton2'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj3}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj3}
                    secondaryArgs={secondaryArgs}
                    style={{
                      color: theme.palette.textColor,
                      borderColor: theme.palette.textColor,
                      background: "transparent",
                    }}
                    analytics={analytics}
                  />
                </Grid>
                <Grid item xs={6} sm={5} md={3.5}>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='secondaryButton2'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj4}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj4}
                    secondaryArgs={secondaryArgs}
                    style={{
                      color: theme.palette.textColor,
                      borderColor: theme.palette.textColor,
                      background: "transparent",
                    }}
                    analytics={analytics}
                  />
                </Grid>
                <Grid item xs={6} sm={5} md={3.5}>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='secondaryButton2'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj5}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj5}
                    secondaryArgs={secondaryArgs}
                    style={{
                      color: theme.palette.textColor,
                      borderColor: theme.palette.textColor,
                      background: "transparent",
                    }}
                    analytics={analytics}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

interface Banner3Prop {
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
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  Subtitle?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  Button4_Action?: string;
  Button4_Content?: string;
  Button4_Name?: string;
  Button4_RedirectURL?: string;
  Button4_RestEndPonit?: string;
  Button4_Type?: string;
  Button4_Value?: string;

  Button5_Action?: string;
  Button5_Content?: string;
  Button5_Name?: string;
  Button5_RedirectURL?: string;
  Button5_RestEndPonit?: string;
  Button5_Type?: string;
  Button5_Value?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: PublishedImage[];
      original_image?: object;
    };
  };
}
interface PublishedImage {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
Banner3.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Name: "Digital Product",
    Button1_RedirectURL:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/51765032-ac27-4fbb-899c-c822bb36528b/content",
    Button1_RestEndPonit: "RestEndPoint 1",
    Button1_Type: "current window",
    Button1_Value: "Lorem ipsum",
    Button2_Action: "External",
    Button2_Name: "Security",
    Button2_RedirectURL:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/51765032-ac27-4fbb-899c-c822bb36528b/content",
    Button2_RestEndPonit: "RestEndPoint 2",
    Button2_Type: "current window",
    Button2_Value: "Lorem ipsum",

    Button3_Action: "External",
    Button3_Name: "Digital Solutions",
    Button3_RedirectURL:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/51765032-ac27-4fbb-899c-c822bb36528b/content",
    Button3_RestEndPonit: "RestEndPoint 3",
    Button3_Type: "current window",
    Button3_Value: "Lorem ipsum",

    Button4_Action: "External",
    Button4_Name: "Verification",
    Button4_RedirectURL:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/51765032-ac27-4fbb-899c-c822bb36528b/content",
    Button4_RestEndPonit: "RestEndPoint 4",
    Button4_Type: "current window",
    Button4_Value: "Lorem ipsum",

    Button5_Action: "External",
    Button5_Name: "Development",
    Button5_RedirectURL:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/51765032-ac27-4fbb-899c-c822bb36528b/content",
    Button5_RestEndPonit: "RestEndPoint 5",
    Button5_Type: "current window",
    Button5_Value: "Lorem ipsum",
    Title: "Lorum ipsum dolor sit amet",
    Subtitle: "Lorum ipsum dolor sit amet",
    Description:
      "Lorum ipsum dolorsit amet, consecteter adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commado consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occanecat cupidatat non proident",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690279626408/public/png/Banner3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerThree",
            Name: "BannerThree",
            Title: "BannerThree",
            Description: "This is for BannerThree",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690279626408/public/png/Banner3-card2",
          },
        ],
      },
    },
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
    pageTitle: "Banner 3",
    pageDesc: "This prelem can be used as the main banner with multiple important CTA",
    pageTags: " Banner, Hero Banner",
    prelemTags: " Banner, Hero Banner",
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

export default Banner3;
