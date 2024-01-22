/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./FullWidthVideo.style";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";

const FullWidthVideo = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: FullWidthVideoProp) => {
  const { bucketName, gcpUrl } = secondaryArgs;
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const generateStructureData = () => {
    let fullWidthVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current && String(tempSD).length > 0) {
      fullWidthVideoStructureData = JSON.parse(tempSD);
    } else {
      try {
        fullWidthVideoStructureData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VideoObject",
              contentUrl: content?.Videos?.Video_1?.Url,
              name: content?.Videos?.Video_1?.Title,
              description: content?.Videos?.Video_1?.Description,
              embedUrl: content?.Videos?.Video_1?.Url,
              thumbnailUrl: formCroppedUrl(
                gcpUrl,
                bucketName,
                content?.Videos?.Video_1.Thumbnail,
                content?.Videos?.Video_1.ext,
              ),
            },
          ],
        };
      } catch (e) {
        fullWidthVideoStructureData = {};
      }
    }
    firstRender.current = false;
    return fullWidthVideoStructureData;
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
    content?.Title,
    content?.Videos?.Video_1?.Url,
    content?.Videos?.Video_1?.Title,
    content?.Videos?.Video_1?.Description,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Box ref={ref} className={`${classes.fullWidthVideoWrapper} fullWidthVideoProp`}>
        <VideoPlayer
          playerProp={{
            posterImg: formCroppedUrl(
              secondaryArgs?.gcpUrl,
              secondaryArgs?.bucketName,
              content?.Videos?.Video_1.Thumbnail,
              content?.Videos?.Video_1.ext,
            ),
            videoUrl: content?.Videos?.Video_1.Url ? content?.Videos?.Video_1.Url : "",
          }}
        />
      </Box>
    </Box>
  );
};

interface FullWidthVideoProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}
interface SecondaryArgs {
  gcpUrl: string;
  bucketName: string;
  prelemImpressionSchema?: string;
  clickImpressionSchema?: string;
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
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}

interface Content {
  Title?: string;
  Description?: string;
  Videos?: {
    Video_1: {
      Name: string;
      Url: string;
      Thumbnail: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
      ext: string;
    };
  };
  TagName?: string;
}

FullWidthVideo.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "Full Width Video",
    Description:
      "This prelem can be used to house a video which will take the full width of the screen. Here the video will be picked up from DAM.",
    Videos: {
      Video_1: {
        Name: "FullWidthVideo",
        Thumbnail: "machine_assets/1690454476953/public/png/FullWidthVideo_thumpnail",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4ee60448-3b20-4a9a-9c50-46ec5fb70b75/content",
        Title: "FullWidthVideo",
        Description: "This is for FullWidthVideo",
        Attribution: false,
        CC: false,
        ext: "png",
        visibility: "public",
        bitStreamId: "",
        Transcript: false,
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
    pageTitle: "Full Width Video",
    pageDesc: "Video, Full Width Video",
    pageTags: "Video, Full Width Video",
    prelemTags: "Video, Full Width Video",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default FullWidthVideo;
