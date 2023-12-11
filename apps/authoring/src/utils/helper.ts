import { UserSession } from '../hooks/useUserSession/useUserSession';

export const hasOwnProp = (obj: object, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
export function isEmpty(obj) {
  return Object.keys(obj).length > 0;
}
export const formatPageUrl = (url) => {
  let tmp = url?.toLowerCase();
  tmp = tmp.replace(/\s/g, '');
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, '');
  return tmp;
};

export const createSession = (userSession, isActive = false, role: string) => {
  return {
    isActive: isActive,
    role: role,
    permissions: userSession?.permissions,
    userInfo: userSession,
  } as UserSession;
};

export const getStyleString = (styles) =>
  Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join('; ');

/**
* string to parse convert
* @param urijson
* @returns object
*/
export const uriToJSON = (urijson) => {
  if (urijson) {
    return JSON.parse(urijson);
  }
  return {};
};

/**
 * fallBack image
 */
export const defaultFalBackImage = () => {
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  return `${gcpUrl}/${BucketName}/${defaultImage}`;
};
