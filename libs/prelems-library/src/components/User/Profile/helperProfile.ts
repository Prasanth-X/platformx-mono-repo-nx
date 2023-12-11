import { nullToObject, postRestApiCall } from "utils/helperFns";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
  type Key = "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit";
  function supportedValuesOf(input: Key): string[];
}

export const timeZoneData = () => {
  return Intl.supportedValuesOf("timeZone");
};

export const getUniqueTimeZone = () => {
  const aryIannaTimeZones = timeZoneData();
  const data: { label: string; time: string }[] = [];
  aryIannaTimeZones.forEach((timeZone) => {
    const strTime = new Date().toLocaleString([], {
      timeZone: `${timeZone}`,
      hour12: false,
    });
    const time = new Date(strTime).toTimeString().slice(0, -21);
    data.push({ label: `${timeZone} ${time}(IST)`, time: `${strTime}` });
  });
  return data;
};

/**
 * user details api call
 */
export const getUserDetailsService = (ele: any) => {
  const { secondaryArgs = {}, userId = "" } = nullToObject(ele);
  const {
    prelemBaseEndpoint: { language = "en", deliveryEndPoint = "", PublishEndPoint = "" } = {},
  } = nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query{
    viewProfile( user_id: ${JSON.stringify(userId)}
    )
     {
        user_id
        dob
        gender
        username
        enabled
        first_name
        last_name
        email
        timezone
        image
        phone
        role
        default_site
        preferred_sites_languages
        accessible_sites
        preferred_sites_urls
        }

    }`,
    variables: {},
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, PublishEndPoint);
};

/**
 * user details update api call
 */
export const updateUserDetailsService = (ele: any) => {
  const { secondaryArgs = {}, userId = "", userDetails = {} } = nullToObject(ele);
  const {
    prelemBaseEndpoint: { language = "en", deliveryEndPoint = "", PublishEndPoint = "" } = {},
  } = nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation ($input: updateRequest){
      updateUserProfile(input: $input) {    
      message
      }
  }`,
    variables: {
      input: {
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        timezone: userDetails.timezone,
        role_id: null,
        image: "",
        phone: userDetails.mobileNumber,
        enabled: true,
        id: userId,
        default_site: null,
        accessible_sites: null,
        preferred_sites_languages: userDetails.defaultLanguage || "en",
        preferred_sites_urls: null,
        dob: userDetails.dob,
        gender: userDetails.gender,
      },
    },
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, PublishEndPoint);
};
