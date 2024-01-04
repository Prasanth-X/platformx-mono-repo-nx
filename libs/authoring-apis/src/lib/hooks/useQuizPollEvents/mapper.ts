import { SORT_ORDER } from '../../utils/constants';
import { updateStructureData, formatUrl, getSubDomain } from '../../utils/helper';

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

export const mapDeleteContent = (contentType: string, selectedContent: any) => {
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
const getUpdatedStructuredData = (contentType: string, content: any, language: string) => {
  if (contentType.toLowerCase() == 'Article'.toLowerCase()) {
    return updateStructureData(
      content,
      content.banner,
      content.keywords,
      content.current_page_url
    );
  } else if (contentType.toLowerCase() == 'Poll'.toLowerCase()) {
    const PollStructureData = {
      '@context': 'https://schema.org',
      '@type': 'VoteAction',
      name: content?.title,
      description: content?.description,
      url:
        content.status === 'PUBLISHED'
          ? `${getSubDomain()}/${language}/` +
            `poll/${content?.title
              ?.replace(/[^A-Z0-9]+/gi, '-')
              ?.toLowerCase()}`
          : content.title?.replace(/[^A-Z0-9]+/gi, '-')?.toLowerCase(),
      startTime: new Date().toISOString(),
      option: content.options_compound_fields?.map((ans: any) => ans.option_text),
    };
    return PollStructureData;
  } else {
    return {};
  }
};

export const mapDuplicateContent = (
  contentType = '',
  title = '',
  IsDuplicate = false,
  selectedContent: any = {},
  username = '',
  language = ''
) => {
  let url = '';
  if (title) {
    url = formatUrl(title);
    selectedContent = {
      ...selectedContent,
      page: title,
      title: title,
      last_modifiedBy: username,
    };
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
          poll_description: selectedContent?.description,
          poll_question: selectedContent?.poll_question,
          poll_result: selectedContent?.poll_result,
          poll_title: selectedContent?.page,
          options_compound_fields: selectedContent?.options_compound_fields,
          start_date: new Date(),
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
      // page_lastmodifiedby: selectedContent?.createdBy,
      page_state: 'DRAFT',
      parent_page_url: '/',
      robot_txt: selectedContent?.robot_txt,
      seo_enable: selectedContent?.seo_enable,
      settings: selectedContent?.settingsProperties,
      short_description: selectedContent?.short_description,
      short_title: selectedContent?.short_title,
      site_name: selectedContent?.site_name,
      sitemap: selectedContent?.sitemap,
      structure_data: JSON.stringify(
        getUpdatedStructuredData(contentType, selectedContent, language)
      ),
      tags: selectedContent?.tags,
      title: url,
      IsConfirm: IsDuplicate,
      page_lastmodifiedby: username,
    },
    ObjectFields: {
      ...tempObjField,
      published_images: selectedContent?.published_images,
      original_image: selectedContent?.original_image,
    },
  };

  return {
    ...contentToSend,
  };
};

export const pageObjectMapper = (props: any) => {
  const {
    document_type,
    document_title,
    description,
    created_by,
    last_modified_by,
    document_path,
  } = props;
  return {
    tagName: document_type?.toLowerCase(),
    pageName: document_title,
    title: document_title,
    description: description,
    author: created_by,
    lastModifiedDate: last_modified_by,
    status: 'draft',
    path: document_path,
    page: document_title,
    scheduledPublishTriggerDateTime: '',
    scheduledUnPublishTriggerDateTime: '',
    lastPublishedDate: '',
    lastModifiedBy: last_modified_by,
    publishedBy: '',
    publishedDate: '',
    currentPageUrl: `/${document_title}`,
    parentPageUrl: '/',
    name: document_title,
    page_state: 'draft',
    is_published: false,
    current_page_url: `/${document_title}`,
  };
};
