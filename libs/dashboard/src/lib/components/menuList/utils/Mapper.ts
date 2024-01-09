export const getSelectedObject = (item: any) => {
  return {
    ...item,
    page_state: 'published',
    is_published: 'yes',
    page: item.CurrentPageURL.includes('/')
      ? item.CurrentPageURL.slice(1)
      : item.CurrentPageURL,
    name: item.CurrentPageURL.includes('/')
      ? item.CurrentPageURL.slice(1)
      : item.CurrentPageURL,
    status: 'published',
    lastPublishedDate: item.PublishedDate,
    currentPageUrl: item.CurrentPageURL,
    current_page_url: item.CurrentPageURL,
    parentPageUrl: '/',
    contentType: item?.ContentType?.toLowerCase(),
    pageName: item?.Title,
    description: item?.Description,
    tagName: item?.tags,
    title: item?.Title,
  };
};
