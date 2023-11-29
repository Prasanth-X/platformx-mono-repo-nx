export const DEF_VOD = {
  DsapceVideoUrl: '',
  Thumbnail: '',
  Title: '',
  Description: '',
  Tags: [],
};

import VodIcon1 from '../../../../assets/svg/VODIcon.svg';
import VodIcon2 from '../../../../assets/MenuIcons-8.svg';
import VodIcon3 from '../../../../assets/MenuIcons-2.svg';
import VodIcon4 from '../../../../assets/MenuIcons-4.svg';

const createVodFlatIcon = [
  {
    id: 'VideoAndThumbnail',
    iconName: VodIcon1,
    tooltip: 'Video And Thumbnail',
  },
  {
    id: 'ImageAndThumbnail',
    iconName: VodIcon2,
    tooltip: 'Image And Thumbnail',
  },
  {
    id: 'titleDescription',
    iconName: VodIcon3,
    tooltip: 'Title & description',
  },
  {
    id: 'tags',
    iconName: VodIcon4,
    tooltip: 'Choose Tags',
  },
];

export const PATH = 'path';
export const DRAFT = 'DRAFT';
export const EVENT = 'Event';
export const PUBLISHED = 'PUBLISHED';
export const IMAGE_URL = 'imageURL';
export const IMAGES = 'Images';
export const SOCIAL_SHARE_IMG_URL = 'socialShareImgURL';
export const SOCIAL_SHARE = 'socialShare';
export const CANCEL = 'cancel';
export const SEO = 'Seo';
export const seo = 'seo';
export const SCROLL = 'scroll';
export const BEFORE_UNLOAD = 'beforeunload';
export const POP_STATE = 'popstate';
export const RESIZE = 'resize';

export default createVodFlatIcon;
