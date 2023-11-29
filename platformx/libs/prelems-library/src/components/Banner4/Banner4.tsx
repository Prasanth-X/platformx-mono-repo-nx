import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import DottedRound from "../../assets/mask-dotted.png";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./Banner4.style";
import ImageRender from "../../Common/ImageRender";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const Banner4 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner4Props) => {
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

  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const defaultStructureData = () => {
    let Banner4StructureData;
    try {
      Banner4StructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title,
        image: imgUrl,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      Banner4StructureData = {};
    }
    return Banner4StructureData;
  };
  const genrateStructureData = () => {
    let Banner4StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner4StructureData = JSON.parse(tempSD);
      } else {
        Banner4StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner4StructureData = defaultStructureData();
    }
    return Banner4StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl, content?.Title, content?.Button1_Value, content?.Button1_RedirectURL]);

  usePrelemImpression(analytics, inView);
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.banner4Wrapper} ${globalClasses.prelemType3} prelem prelemType3 banner4 banner4Bgwrapper`}>
      <Box className={`prelem-pb prelemBox`} ref={ref}>
        <Box className='dottedRound1'>
          <img alt='BAnner4img1' src={DottedRound} height='159' width='234' className='fullWidth' />
        </Box>
        <Box className='dottedRound2'>
          <img alt='BAnner4img2' src={DottedRound} height='159' width='234' className='fullWidth' />
        </Box>
        <Container className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}>
          <Grid container ref={ref} className='container'>
            <Grid item xs={12} className='gridItem'>
              <Typography variant='h1bold' className='title1' id='Title'>
                {content.Title}
              </Typography>
              <Box>
                <BasicButton
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  variant='tertiaryButton1'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj1}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={ButtonDataObj1}
                  secondaryArgs={secondaryArgs}
                  analytics={analytics}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className='imageContainer'>
                <ImageRender
                  originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                  publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "landscape",
                    1280: "landscape",
                    1024: "landscape",
                    768: "landscape",
                    600: "landscape",
                    320: "landscape",
                  }}
                />
                {/* <img
                  alt="BAnner4img3"
                  height=""
                  width="870"
                  src={imgUrl}
                  className="image"
                /> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

interface Banner4Props {
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

Banner4.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title: "Lorem ipsum dolor sit amet",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerFour",
            Name: "BannerFour",
            Title: "BannerFour",
            Description: "This is for BannerFour",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690446326458/public/png/BannerFour-Sitecomponent-card2",
          },
        ],
      },
    },
    TagName: "SiteComponents",
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
    pageTitle: "Banner Four",
    pageDesc:
      "The Prelem ‘Banner Four’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Website, Introduction, Banner Four, Image, CTA, Title, Hero Banner",
    prelemTags: "Website, Introduction, Banner Four, Image, CTA, Title, Hero Banner",
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

export default Banner4;
