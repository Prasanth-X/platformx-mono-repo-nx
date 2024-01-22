import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./Banner1.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Banner1 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner1Prop) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let Banner1StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      Banner1StructureData = {
        "@context": "http://schema.org/",
        "@type": "ImageObject",
        contentUrl: img,
        name: content?.Title,
      };
    } catch (e) {
      Banner1StructureData = {};
    }
    return Banner1StructureData;
  };

  const genrateStructureData = () => {
    let Banner1StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner1StructureData = JSON.parse(tempSD);
      } else {
        Banner1StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner1StructureData = defaultStructureData();
    }
    return Banner1StructureData;
  };
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.ImageCompound?.ImageCompound_1?.original_image, content?.Title]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Box
        ref={ref}
        className={`${classes.banner1Wrapper} ${globalClasses.prelemType2} prelem prelemType2 banner1Props`}>
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
        <Box className='banner1Overlay'></Box>
        <Box className='banner1ContentWrapper'>
          <Typography variant='h2semibold' color='textColor' align='center' id='Title'>
            {content.Title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

interface Banner1Prop {
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
}

interface Content {
  Title?: string;
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
Banner1.defaultProps = {
  content: {
    Title: "Lorum ipsum dolor sit amet ",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690278857303/public/png/Banner1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerOne",
            Name: "BannerOne",
            Title: "BannerOne",
            Description: "This is for BannerOne",
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
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Banner 1",
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

export default Banner1;
