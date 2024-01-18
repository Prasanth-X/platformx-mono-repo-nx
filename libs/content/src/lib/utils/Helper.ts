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

export const quizResponseMapper = (res, quizState, tempArray) => {

  return {
    ...quizState,
    title: res?.data?.authoring_getCmsContentByPath?.title,
    short_title: res?.data?.authoring_getCmsContentByPath?.short_title,
    short_description: res?.data?.authoring_getCmsContentByPath?.short_description,
    description: res?.data?.authoring_getCmsContentByPath?.description,
    imagevideoURL: res?.data?.authoring_getCmsContentByPath?.background_content?.Url,
    questions: tempArray,
    // questions: res?.data?.authoring_getCmsContentByPath?.questions.length>0 ? [...quizState.questions,{current_page_url:res?.data?.authoring_getCmsContentByPath?.questions}]:quizState.questions,
    scoreBy: res?.data?.authoring_getCmsContentByPath?.display_scores,
    tags: res?.data?.authoring_getCmsContentByPath?.tags,
    result_range_1: res?.data?.authoring_getCmsContentByPath?.result_range_1,
    result_range_2: res?.data?.authoring_getCmsContentByPath?.result_range_2,
    result_range_3: res?.data?.authoring_getCmsContentByPath?.result_range_3,
    result_range_4: res?.data?.authoring_getCmsContentByPath?.result_range_4,
    original_image: res?.data?.authoring_getCmsContentByPath?.original_image,
    published_images: res?.data?.authoring_getCmsContentByPath?.published_images,
    is_schedule_publish:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.is_schedule_publish,
    is_schedule_unpublish:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.is_schedule_unpublish,
    schedule_publish_datetime:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties
        ?.schedule_publish_datetime,
    schedule_unpublish_datetime:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties
        ?.schedule_unpublish_datetime,
    socialShareImgURL:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_image,
    titleSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_title,
    descriptionSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_description,
    tagsSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.keywords,
    structure_data: res?.data?.authoring_getCmsContentByPath?.structure_data,
    seo_enable: res?.data?.authoring_getCmsContentByPath?.seo_enable,
    analytics_enable: res?.data?.authoring_getCmsContentByPath?.analytics_enable,
    createdBy: res?.data?.authoring_getCmsContentByPath?.createdBy,
  };
};

export const getCurrentQuiz = (res,) => {
  return {
    title: res?.data?.authoring_getCmsContentByPath?.title,
    short_title: res?.data?.authoring_getCmsContentByPath?.short_title,
    short_description: res?.data?.authoring_getCmsContentByPath?.short_description,
    description: res?.data?.authoring_getCmsContentByPath?.description,
    imagevideoURL: res?.data?.authoring_getCmsContentByPath?.background_content?.Url,
    tags: res?.data?.authoring_getCmsContentByPath?.tags,
    titleSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_title,
    descriptionSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_description,
    socialShareImgURL:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_image,
    tagsSocialShare:
      res?.data?.authoring_getCmsContentByPath?.settingsProperties?.keywords,
  };
};