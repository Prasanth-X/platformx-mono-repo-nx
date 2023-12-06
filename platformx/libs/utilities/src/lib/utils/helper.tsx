/* eslint-disable no-console */
import { getRestApiCall, nullToObject, postRestApiCall } from './helperFns';

/**
 * courseId based get course fill details
 * post call
 */
export const getCourseDetailsApiCall = (
  courseId: string,
  secondaryArgs: any
) => {
  const {
    prelemBaseEndpoint: { deliveryEndPoint = '', language = 'en' } = {},
    sitename,
  } = secondaryArgs;
  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/course-model?path=${courseId}`,
    language,
    sitename
  );
  // return getRestApiCall(
  //   `https://marvericks.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/course-model?path=108058619401306`
  // );
};

/**
 * courseId based get course fill details
 * post call
 */
export const getLearningListApiCall = (ele: any) => {
  const { secondaryArgs = {}, userId = '' } = nullToObject(ele);
  const {
    prelemBaseEndpoint: {
      // deliveryEndPoint = "https://dev.users.hcl-x.com/platform-x/user-service/",
      userDeliveryEndPoint = '',
      language = 'en',
    } = {},
    sitename,
  } = nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query{getuserCourses(user_id:${JSON.stringify(userId)})}`,
    variables: {},
  });

  return postRestApiCall(userDeliveryEndPoint, data, language, sitename);
};

/**
 * courseId based get course fill details
 * post call
 */
export const getDynamicContentListApiCall = async (ele: any) => {
  const { secondaryArgs = {}, start, numberOfRows, params } = nullToObject(ele);
  const {
    prelemBaseEndpoint: { deliveryEndPoint = '', language = 'en' } = {},
    sitename,
  } = nullToObject(secondaryArgs);
  const localStorageData = localStorage.getItem('OfferName');
  const cdpfilter = localStorageData ? JSON.parse(localStorageData).data : [];
  // Define the deliveryEndPoint based on the condition
  const { tags = [], filter = 'ALL', searchTerm = '' } = params;
  const obj: String = `{pagination:{start:${start},rows:${numberOfRows}},searchTerm:${JSON.stringify(
    searchTerm
  )},tags:${JSON.stringify(tags)},cdpFilter:${JSON.stringify(
    cdpfilter
  )},filter:${filter},isSuggestive:false}`;
  const { data: { data: { fetchEcomProducts = [] } = {} } = {} } =
    await getRestApiCall(
      `${deliveryEndPoint}api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
      // `https://dev.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
      language,
      sitename
    );
  return fetchEcomProducts;
};

/**
 * user details update api call
 */
export const updateUserFormDetailsService = (ele: any) => {
  const { secondaryArgs = {}, userDetails = {} } = nullToObject(ele);
  const {
    prelemBaseEndpoint: {
      usersEndPoint = '',
      language = 'en',
      PublishEndPoint = '',
    } = {},
  } = nullToObject(secondaryArgs);
  const data = {
    input: {
      email: userDetails.emailAddress,
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      phone: userDetails.phoneNumber,
      company_name: userDetails.companyName,
      country: userDetails.country,
      message: userDetails.message,
    },
  };
  return postRestApiCall(
    `${usersEndPoint}contact_us/save`,
    data,
    language,
    PublishEndPoint
  );
};
