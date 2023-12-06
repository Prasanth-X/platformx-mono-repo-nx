import {
  completeExternalUrl,
  conCatUrlPath,
  eComTypeUriToJSON,
  nullToObject,
  uriToJSON,
} from '../../utils/helperFns';
import { IMPRESSIONS } from '../usePrelemImpression/constants';
import {
  Analytics,
  ButtonObjInfo,
  CardDataObj,
  secondaryArgsObj,
} from './usePrelemImpression.types';

export const createPrelemImpression = (analytics: Analytics) => {
  return {
    eventType: IMPRESSIONS.PRELEM_IMPRESSION,
    pageId: analytics?.pageId || IMPRESSIONS.NA,
    pageTitle: analytics?.pageTitle || IMPRESSIONS.NA,
    pageDesc: analytics?.pageDesc || IMPRESSIONS.NA,
    pageTags: analytics?.pageTags || IMPRESSIONS.NA,
    prelemID: analytics?.prelemId || IMPRESSIONS.NA,
    prelemTitle: analytics?.prelemTitle || IMPRESSIONS.NA,
    prelemTags: analytics?.prelemTags || IMPRESSIONS.NA,
    prelemPosition: analytics?.prelemPosition || IMPRESSIONS.NA,
  };
};

export const snowplowPrelemImpression = (
  analytics: Analytics,
  secondaryArgs?: secondaryArgsObj
) => {
  return {
    schema: secondaryArgs?.prelemImpressionSchema,
    data: {
      ...createPrelemImpression(analytics),
    },
  };
};

export const createClickImpression = (
  analytics: Analytics,
  type: string,
  secondaryArgs: any,
  buttonDataObj: ButtonObjInfo,
  cardDataObj?: CardDataObj
) => {
  let buttonURL = IMPRESSIONS.NA;
  let contentTitle = IMPRESSIONS.NA;
  let contentType = IMPRESSIONS.NA;
  let contentUrl = IMPRESSIONS.NA;
  let prelemSlotNumber: string | number = IMPRESSIONS.NA;
  let eventLabel = IMPRESSIONS.NA;
  const eventValue = IMPRESSIONS.NA;
  const isRegistered =
    (localStorage.getItem('userId') ? IMPRESSIONS.YES : IMPRESSIONS.NO) ||
    IMPRESSIONS.NA;
  const age = IMPRESSIONS.NA;

  const userLoginDetailsString = localStorage.getItem('userLoginDetails');
  const userLoginDetails = userLoginDetailsString
    ? JSON.parse(userLoginDetailsString).data
    : null;

  const gender = userLoginDetails?.gender || IMPRESSIONS.NA;

  if (type === IMPRESSIONS.Button) {
    const { prelemBaseEndpoint = {} } = nullToObject(secondaryArgs);
    const {
      buttonBaseUrl = '',
      PublishEndPoint = '',
      language = '',
    } = nullToObject(prelemBaseEndpoint);
    const platformEndPoint = buttonBaseUrl ? buttonBaseUrl : PublishEndPoint;
    eventLabel = buttonDataObj?.Button_Name || IMPRESSIONS.NA;
    switch (buttonDataObj?.Button_Action) {
      case 'Internal':
        if (buttonDataObj?.Button_RedirectURL) {
          buttonURL =
            platformEndPoint + language + buttonDataObj.Button_RedirectURL;
        }
        break;
      case 'External':
        if (buttonDataObj?.Button_RedirectURL) {
          buttonURL = completeExternalUrl(buttonDataObj.Button_RedirectURL);
        }
        break;
      case 'Content': {
        const contentObjHandle = uriToJSON(buttonDataObj); //convertToParse
        const {
          ContentType = '',
          currentPath = '',
          Title = '',
        } = nullToObject(contentObjHandle);
        contentTitle = Title || IMPRESSIONS?.NA;
        contentType = ContentType || IMPRESSIONS?.NA;
        const isGalleryContentType = [
          'ImageGallery',
          'VideoGallery',
          'Gallery',
        ].some(
          (ele) => ele?.toLocaleLowerCase() === ContentType?.toLocaleLowerCase()
        );
        const typeOfContent = conCatUrlPath(ContentType);

        let id = currentPath;
        if (id.charAt(0) === '/') {
          id = id.substring(1);
        }

        buttonURL =
          (isGalleryContentType
            ? IMPRESSIONS.NA
            : `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${typeOfContent}${id}`) ||
          IMPRESSIONS.NA;
        contentUrl = buttonURL || IMPRESSIONS.NA;
        break;
      }
      case 'Ecommerce': {
        const ecomObjHandle = eComTypeUriToJSON(buttonDataObj); //convertToParse
        const { ContentType = '', currentPath = '' } =
          nullToObject(ecomObjHandle);
        const typeOfContent = conCatUrlPath(ContentType);

        let id = currentPath;
        if (id.charAt(0) === '/') {
          id = id.substring(1);
        }
        buttonURL =
          `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${typeOfContent}${id}` ||
          IMPRESSIONS.NA;
        contentUrl = buttonURL || IMPRESSIONS.NA;
        break;
      }
      default:
        break;
    }
  } else if (type === IMPRESSIONS.Card) {
    contentTitle = cardDataObj?.contentTitle || IMPRESSIONS.NA;
    contentType = cardDataObj?.contentType || IMPRESSIONS.NA;
    contentUrl = cardDataObj?.contentUrl || IMPRESSIONS.NA;
    prelemSlotNumber = cardDataObj?.prelemSlotNumber || IMPRESSIONS.NA;
  }

  return {
    ...createPrelemImpression(analytics),
    eventType: IMPRESSIONS.CLICK_IMPRESSION,
    eventCategory:
      type === IMPRESSIONS.Button
        ? IMPRESSIONS.BUTTON_CLICK
        : type === IMPRESSIONS.Card
        ? IMPRESSIONS.CARD_CLICK
        : IMPRESSIONS.NA,
    prelemSlotNumber,
    isRegistered,
    age,
    gender,
    contentType,
    contentTitle,
    contentUrl,
    buttonURL,
    nameOfFileDownloaded: IMPRESSIONS.NA,
    eventLabel,
    eventValue,
  };
};

export const snowplowPrelemClickImpression = (
  analytics: Analytics,
  type: string,
  secondaryArgs: any,
  buttonDataObj: ButtonObjInfo,
  cardDataObj: CardDataObj = {}
) => {
  return {
    schema: secondaryArgs?.clickImpressionSchema,
    data: {
      ...createClickImpression(
        analytics,
        type,
        secondaryArgs,
        buttonDataObj,
        cardDataObj
      ),
    },
  };
};
