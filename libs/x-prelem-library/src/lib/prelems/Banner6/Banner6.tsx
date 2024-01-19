import { Box, Typography, Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./Banner6.style";
import BasicButton from "../../components/BasicButton/BasicButton";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Banner6 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner6Prop) => {
  const classes = useCustomStyle();
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
  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const defaultStructureData = () => {
    let Banner6StructureData;

    try {
      Banner6StructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title,
        image: imgUrl,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      Banner6StructureData = {};
    }
    return Banner6StructureData;
  };

  const genrateStructureData = () => {
    let Banner6StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner6StructureData = JSON.parse(tempSD);
      } else {
        Banner6StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner6StructureData = defaultStructureData();
    }
    return Banner6StructureData;
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
    imgUrl,
    content?.Title,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Box ref={ref} className={`${classes.banner6Wrapper} banner6Props`}>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "hero",
            1280: "hero",
            1024: "card2",
            768: "card2",
            600: "card2",
            320: "card2",
          }}
        />
        <Box className='banner6Overlay'></Box>

        <Box className='banner6ContentWrapper'>
          <Container
            className={
              authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
            }>
            <Typography variant='p3semibold' color='textColor' id='Subtitle'>
              {content.Subtitle}
            </Typography>
            <Typography variant='h1semibold' color='textColor' id='Title'>
              {content.Title}
            </Typography>
            <Typography
              variant='p3regular'
              className='descriptionText'
              color='textColor'
              id='Description'>
              {content.Description}
            </Typography>
            <Box className='buttonWp'>
              <BasicButton
                openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                isAuthoring={analytics?.isAuthoring}
                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                variant='defaultButton1'
                analyticsEnabled={analytics?.isAnalyticsEnabled}
                ButtonObj={ButtonObj1}
                isEditing={authoringHelper?.isEditing}
                buttonDataObj={ButtonDataObj1}
                secondaryArgs={secondaryArgs}
                analytics={analytics}
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

interface Banner6Prop {
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
Banner6.defaultProps = {
  content: {
    Title: "The Challenge 2023",
    Subtitle: "Participate Now in",
    Description: "The goal of the game is to catch as many footballs as you can during each round.",
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690278857303/public/png/Banner6",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerSix",
            Name: "BannerSix",
            Title: "BannerSix",
            Description: "This is for BannerSix",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
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
    pageTitle: "Banner 6",
    pageDesc:
      "This prelem can be used as the main banner or simple banner anywhere in the website.",
    pageTags: "Banner, Hero Banner",
    prelemTags: "Banner, Hero Banner",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Banner6;
