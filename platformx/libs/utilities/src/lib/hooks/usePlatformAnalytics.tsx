import { useAnalytics } from 'use-analytics';

/* eslint-disable no-console */
const usePlatformAnalytics = () => {
  const { track, page, identify } = useAnalytics() || {};

  const handleTrack = (e: any, payload: any) => {
    track && track(e, payload);
    console.log('handleTrack--', e, '>>', payload);
  };

  const handleImpression = (e: any, payload: any) => {
    track && track(e, payload);
    console.log('handleImpression--', e, '>>', payload);
  };

  const handlePage = (e: any, payload: any) => {
    page && page(e, payload);
    console.log('handlePage--', e, '>>', payload);
  };

  const handleIdentify = (e: any, payload: any) => {
    identify && identify(e, payload);
    console.log('handleIdentify--', e, '>>', payload);
  };

  return [handleTrack, handleImpression, handlePage, handleIdentify];
};

export default usePlatformAnalytics;
