import { useState, useEffect } from "react";
import { IMPRESSIONS } from "./constants";
import usePlatformAnalytics from "../../analytics/index";
import { createPrelemImpression } from "./helper";

export const usePrelemImpression = (analytics: Analytics, inView: boolean) => {
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const [handleImpression] = usePlatformAnalytics();

  useEffect(() => {
    if (
      !analytics?.isAuthoring &&
      analytics?.isAnalyticsEnabled &&
      enableImpressionTracking &&
      inView
    ) {
      const prelemImpressionObj = createPrelemImpression(analytics);
      handleImpression(IMPRESSIONS.PRELEM_IMPRESSION, prelemImpressionObj);
      setEnableImpressionTracking(false);
    }
  }, [inView, analytics?.isAnalyticsEnabled]);
};

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
