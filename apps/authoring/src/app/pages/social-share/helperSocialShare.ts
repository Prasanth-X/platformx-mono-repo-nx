import { convertToLowerCase } from '../../utils/helperFunctions';

/**
 * direct share means disable button
 * @param listObj object
 * @returns boolean
 */
export const isSchedule = (listObj: any = {}) => {
    const { post_unique_id: postUniqueId = "", share_type: shareType = "", } = listObj;
    if (!postUniqueId && convertToLowerCase(shareType) === "schedule") {
        return true;
    }
    return false;
};

/**
 * publish date and schedule date handle
 * @param listObj object
 * @returns date
 */
export const shareTimeHandle = (listObj: any = {}) => {
  const {
    post_unique_id: postUniqueId = '',
    share_type: shareType = '',
    SchduledPublishTriggerDateTime = '',
    shared_date: sharedDate = '',
  } = listObj;
  // if (convertToLowerCase(shareType) === "schedule") {
  if (!postUniqueId && convertToLowerCase(shareType) === 'schedule') {
    return SchduledPublishTriggerDateTime;
  }
  return sharedDate;
};

/**
 * is check schedule date and time is expired or not
 */
export const scheduleDateTimeIsExpired = (dateOfSchedule) => {
    const assign: any = new Date(dateOfSchedule);
    if (assign !== "Invalid Date" && !isNaN(assign)) {
        const strtDt = new Date(dateOfSchedule).toISOString();
        const endDt = new Date().toISOString();
        if (endDt <= strtDt) {
            return true;
        }
        return false;
    }
    return false;
};
