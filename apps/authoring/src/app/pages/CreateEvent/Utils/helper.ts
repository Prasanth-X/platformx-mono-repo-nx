import { getSubDomain } from '../../../utils/helperFunctions';
import {
  AnalyticsRef,
  EventDataType,
  EventInstance,
  EventWhole,
  SelectedImage,
  SeoInfoType,
  SeoRef,
} from '../CreateEvent.types';
import { useTranslation } from 'react-i18next';

/**
 *
 * @param val any
 * @returns boolean
 */
export const emptyHandle = (val: any = '') => {
  return val !== '' ? true : false;
};

export const analyticInputDefaultData: AnalyticsRef = {
  analyticsInput: { eventAnalytics: true, eventContentInsight: false },
};

export const seoInputDefaultData: SeoRef = {
  seoInput: { seoEnabled: true, seoShared: false },
};

export const SeoInfo: SeoInfoType = {
  showContent: true,
  share: false,
  structureData: {},
};

export const DefEvent: EventWhole = {
  imagevideoURL: '',
  title: '',
  description: '',
  short_title: '',
  short_description: '',
  tags: [],
  page: '',
  imageUrl: '',
  socialShareImgURL: '',
  short_titleSocialShare: '',
  short_descriptionSocialShare: '',
  tagsSocialShare: '',
};

export const EventData: EventDataType = {
  title: '',
  short_title: '',
  short_description: '',
  description: '',
  imageUrl: '',
  socialShareImgURL: '',
  short_titleSocialShare: '',
  short_descriptionSocialShare: '',
  tagsSocialShare: [],
  analytics_enable: true,
  impression: true,
  contentInsight: false,
  seo_enable: true,
  seoShared: true,
  tags: [],
  is_schedule_publish: false,
  schedule_publish_datetime: '',
  is_schedule_unpublish: false,
  schedule_unpublish_datetime: '',
  webLink: '',
  address: '',
  locality: '',
  postalCode: '',
  regionState: '',
  country: '',
};

export const SelectedImageData: SelectedImage = {
  Thumbnail: '',
  title: '',
  description: '',
};

export const getNewEvent = (username): EventInstance => {
  const newEvent = {
    CommonFields: {
      page: '',
      title: '',
      tag_name: 'Event',
      category: 'Event',
      site_name: 'PlatX',
      page_state: '',
      description: '',
      short_description: '',
      is_edit: false,
      seo_enable: true,
      analytics_enable: true,
      robot_txt: false,
      sitemap: false,
      analytics: '',
      short_title: '',
      others: '',
      structure_data: '',
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      tags: [],
      createdBy: username,
      parent_page_url: '/',
      current_page_url: '',
      page_lastmodifiedby: username,
      settings: {},
      IsConfirm: false,
    },
    ObjectFields: {
      background_content: {
        ext: '',
        objectType: 'image',
        Url: '',
        Title: '',
        Thumbnail: '',
        Color: '',
      },
      thumbnail_image: '',
      banner_image: '',
      actual_address: '',
      virtual_address: '',
      google_api_address: '',
    },
  };
  return newEvent;
};

export const getEventToSend = (
  eventState,
  newTempData,
  updateTempObj,
  pageState,
  structureData,
  IsDuplicate
) => {
  const tempObjField = {
    background_content: {
      objectType: 'image',
      ext: eventState?.original_image?.ext || '',
      Url: eventState?.original_image.original_image_relative_path,
      Title: '',
      Thumbnail: eventState?.original_image.original_image_relative_path,
      Color: '',
    },
    thumbnail_image: eventState?.imageUrl,
    banner_image: eventState?.imageUrl,
    actual_address: eventState?.address,
    ...(eventState?.event_end_date
      ? { event_end_date: eventState?.event_end_date }
      : {}),
    ...(eventState?.event_start_date
      ? { event_start_date: eventState?.event_start_date }
      : {}),
    virtual_address: eventState?.webLink,
    locality: eventState?.locality,
    postal_code: eventState?.postalCode,
    region_state: eventState?.regionState,
    country: eventState?.country,
    google_api_address: 'www.google.com',
    original_image: eventState?.original_image,
    published_images: eventState?.published_images,
  };

  const eventToSend = {
    ...newTempData,
    CommonFields: {
      ...(newTempData?.CommonFields || {}),
      ...updateTempObj.current,
      page_state: pageState,
      structure_data: JSON.stringify(structureData),
      IsConfirm: IsDuplicate,
      seo_enable: eventState?.seo_enable,
      analytics_enable: eventState?.analytics_enable,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
    },
    ObjectFields: {
      ...(newTempData?.ObjectFields || {}),
      ...tempObjField,
    },
  };

  return eventToSend;
};

export const getUpdateEvent = (
  eventState,
  newTempData,
  updateTempObj,
  pageState,
  structureData,
  username,
  currentEventData,
  draftPageURL
) => {
  const tempObjField = {
    background_content: {
      objectType: 'image',
      ext: eventState?.original_image?.ext || '',
      Url: eventState?.original_image.original_image_relative_path,
      Title: '',
      Thumbnail: eventState?.original_image.original_image_relative_path,
      Color: '',
    },
    thumbnail_image: eventState?.imageUrl,
    banner_image: eventState?.imageUrl,
    actual_address: eventState?.address,
    ...(eventState?.event_end_date
      ? { event_end_date: eventState?.event_end_date }
      : {}),
    ...(eventState?.event_start_date
      ? { event_start_date: eventState?.event_start_date }
      : {}),
    virtual_address: eventState?.webLink,
    locality: eventState?.locality,
    postal_code: eventState?.postalCode,
    region_state: eventState?.regionState,
    country: eventState?.country,
    google_api_address: 'www.google.com',
    original_image: eventState?.original_image,
    published_images: eventState?.published_images,
  };
  const updateEventToSend = {
    CommonFields: {
      ...(newTempData?.CommonFields || {}),
      ...updateTempObj.current,
      page_state: pageState,
      structure_data: JSON.stringify(structureData),
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      createdBy: username,
      page_lastmodifiedby: username,
      current_page_url: `/${
        currentEventData.current !== ''
          ? currentEventData.current
          : draftPageURL
      }`,
      page: draftPageURL ? draftPageURL : currentEventData.current,
      parent_page_url: '/',
      seo_enable: eventState?.seo_enable,
      analytics_enable: eventState?.analytics_enable,
    },
    ObjectFields: {
      ...(newTempData?.ObjectFields || {}),
      ...tempObjField,
    },
  };

  return updateEventToSend;
};

export const getTempObj = (data, contentObj, eventState) => {
  const {
    title,
    short_title: shortTitle,
    short_description: shortDesc,
    description,
    tags,
    settingsProperties,
    banner_image: imageUrl,
    event_start_date: startDate,
    event_end_date: endDate,
    virtual_address: webLink,
    locality: locality,
    postal_code: postalCode,
    region_state: regionState,
    country: country,
    actual_address: address,
    original_image,
    published_images,
  } = contentObj;

  const tempObj = {
    ...eventState,
    title: title,
    short_title: shortTitle,
    short_description: shortDesc,
    description: description,
    imageUrl: imageUrl,
    tags: tags,
    is_schedule_publish: settingsProperties?.is_schedule_publish,
    is_schedule_unpublish: settingsProperties?.is_schedule_unpublish,
    schedule_publish_datetime: settingsProperties?.schedule_publish_datetime,
    schedule_unpublish_datetime:
      settingsProperties?.schedule_unpublish_datetime,
    socialShareImgURL: settingsProperties?.socialog_image,
    short_titleSocialShare: settingsProperties?.socialog_title,
    short_descriptionSocialShare: settingsProperties?.socialog_description,
    tagsSocialShare: settingsProperties?.keywords,
    seo_enable: data?.authoring_getCmsContentByPath?.seo_enable,
    structure_data: data?.authoring_getCmsContentByPath?.structure_data,
    analytics_enable: data?.authoring_getCmsContentByPath?.analytics_enable,
    ...(startDate ? { event_start_date: startDate } : {}),
    ...(endDate ? { event_end_date: endDate } : {}),
    webLink: webLink,
    address: address,
    locality: locality,
    postalCode: postalCode,
    regionState: regionState,
    country: country,
    original_image,
    published_images,
  };

  return tempObj;
};

/**
 * @param  {string} value=""
 * enter value has been change upperCase
 */
export const webDomainValidate = (value: any = '') => {
  const stringConvert = '' + value;
  const reg = new RegExp(
    '^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  if (reg.test(stringConvert)) {
    return true;
  }
  return false;
};
export const validateUrl = (value = '') => {
  if (value === '') {
    return true;
  } else {
    return webDomainValidate(value);
  }
};
export const isDateFormatCheck = (event: any = '') => {
  if (event) {
    const assign: any = new Date(event);
    return assign !== 'Invalid Date' && !isNaN(assign);
  }
  return true;
};
export const eventStartEndTimeValidation = (state: any) => {
  const EventStartDateTime = state?.event_start_date;
  const EventEndDateTime = state?.event_end_date;
  if (EventEndDateTime && EventEndDateTime < EventStartDateTime) {
    return 'event_end_date_time_should_not_be_less_than_event_start_date_time';
  }
  return '';
};
export const updateStructureData = (eventState, pageState = 'DRAFT') => {
  const date = new Date().toJSON();
  let eventStatus: string;
  if (date < eventState.event_start_date) {
    eventStatus = 'Scheduled';
  } else if (
    date > eventState.event_start_date &&
    date < eventState.event_end_date
  ) {
    eventStatus = 'Live';
  } else if (date > eventState.event_end_date) {
    eventStatus = 'Ended';
  }
  const EventStructureData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventState?.short_title,
    startDate: eventState?.event_start_date,
    endDate: eventState?.event_end_date,
    ...(eventState?.webLink &&
      !eventState?.address && {
        eventStatus: eventStatus,
        eventAttendanceMode: 'Online',
        location: {
          '@type': 'VirtualLocation',
          url: eventState?.webLink,
        },
      }),
    ...(!eventState?.webLink &&
      eventState?.address && {
        eventAttendanceMode: 'Offline',
        eventStatus: eventStatus,
        location: {
          '@type': 'Place',
          name: eventState?.address,
          address: {
            '@type': 'PostalAddress',
            addressLocality: eventState?.locality,
            postalCode: eventState?.postalCode,
            addressRegion: eventState?.regionState,
            addressCountry: eventState?.country,
          },
        },
      }),
    ...(eventState?.webLink &&
      eventState?.address && {
        eventAttendanceMode: 'Mixed',
        eventStatus: eventStatus,
        location: [
          {
            '@type': 'VirtualLocation',
            url: eventState?.webLink,
          },
          {
            '@type': 'Place',
            name: eventState?.address,
            address: {
              '@type': 'PostalAddress',
              addressLocality: eventState?.locality,
              postalCode: eventState?.postalCode,
              addressRegion: eventState?.regionState,
              addressCountry: eventState?.country,
            },
          },
        ],
      }),
    image: [eventState?.imageUrl],
    description: eventState?.short_description,
  };
  return EventStructureData;
};
export const isInViewport = (element, isSeo) => {
  const mainElement = document.querySelector(`#${element}`);
  if (mainElement) {
    const rect = mainElement.getBoundingClientRect();
    if (isSeo) {
      return (
        rect.top < window.pageYOffset + window.innerHeight &&
        rect.left < window.pageXOffset + window.innerWidth &&
        rect.top + rect.height > window.pageYOffset &&
        rect.left + rect.width > window.pageXOffset
      );
    }
    return rect.top >= 0 && rect.left >= 0;
  }
  return false;
};
export const handleHtmlTags = (inputString) => {
  if (inputString) {
    return inputString.replaceAll(/<[^>]*(>|$)|&nbsp;/g, ' ');
  }
  return inputString;
};
export const trimString = (string, length) => {
  if (string) {
    const trimmedString =
      string.length > length ? string.substring(0, length - 3) + '...' : string;
    return trimmedString;
  }
  return '';
};
export const updateEventSettings = (
  eventWholeRef,
  eventState,
  authInfo,
  i18n
) => {
  const pageURL = eventWholeRef?.current?.title
    .replace(/[^A-Z0-9]+/gi, '-')
    .toLowerCase();
  const eventSettings = {
    socialog_url:
      getSubDomain() + '/' + i18n.language + '/' + 'event' + `/${pageURL}`,
    socialog_type: 'event',
    socialog_sitename: eventWholeRef?.current?.title
      ? trimString(handleHtmlTags(eventWholeRef?.current?.title), 100)
      : 'poll',
    seo_title: eventWholeRef?.current?.title
      ? trimString(handleHtmlTags(eventWholeRef?.current?.title), 100)
      : '',
    socialog_title: eventWholeRef?.current?.short_titleSocialShare
      ? trimString(
          handleHtmlTags(eventWholeRef?.current?.short_titleSocialShare),
          100
        )
      : '',
    socialog_twitter_title: eventWholeRef?.current?.short_titleSocialShare
      ? trimString(
          handleHtmlTags(eventWholeRef?.current?.short_titleSocialShare),
          100
        )
      : '',
    socialog_description: eventWholeRef?.current?.short_descriptionSocialShare
      ? trimString(
          handleHtmlTags(eventWholeRef?.current?.short_descriptionSocialShare),
          163
        )
      : '',
    socialog_twitter_description: eventWholeRef?.current
      ?.short_descriptionSocialShare
      ? trimString(
          handleHtmlTags(eventWholeRef?.current?.short_descriptionSocialShare),
          163
        )
      : '',
    socialog_twitter_url:
      getSubDomain() + '/' + i18n.language + '/' + 'event' + `/${pageURL}`,
    keywords: eventState.tagsSocialShare,
    seo_keywords: eventWholeRef?.current?.tags,
    seo_description: eventWholeRef?.current?.description
      ? trimString(handleHtmlTags(eventWholeRef?.current?.description), 163)
      : '',
    socialog_image: eventWholeRef?.current?.socialShareImgURL,
    socialog_twitter_image: eventWholeRef?.current?.socialShareImgURL,
    is_schedule_publish: eventState?.is_schedule_publish,
    schedule_publish_datetime: eventState?.schedule_publish_datetime,
    is_schedule_unpublish: eventState?.is_schedule_unpublish,
    schedule_unpublish_datetime: eventState?.schedule_unpublish_datetime,
  };
  return eventSettings;
};

export const getPreviewContentData = (
  eventState,
  eventWholeRef,
  username,
  authInfo,
  i18n
) => {
  const pageURL = eventState?.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();

  const noeObjInputData = {
    eventState: eventState,
    eventWholeRef: eventWholeRef.current,
    ...eventState,
    thumbnail_image: eventState?.imageUrl,
    banner_image: eventState?.imageUrl,
    actual_address: eventState?.address,
    virtual_address: eventState?.webLink,
    google_api_address: 'www.google.com',
    locality: eventState?.locality,
    postal_code: eventState?.postalCode,
    region_state: eventState?.regionState,
    country: eventState?.country,
    createdBy: username,
    current_page_url: `/${pageURL}`,
    settings: {
      ...updateEventSettings(eventWholeRef, eventState, authInfo, i18n),
    },
    PageTags: eventState?.tags,
  };
  const tempObj = {
    ...noeObjInputData,
    contentType: 'Event',
  };

  return tempObj;
};

export const getModifiedField = (
  eventState,
  newTempData,
  updatedPartialObj
) => {
  const tempObjField = {
    background_content: {
      objectType: 'image',
      ext: eventState?.original_image?.ext || '',
      Url: eventState?.original_image.original_image_relative_path,
      Title: '',
      Thumbnail: eventState?.original_image.original_image_relative_path,
      Color: '',
    },
    thumbnail_image: eventState?.imageUrl,
    banner_image: eventState?.imageUrl,
    actual_address: eventState?.address,
    ...(eventState?.event_end_date
      ? { event_end_date: eventState?.event_end_date }
      : {}),
    ...(eventState?.event_start_date
      ? { event_start_date: eventState?.event_start_date }
      : {}),
    virtual_address: eventState?.webLink,
    locality: eventState?.locality,
    postal_code: eventState?.postalCode,
    region_state: eventState?.regionState,
    country: eventState?.country,
    google_api_address: 'www.google.com',
    original_image: eventState?.original_image,
    published_images: eventState?.published_images,
  };

  const modifiedEvent = {
    ...newTempData,
    CommonFields: {
      ...(newTempData.CommonFields || {}),
      ...updatedPartialObj,
    },
    ObjectFields: {
      ...(newTempData.ObjectFields || {}),
      ...tempObjField,
    },
  };
  return modifiedEvent;
};
