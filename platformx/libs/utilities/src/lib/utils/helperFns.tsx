import axios from 'axios';
import { format } from 'date-fns';
import FallBackImage from '../assets/fallBackImage.png';
import { countries } from './helperConstants';
// import ToastService from 'lib/components/ToastContainer/ToastService';
import { CONTENT_TYPE_WITH_ABSOLUTEURL } from './constants';

const errorRequest =
  'We have not been able to complete the requested action. Please try again later';
const headerData = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-cache',
};

/**
 * getCall
 * @param url string
 * @returns object
 */
export const getRestApiCall = (
  url: string,
  locale?: string,
  sitename?: string
) => {
  try {
    return axios.get(url, {
      headers: {
        ...headerData,
        Locale: locale === 'en' ? `${locale}` : `${locale}_${locale}`,
        ...(sitename && { sitename: sitename }),
      },
    });
  } catch (err: any) {
    // const { } = err.response;
    // failToast(errorRequest); // TODO: uncomment this line
    return err?.response;
  }
};

/**
 * postCall
 * @param url string
 * @param payload object
 * @returns object
 */
export const postRestApiCall = (
  url: string,
  payload: any,
  locale?: string,
  site_host?: string
) => {
  try {
    return axios.post(url, payload, {
      headers: {
        ...headerData,
        ...(site_host && { site_host: site_host }),
        Locale: locale === 'en' ? `${locale}` : `${locale}_${locale}`,
      },
    });
  } catch (err: any) {
    // const { } = err.response;
    // failToast(errorRequest); // TODO: uncomment this line
    return err?.response;
  }
};

/**
 * postCall
 * @param url string
 * @param payload object
 * @returns object
 */
export const putRestApiCall = (
  url: string,
  payload: any,
  locale?: string,
  site_host?: string
) => {
  try {
    return axios.put(url, payload, {
      headers: {
        ...headerData,
        ...(site_host && { site_host: site_host }),
        Locale: locale === 'en' ? `${locale}` : `${locale}_${locale}`,
      },
      withCredentials: true,
    });
  } catch (err: any) {
    // const { } = err.response;
    // failToast(errorRequest); // TODO: uncomment this line
    return err?.response;
  }
};

// export const postRequest = async (url: any, payload = {}) => {
//   try {
//     return axios.post(url, payload, {
//       headers: {
//         ...headerData,
//         ...(site_host && { site_host: site_host }),
//         Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
//       },
//       withCredentials: true,
//     });
//   } catch (err: any) {
//     // if (err?.response?.data?.code === 401) {
//     //   handleLogout();
//     // }
//     return err;
//   }
// };

// export const getRequest = async (url: any) => {
//   try {
//     const res = await axios.get(process.env.REACT_APP_API_URI + url, {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Cache-Control": "no-cache",
//       },
//       withCredentials: true,
//     });
//     return res;
//   } catch (err: any) {
//     // if (err?.response?.data?.code === 401 && !url.includes('verify')) {
//     //   handleLogout();
//     // }
//     return err;
//   }
// };

export const completeButtonUrl = (
  actionType = 'External',
  url = 'https://www.hcltech.com',
  btnBaseUrl = ''
) => {
  if (actionType === 'Internal') {
    const urlwidoutSlash = url.slice(1);
    return btnBaseUrl + urlwidoutSlash;
  }
  return url;
};

export const completeButtonUrl2 = (
  internal = true,
  url = 'https://www.hcltech.com',
  btnBaseUrl = ''
) => {
  if (internal) {
    const urlwidoutSlash = url.slice(1);
    return btnBaseUrl + urlwidoutSlash;
  }
  return url;
};

export const handleHtmlTags = (inputString: any) => {
  if (inputString) {
    return inputString.replace(/<[^>]*(>|$)|&nbsp;/g, '');
  }
};

/**
 * null | undefined to string
 */
export const nullToString = (string: any = '') => {
  return string ? string : '';
};

/**
 * null | undefined to object
 */
export const nullToObject = (obj: any = {}) => {
  return obj ? obj : {};
};
export const convertToLowerCase = (stringData: any = '') => {
  return ('' + stringData).toLowerCase();
};
/**
 * null | undefined to array
 */
export const nullToArray = (arr: any = []) => {
  return arr ? arr : [];
};
export const capitalizeFirstLetter = (str: string) => {
  if (str) {
    try {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (e) {
      return '';
    }
  }
  return '';
};

interface Props {
  e: any;
  analytics: {
    pageId?: number;
    prelemId?: number;
    pageTitle?: string;
    prelemTitle?: string;
    pageDesc?: string;
    pageTags?: string;
    prelemTags?: string;
    prelemPosition?: number;
    isAnalyticsEnabled: boolean;
    isAuthoring: boolean;
    isSeoEnabled: boolean;
  };
  defaultObj?: {
    pageId?: number;
    pageTitle?: string;
    pageDesc?: string;
    pageTags?: string;
    prelemID?: number;
    prelemTitle?: string;
    prelemTags?: string;
    prelemPosition?: number;
  };
  handleTrack?: (arg: string, e: object) => void;
}
export const triggerAnalytics = ({
  e,
  analytics,
  defaultObj,
  handleTrack = () => {},
}: Props) => {
  if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
    const buttonClickObj = {
      eventType: 'Button Click',
      ...defaultObj,
      buttonURL: '',
      nameOfFileDownloaded: '',
      eventCategory: 'Button Click',
      eventAction: 'Click',
      eventLabel: e.currentTarget.innerText,
      eventValue: 1,
    };
    handleTrack(buttonClickObj?.eventType, buttonClickObj);
  }
};

export const debounce = (fn: any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const checkImageUrlPath = (imgUrl = '') => {
  if (imgUrl.match(/(https?:\/\/.*\.(?:png|jpg|svg|webp|gif))/i)) {
    return imgUrl;
  }
  return FallBackImage;
};

export const formCroppedUrl = (
  gcpUrl = '',
  bucketName = '',
  url = '',
  ext = '',
  contentType = '',
  bannerType = ''
) => {
  if (CONTENT_TYPE_WITH_ABSOLUTEURL.includes(contentType)) {
    return url;
  } else {
    if (url && ext) {
      if (bannerType !== '') {
        return checkImageUrlPath(
          `${gcpUrl}/${bucketName}/${url}-${bannerType}.${ext}`
        );
      } else {
        return checkImageUrlPath(`${gcpUrl}/${bucketName}/${url}.${ext}`);
      }
    }
    return FallBackImage;
  }
  // if (CONTENT_TYPE_WITH_ABSOLUTEURL.includes(contentType)) return url;
  // else if (bannerType !== "")
  //   return `${gcpUrl}/${bucketName}/${url}-${bannerType}.${ext}`;
  // else return `${gcpUrl}/${bucketName}/${url}.${ext}`;
};

export const relativeImageURL = (
  gcpUrl: string,
  bucketName: string,
  url: string,
  ext: string
) => {
  return url && ext ? `${gcpUrl}/${bucketName}/${url}.${ext}` : FallBackImage;
};

export const getLandingPageURL = (
  endPoint: any,
  language: any,
  contentType: string,
  id: any
) => {
  return `${endPoint}${language}/${contentType.toLocaleLowerCase()}/${id}`;
};

export const getLandingPageURLwithoutSlash = (
  endPoint: any,
  language: any,
  contentType: string,
  id: any
) => {
  const url = id?.startsWith('/') ? id?.substring(1) : id;
  return `${endPoint}${language}/${contentType.toLocaleLowerCase()}/${url}`;
};

export const getCourseLandingPageURL = (
  endPoint: any,
  language: any,
  contentType: string,
  id: any
) => {
  return `${endPoint}${language}/course/course-details?courseId=${id}`;
};

//params ensPath update
export const encodeGetParams = (params: any = {}) => {
  return Object.entries(params)
    .map((key: any) =>
      key
        .map((k: any) => {
          const enCodeData = typeof k === 'object' ? JSON.stringify(k) : k;
          return encodeURIComponent(enCodeData);
        })
        .join('=')
    )
    .join('&');
};

export const getDefaultCroppedImage = (
  croppedImages: any = [],
  defaultRatio = 'landscape'
) => {
  const landscapeImg = croppedImages.find(
    ({ aspect_ratio }: any) => aspect_ratio === defaultRatio
  );
  const { bucket_path: imgUrl = '', ext = '' } = landscapeImg || {};
  //if private: url
  //if (visibility === "public") {
  //if public: url + extension
  //}
  return `url('${imgUrl}.webp'), url('${imgUrl}.${ext}')`;
};

export const fetchCroppedUrl = (
  theme: any,
  // mediaQuery: any,
  Url: string,
  publishedImages: [],
  imgOrder: any = {},
  breakpoints: any = {}
) => {
  let returnUrl = '';
  const {
    less_than_320,
    less_than_600,
    less_than_768,
    less_than_1024,
    less_than_1280,
    less_than_1440,
  } = breakpoints || {};
  if (publishedImages && publishedImages.length > 0) {
    // const less_than_320 = mediaQuery(theme.breakpoints.only("xs"));
    // const less_than_600 = mediaQuery(theme.breakpoints.only("sm"));
    // const less_than_768 = mediaQuery(theme.breakpoints.only("md"));
    // const less_than_1024 = mediaQuery(theme.breakpoints.only("em"));
    // const less_than_1280 = mediaQuery(theme.breakpoints.only("lg"));
    // const less_than_1440 = mediaQuery(theme.breakpoints.only("xl"));
    if (less_than_320) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['320'] || breakpoints['320']
      );
    } else if (less_than_600) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['600'] || breakpoints['600']
      );
    } else if (less_than_768) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['768'] || breakpoints['768']
      );
    } else if (less_than_1024) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['1024'] || breakpoints['1024']
      );
    } else if (less_than_1280) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['1280'] || breakpoints['1280']
      );
    } else if (less_than_1440) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['1440'] || breakpoints['1440']
      );
    } else {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        imgOrder?.['1440'] || breakpoints['1440']
      );
    }
  } else {
    if (Url.search('dspace') !== -1) {
      //normal dspace url
      returnUrl = Url;
    }
  }
  return returnUrl;
};
//string to parse convert
export const uriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = '' } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === 'string') {
    if (buttonContent.includes('ContentEnCodeParse')) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};

export const completeExternalUrl = (str: string) => {
  let tarea = str;
  const tarea_regex = /^(http|https)/;
  if (!tarea_regex.test(String(str).toLowerCase())) {
    tarea = 'https://' + str;
  }
  return tarea;
};

/**
 * last sting value is check "/"
 * @param ContentType
 * @returns string
 */

export const conCatUrlPath = (ContentType = '') => {
  if (ContentType) {
    const typeUrl =
      ContentType.charAt(ContentType.length - 1) === '/'
        ? `${ContentType}`
        : `${ContentType}/`;
    if (convertToLowerCase(typeUrl) === 'vod/') {
      return 'video/';
    }
    return convertToLowerCase(typeUrl);
  }
  return '';
};

export const pluralize = (value: number, word: string) => {
  return [0, 1].includes(value) ? word : `${word}s`;
};

export const structureDataUrlPoint = (
  content: any = {},
  secondaryArgs: any = {}
) => {
  const { prelemBaseEndpoint = {} } = secondaryArgs;
  const { PublishEndPoint = '', language = '' } = prelemBaseEndpoint;
  const ContentUrl = `${PublishEndPoint}${language}/`;
  const { Button_Action = '', Button_RedirectURL = '' } = content;

  if (Button_Action === 'Internal') {
    let id = Button_RedirectURL;
    if (id && id.charAt(0) === '/') {
      id = id.substring(1);
    }
    return ContentUrl + id;
  } else if (Button_Action === 'Content') {
    const contentObjHandle = uriToJSON(content);
    const { ContentType = '', currentPath = '' } =
      nullToObject(contentObjHandle);
    const isGalleryArray = ['ImageGallery', 'VideoGallery', 'Gallery'].some(
      (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType)
    );
    if (!isGalleryArray) {
      //backSlash remove
      const type = conCatUrlPath(ContentType);
      let id = currentPath;
      if (id && id.charAt(0) === '/') {
        id = id.substring(1);
      }
      return `${ContentUrl}${type}${id}`;
    }
    return '';
  }
  return '';
};

export const dateFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      return format(new Date(dataTime), 'LLL dd, yyyy');
    }
    return dataTime;
  }
  return dataTime;
};

export const timeFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      return format(new Date(dataTime), 'H:mm');
    }
    return dataTime;
  }
  return dataTime;
};

export const dateTimeFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      return format(new Date(dataTime), 'LLL dd, yyyy | H:mm');
    }
    return dataTime;
  }
  return dataTime;
};

export const dateTime12hFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      return format(new Date(dataTime), 'hh:mm a, LLL dd yyyy');
    }
    return dataTime;
  }
  return dataTime;
};

/**
 * currency based symbol
 * @param currency string
 * @returns string
 */
export const currencyBasedIcon = (currency: string) => {
  if (convertToLowerCase(currency) === 'usd') {
    return '$';
  } else if (convertToLowerCase(currency) === 'inr') {
    return '₹';
  }
  return '';
};

/**
 * allow only number
 * @param e objet
 */
export const allowOnlyNumberInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^0-9]/g, '');
  e.target.value = number;
};

/**
 * allow only char
 * @param e objet
 */
export const allowOnlyShippingLetterInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^a-zA-z(-,.,')]/g, '');
  e.target.value = number;
};

/**
 * allow only char
 * @param e objet
 */
export const allowOnlyLetterInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^a-zA-z]/g, '');
  e.target.value = number;
};

/**
 *
 * @param errors object
 * @returns boolean
 */
export const inputEmptyFieldValidate = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((ele) => {
    if (ele === '') {
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
export const inputNonEmptyFieldValidate = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((ele) => {
    if (ele !== '') {
      valid = false;
    }
  });
  return valid;
};

/**
 * Decimal Values
 * @param value Actual value to formate
 * @param toFixed number of decimal which we have to show after decimal value
 * @returns float
 */
export const formateNumber = (value: number, toFixedVal: number) => {
  if (!isNaN(value)) {
    return (Math.round(value * 100) / 100).toFixed(
      !isNaN(toFixedVal) ? toFixedVal : 2
    );
  }
  return value;
};

/**
 * email validate
 * @param email string
 * @returns boolean
 */
export const emailValidate = (email = '') => {
  const reg =
    /^\s*([\w+-]+\.)*[\w+]+@([\w+-]+\.)*([\w+-]+\.[a-zA-Z]{2,6})+\s*$/;
  if (!reg.test(email)) {
    return false;
  }
  return true;
};

export const getGridValues = (cardArr: any, index?: number) => {
  let sm = 4,
    em = 3,
    cardType = 'XCard1';
  if (cardArr?.length === 1) {
    sm = 12;
    em = 12;
    cardType = 'XCard3';
  } else if (cardArr?.length === 2) {
    sm = 6;
    em = 6;
    cardType = 'XCard2';
  } else if (cardArr?.length === 3) {
    if (index === 0) {
      em = 6;
      sm = 12;
      cardType = 'XCard2';
    } else {
      em = 3;
      sm = 6;
      cardType = 'XCard1';
    }
  } else if (cardArr?.length === 4) {
    sm = 6;
    em = 3;
    cardType = 'XCard1';
  }
  return { sm, em, cardType };
};
export function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getCountryFlag = (country: string) => {
  const countryObj = countries.find((item) => item.label === country);
  return `https://flagcdn.com/w20/${countryObj?.code?.toLowerCase()}.png`;
};

export const eComTypeUriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = '' } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === 'string') {
    if (buttonContent.includes('ecomEnCodeParse')) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};
