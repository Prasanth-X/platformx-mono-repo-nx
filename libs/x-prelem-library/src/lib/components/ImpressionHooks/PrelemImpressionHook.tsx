import { useState, useEffect } from "react";
import { IMPRESSIONS } from "./constants";
import { createPrelemImpression, snowplowPrelemImpression } from "./helper";
import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics/index";

export const usePrelemImpression = (
  analytics: Analytics,
  inView: boolean,
  secondaryArgs: secondaryArgsObj,
) => {
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const [handleTrack, handleImpression] = usePlatformAnalytics();

  useEffect(() => {
    let isMounted = true;
    const performImpressions = () => {
      if (
        !analytics?.isAuthoring &&
        analytics?.isAnalyticsEnabled &&
        enableImpressionTracking &&
        inView
      ) {
        const prelemImpressionObj = createPrelemImpression(analytics);
        const snowplowPrelemImpressionObj = snowplowPrelemImpression(analytics, secondaryArgs);
        handleImpression(IMPRESSIONS.PRELEM_IMPRESSION, prelemImpressionObj);
        handleTrack(IMPRESSIONS.TRACKID, snowplowPrelemImpressionObj);
        if (isMounted) {
          setEnableImpressionTracking(false);
        }
      }
    };

    performImpressions();

    return () => {
      isMounted = false;
    };
  }, [inView, analytics?.isAnalyticsEnabled]);
};

interface secondaryArgsObj {
  prelemImpressionSchema?: string;
  clickImpressionSchema?: string;
  sitename?: string;
  environment?: string;
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
