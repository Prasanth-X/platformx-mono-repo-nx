import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
import DottedBg from "../../assets/dottedbg.png";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./WebsiteSummaryWithSubHeading2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const WebsiteSummaryWithSubHeading2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: WebsiteSummaryWithSubHeading2Props) => {
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
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
  };

  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const defaultStructureData = () => {
    let WebsiteSummaryWithSubHeading2StructureData;
    try {
      WebsiteSummaryWithSubHeading2StructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title1,
        image: imgUrl,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      WebsiteSummaryWithSubHeading2StructureData = {};
    }
    return WebsiteSummaryWithSubHeading2StructureData;
  };
  const genrateStructureData = () => {
    let WebsiteSummaryWithSubHeading2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        WebsiteSummaryWithSubHeading2StructureData = JSON.parse(tempSD);
      } else {
        WebsiteSummaryWithSubHeading2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      WebsiteSummaryWithSubHeading2StructureData = defaultStructureData();
    }
    return WebsiteSummaryWithSubHeading2StructureData;
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
    content?.ImageCompound,
    content?.Title1,
    content?.Title2,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);
  const firstColumnContent = () => {
    return (
      <Box className='firstColumn'>
        <Box className='leftGridItem'>
          <Box className='innerHeading'>
            <Box className='title'>
              <Typography variant='labelbold' id='Title1'>
                {content.Title1}
              </Typography>
            </Box>
            <Typography variant='h2medium' id='Title2'>
              {content.Title2}
            </Typography>
          </Box>
          <Typography variant='p3regular' id='Description'>
            {content.Description}
          </Typography>
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            variant='primaryButton1'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj1}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj1}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='rightGridItem widthheight100'>
        <Box className='dottedBg'>
          <img alt='picture' src={DottedBg} width='437' height='225' className='rightImage1' />
        </Box>
        <Box className='rightImageWrapper'>
          {/* <img
            alt="picture"
            src={imgUrl}
            width="575"
            height="400"
            className="rightImage"
          /> */}
          <ImageRender
            originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
            publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
            secondaryArgs={secondaryArgs}
            imgOrder={{
              1440: "card2",
              1280: "card2",
              1024: "card2",
              768: "card2",
              600: "card2",
              320: "card2",
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.websiteSummaryWithSubHeading2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 website-summary-with-subheading2 websiteSummaryWithSubHeading2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='websiteSummaryWithHeading'
          noGap={true}
          // col1Align="start"
          // col2Align="start"
        />
      </Container>
    </div>
  );
};

interface WebsiteSummaryWithSubHeading2Props {
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
  Title1?: string;
  Title2?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
  };
}

interface ImageCompound {
  original_image: object;
  published_images: PublishedImages[];
}

interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

WebsiteSummaryWithSubHeading2.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title1: "Lorem ipsum dolor sit amet",
    Title2: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

    TagName: "SiteComponents",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "WebsiteSummaryWithSubHeading2",
            Name: "WebsiteSummaryWithSubHeading2",
            Title: "WebsiteSummaryWithSubHeading2",
            Description: "This is for WebsiteSummaryWithSubHeading2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1690448445641/public/png/WebsiteSummarySubHeading2-Sitecomponent-card2",
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
    pageTitle: "Website Summary With Sub Heading2",
    pageDesc:
      "The Prelem ‘Website Summary With Sub Heading2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags:
      "Website, Introduction, Website Summary With Sub Heading2, Image, CTA, Title, Hero Banner",
    prelemTags:
      "Website, Introduction, Website Summary With Sub Heading2, Image, CTA, Title, Hero Banner",
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

export default WebsiteSummaryWithSubHeading2;
