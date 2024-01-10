import { PageQueries } from '../../graphQL/pages/pageQueries';
import { getSelectedSite, formatChildren } from '@platformx/utilities';
import { createSearchParams } from 'react-router-dom';

export const savePageModel = PageQueries.SAVE_PAGE_MODEL;
export const fetchAllPageList = PageQueries.FETCH_ALL_PAGE_LIST;
export const fetchPageListAll = PageQueries.FETCH_PAGE_LIST_ALL;
export const publishPageModel = PageQueries.PUBLISH_PAGE_MODEL;
export const updatePrelemData = PageQueries.UPDATE_PRELEM_CONTENT;
export const schedulePublish = PageQueries.SCHEDULE_PUBLISH;
export const scheduleUnpublish = PageQueries.SCHEDULE_UNPUBLISH;
export const cancelPublish = PageQueries.CANCEL_PUBLISH;
export const cancelUnpublish = PageQueries.CANCEL_UNPUBLISH;
export const createPgModel = PageQueries.CREATE_PAGE_MODEL;
export const deletePage = PageQueries.DELETE_PAGE;
export const reschedulePublish = PageQueries.RESCHEDULE_PUBLISH;
export const rescheduleUnpublish = PageQueries.RESCHEDULE_UNPUBLISH;
export const unpublishPage = PageQueries.UNPUBLISH_PAGE;

const setValidationForFetchPage = (res: any) => {
  return {
    type: 'SET_VALIDATION_OBJECT',
    validations: res,
  };
};

const fetchAllValidation = async (docTypes: any, runFetchValidationQuery: any) => {
  const validations: any = {};
  for (const documentType of docTypes) {
    const response = await runFetchValidationQuery({
      variables: { input: documentType },
    });
    validations[documentType] = response.data.authoring_getDocValidationSchema;
  }
  return validations;
};

const fetchValidationForPageSelected = (
  dispatch: any,
  runFetchValidationQuery: any,
  children: any
) => {
  const s = new Set();
  for (let i = 0; i < children.length; i++) {
    s.add(children[i].DocumentType);
  }
  fetchAllValidation(s, runFetchValidationQuery)
    .then((response) => {
      dispatch(setValidationForFetchPage(response));
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const setPageModelStoreAfterFetch = (
  dispatch: any,
  resp: any,
  runFetchValidationQuery: any
) => {
  const data = JSON.parse(JSON.stringify(resp));
  const pagesettings = data.PageSettings;
  const { children } = data;
  const { content } = data;
  delete data.children;
  delete data.content;
  delete data.__typename;
  fetchValidationForPageSelected(dispatch, runFetchValidationQuery, children);
  const pm = data;
  const childrenWithContent = formatChildren(children, content);
  pm.Children = childrenWithContent;

  return {
    type: 'SET_PAGE_MODEL_POST_FETCH',
    pm,
    pagesettings,
    children: childrenWithContent,
  };
};

export const fetchPageModel = (
  dispatch: any,
  runFetchPageModel: any,
  runFetchValidationQuery: any,
  path: any,
  navigate?: any,
  actionType?: any,
  deviceType?: string,
  editOption?: string,
  searchCatURL?: string,
  searchTermURL?: string,
  sortByURL?: string
) => {
  const arr = path?.split('/');
  const folder = arr[6];
  const pathnm = `${arr[10]}`;
  // const pathnm = `${arr[6]}/${arr[7]}`;
  return runFetchPageModel({
    variables: { folder: folder, path: pathnm },
    context: {
      headers: {
        sitename: getSelectedSite()
      },
    },
  })
    .then((resp: any) => {
      dispatch(
        setPageModelStoreAfterFetch(
          dispatch,
          resp.data.authoring_getCmsItemByPath,
          runFetchValidationQuery
        )
      );
      if (navigate) {
        localStorage.setItem('path', path);
        navigate(
          {
            pathname: actionType ? `/preview-page/${deviceType}` : '/edit-page',
            search: `?${createSearchParams({
              page: path.toString(),
              editoption: editOption ? editOption.toString() : '',
              searchCat: searchCatURL ? searchCatURL.toString() : '',
              searchTerm: searchTermURL ? searchTermURL.toString() : '',
              sortBy: sortByURL ? sortByURL.toString() : '',
            })}`,
          },
          { state: 'old' }
        );
      }
    })
    .catch((err: any) => {
      console.log(JSON.stringify(err, null, 2));
    });
};