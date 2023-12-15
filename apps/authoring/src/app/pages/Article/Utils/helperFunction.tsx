import { t } from 'i18next';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import i18n from '../../../service/i18n';
import { authInfo } from '../../../utils/authConstants';
import {
  dateFormat,
  getSubDomain,
  handleHtmlTags,
  trimString,
} from '../../../utils/helperFunctions';

export const handleTagOnChange = (
  event,
  tagArr,
  setTagArr,
  tagArrRef,
  socialOgTags,
  setSocialOgTags
) => {
  let tagsArray = [...tagArr] || [];

  if (event.target.checked && tagsArray?.length > 14) {
    event.target.checked = false;
    showToastError(t('allowed_tags_toast'));
  } else {
    if (event.target.checked) {
      tagsArray = [...tagArr, event.target.value];
    } else {
      tagsArray.splice(tagArr.indexOf(event.target.value), 1);
    }
    setTagArr(tagsArray);
    tagArrRef.current = {
      ...tagArrRef.current,
      tags: tagsArray,
    };
    setSocialOgTags({ ...socialOgTags, tagsSocialShare: tagsArray });
    //   unsavedChanges.current = true;
  }
};
export const articleInitialObj = (username) => {
  const newArticle = {
    CommonFields: {
      page: '',
      title: '',
      description: '',
      category: 'Article',
      site_name: 'PlatX',
      parent_page_url: '/',
      current_page_url: '',
      developedby: username,
      page_state: '',
      is_edit: false,
      seo_enable: true,
      analytics_enable: true,
      robot_txt: false,
      sitemap: false,
      analytics: '',
      others: '',
      structure_data: '',
      createdBy: username,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      tags: [],
      page_createdby: username,
      page_lastmodifiedby: username,
      settings: {},
    },
    ObjectFields: {
      page_name: '',
      banner: '',
      sub_title: '',
      content_type: 'Article',
      page_tags: [],
      link_tags: [],
      article_content: {},
      tag: [],
      links: [],
      published_images: [],
      original_image: {},
    },
  };
  return newArticle;
};
export const updateImageData = (
  obj,
  content,
  setState,
  state,
  selectedImage
) => {
  const { published_images, original_image } = obj || {};
  // const { Thumbnail: url, bitStreamId, auto } = originalImg || {};
  const banner = content?.Url;
  const sub_title = selectedImage?.Title;
  console.log('call', content?.Url);
  // const original_image = {
  //   url,
  //   bitStreamId,
  //   auto,
  // };
  setState({
    ...state,
    CommonFields: {
      ...state.CommonFields,
      settings: {
        ...state.CommonFields.settings,
        socialog_image: selectedImage?.Thumbnail,
      },
    },
    ObjectFields: {
      ...state.ObjectFields,
      banner,
      published_images,
      original_image,
      sub_title,
    },
  });
};
export const resetImageSelected = (setContent, setSelectedImage) => {
  setContent({
    Url: '',
    Title: '',
    Description: '',
    bitStreamId: '',
  });
  setSelectedImage({
    Thumbnail: '',
    Title: '',
    Description: '',
    bitStreamId: '',
  });
};
export const handleImage = (
  image,
  setSelectedImage,
  setContent,
  setShowMediaOption,
  setArticleInstance,
  articleInstance
) => {
  setSelectedImage(image);

  setContent({
    Url: image.Thumbnail,
    Title: image.Title,
    Description: image.Description,
    bitStreamId: image.bitStreamId,
  });
  setShowMediaOption(true);
  setArticleInstance({
    ...articleInstance,
    ObjectFields: {
      ...articleInstance.ObjectFields,
      banner: image.Thumbnail,
    },
  });
  // updateField({ Banner: image.Thumbnail });
  // handleEnableArticlePreview('banner', image.Thumbnail);
};
export const updateStructureData = (content, banner, keywords, pageUrl) => {
  let articleStructureData = {};
  articleStructureData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: trimString(handleHtmlTags(content?.title), 100),
    Description: trimString(handleHtmlTags(content?.description), 200),
    keywords: keywords,
    image: banner,
    url: `${getSubDomain()}/${i18n.language}/` + `article/${pageUrl}`,
    datePublished: dateFormat(new Date().toISOString()),
    dateModified: dateFormat(new Date().toISOString()),
    author: [
      {
        '@type': 'Person',
        name: content.page_createdby,
      },
    ],
  };

  return articleStructureData;
};
export const validateDetails = (
  isPublish = false,
  articleInstance,
  tagArrRef
) => {
  const articleCommonFields = articleInstance?.CommonFields || {};
  const articleObjectFields = articleInstance?.ObjectFields || {};
  const { title, description } = articleCommonFields;
  const { banner } = articleObjectFields || {};
  const tags = JSON.parse(JSON.stringify(tagArrRef.current));
  console.log('tags', tags);

  if (banner?.length <= 0) {
    showToastError(t('banner_error'));
    return true;
  } else if (title.length <= 0) {
    showToastError(`${t('title')} ${t('is_required')}`);
    return true;
  } else if (description.length <= 0) {
    showToastError(`${t('description')} ${t('is_required')}`);
    return true;
  } else if (isPublish && tags.tags.length <= 0) {
    showToastError(t('tag_error'));
    return true;
  } else {
    return false;
  }
};
export const updateSettings = (
  pageUrl = '',
  articleInstance,
  tagArrRef,
  socialOgTags
) => {
  const articleCommonFields = articleInstance?.CommonFields || {};
  const articleObjectFields = articleInstance?.ObjectFields || {};
  const { title, description, settings } = articleCommonFields;
  const { socialog_title, socialog_description, socialog_image } =
    settings || {};
  const tags = JSON.parse(JSON.stringify(tagArrRef.current));
  const articleSettings = {
    socialog_url:
      `${getSubDomain()}/${i18n.language}/` + `article` + `/${pageUrl}`,
    socialog_twitter_url:
      `${getSubDomain()}/${i18n.language}/` + `article` + `/${pageUrl}`,
    socialog_type: 'article',
    socialog_sitename: title
      ? trimString(handleHtmlTags(title), 100)
      : 'article',
    seo_title: title ? trimString(handleHtmlTags(title), 100) : '',
    socialog_title: socialog_title
      ? trimString(handleHtmlTags(socialog_title), 100)
      : '',
    socialog_twitter_title: socialog_title
      ? trimString(handleHtmlTags(socialog_title), 100)
      : '',
    socialog_description: socialog_description
      ? trimString(handleHtmlTags(socialog_description), 163)
      : '',
    socialog_twitter_description: socialog_description
      ? trimString(handleHtmlTags(socialog_description), 163)
      : '',
    socialog_image: socialog_image,
    socialog_twitter_image: socialog_image,
    keywords: socialOgTags.tagsSocialShare,
    seo_keywords: tags.tags,
    seo_description: description
      ? trimString(handleHtmlTags(description), 163)
      : '',
    seo_blockIndexing: true,
  };
  return articleSettings;
};
export const requestToSendArticle = (
  pageState,
  pageUrl,
  IsDuplicate,
  articleInstance,
  tagArrRef,
  socialOgTags,
  updateStructureDataArticle,
  username
) => {
  const newTempData = JSON.parse(JSON.stringify(articleInstance));
  const tags = JSON.parse(JSON.stringify(tagArrRef.current));
  const structureData =
    articleInstance?.CommonFields?.structure_data !== ''
      ? articleInstance.CommonFields.structure_data
      : JSON.stringify(updateStructureDataArticle());
  const settings = updateSettings(
    pageUrl,
    articleInstance,
    tagArrRef,
    socialOgTags
  );
  const articleSettings = JSON.parse(JSON.stringify(settings));
  const createArticleRequest = {
    ...newTempData,
    CommonFields: {
      ...newTempData.CommonFields,
      page: pageUrl,
      page_state: pageState,
      structure_data: structureData,
      IsConfirm: IsDuplicate,
      tags: tags.tags,
      current_page_url: `/${pageUrl}`,
      parent_page_url: '/',
      settings: articleSettings,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      page_createdby: username,
      page_lastmodifiedby: username,
      createdBy: username,
    },
    ObjectFields: {
      ...newTempData.ObjectFields,
    },
  };
  return createArticleRequest;
};
