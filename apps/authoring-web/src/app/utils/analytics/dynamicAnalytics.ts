import Analytics from 'analytics';
import snowplowPlugin from "@analytics/snowplow";
import googleAnalytics from "@analytics/google-analytics";
import googleTagManager from "@analytics/google-tag-manager";
import { SNOWPLOW } from '../../utils/constants';

interface IdynamicList {
  [key: string]: any;
}

interface IAnalytics {
  provider: any;
  trackingId?: string;
  containerId?: string;
}
const dynamicAnalyticsProviderList: IdynamicList = {};
const pluginsArray: Array<any> = [];

const plugin = async (provider: string, data: IAnalytics, i: number) => {
  const providerArr = provider.split(",");
  if (providerArr.includes("googleAnalytics")) {
    dynamicAnalyticsProviderList["googleAnalytics"] = (
      await import(`@analytics/google-analytics`)
    ).default;
    pluginsArray[i] = dynamicAnalyticsProviderList["googleAnalytics"]({
      trackingId: data.trackingId,
    });
  }
  if (providerArr.includes("googleTagManager")) {
    /* eslint-disable */
    dynamicAnalyticsProviderList["googleTagManager"] = (
      await import(`@analytics/google-tag-manager`)
    ).default;
    pluginsArray[i] = dynamicAnalyticsProviderList["googleTagManager"]({
      containerId: data.containerId,
    });
    if (providerArr.includes("snowplow")) {
      // Include Snowplow plugin configuration
      dynamicAnalyticsProviderList.snowplow = (await import(`@analytics/snowplow`)).default;
      pluginsArray.push(
        dynamicAnalyticsProviderList.snowplow({
          collectorUrl: "collector.hcl-x.com",
          trackerSettings: {
            appId: "x",
          },
        }),
      );
    }
  }
  console.log(pluginsArray, "pluginsArray");
  return pluginsArray;
};

export const analyticsInstance = async (data: IAnalytics) => {
  debugger
  const analyticsProviders = data?.provider instanceof Array ? data.provider : [data.provider];

  // const res = await Promise.all(analyticsProviders.map(async (item, i) => {
  //   return await plugin(item, data, i);
  // }));
  console.log("process.env?.NX_GA_ID", process.env?.NX_GTM_ID, process.env?.NX_GA_ID)
  const analytics = Analytics({
    app: SNOWPLOW.APP_NAME,
    debug: true,
    plugins: [
      googleAnalytics({
        measurementIds: [process.env?.NX_GA_ID],
      }),
      googleTagManager({
        containerId: process.env?.NX_GTM_ID,
      }),
      snowplowPlugin({
        name: SNOWPLOW.SNOWPLOW,
        collectorUrl: SNOWPLOW.COLLECTOR_URL,
        trackerSettings: {
          appId: SNOWPLOW.APP_ID,
        },
      }),

    ],
  });

  return analytics;
};
