import { Box, Container, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import ImageRender from "../../components/ImageRender";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./ServiceShowcase.style";
import prelemTypes from "../../globalStyle";
import "../../Style.css";

// ts-ignore
const ServiceShowcase = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
ServiceShowcaseProp) => {
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

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ServiceShowcaseStructureData;
    try {
      ServiceShowcaseStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url:
              content?.Button1_Action === "Internal"
                ? `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint.replace(/\/$/, "")}${
                    content?.Button1_RedirectURL
                  }`
                : content?.Button1_RedirectURL,
            name: content?.Title_1,
            description: content?.Description_1,
          },
          {
            "@type": "ListItem",
            position: 2,
            url:
              content?.Button2_Action === "Internal"
                ? `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint.replace(/\/$/, "")}${
                    content?.Button2_RedirectURL
                  }`
                : content?.Button2_RedirectURL,
            name: content?.Title_2,
            description: content?.Description_2,
          },
        ],
      };
    } catch (e) {
      ServiceShowcaseStructureData = {};
    }

    return ServiceShowcaseStructureData;
  };

  const generateStructureData = () => {
    let ServiceShowcaseStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceShowcaseStructureData = JSON.parse(tempSD);
      } else {
        ServiceShowcaseStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceShowcaseStructureData = defaultStructureData();
    }
    return ServiceShowcaseStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title_1,
    content?.Subtitle_1,
    content?.Description_1,
    content?.Title_2,
    content?.Subtitle_2,
    content?.Description_2,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
    content?.Button2_Value,
    content?.Button2_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const classes = useCustomStyle();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceShowcaseWrapper} ${globalClasses.prelemType1} prelem prelemType1 serviceShowcase serviceShowcaseBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Box className='serviceShowcaseManiWrapper'>
          <Box className='LeftColWrapper'>
            <Box className='LeftSecondColWrapper'>
              <Typography variant='h2semibold' color='textColor' id={"Title_1"}>
                {content.Title_1}
              </Typography>
              <Typography
                variant='p1regular'
                className='textellipsis'
                color='textColor'
                id={"Subtitle_1"}>
                {content.Subtitle_1}
              </Typography>
              <Typography
                className='textellipsis'
                variant='p3regular'
                id={"Description_1"}
                color='textColor'>
                {content.Description_1}
              </Typography>
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
              <Box className='topBoxWrapper'></Box>
            </Box>
            <Box className='LeftImageWrapper'>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "landscape",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                }}
              />
            </Box>
          </Box>

          <Box className='RightColWrapper'>
            <Box className='RightColWrapperInner'>
              <Typography variant='h2semibold' color='textColor' id={"Title_2"}>
                {content.Title_2}
              </Typography>
              <Typography
                variant='p1regular'
                color='textColor'
                className='textellipsis'
                id={"Subtitle_2"}>
                {content.Subtitle_2}
              </Typography>
              <Typography
                className='textellipsis'
                variant='p3regular'
                id={"Description_2"}
                color='textColor'>
                {content.Description_2}
              </Typography>
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
            </Box>
            <Box className='RightColImageInner'>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_2?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "card1",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                }}
              />
              <Box className='rightInnerShadowBox'></Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

interface ServiceShowcaseProp {
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
  Title_1?: string;
  Subtitle_1?: string;
  Description_1?: string;

  Title_2?: string;
  Subtitle_2?: string;
  Description_2?: string;

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

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
  };
}

interface ImageCompound {
  original_image: OriginalImage;
  published_images: PublishedImages[];
}
interface OriginalImage {
  Url: string;
  bitStreamId: string;
  auto: boolean;
}
interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
ServiceShowcase.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Name: "Collaborate with us",
    Button1_RedirectURL: "https://www.google.com/",
    Button1_RestEndPonit: "RestEndPoint 1",
    Button1_Type: "Button1_Type",
    Button1_Value: "Lorem ipsum",

    Button2_Action: "External",
    Button2_Name: "Watch the highlights",
    Button2_RedirectURL: "https://www.google.com/",
    Button2_RestEndPonit: "RestEndPoint 2",
    Button2_Type: "Button2_Type",
    Button2_Value: "Lorem ipsum",

    Title_1: "Lorem ipsum dolor sit amet",
    Subtitle_1: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    Description_1:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    Title_2: "Lorem ipsum dolor sit amet",
    Subtitle_2: "Neque porro quisquam",
    Description_2:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla.",

    TagName: "SiteComponents",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690192630429/public/png/Serviceshowcase_image1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServicesShowcase1",
            Name: "ServicesShowcase1",
            Title: "ServicesShowcase1",
            Description: "This is for ServicesShowcase1",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690192630429/public/png/Serviceshowcase_image1-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690193302263/public/png/Serviceshowcase_image2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServicesShowcase2",
            Name: "ServicesShowcase2",
            Title: "ServicesShowcase2",
            Description: "This is for ServicesShowcase2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690193302263/public/png/Serviceshowcase_image2-card2",
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
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ServiceShowcase;
