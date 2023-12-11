/* eslint-disable @typescript-eslint/no-namespace */
import { format } from 'date-fns';
import { showToastError } from '../components/toastNotification/toastNotificationReactTostify';
import { authInfo } from './authConstants';
import { DefaultLocale, LanguageList } from './constants';
import siteLevelSchema from './siteLevelSettings.json';
import { SetStateAction } from 'react';

export const isTabView = () =>
  typeof window !== 'undefined' && window.innerWidth <= 1024;

export const isMobileView = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

export const formatAddPrelem = (item: {
  PrelemId: any;
  PrelemName: any;
  SeoEnabled: any;
  AnalyticsEnabled: any;
  DocumentPath: any;
  DocumentCreationPath: any;
  DocumentType: any;
}) => {
  return {
    PrelemId: item.PrelemId, // Unique Name
    PrelemName: item.PrelemName,
    SeoEnabled: item.SeoEnabled,
    AnalyticsEnabled: item.AnalyticsEnabled,
    InstanceId: 'pr_cont1',
    DocumentPath: item.DocumentPath,
    DocumentCreationPath: item.DocumentCreationPath,
    DocumentType: item.DocumentType,
    IsHidden: false,
    IsModified: false,
    StructuredData: '',
  };
};
export const getFirstTwoletters = (title) => {
  if (!title) return '';
  const words = title.trim().split(' ');
  if (words.length === 1) return words[0].substring(0, 2);
  return words[0].charAt(0) + words[words.length - 1].charAt(0);
};
export const formatChildren = (
  children: string | any[],
  content: { [x: string]: any }
) => {
  const Children: any = [];
  for (let i = 0; i < children.length; i++) {
    const instance = { ...children[i] };
    delete instance.__typename;
    instance.content = content[instance.DocumentPath];
    Children.push(instance);
  }
  return Children;
};
// setDuplicate Page settings
export function setDuplicatePageSettings(
  name: string,
  url: string,
  pageSettings: any
) {
  const pageSettingsCopy = {
    ...pageSettings,
    PageName: name,
    PageURL: `${getSubDomain()}/${url}`,
    SeoTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgSiteName: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgURL: `${getSubDomain()}/${url}`,
    SocialOgTwitterTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterURL: `${getSubDomain()}/${url}`,
    IsSchedulePublish: false,
    IsScheduleUnpublish: false,
    SchedulePublishDateTime: '',
    ScheduleUnpublishDateTime: '',
  };
  return pageSettingsCopy;
}

export const formatChildrenForPageDuplicate = (
  pageModel: {
    Page: any;
    Title: any;
    CurrentPageURL: string;
    DevelopedBy: any;
    Page_LastModificationDate: Date;
    PageSettings: any;
    Children: string | any[];
  },
  pageName: string,
  pageUrl: string,
  currentUser: string
) => {
  const ChildrenArray: any = [];
  pageModel.Page = pageUrl;
  pageModel.Title = pageName;
  pageModel.CurrentPageURL = `/${pageUrl}`;
  pageModel.DevelopedBy = currentUser;
  pageModel.Page_LastModificationDate = new Date();
  pageModel.PageSettings = setDuplicatePageSettings(
    pageName,
    pageUrl,
    pageModel.PageSettings
  );
  for (let i = 0; i < pageModel?.Children.length; i++) {
    const instance = { ...pageModel.Children[i] };
    delete instance.content;
    ChildrenArray.push(instance);
  }
  pageModel.Children = ChildrenArray;
  return pageModel;
};
//function to format page model to be sent at backend to be saved
export const consolidatePageModel = (
  pageModel: any,
  prelemMetaArray: string | any[],
  pageSettings: any,
  username = ''
) => {
  const newModel = {
    ...pageModel,
    Page_LastModificationDate: new Date(),
    Page_LastModifiedBy: username,
  };
  const newChildrenArray: any = [];
  const structuredDataArray: any = [];
  for (let i = 0; i < prelemMetaArray.length; i++) {
    const prelemMetaArrayInstance: any = prelemMetaArray[i];
    if (
      prelemMetaArray[i]?.IsHidden === false &&
      prelemMetaArray[i].SeoEnabled === true
    ) {
      structuredDataArray.push(prelemMetaArrayInstance.StructuredData);
    }
    const prelemMetaArrayInstanceCopy = JSON.parse(
      JSON.stringify(prelemMetaArray[i])
    );
    delete prelemMetaArrayInstanceCopy.content;
    delete prelemMetaArrayInstanceCopy.prelemTag;
    delete prelemMetaArrayInstanceCopy.DefaultStructureDataForReset;

    newChildrenArray.push(prelemMetaArrayInstanceCopy);
  }
  const pageSettingsCopy = pageSettings;
  delete pageSettingsCopy.SeoURL;
  delete pageSettingsCopy.RobotsTags;
  delete pageSettingsCopy.CanonicalURL;
  delete pageSettingsCopy.PageAnalytics;
  delete pageSettingsCopy.EventBasedAnalytics;
  delete newModel.is_workflow_enabled;
  delete newModel.stages;
  delete newModel.workflow_id;
  delete newModel.workflow_status;
  delete newModel.Path;
  newModel.Children = newChildrenArray;
  newModel.PageSettings = pageSettings;
  newModel.StructureData = JSON.stringify(structuredDataArray);
  return newModel;
};

//Set page settings wit default values on page creation
export function setDefaultPageSettings(
  name: string,
  description?: string,
  tags?: string[],
  url?: string
) {
  return {
    PageName: name,
    PageDescription: description != undefined ? description : '',
    PageTags: tags != undefined ? [...tags] : [],
    PageURL: url != undefined ? url : '',
    PageViewer: '',
    PageCaching: false,
    PageMobileFriendly: false,
    SeoTitle: `${name} | ${siteLevelSchema.siteName}`,
    SeoDescription: description != undefined ? description : '',
    SeoKeywords: tags != undefined ? [...tags] : [],
    SeoBlockIndexing: false,
    SocialOgTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgDescription: description != undefined ? description : '',
    SocialOgSiteName: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgType: 'Website',
    SocialOgURL: url != undefined ? url : '',
    SocialOgLocale: 'en_US',
    SocialOgImage: '',
    SocialOgTwitterTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterDescription: description != undefined ? description : '',
    SocialOgTwitterImage: '',
    SocialOgTwitterURL: url != undefined ? url : '',
    SocialTwitterCardSize: 'summary_large_image',
  };
}
export function removeParamsFromURL(sParam: string) {
  let url = `${window.window.location?.href.split('?')[0]}?`;
  const sPageURL = decodeURIComponent(
    window.window.location?.search.substring(1)
  );
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  let i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] != sParam) {
      url = `${url + sParameterName[0]}=${sParameterName[1]}&`;
    }
  }
  return url.substring(0, url.length - 1);
}

export const formatUrl = (enteredVal: string) => {
  let tmp = enteredVal.toLowerCase();
  tmp = tmp.replace(/\s/g, '-');
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, '');
  return tmp;
};

export const filterSelectedArticle = (
  state: { article: any },
  articleName: any
) => {
  const { article } = state;
  return article?.articleArray?.find(
    (articleObj: { Name: any }) => articleObj.Name === articleName
  );
};

export const dateFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      //input validation
      return format(new Date(dataTime), 'LLL dd, yyyy | H:mm a');
    }
    return dataTime;
  }
  return dataTime;
};

export const handleHtmlTags = (inputString: string | undefined) => {
  if (inputString) {
    return inputString.replaceAll(/<[^>]*(>|$)|&nbsp;/g, '');
  }
  return inputString;
};

export const capitalizeFirstLetter = (inputString: string | undefined) => {
  if (inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  // return '';
};

export const trimString = (string: string | undefined, length: number) => {
  if (string) {
    const trimmedString =
      string.length > length ? `${string.substring(0, length - 3)}...` : string;
    return trimmedString;
  }
  return '';
};

export const updateStructureDataVOD = (
  title = '',
  description = '',
  videoUrl = '',
  thumbnailURL = ''
) => {
  const VodStructureData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        contentUrl: videoUrl,
        name: title ? trimString(handleHtmlTags(title), 100) : '',
        description: description
          ? trimString(handleHtmlTags(description), 200)
          : '',
        embedUrl: videoUrl,
        thumbnailUrl: {
          '@id': thumbnailURL,
        },
      },
    ],
  };
  return VodStructureData;
};

/**
 * validate the params is null or undefined means pass empty array
 */
export const nullToArray = (array: any = []) => {
  return array ? array : [];
};

/**
 * validate the params is null or undefined means pass empty object
 */
export const nullToObject = (obj: any = {}) => {
  return obj ? obj : {};
};

/**
 * validate the params is null or undefined means pass empty string
 */
export const nullToString = (stringData = '') => {
  return stringData ? stringData : '';
};

export const onBackButtonEvent = (
  e: PopStateEvent,
  unsavedChanges: boolean,
  setDialogOpen: {
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  navigateTo: {
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
  }
) => {
  e.preventDefault();
  window.history.pushState(
    null,
    '',
    window.window.location?.pathname + window.location?.search
  );
  if (unsavedChanges) {
    setDialogOpen(true);
  } else {
    return;
  }
};
export const unloadCallback = (event, unsavedChanges) => {
  event.preventDefault();
  if (unsavedChanges) {
    event.returnValue = '';
    return '';
  }
};
export const updateStructureData = (content) => {
  const QuizStructureData = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: content.title,
    description: content.description,
    hasPart:
      content.questions?.length > 0
        ? content.questions?.map(
            ({ question, options_compound_fields }: any) => {
              return {
                '@type': 'Question',
                name: question,
                suggestedAnswer:
                  options_compound_fields?.length > 0
                    ? options_compound_fields.map(
                        ({ option_id, option_text }: any) => {
                          return {
                            '@type': 'Answer',
                            text: option_text,
                          };
                        }
                      )
                    : '',
              };
            }
          )
        : '',
  };
  return QuizStructureData;
};
export const convertToLowerCase = (stringData = '') => {
  return `${stringData}`.toString().toLowerCase();
};

/**
 *
 * @param errors object
 * @returns boolean
 */
export const inputFieldValidate = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((ele) => {
    if (ele !== true) {
      valid = false;
    }
  });
  return valid;
};

/**
 *
 * @param errors object
 * @returns boolean
 */
export const inputValidateCheck = (errors = {}) => {
  let valid = true;
  for (const key in errors) {
    if (errors[key].validate !== true) {
      valid = false;
    }
  }
  return valid;
};

/**
 * @param errors object
 */
export const inputErrorToast = (errors: any = {}) => {
  let newArray: any = [];
  for (const key in errors) {
    if (errors[key].validate !== true) {
      newArray = [...newArray, errors[key].msg];
    }
  }
  showToastError(nullToString(newArray[0]));
};
export const debounce = (fn: any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const getCurrentLang = () => {
  let lang = '';
  const split = window.location?.pathname.split('/');

  if (LanguageList.find((x) => x.id === split[2])) {
    lang = split[2];
  } else {
    lang = DefaultLocale;
  }
  return lang;
};

export const getSelectedSite = () => {
  let site = '';
  const split = window.location?.pathname.split('/');
  site = split[1];
  if (site === 'en' || site === 'fr' || site === 'de') {
    return localStorage.getItem('selectedSite');
  } else {
    return site;
  }
};

export const getSelectedRoute = () => {
  let site = '';
  const split = window.location?.pathname.split('/');
  site = split[1];
  if (site === 'en' || site === 'fr' || site === 'de') {
    return '';
  } else {
    return site;
  }
};

export const getSubDomain = () => {
  const sessions = localStorage.getItem('userSession');
  const storedSession = JSON.parse(sessions);
  const site_url = storedSession?.userInfo?.preferred_sites_urls;
  const domain = site_url[getSelectedSite()]?.replace('.com.', '.com');
  if (domain) {
    if (domain.startsWith('http://')) {
      return domain.replace('http://', 'https://');
    } else if (!domain.startsWith('https://')) {
      return `https://${domain}`;
    }
    return domain;
  }
  return null; // Return null if `domain` is null or undefined
};

export const getCurrentPathName = () => {
  let pathname = '';
  const split = window.location?.pathname.split('/');
  if (LanguageList.find((x) => x.id === split[2])) {
    pathname = `/${split.slice(3).join('/')}`;
  } else {
    pathname = window.location?.pathname;
  }
  return pathname;
};
declare namespace Intl {
  type Key =
    | 'calendar'
    | 'collation'
    | 'currency'
    | 'numberingSystem'
    | 'timeZone'
    | 'unit';

  function supportedValuesOf(input: Key): string[];
}
export const timeZoneData = () => {
  return Intl.supportedValuesOf('timeZone');
};
const aryIannaTimeZones = timeZoneData();
export const getUniqueTimeZone = () => {
  const data = [];
  aryIannaTimeZones.forEach((timeZone, i) => {
    // let strTime = new Date().toLocaleTimeString([], {
    //   timeZone: `${timeZone}`,
    //   hour12: false,
    // });
    const strTime = new Date().toLocaleString([], {
      timeZone: `${timeZone}`,
      hour12: false,
    });
    const time = new Date(strTime).toTimeString().slice(0, -21);
    data.push({ label: `${timeZone} ${time}(IST)`, time: `${strTime}` });
  });

  const uniqueItems = data.filter(
    (item: any, index, self) =>
      index === self.findIndex((x) => x.time === item.time)
  );
  return data;
};

//export const formCroppedUrl = (gcpUrl = "", bucketName = "", url = "", ext = "") => `${gcpUrl}/${bucketName}/${url}.${ext}`;
export const formCroppedUrl = (url: any = '', ext = '') => {
  return `${authInfo.gcpUri}/${authInfo.gcpBucketName}/${url.replaceAll(
    ' ',
    '%20'
  )}.${ext}`;
};

// const gcpUrl = process.env.REACT_APP_GCP_URL;
//   const bucketName = process.env.REACT_APP_BUCKET_NAME;

//   const webpImageUrl = `${gcpUrl}/${bucketName}/${imageUrl}.webp`;
//   const fallbackImageUrl = `${gcpUrl}/${bucketName}/${imageUrl}.${imageExt}`;

export const createImageURL = (imageUrl, imageExt = 'png') => {
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const bucketName = process.env.REACT_APP_BUCKET_NAME;
  return `${gcpUrl}/${bucketName}/${imageUrl}.${imageExt}`;
};

export const isEmpty = (obj) => {
  if (Object.keys(obj).length == 0) return true;
  return false;
};

export const getRandomNumber = (answerArray = [], min, max) => {
  if (answerArray.length < max) {
    const existingNumbers = answerArray.map((arr) => arr.id);
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (existingNumbers.includes(randomNumber?.toString()));
    return randomNumber;
  }
};

export const getLocale = (language: string, location: string) => {
  if (language === 'en') return `${language}`;
  return `${language}_${location}`;
};
