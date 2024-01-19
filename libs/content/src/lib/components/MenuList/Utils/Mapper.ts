export const getSelectedObject = (item: any) => {
  return {
    ...item,
    page_state: 'published',
    is_published: 'yes',
    page: item?.currentPageUrl?.includes('/')
      ? item?.parentPageUrl?.slice(1)
      : item?.parentPageUrl,
    name: item?.parentPageUrl?.includes('/')
      ? item?.parentPageUrl?.slice(1)
      : item?.parentPageUrl,
    status: 'published',
    lastPublishedDate: item?.PublishedDate,
    currentPageUrl: item?.currentPageUrl,
    current_page_url: item?.currentPageURL,
    parentPageUrl: '/',
    contentType: item?.ContentType?.toLowerCase(),
    pageName: item?.Title,
    description: item?.Description,
    tagName: item?.tags,
    title: item?.Title,
  };
};
