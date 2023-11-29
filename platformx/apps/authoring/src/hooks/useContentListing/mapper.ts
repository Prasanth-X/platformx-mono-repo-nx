import { SORT_ORDER } from '../../Common/Listing/Utils/Constants';
import { formatUrl } from '../../utils/helperFunctions';

export const mapFetchALL = (
  state: any,
  filter: string,
  contentType: string,
  pagination: { start: number; rows: number }
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: contentType,
    pageFilter: filter,
    sort: SORT_ORDER,
    pagination: pagination,
    isSuggestive: false,
  };
};

export const mapUnPublishContent = (contentType: string, page: string) => {
  return {
    contentType: contentType,
    input: {
      page: page,
      status: 'depublish',
    },
  };
};

export const mapDeleteContent = (contentType: string, selectedContent) => {
  const contentInfo = {
    page: selectedContent?.page,
    current_page_url: selectedContent?.current_page_url,
    parent_page_url: selectedContent?.parent_page_url,
  };
  return {
    contentInfo: contentInfo,
    contentType: contentType,
  };
};

export const mapDuplicateContent = (
  contentType,
  title,
  IsDuplicate,
  selectedContent
) => {
  let temp = '';
  let url = '';
  if (title) {
    url = formatUrl(title);
    selectedContent = { ...selectedContent, page: title };
  } else {
    url = selectedContent?.page;
  }
  const commonFields = {
    background_content: {
      objectType: selectedContent?.background_content?.objectType,
      Url: selectedContent?.background_content?.Url,
      Title: '',
      Thumbnail: selectedContent?.background_content?.Url,
      Color: selectedContent?.background_content?.Color,
    },
    display_scores: selectedContent?.display_scores,
  };
  const tempObjField =
    contentType === 'Quiz'
      ? {
          ...commonFields,
          questions: selectedContent?.questions,
          result_range_1: selectedContent?.result_range_1,
          result_range_2: selectedContent?.result_range_2,
          result_range_3: selectedContent?.result_range_3,
          result_range_4: selectedContent?.result_range_4,
        }
      : contentType === 'Article'
      ? {
          banner: selectedContent?.banner,
          sub_title: selectedContent?.sub_title,
          published_images: selectedContent?.published_images,
          original_image: selectedContent?.original_image,
        }
      : contentType === 'Event'
      ? {
          banner_image: selectedContent?.banner_image,
          thumbnail_image: selectedContent?.thumbnail_image,
          actual_address: selectedContent?.actual_address,
          event_end_date: selectedContent?.event_end_date,
          event_start_date: selectedContent?.event_start_date,
          virtual_address: selectedContent?.virtual_address,
          google_api_address: selectedContent?.google_api_address,
        }
      : {
          ...commonFields,
          question_background_content:
            selectedContent?.question_background_content,
          poll_description: selectedContent?.poll_description,
          poll_question: selectedContent?.poll_question,
          poll_result: selectedContent?.poll_result,
          poll_title: selectedContent?.poll_title,
          options_compound_fields: selectedContent?.options_compound_fields,
          start_date: selectedContent?.creationDate,
          end_date: selectedContent?.end_date,
        };
  const contentToSend = {
    CommonFields: {
      analytics: '',
      analytics_enable: selectedContent?.analytics_enable,
      category: selectedContent?.category,
      createdBy: selectedContent?.createdBy,
      creationDate: new Date().toISOString(),
      current_page_url: `/${url}`,
      description: selectedContent?.description,
      is_edit: selectedContent?.is_edit,
      modificationDate: new Date().toISOString(),
      others: selectedContent?.others,
      page: url,
      page_lastmodifiedby: selectedContent?.createdBy,
      page_state: 'DRAFT',
      parent_page_url: '/',
      robot_txt: selectedContent?.robot_txt,
      seo_enable: selectedContent?.seo_enable,
      settings: selectedContent?.settingsProperties,
      short_description: selectedContent?.short_description,
      short_title: selectedContent?.short_title,
      site_name: selectedContent?.site_name,
      sitemap: selectedContent?.sitemap,
      structure_data: selectedContent?.structure_data,
      tags: selectedContent?.tags,
      title: url,
      IsConfirm: IsDuplicate,
    },
    ObjectFields: {
      ...tempObjField,
    },
  };

  return {
    ...contentToSend,
  };
};
