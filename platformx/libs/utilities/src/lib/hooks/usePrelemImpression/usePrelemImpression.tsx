import { useState, useEffect } from 'react';
import usePlatformAnalytics from '../usePlatformAnalytics';
import { Analytics, secondaryArgsObj } from './usePrelemImpression.types';
import { createPrelemImpression, snowplowPrelemImpression } from './helper';
import { IMPRESSIONS } from './constants';

export const usePrelemImpression = (
  analytics: Analytics,
  inView: boolean,
  secondaryArgs: secondaryArgsObj
) => {
  const [enableImpressionTracking, setEnableImpressionTracking] =
    useState(true);
  const [handleImpression, handleTrack] = usePlatformAnalytics();

  useEffect(() => {
    if (
      !analytics?.isAuthoring &&
      analytics?.isAnalyticsEnabled &&
      enableImpressionTracking &&
      inView
    ) {
      const prelemImpressionObj = createPrelemImpression(analytics);
      const snowplowPrelemImpressionObj = snowplowPrelemImpression(
        analytics,
        secondaryArgs
      );
      handleImpression(IMPRESSIONS.PRELEM_IMPRESSION, prelemImpressionObj);
      handleTrack(IMPRESSIONS.TRACKID, snowplowPrelemImpressionObj);
      setEnableImpressionTracking(false);
    }
  }, [inView, analytics?.isAnalyticsEnabled]);
};
