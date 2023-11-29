import LaptopImg from '../../../assets/laptop.jpg';
import AdvancedSEOIcon from '../../../assets/svg/AdvancedSEOIcon.svg';
import AdvanceIcon from '../../../assets/svg/AdvanceIcon.svg';
import AnalyticsIcon from '../../../assets/svg/AnalyticsIcon.svg';
import GalleryIcon from '../../../assets/svg/galleryIcon.svg';
import pageInfoIcon from '../../../assets/svg/pageInfoIcon.svg';
import PrelemAnalyticsIcon from '../../../assets/svg/PrelemAnalyticsIcon.svg';
import PrelemImagesIcon from '../../../assets/svg/PrelemImages.svg';
import PrelemVideosIcon from '../../../assets/svg/PrelemVideos.svg';
import ScheduleIcon from '../../../assets/svg/ScheduleIcon.svg';
import seoBasicIcon from '../../../assets/svg/seoBasicIcon.svg';
import SEOIcon from '../../../assets/svg/SEOIcon.svg';
import SocialShareIcon from '../../../assets/svg/SocialShareIcon.svg';
import ThreeCard from '../../../assets/svg/threeCard.svg';
import { convertToLowerCase } from '../../../utils/helperFunctions';

export const nameLength = 250;
export const descriptionLength = 1000;
export const previewNameLength = 55;
export const previewDescriptionLength = 160;
export const largePreviewDescriptionLength = 128;
export const smallPreviewNameLength = 41;
export const smallPreviewDescriptionLength = 129;
export const keyTypesSettings = [
  'images',
  'videos',
  'testimonials',
  'twitterhandle',
  'livestream',
];
export const actionLabels = {
  UP: 'up',
  DOWN: 'down',
  RESET: 'reset',
  VISIBILITY: 'visibility',
  VISIBILITYOFF: 'visibilityOff',
  DELETE: 'delete',
  DUPLICATE: 'copy',
  SETTINGS: 'settings',
  EDIT: 'edit',
};

/**
 * @param ContentType string
 * @returns boolean
 */
export const isGalleryContentTypeCheck = (ContentType: string) => {
  return ['ImageGallery', 'VideoGallery', 'Gallery'].some(
    (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType)
  );
};

export const LayoutData = [
  { title: 'Text', icon: ThreeCard },
  { title: 'Image & Content', icon: GalleryIcon },
  { title: '3 Cards', icon: GalleryIcon },
  { title: '2 Cards', icon: ThreeCard },
  { title: 'Call to Action', icon: GalleryIcon },
  { title: 'Video', icon: GalleryIcon },
  { title: 'Gallery', icon: ThreeCard },
  { title: 'Hero Banner', icon: ThreeCard },
  { title: 'Form', icon: GalleryIcon },
  { title: '4 Cards', icon: ThreeCard },
];

export const PrelemData = [
  {
    title: 'Hero Banner 1',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'FAQ',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'Video Banner 2',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'About Us 2',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'Contact Us',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'Banner 4',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
  {
    title: 'Blog Tiles',
    description:
      'This prelem having 5 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles post or blogs.',
    imageUrl: LaptopImg,
  },
];

export const PageSettingListData = [
  { title: 'Page Info', imgUrl: pageInfoIcon, id: 'page_info' },
  { title: 'Seo Basic', imgUrl: seoBasicIcon, id: 'page_seo_basic' },
  { title: 'Social Share', imgUrl: SocialShareIcon, id: 'page_social_share' },
  { title: 'Analytics', imgUrl: AnalyticsIcon, id: 'page_analytics' },
  { title: 'Schedule', imgUrl: ScheduleIcon, id: 'page_schedule' },
];

export const PrelemSettingList = [
  {
    title: 'Data Source',
    imgUrl: PrelemAnalyticsIcon,
    id: 'prelem_data_source',
  },
  {
    title: 'Twitter Handle',
    imgUrl: PrelemAnalyticsIcon,
    id: 'prelem_twitter',
  },
  {
    title: 'Testimonials',
    imgUrl: PrelemAnalyticsIcon,
    id: 'prelem_testimonials',
  },
  { title: 'Images', imgUrl: PrelemImagesIcon, id: 'prelem_images' },
  { title: 'Video', imgUrl: PrelemVideosIcon, id: 'prelem_video' },
  {
    title: 'Brightcove Video',
    imgUrl: PrelemAnalyticsIcon,
    id: 'prelem_brightcove',
  },

  { title: 'SEO', imgUrl: SEOIcon, id: 'prelem_seo' },
  { title: 'Advance', imgUrl: AdvanceIcon, id: 'prelem_advanced' },
  { title: 'Analytics', imgUrl: PrelemAnalyticsIcon, id: 'prelem_analytics' },
];

export const PrelemSettingCardList = [
  'prelem_data_source',
  'prelem_twitter',
  'prelem_testimonials',
  'prelem_images',
  'prelem_video',
  'prelem_brightcove',
  'prelem_seo',
  'prelem_advanced',
  'prelem_analytics',
];

export enum PrelemActions {
  PRELEM_INFO = 'prelemInfo',
  EDIT = 'edit',
  HIDE = 'hide',
  SHOW = 'show',
  COPY = 'copy',
  UP = 'up',
  DOWN = 'down',
  RESET = 'reset',
  DELETE = 'delete',
  PRELEM_SETTING = 'prelemSetting',
}

export const DYNAMIC_PRELEM_LIST = [
  'Prelem_048',
  'Prelem_053',
  'Prelem_077',
  'Prelem_080',
  'Prelem_081',
];
