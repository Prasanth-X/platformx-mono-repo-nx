import { getRestApiCall, nullToObject, postRestApiCall } from "../../../utils/helperFns";

/**
 * courseId based get course fill details
 * post call
 */
export const getCourseDetailsApiCall = (courseId: string, secondaryArgs: any) => {
  const {
    prelemBaseEndpoint: {
      deliveryEndPoint = "https://marvericks.delivery.hcl-x.com/platform-x/",
      language = "en",
    } = {},
    sitename,
  } = secondaryArgs;
  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/course-model?path=${courseId}`,
    language,
    sitename,
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
  const { secondaryArgs = {}, userId = "" } = nullToObject(ele);
  const {
    prelemBaseEndpoint: {
      // deliveryEndPoint = "https://dev.users.hcl-x.com/platform-x/user-service/",
      language = "en",
    } = {},
    sitename,
  } = nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query { userCoursesList(user_id:${JSON.stringify(userId)}) {
      user_id 
      title 
      description 
      author 
      lessons 
      teaser 
      teaser_image 
      course_id 
      course_url 
      status
      created_at
      updated_at
    } } `,
  });
  return postRestApiCall(
    `https://dev.users.hcl-x.com/platform-x/user-service/`,
    data,
    language,
    sitename,
  );
};
