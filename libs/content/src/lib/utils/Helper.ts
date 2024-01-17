/* eslint-disable @typescript-eslint/no-namespace */

import { ContentType } from '../enums/ContentType';
import { DEFAULT_EMBED_IMAGE, DEFAULT_SOCIAL_IMAGE } from './Constants';
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

export const onBackButtonEvent = (e, unsavedChanges, setDialogOpen, navigateTo) => {
  e.preventDefault();
  window.history.pushState(null, "", window.location.pathname + window.location?.search);
  if (unsavedChanges) {
    setDialogOpen(true);
  } else {
    return;
  }
};
export const unloadCallback = (event, unsavedChanges) => {
  event.preventDefault();
  if (unsavedChanges) {
    event.returnValue = "";
    return "";
  }
};
export const updateStructureData = (content) => {
  const QuizStructureData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: content.title,
    description: content.description,
    hasPart:
      content.questions?.length > 0
        ? content.questions?.map(({ question, options_compound_fields }: any) => {
          return {
            "@type": "Question",
            name: question,
            suggestedAnswer:
              options_compound_fields?.length > 0
                ? options_compound_fields.map(({ option_id, option_text }: any) => {
                  return {
                    "@type": "Answer",
                    text: option_text,
                  };
                })
                : "",
          };
        })
        : "",
  };
  return QuizStructureData;
};
export const buildStructureData = (content) => {
  const { title = "", description = "", questions = [] } = content;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: title,
    description: description,
    hasPart:
      questions?.length > 0
        ? questions?.map(({ question, options_compound_fields }: any) => {
          return {
            "@type": "Question",
            name: question,
            suggestedAnswer:
              options_compound_fields?.length > 0
                ? options_compound_fields.map(({ option_text }: any) => {
                  return {
                    "@type": "Answer",
                    text: option_text,
                  };
                })
                : "",
          };
        })
        : [],
  };
  return structuredData;
};

export const relativeImageURL = (url) => {
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const bucketName = process.env.REACT_APP_BUCKET_NAME;
  if (url?.includes("dam")) {
    // this if condition will be removed after relative img for all content type
    return url;
  }
  return url ? `${gcpUrl}/${bucketName}/${url}` : "";
};


