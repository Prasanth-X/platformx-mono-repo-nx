import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import BrightcovePlayer from "./../BrightcovePlayer/BrightcovePlayer";
import { useCustomStyle } from "./LivestreamFeed.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

interface IVideoContent {
  name?: string;
}

const LivestreamFeed = ({
  content,
  analytics,
  authoringHelper,
}: //secondaryArgs,
LivestreamFeedProp) => {
  const [videoContent, setVideoContent] = useState<IVideoContent>({});
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const defaultStructureData = () => {
    let livestreamFeedStructureData;
    try {
      livestreamFeedStructureData = {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        name: videoContent?.name,
        publication: {
          "@type": "BroadcastEvent",
          name: "X broadcast",
          isLiveBroadcast: true,
        },
      };
    } catch (e) {
      livestreamFeedStructureData = {};
    }

    return livestreamFeedStructureData;
  };
  const generateStructureData = () => {
    let livestreamFeedStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        livestreamFeedStructureData = JSON.parse(tempSD);
      } else {
        livestreamFeedStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      livestreamFeedStructureData = defaultStructureData();
    }
    return livestreamFeedStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoContent?.name]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.LivestreamFeedWrapper} ${globalClasses.prelemType1} prelem prelemType1 outer-row LivestreamFeed`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Grid container className='LivestreamWrapper' ref={ref}>
          <Grid xs={12} sm={12} md={6}>
            <Box className='LivestreanLeft'>
              {typeof window !== "undefined" &&
                content?.VideoID &&
                content?.PlayerID &&
                content?.AccountID && (
                  <BrightcovePlayer
                    VideoData={{
                      VideoID: content.VideoID,
                      PlayerID: content.PlayerID,
                      AccountID: content.AccountID,
                    }}
                    setVideoContent={setVideoContent}
                    analytics={analytics}
                    prelemTitle={"Livestream Feed"}
                    analyticsEnable={analytics?.isAnalyticsEnabled}
                  />
                )}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box className='LivestreanRight'>
              <Typography variant='h2semibold' id={"Title"}>
                {content?.Title}
              </Typography>
              <Typography variant='p3regular' id={"Description"}>
                {content?.Description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface LivestreamFeedProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}

interface SecondaryArgs {
  APIEndPoint?: string;
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
  Title: string;
  Description: string;
  VideoID: string;
  PlayerID: string;
  AccountID: string;
  TagName?: string;
}

LivestreamFeed.defaultProps = {
  content: {
    TagName: "Livestream, Video",
    Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",
    PlayerType: "brightcove",
    VideoID: "6340658248112",
    PlayerID: "default",
    AccountID: "6415745389001",
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
    APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
  },
};

export default LivestreamFeed;
