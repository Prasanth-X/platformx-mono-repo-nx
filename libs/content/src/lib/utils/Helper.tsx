import { ContentType } from '../enums/ContentType';
import { DEFAULT_EMBED_IMAGE, DEFAULT_SOCIAL_IMAGE } from './Constants';
export const relativeImageURL = (url: string) => {
  const gcpUrl = process.env.NX_GCP_URL;
  const bucketName = process.env.NX_BUCKET_NAME;
  if (url?.includes('dam')) {
    // this if condition will be removed after relative img for all content type
    return url;
  }
  return url ? `${gcpUrl}/${bucketName}/${url}` : '';
};
export const getEmbedTempData = (selectedContent: any) => {
  const { original_image } = selectedContent;
  const relativeUrl = `${original_image?.original_image_relative_path}.${original_image?.ext}`;
  const embedTempData = {
    Title: selectedContent?.title,
    Description: selectedContent?.description,
    Thumbnail:
      selectedContent?.tag_name?.toLowerCase() === ContentType.Quiz ||
        selectedContent?.tag_name?.toLowerCase() === ContentType.Poll ||
        selectedContent?.tag_name?.toLowerCase() === ContentType.Article ||
        selectedContent?.tag_name?.toLowerCase() === ContentType.Event
        ? relativeImageURL(relativeUrl)
        : selectedContent?.thumbnail_image
          ? selectedContent?.thumbnail_image
          : DEFAULT_EMBED_IMAGE,
    Author: selectedContent?.createdBy,
    lastModifiedDate: selectedContent?.creationDate,
    Page: selectedContent?.page,
    colorCode:
      selectedContent?.tag_name?.toLowerCase() === ContentType.Poll &&
        selectedContent?.background_content?.Color
        ? selectedContent?.background_content?.Color
        : '',
  };

  return embedTempData;
};

export const getSocialShareData = (selectedContent: any) => {
  const socialShareData = {
    Title: selectedContent?.title,
    Description: selectedContent?.description,
    Page: selectedContent?.page,
    PageSettings: {
      SocialOgTitle: selectedContent?.title,
      SocialOgImage:
        selectedContent?.tag_name === 'Quiz'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : DEFAULT_SOCIAL_IMAGE
          : selectedContent?.tag_name === 'Poll'
            ? selectedContent?.settingsProperties?.socialog_image
              ? selectedContent?.settingsProperties?.socialog_image
              : DEFAULT_SOCIAL_IMAGE
            : selectedContent?.thumbnail_image
              ? selectedContent?.thumbnail_image
              : '',
      SocialOgDescription: selectedContent?.description,
    },
    Caption: '',
    ShareType: '',
    ScheduleDate: '',
    NetworkType: '',
    postURL: '',
    contentType: selectedContent?.contentType,
    reSchedulePostUrl: '',
    Thumbnail:
      selectedContent?.tag_name === 'Quiz'
        ? selectedContent?.settingsProperties?.socialog_image
          ? selectedContent?.settingsProperties?.socialog_image
          : DEFAULT_SOCIAL_IMAGE
        : selectedContent?.tag_name === 'Poll'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : DEFAULT_SOCIAL_IMAGE
          : selectedContent?.thumbnail_image
            ? selectedContent?.thumbnail_image
            : DEFAULT_SOCIAL_IMAGE,
    CurrentPageURL: selectedContent?.current_page_url,
  };
  return socialShareData;
};
