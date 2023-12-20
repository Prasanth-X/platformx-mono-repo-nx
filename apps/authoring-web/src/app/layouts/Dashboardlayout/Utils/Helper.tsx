import { searchContentListApi } from '../../../services/search/searchContentList.api';

export const getContentListItems = async (reqObj) => {
  try {
    const response: any = await searchContentListApi.fetchContentTypeList(
      reqObj
    );
    return response;
  } catch (err: any) {}
};

export const removeSearchLocalStorage = () => {
  localStorage.removeItem('contentType');
  localStorage.removeItem('searchKeyword');
  localStorage.removeItem('searchTags');
  localStorage.removeItem('author');
};
