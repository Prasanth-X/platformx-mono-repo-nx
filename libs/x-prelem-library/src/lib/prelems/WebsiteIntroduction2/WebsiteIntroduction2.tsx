import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
// import RedDots from "../../assets/RedDots.svg";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { formCroppedUrl, structureDataUrlPoint } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./WebsiteIntroduction2.style";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const WebsiteIntroduction2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: // secondaryArgs,
WebsiteIntroduction2Prop) => {
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
    let websiteIntroduction2StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      websiteIntroduction2StructureData = {
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
                url: structureDataUrlPoint(
                  {
                    Button_Action: content?.Button1_Action,
                    Button_RedirectURL: content?.Button1_RedirectURL,
                    Button_Content: content.Button1_Content,
                  },
                  secondaryArgs,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button2_Value,
                url: structureDataUrlPoint(
                  {
                    Button_Action: content?.Button2_Action,
                    Button_RedirectURL: content?.Button2_RedirectURL,
                    Button_Content: content.Button2_Content,
                  },
                  secondaryArgs,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button3_Value,
                url: structureDataUrlPoint(
                  {
                    Button_Action: content?.Button3_Action,
                    Button_RedirectURL: content?.Button3_RedirectURL,
                    Button_Content: content.Button3_Content,
                  },
                  secondaryArgs,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button4_Value,
                url: structureDataUrlPoint(
                  {
                    Button_Action: content?.Button4_Action,
                    Button_RedirectURL: content?.Button4_RedirectURL,
                    Button_Content: content.Button4_Content,
                  },
                  secondaryArgs,
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: content?.Button5_Value,
                url: structureDataUrlPoint(
                  {
                    Button_Action: content?.Button5_Action,
                    Button_RedirectURL: content?.Button5_RedirectURL,
                    Button_Content: content.Button5_Content,
                  },
                  secondaryArgs,
                ),
              },
            },
          ],
        },
      };
    } catch (e) {
      websiteIntroduction2StructureData = {};
    }
    return websiteIntroduction2StructureData;
  };

  const generateStructureData = () => {
    let websiteIntroduction2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        websiteIntroduction2StructureData = JSON.parse(tempSD);
      } else {
        websiteIntroduction2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      websiteIntroduction2StructureData = defaultStructureData();
    }
    return websiteIntroduction2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title,
    content?.Heading,
    content?.Description,
    content?.Button1_Value,
    content?.Button2_Value,
    content?.Button3_Value,
    content?.Button4_Value,
    content?.Button5_Value,
    content?.ImageCompound?.ImageCompound_1?.original_image,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='leftContentWrapper'>
        <Typography id='WelcomeText' variant='h3regular'>
          {content.WelcomeText}
        </Typography>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>
        <Typography
          variant='h3regular'
          sx={{
            margin: "5px 0",
          }}
          id='Heading'>
          {content.Heading}
        </Typography>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <Box>
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton2'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj1}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj1}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton2'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj2}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj2}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton2'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj3}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj3}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton2'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj4}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj4}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton2'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj5}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj5}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='rightWrapper'>
        <Box className='imgBoxColorWrapper'>
          <Box className='imgBoxWrapper widthheight100'>
            <ImageRender
              originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
              publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
              secondaryArgs={secondaryArgs}
              imgOrder={{
                1440: "card2",
                1280: "landscape",
                1024: "card2",
                768: "card1",
                600: "square",
                320: "square",
              }}
            />
          </Box>
          <Box className='dottedImgFirst'>
            <img alt='intor3' src='' width='140' height='63' />
          </Box>
          <Box className='dottedImgSecond'>
            <img alt='intro4' src='' width='140' height='63' />
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.websiteIntroduction2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 websiteIntroduction2 websiteIntroduction2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='websiteIntroduction2InnerWrapper'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface WebsiteIntroduction2Prop {
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
  WelcomeText?: string;
  Title?: string;
  Heading?: string;
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

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
    };
  };
}
interface Image {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

WebsiteIntroduction2.defaultProps = {
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

    TagName: "SiteComponents",
    WelcomeText: "Welcome here!",
    Title: "Lorem ipsum dolor sit",
    Heading: "Consectetur adipiscing",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690186618629/public/png/WebsiteIntroduction2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "WebsiteIntroduction2",
            Name: "WebsiteIntroduction2",
            Title: "WebsiteIntroduction2",
            Description: "This is for WebsiteIntroduction2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-card2",
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Website Introduction 2",
    pageDesc:
      "The Prelem ‘Website Introduction 2’ can be used to give an introduction to your website. It has multiple text fields & 5 CTA which would allow you to add text in form of heading, sub heading, description etc & you can attach multiple links/assets to the CTAs.",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Website, Introduction, Website Introduction, Image, CTA, Title, Hero Banner",
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

export default WebsiteIntroduction2;
