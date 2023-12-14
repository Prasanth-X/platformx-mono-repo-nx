import Analytics from 'analytics';

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
  if (provider === 'googleAnalytics') {
    // dynamicAnalyticsProviderList.googleAnalytics = (
    //   await import(`@analytics/google-analytics`)
    // ).default;
    pluginsArray[i] = dynamicAnalyticsProviderList.googleAnalytics({
      trackingId: data.trackingId,
    });
  }
  if (provider === 'googleTagManager') {
    dynamicAnalyticsProviderList.googleTagManager = (
      await import(`@analytics/google-tag-manager`)
    ).default;
    pluginsArray[i] = dynamicAnalyticsProviderList.googleTagManager({
      containerId: data.containerId,
    });
  }
  return pluginsArray;
};

export const analyticsInstance = async (data: IAnalytics) => {
  let analytics: unknown = {};
  let res: Array<any> = [];
  if (data?.provider instanceof Array) {
    data?.provider.map(async (item, i) => {
      res = await plugin(item, data, i);
    });
  } else {
    res = await plugin(data?.provider, data, 0);
  }

  analytics = Analytics({
    app: 'plateform-x-authoring-app',
    plugins: res,
  });

  return analytics;
};