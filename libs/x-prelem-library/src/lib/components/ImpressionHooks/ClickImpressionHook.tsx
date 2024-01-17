import { createClickImpression, snowplowPrelemClickImpression } from "./helper";
import { IMPRESSIONS } from "./constants";
import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics/index";

export const useClickImpression = () => {
  const [handleTrack] = usePlatformAnalytics();
  const triggerClickAnalytics = (
    url: string,
    index: number,
    analytics: Analytics,
    secondaryArgs: SecondaryArgs,
    contentTitle?: string,
    contentType?: string,
  ) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: index + 1,
        contentType: contentType,
        contentTitle: contentTitle,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
    }
  };

  const triggerClickAnalyticsForContentType = (
    analytics: Analytics,
    secondaryArgs: SecondaryArgsForContent,
  ) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const buttonClickImpressionObj = createClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        undefined,
        undefined,
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        undefined,
        undefined,
      );
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, buttonClickImpressionObj);
    }
  };
  return { triggerClickAnalytics, triggerClickAnalyticsForContentType };
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

interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState: boolean;
  bucketName: string;
  gcpUrl: string;
  sitename?: string;
}
interface SecondaryArgsForContent {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl: string;
  bucketName: string;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
  language?: string;
}
