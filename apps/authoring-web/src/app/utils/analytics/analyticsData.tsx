const Analytics = {
  provider: process.env?.REACT_APP_ANALYTICS_PROVIDER,
  trackingId: process.env?.REACT_APP_GA_ID,
  containerId: process.env?.REACT_APP_GTM_ID,
};

export default Analytics;
