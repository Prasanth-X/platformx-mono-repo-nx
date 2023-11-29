import { convertToLowerCase } from "../../../utils/helperFunctions";

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
  return ['ImageGallery', 'VideoGallery', 'Gallery'].some((ele) =>
    convertToLowerCase(ele) === convertToLowerCase(ContentType));
};
