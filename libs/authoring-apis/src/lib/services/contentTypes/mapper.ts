import { SORT_ORDER } from '../../utils/constants';
import { formatUrl } from '../../utils/helper';
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

export const mapDeleteContent = (contentType: string, selectedContent: { page: any; current_page_url: any; parent_page_url: any; }) => {
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
  contentType: string,
  title: any,
  IsDuplicate: any,
  selectedContent: { page: string; background_content: { objectType: any; Url: any; Color: any; }; display_scores: any; questions: any; result_range_1: any; result_range_2: any; result_range_3: any; result_range_4: any; banner: any; sub_title: any; published_images: any; original_image: any; banner_image: any; thumbnail_image: any; actual_address: any; event_end_date: any; event_start_date: any; virtual_address: any; google_api_address: any; question_background_content: any; poll_description: any; poll_question: any; poll_result: any; poll_title: any; options_compound_fields: any; creationDate: any; end_date: any; analytics_enable: any; category: any; createdBy: any; description: any; is_edit: any; others: any; robot_txt: any; seo_enable: any; settingsProperties: any; short_description: any; short_title: any; site_name: any; sitemap: any; structure_data: any; tags: any; }
) => {
  const temp = '';
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
