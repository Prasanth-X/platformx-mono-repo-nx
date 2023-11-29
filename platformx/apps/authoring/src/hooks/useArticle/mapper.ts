import { SORT_ORDER } from '../../Common/Listing/Utils/Constants';
import { formatUrl } from '../../utils/helperFunctions';

export const mapDuplicateArticle = (
  title: string,
  username: string,
  selectedArticle
) => {
  const articleStructureData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title.trim(),
    Description: selectedArticle?.description,
    keywords: selectedArticle?.tagName,
    url: selectedArticle?.currentPageUrl,
    image: selectedArticle?.banner,
    datePublished: selectedArticle?.publishedDate,
    dateModified: selectedArticle?.lastModifiedDate,
    author: [
      {
        '@type': 'Person',
        name: selectedArticle?.author,
      },
    ],
  };
  const url = formatUrl(title.trim());

  const selectedItem = {
    page: selectedArticle?.page,
    title: selectedArticle?.title,
    description: selectedArticle?.description,
    category: 'Article',
    site_name: 'PlatX',
    parent_page_url: selectedArticle?.parentPageUrl ?? '/',
    current_page_url: selectedArticle?.currentPageUrl,
    developedby: username,
    page_state: selectedArticle.page_state,
    is_edit: false,
    seo_enable: true,
    analytics_enable: selectedArticle.analytics_enable,
    robot_txt: false,
    sitemap: false,
    analytics: '',
    others: '',
    structure_data: '',
    createdBy: username,
    creationDate: new Date().toISOString(),
    modificationDate: new Date().toISOString(),
    tags: selectedArticle.tags,
    page_createdby: username,
    page_lastmodifiedby: username,
    settings: selectedArticle.article_settings,
  };
  return {
    CommonFields: {
      ...selectedItem,
      page_state: 'DRAFT',
      title: title.trim(),
      page: url,
      current_page_url: url,
      structure_data: JSON.stringify(articleStructureData),
      modificationDate: new Date().toISOString(),
      creationDate: new Date().toISOString(),
      page_createdby: username,
      page_lastmodifiedby: username,
    },
    ObjectFields: {
      page_name: selectedArticle.page,
      banner: selectedArticle.banner,
      sub_title: '',
      content_type: 'Article',
      page_tags: selectedArticle?.article_settings?.page_tags,
      link_tags: '',
      article_content: '',
      tag: selectedArticle?.tags,
      links: [],
      published_images: selectedArticle?.published_images,
      original_image: selectedArticle?.original_image,
    },
  };
};

export const mapPublishArticle = (selectedItem: any) => {
  return {
    page: selectedItem.page,
    status: 'depublish',
  };
};

export const mapFetchArticles = (
  startIndex: number,
  state: any,
  filter: string
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: 'Article',
    pageFilter: 'ALL',
    sort: SORT_ORDER,
    pagination: { start: startIndex, rows: 20 },
    isSuggestive: false,
  };
};
