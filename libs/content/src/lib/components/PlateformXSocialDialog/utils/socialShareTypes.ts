// import { getRequestFromDelivery } from '../../../services/config/request';
import {
  convertToLowerCase,
  nullToObject,
} from '@platformx/utilities';

export type DialogList = {
  disableConfirmButton?: boolean;
  isDialogOpen: boolean;
  title?: string;
  subTitle?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonHandle?: () => void;
  closeButtonHandle?: () => void;
  crossButtonHandle?: () => void;
  modalType?: string;
  pageUrl?: string;
  type?: string;
  setSelectedItem?: any;
  contentType?: string;
  onClickingDone?: any;
};

const socialShareTitleDescription = (data = {}) => {
  const {
    settings: {
      socialog_title = '',
      socialog_description = '',
      socialog_image = '',
    } = {},
  } = nullToObject(data);
  return {
    socialog_title: socialog_title,
    socialog_image: socialog_image,
    socialog_description: socialog_description,
  };
};

const getEndPathBasedContentType = (ele: any = '') => {
  const { ContentType = '', CurrentPageURL = '' } = ele;
  let id = CurrentPageURL;
  if (id.charAt(0) === '/') {
    id = id.substring(1);
  }
  if (convertToLowerCase(ContentType) === 'article') {
    return `article-model?pagePath=${id}`;
  } else if (convertToLowerCase(ContentType) === 'vod') {
    return `vod-model?pagePath=${id}`;
  } else if (convertToLowerCase(ContentType) === 'quiz') {
    return `quiz-model?pagePath=${id}`;
  } else if (convertToLowerCase(ContentType) === 'poll') {
    return `poll-model?pagePath=${id}`;
  } else if (convertToLowerCase(ContentType) === 'event') {
    return `event-model?pagePath=${id}`;
  }
  return `page-model?pagePath=${id}`;
};
export const getSHareDetailsBasedOnContentType = async (ele: any = {}) => {
  const { ContentType = '' } = ele;
  const uri = `api/v1/web/en/delivery/${getEndPathBasedContentType(ele)}`; //api url making
  // const response = await getRequestFromDelivery(uri); // TODO: need to check
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  const response: any = { data: {} };
  const { data = {} } = response;
  if (data) {
    if (convertToLowerCase(ContentType) === 'article') {
      const {
        settings: {
          socialog_image = '',
          socialog_title = '',
          socialog_description = '',
        } = {},
      } = nullToObject(data?.fetchArticleContent);
      const newObj = {
        ...data?.fetchArticleContent,
        thumbnail: socialog_image,
        title: socialog_title,
        description: socialog_description,
      };
      return newObj;
    } else if (convertToLowerCase(ContentType) === 'vod') {
      const {
        PageSettings: {
          SocialOgImage = '',
          SocialOgTitle = '',
          SocialOgDescription = '',
        } = {},
      } = nullToObject(data?.fetchVodByContent);
      const newObj = {
        ...data?.fetchVodByContent,
        thumbnail: SocialOgImage,
        title: SocialOgTitle,
        description: SocialOgDescription,
      };
      return newObj;
    } else if (convertToLowerCase(ContentType) === 'quiz') {
      const {
        socialog_title = '',
        socialog_description = '',
        socialog_image = '',
      } = socialShareTitleDescription(data?.fetchQuizContent);

      const newObj = {
        ...data?.fetchQuizContent,
        title: socialog_title,
        thumbnail: socialog_image,
        description: socialog_description,
      };
      return newObj;
    } else if (convertToLowerCase(ContentType) === 'poll') {
      const defaultImg = `${gcpUrl}/${BucketName}/${defaultImage}`;

      const {
        socialog_title = '',
        socialog_description = '',
        socialog_image = '',
      } = socialShareTitleDescription(data?.fetchPoll);
      const newObj = {
        ...data?.fetchPoll,
        title: socialog_title,
        description: socialog_description,
        thumbnail: socialog_image ? socialog_image : defaultImg,
      };
      return newObj;
    } else if (convertToLowerCase(ContentType) === 'event') {
      const {
        socialog_title = '',
        socialog_description = '',
        socialog_image = '',
      } = socialShareTitleDescription(data?.fetchEventContent);
      const newObj = {
        ...data?.fetchEventContent,
        title: socialog_title,
        thumbnail: socialog_image,
        description: socialog_description,
      };
      return newObj;
    } else {
      return data;
    }
  }

  return {};
};
