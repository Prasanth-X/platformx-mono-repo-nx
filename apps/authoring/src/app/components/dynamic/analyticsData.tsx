const Analytics = {
  provider: process.env?.NX_ANALYTICS_PROVIDER,
  trackingId: process.env?.NX_GA_ID,
  containerId: process.env?.NX_GTM_ID,
};

export default Analytics;
