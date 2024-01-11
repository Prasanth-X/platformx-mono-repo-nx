const AUTH_INFO = {
  clientId: process.env.NX_CLIENT_ID,
  realm: process.env.NX_REALM,
  grantType: process.env.NX_GRANT_TYPE,
  redirectUri: process.env.NX_REDIRECT_URI,
  publishUri: process.env.NX_PUBLISH_URI,
  dspaceUri: process.env.NX_DSPACE_URI,
  dspaceImagesUuid:
    localStorage.getItem('imageUuid') || process.env.NX_DSPACE_IMAGES_UUID,
  dspaceVideosUuid:
    localStorage.getItem('videoUuid') || process.env.NX_DSPACE_VIDEOS_UUID,
  gcpUri: process.env.NX_GCP_URL,
  gcpBucketName: process.env.NX_BUCKET_NAME,
};

const LOGOUT_URL = `${process.env.NX_API_URI}auth/logout?redirect_uri=${process.env.NX_REDIRECT_URI}&client_id=${process.env.NX_CLIENT_ID}&tenant_id=${process.env.NX_REALM}`;
const AUTH_URL = `${process.env.NX_KEYCLOAK_URI}/auth/realms/${process.env.NX_REALM}/protocol/openid-connect/auth?client_id=${process.env.NX_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NX_REDIRECT_URI}`;
const REDIRECT_AUTH_URL = `${process.env.NX_KEYCLOAK_URI}/auth/realms/${process.env.NX_REALM}/protocol/openid-connect/auth?client_id=${process.env.NX_CLIENT_ID}&prompt=login&response_type=code&redirect_uri=${process.env.NX_REDIRECT_URI}`;
const NEW_LOGOUT_URL = `${process.env.NX_KEYCLOAK_URI}/auth/realms/${process.env.NX_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.NX_REDIRECT_URI}`;

export { AUTH_INFO, AUTH_URL, LOGOUT_URL, NEW_LOGOUT_URL, REDIRECT_AUTH_URL };
