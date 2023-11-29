import { nullToObject, putRestApiCall } from "utils/helperFns";

export const changePasswordServiceCall = (ele: any) => {
  const { secondaryArgs = {}, userDetails = {} } = nullToObject(ele);
  const {
    prelemBaseEndpoint: { language = "en", deliveryEndPoint = "", PublishEndPoint = "" } = {},
  } = nullToObject(secondaryArgs);

  const data = {
    currentPassword: userDetails.oldPassword,
    newPassword: userDetails.newPassword,
  };
  return putRestApiCall(`${deliveryEndPoint}user/change-password`, data, language, PublishEndPoint);
};
