/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import prelemTypes from "../../globalStyle";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./WebsiteIntroduction.style";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const WebsiteIntroduction = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: WebsiteIntroductionProps) => {
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
  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content?.Button2_Name,
    Button_RedirectURL: content?.Button2_RedirectURL,
    Button_Type: content?.Button2_Type,
    Button_Value: content?.Button2_Value,
    Button_Action: content?.Button2_Action,
    Button_Content: content?.Button2_Content,
  };
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let websiteIntroductionStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      websiteIntroductionStructureData = {
        "@context": "http://schema.org/",
        "@type": "Service",
        name: content?.Title,
        image: img,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      websiteIntroductionStructureData = {};
    }
    return websiteIntroductionStructureData;
  };
  const genrateStructureData = () => {
    let websiteIntroductionStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        websiteIntroductionStructureData = JSON.parse(tempSD);
      } else {
        websiteIntroductionStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      websiteIntroductionStructureData = defaultStructureData();
    }
    return websiteIntroductionStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const firstColumnContent = () => {
    return (
      <Box>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          //buttonRef={buttonRef}
          //buttonContentEditable={buttonContentEditable}
          variant='primaryButton1'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj1}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj1}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
        <Box sx={{ display: "none" }}>
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            //buttonRef={buttonRef}
            //buttonContentEditable={buttonContentEditable}
            variant='primaryButton1'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj2}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj2}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='imageWrapper widthheight100'>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "card2",
            1280: "landscape",
            1024: "card2",
            768: "square",
            600: "card2",
            320: "card2",
          }}
        />
      </Box>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.websiteintroWrapper} ${globalClasses.prelemType1} prelem prelemType1 websiteintrobg website-introduction`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Box className='websiteIntroduction'>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
          />
        </Box>
      </Container>
    </div>
  );
};

interface WebsiteIntroductionProps {
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

WebsiteIntroduction.defaultProps = {
  content: {
    Button1_Name: "ICT Certified Course",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link

    Button1_Type: "Button1_Type", // current window | new window
    Button1_Value: "Lorem ipsum",

    Button2_Name: "DBE iCloud",
    Button2_RedirectURL: "https://www.google.com/", // relative page url | link url
    Button2_RestEndPonit: "RestEndPoint 2", // ?
    Button2_Action: "External", // Page |  Link

    Button2_Type: "Button2_Type", // current window | new window
    Button2_Value: "DBE iCloud",

    Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    TagName: "SiteComponents",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689934844153/public/png/WebsiteIntroduction",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "HomeBanner",
            Name: "HomeBanner",
            Title: "HomeBanner",
            Description: "This is for HeroBanner",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card2",
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
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Website Introduction",
    pageDesc:
      "The Prelem ‘Website Introduction’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Website, Introduction, Website Introduction, Image, CTA, Title, Hero Banner",
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

export default WebsiteIntroduction;
