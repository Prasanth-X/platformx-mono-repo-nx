const gcpUrl = process.env.NX_GCP_URL;
const BucketName = process.env.NX_BUCKET_NAME;
const defaultImage = process.env.NX_DEFAULT_IMAGE;

// export const DEFAULT_EMBED_IMAGE =
//   'https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3e74f70e-7064-4bc9-a9a1-40ba01ecbef9/content';
export const DEFAULT_EMBED_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;
export const DEFAULT_SOCIAL_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;
