import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import "./VideoBanner2.css";
import { useCustomStyle } from "./VideoBanner2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const VideoBanner2 = ({ content, analytics, authoringHelper, secondaryArgs }: VideoBanner2Prop) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const generateStructureData = () => {
    let videoBanner2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current === true && String(tempSD).length > 0) {
      videoBanner2StructureData = JSON.parse(tempSD);
    } else {
      try {
        videoBanner2StructureData = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: content?.Videos?.Video_1?.Title,
          description: content?.Videos?.Video_1?.Description,
          thumbnailUrl: content?.Videos?.Video_1?.Thumbnail,
          contentUrl: content?.Videos?.Video_1?.Url,
        };
      } catch (e) {
        videoBanner2StructureData = {};
      }
    }
    firstRender.current = false;
    return videoBanner2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Videos?.Video_1?.Url]);

  usePrelemImpression(analytics, inView);

  const onClickScroll = (e: any) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const pageHeight = window.innerHeight;
      // window.scrollBy(0, pageHeight);
      window.scrollBy({
        top: pageHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.videoBanner2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 videobanner-2 videoBanner2WrapperBg`}>
      <Box ref={ref} className='container prelem-py fullViewport'>
        <Box className='banner'>
          <Box
            className='mask1'
            sx={{
              WebkitMaskImage: `url(${imgUrl})`,
              maskImage: `url(${imgUrl})`,
              WebkitMaskSize: "contain",
            }}>
            {secondaryArgs?.editState ? (
              <img
                alt='banner2'
                src={content.Videos.Video_1.Thumbnail}
                className='backgroundImage'
              />
            ) : (
              <ReactPlayer
                className='react-player-anime'
                url={content?.Videos?.Video_1?.Url}
                config={{
                  youtube: { playerVars: { disablekb: 1 } },
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                height='100%'
                width='auto'
                muted={true}
                playing={true}
                controls={false}
                loop={true}
                playsinline={true}
                css={{
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            )}
            <Box className='maskImageWrapper'>
              <img alt='banner3' src={imgUrl} className='silhouette' width='100%' height='auto' />
            </Box>
          </Box>
        </Box>
        <Box className='mouse-indicator' onClick={(e) => onClickScroll(e)}>
          <Box className='mouse-down'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 45'
              enableBackground='new 0 0 30 45'>
              <path
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeMiterlimit='10'
                d='M15,1.118c12.352,0,13.967,12.88,13.967,12.88v18.76  c0,0-1.514,11.204-13.967,11.204S0.931,32.966,0.931,32.966V14.05C0.931,14.05,2.648,1.118,15,1.118z'></path>
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface VideoBanner2Prop {
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
  innerRef: any;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}

interface Content {
  Videos: {
    Video_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
      Thumbnail: string;
    };
  };
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

VideoBanner2.defaultProps = {
  content: {
    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/69ba1992-15d9-4d0d-9251-f79ae37184d5/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
        Transcript: false,
        Thumbnail: "machine_assets/1691754059696/public/png/X_Image",
      },
    },
    PlayerType: "dspace",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1691754059696/public/png/X_Image",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerXImage",
            Name: "BannerXImage",
            Title: "BannerXImage",
            Description: "This is for BannerXImage",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1691754059696/public/png/X_Image",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1691754059696/public/png/X_Image",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1691754059696/public/png/X_Image-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1691754059696/public/png/X_Image-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1691754059696/public/png/X_Image-card2",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1691754059696/public/png/X_Image-hero",
          },
        ],
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Video Banner 2",
    pageDesc: "This prelem can be used as the header banner with video along with animation.",
    pageTags: "Header Banner, Video Banner, Animated Banner",
    prelemTags: "Header Banner, Video Banner, Animated Banner",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default VideoBanner2;
