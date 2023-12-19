const AUTH_INFO = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  realm: process.env.REACT_APP_REALM,
  grantType: process.env.REACT_APP_GRANT_TYPE,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  publishUri: process.env.REACT_APP_PUBLISH_URI,
  dspaceUri: process.env.REACT_APP_DSPACE_URI,
  dspaceImagesUuid:
    localStorage.getItem('imageUuid') ||
    process.env.REACT_APP_DSPACE_IMAGES_UUID,
  dspaceVideosUuid:
    localStorage.getItem('videoUuid') ||
    process.env.REACT_APP_DSPACE_VIDEOS_UUID,
  gcpUri: process.env.REACT_APP_GCP_URL,
  gcpBucketName: process.env.REACT_APP_BUCKET_NAME,
};

const LOGOUT_URL = `${process.env.REACT_APP_API_URI}auth/logout?redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&client_id=${process.env.REACT_APP_CLIENT_ID}&tenant_id=${process.env.REACT_APP_REALM}`;
const AUTH_URL = `${process.env.REACT_APP_KEYCLOAK_URI}/auth/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REDIRECT_AUTH_URL = `${process.env.REACT_APP_KEYCLOAK_URI}/auth/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&prompt=login&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const NEW_LOGOUT_URL = `${process.env.REACT_APP_KEYCLOAK_URI}/auth/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

export { AUTH_INFO, LOGOUT_URL, AUTH_URL, REDIRECT_AUTH_URL, NEW_LOGOUT_URL };
