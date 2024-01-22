/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./FullWidthImage.style";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const FullWidthImage = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: FullWidthImageProp) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const defaultStructureData = () => {
    let fullWidthImageStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      fullWidthImageStructureData = {
        "@context": "http://schema.org/",
        "@type": "ImageObject",
        name: content?.ImageCompound?.ImageCompound_1?.MetaFields?.Title,
        contentUrl: img,
      };
    } catch (e) {
      fullWidthImageStructureData = {};
    }

    return fullWidthImageStructureData;
  };
  const generateStructureData = () => {
    let fullWidthImageStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        fullWidthImageStructureData = JSON.parse(tempSD);
      } else {
        fullWidthImageStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      fullWidthImageStructureData = defaultStructureData();
    }
    return fullWidthImageStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Subtitle,
    content?.Title,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Grid container ref={ref}>
        <Box className={`${classes.fullWidthImageWrapper} fullWidthImageInner`}>
          <ImageRender
            originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
            publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
            secondaryArgs={secondaryArgs}
            imgOrder={{
              1440: "hero",
              1280: "landscape",
              1024: "card2",
              768: "square",
              600: "square",
              320: "square",
            }}
          />
        </Box>
      </Grid>
    </Box>
  );
};

interface FullWidthImageProp {
  content: Content;
  analytics?: any;
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
  Subtitle?: string;
  Description?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
      MetaFields?: any;
    };
  };
  TagName?: string;
}
interface Image {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
FullWidthImage.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "AirPods - Apple",
    SubTitle: "",
    Description: "",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690277946726/public/png/FullWidthImage",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FullWidthImage",
            Name: "FullWidthImage",
            Title: "FullWidthImage",
            Description: "This is for FullWidthImage",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690277946726/public/png/FullWidthImage-card2",
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Full Width Image",
    pageDesc:
      "This prelem can be used to house a full width image. It can be used anywhere in the website to add an element of beautification to it.",
    pageTags: "Image, Full Width Image",
    prelemTags: "Image, Full Width Image",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default FullWidthImage;
