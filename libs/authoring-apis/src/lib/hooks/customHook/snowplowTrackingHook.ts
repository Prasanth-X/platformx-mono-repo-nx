import { usePlatformAnalytics } from '@platformx/utilities';
import { SNOWPLOW } from '../../utils/constants';

// import usePlatformAnalytics from 'platform-x-utils/dist/analytics';

export const snowplowTrackingHook = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [handleTrack] = usePlatformAnalytics();

  const noValueFormatData = (value = '') => {
    return value ? value : SNOWPLOW.NA;
  };

  /**
   * user register schema
   * @param emailID string
   */
  const userRegisterImpression = (ele: any = {}) => {
    const { email = '', gender = '' } = ele;
    const snowplowRegisterObj = {
      schema: process.env?.REACT_APP_USER_REGISTER_SCHEMA,
      data: {
        eventType: SNOWPLOW.IMPRESSIONTYPE,
        age: SNOWPLOW.NA,
        userId: noValueFormatData(email),
        gender: noValueFormatData(gender),
        registrationMode: SNOWPLOW.NA,
        registrationFrom: SNOWPLOW.REGISTERFROM,
        continent: SNOWPLOW.NA,
        country: SNOWPLOW.NA,
        state: SNOWPLOW.NA,
        city: SNOWPLOW.NA,
      },
    };
    handleTrack(SNOWPLOW.TRACKID, snowplowRegisterObj);
  };
  return { userRegisterImpression };
};
