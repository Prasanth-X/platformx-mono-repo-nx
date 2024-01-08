import Awards from '../../assets/dynamicprelemicons/Awards.png';
import Challenges_community from '../../assets/dynamicprelemicons/Challenges_community.svg';
import EventIcon from '../../assets/dynamicprelemicons/EventWhiteIcon.png';
import Faq from '../../assets/dynamicprelemicons/FAQ.png';
import FeatureCard from '../../assets/dynamicprelemicons/Feature card.png';
import General_community from '../../assets/dynamicprelemicons/General_community.svg';
import News_community from '../../assets/dynamicprelemicons/News_community.svg';
import ServiceCard from '../../assets/dynamicprelemicons/Service card.png';
import Testimonial from '../../assets/dynamicprelemicons/TestimonialWhite.png';
import articleIcon from '../../assets/dynamicprelemicons/article.svg';
import Community from '../../assets/dynamicprelemicons/community.svg';
import courseIcon from '../../assets/dynamicprelemicons/course.svg';
import imgIcon from '../../assets/dynamicprelemicons/imggallery.svg';
import pollIcon from '../../assets/dynamicprelemicons/poll.svg';
import quizIcon from '../../assets/dynamicprelemicons/quiz.svg';
import Shopping_bag from '../../assets/dynamicprelemicons/shopping_bag.png';
import vodIcon from '../../assets/dynamicprelemicons/vod.svg';
import fallBackImage from '../../assets/fallBackImage.png';
import {
  convertToLowerCase,
  getCourseLandingPageURL,
  getLandingPageURL,
} from '../../utils/helperFns';

export const getIcon = (ct: string) => {
  switch (convertToLowerCase(ct)) {
    case 'article':
      return articleIcon;
    case 'poll':
      return pollIcon;
    case 'quiz':
      return quizIcon;
    case 'imagegallery':
      return imgIcon;
    case 'event':
      return EventIcon;
    case 'faq':
      return Faq;
    case 'testimonial':
      return Testimonial;
    case 'awards':
      return Awards;
    case 'servicecard':
      return ServiceCard;
    case 'accolades':
      return FeatureCard;
    case 'product':
      return Shopping_bag;
    case 'course':
      return courseIcon;
    case 'news':
      return News_community;
    case 'general':
      return General_community;
    case 'challenges-announcement':
      return Challenges_community;
    case 'community':
      return Community;
    default:
      return vodIcon;
  }
};
export const formAbsoluteUrl = (
  gcpUrl = '',
  bucketName = '',
  url = '',
  ext = '',
  contentType = ''
) => {
  if (contentType === 'Course' || url.includes('https')) {
    return url;
  } else {
    return `${gcpUrl}/${bucketName}/${url}.${ext}`;
  }
};

export const onClickCardUrlNavigate = (
  id: string,
  content: any,
  secondaryArgs: any
) => {
  if (typeof window !== 'undefined') {
    // let url = "";
    if (id && id.charAt(0) === '/') {
      // eslint-disable-next-line no-param-reassign
      id = id.substring(1);
    }

    if (content.ContentType === 'Article') {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        'article',
        id
      );
    } else if (content.ContentType === 'VOD') {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        'video',
        id
      );
    } else if (content.ContentType === 'Course') {
      return getCourseLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        content.ContentType,
        id
      );
    } else if (convertToLowerCase(content.ContentType) === 'community') {
      return id;
    } else {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        content.ContentType,
        id
      );
    }
  }
  return '';
};

export const getFormattedImageUrl = (
  path: string,
  ext: string,
  secondaryArgs: any
) => {
  if (path && ext) {
    const url = `${secondaryArgs?.gcpUrl}/${secondaryArgs?.bucketName}/${path}.${ext}`;
    if (url.match(/^https?:\/\/.+\/.+$/)) {
      return url;
    }
    return fallBackImage;
  }
  return fallBackImage;
};

/**
 * contentType image url crete common
 */
export const commonImageUrlConstruct = (content: any, secondaryArgs: any) => {
  if (content?.ContentType === 'Event') {
    return getFormattedImageUrl(
      content?.background_content.Url,
      content?.background_content.ext,
      secondaryArgs
    );
  } else {
    return getFormattedImageUrl(
      content?.Thumbnail?.Url,
      content?.Thumbnail?.ext,
      secondaryArgs
    );
  }
};
export const getStyleString = (styles) =>
  Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join('; ');
