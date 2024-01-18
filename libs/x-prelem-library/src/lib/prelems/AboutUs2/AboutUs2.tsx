/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import ImageRender from "../../components/ImageRender";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import { assetsPng } from "../../assets/index";
import BasicButton from "../../components/BasicButton/BasicButton";
import prelemTypes from "../../globalStyle";
import { useCustomStyle } from "./AboutUS2.style";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const AboutUs2 = ({ content, analytics, authoringHelper, secondaryArgs }: AboutUs2Props) => {
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

  const defaultStructureData = () => {
    let aboutUs2StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      aboutUs2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ImageObject",
        title: content?.primary_heading,
        name: content?.secondary_heading,
        description: content?.description,
        keywords: content?.typescript_heading,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
        image: img,
      };
    } catch (e) {
      aboutUs2StructureData = {};
    }
    return aboutUs2StructureData;
  };
  const genrateStructureData = () => {
    let aboutUs2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        aboutUs2StructureData = JSON.parse(tempSD);
      } else {
        aboutUs2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      aboutUs2StructureData = defaultStructureData();
    }
    return aboutUs2StructureData;
  };
  const stringToArray = (typeString: any) => {
    let resultString = typeString;
    if (typeof document !== "undefined") {
      if (document.getElementById("site-frame")) {
        const iframe = document?.getElementById("site-frame") as HTMLIFrameElement;
        resultString =
          iframe?.contentWindow?.document?.getElementById("typescript_heading")?.innerText;
      } else {
        resultString = document.getElementById("typescript_heading")?.innerText;
      }
      if (resultString?.length > 0) {
        return resultString?.split(",");
      }
    }
  };
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.primary_heading,
    content?.secondary_heading,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
    content?.typescript_heading,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const gridVal = {
    md: [12, 12],
    em: [5, 7],
    lg: [5, 7],
  };
  const firstColumnContent = () => {
    return (
      <Box className='textcenter'>
        <Typography variant='h1bold' id='primary_heading' className='title'>
          {content.primary_heading}
        </Typography>
        <Box className='blinkText'>
          <Typography
            variant='h1bold'
            id='typescript_heading'
            component='span'
            className='category'
            sx={{
              display: secondaryArgs?.editState ? "inherit" : "none",
            }}>
            {content.typescript_heading}
          </Typography>

          {!secondaryArgs?.editState && (
            <Typography
              variant='h1bold'
              component='span'
              id='typescript_heading'
              className='categoryText'>
              <Typewriter
                options={{
                  strings: stringToArray(content.typescript_heading),
                  autoStart: true,
                  loop: true,
                }}
              />
            </Typography>
          )}
        </Box>
        <Box className='textMaxWidth'>
          <Typography variant='p1regular' id='description'>
            {content.description}
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
      <Box className='imageWrapper widthheight100'>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "square",
            1280: "square",
            1024: "square",
            768: "square",
            600: "square",
            320: "square",
          }}
        />
        <Box className='backgroundText'>
          <Typography variant='h1bold' id='secondary_heading'>
            <span className='fadeBackground'>{content?.secondary_heading}</span>
          </Typography>
        </Box>
        <Box className='imageWrapper1'>
          <img alt='About us' src={assetsPng.frame1} className='frame1' width='200' height='87' />
        </Box>
        <Box className='imageWrapper2'>
          <img alt='About us' src={assetsPng.frame2} className='frame2' width='170' height='72' />
        </Box>
        <Box className='imageWrapper3'>
          <img alt='About us' src={assetsPng.frame3} className='frame3' width='232' height='40' />
        </Box>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.aboutUs2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 about-us2 aboutUs2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='aboutUs2'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface AboutUs2Props {
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
  primary_heading?: string;
  typescript_heading: string;
  description?: string;
  secondary_heading?: string;
  TagName?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image: object;
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

AboutUs2.defaultProps = {
  content: {
    Button1_Name: "Request for demo",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "Button1_Type", // current window | new window
    Button1_Value: "Request for demo",
    primary_heading: "Now, It's too simple to create a wide range of websites, including:",
    typescript_heading: "Ecommerce,Business,Blog",
    description: "Run your D2C engagement and monetization initiatives through a single platform",
    secondary_heading: "Boost your online development",
    TagName: "About us, Service Box, Features, Products",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001203561/public/png/Aboutus",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Aboutus",
            Name: "Aboutus",
            Title: "Aboutus",
            Description: "This is for Aboutus",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-card2",
          },
        ],
      },
    },
    PrelemContentType: ["Select"],
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
    pageTitle: "About us",
    pageDesc:
      "The Prelem ‘About us 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "About us, Service Box, Features, Products",
    prelemTags: "About us, Service Box, Features, Products",
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

export default AboutUs2;
