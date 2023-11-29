import { createSearchParams } from 'react-router-dom';
import {
  showToastError,
  showToastSuccess,
} from '../components/toastNotification/toastNotificationReactTostify';
import { formatAddPrelem, formatChildren, getSelectedSite } from '../utils/helperFunctions';

export const checkIfUnsavedChanges = (isUnsaved: boolean) => {
  return {
    type: 'UPDATE_POLLSAVE',
    payload: isUnsaved,
  };
};
export const savePrelemPosition = (position: any, index: number) => {
  return {
    type: 'SAVE_INDEX',
    insertPrelemAt: position,
    index: index,
  };
};
export const updateSaveWarning = (status: boolean) => {
  return {
    type: 'SHOW_SAVE_WARNING',
    status,
  };
};
export const callSaveandResetWarning = (callSaveStatus: boolean) => {
  return {
    type: 'SAVE_PAGEMODEL',
    callSaveStatus,
  };
};
export const saveSchedulePublishDateTime = (
  status,
  time: string | null = null
) => {
  return {
    type: 'SET_PUBLISH_TIME',
    publishtime: time,
    status,
  };
};

export const saveScheduleUnpublishDateTime = (
  status,
  time: string | null = null
) => {
  return {
    type: 'SET_UNPUBLISH_TIME',
    unpublishtime: time,
    status,
  };
};
export const createPageModel = (
  newPageModel: any,
  mutate: any,
  navigate: any,
  handleImpression: any,
  t,
  isDuplicate?: any,
  code?: any
) => {
  mutate({
    variables: { input: newPageModel },
    context: {
      headers: {
        language: localStorage.getItem('lang'),
        sitename: getSelectedSite()
      },
    },
  })
    .then((resp) => {
      localStorage.removeItem('lang');
      if (code) {
        showToastSuccess(
          `${t('page')} ${t('created_toast')} ${t('for')} ${code}`
        );
      } else {
        showToastSuccess(`${t('page')} ${t('created_toast')}`);
      }
      localStorage.setItem('path', resp?.data?.authoring_createPage?.path);
      const pageDataObj = {
        eventType: 'Successful Page Creation',
        pageCreated: true,
        created_page_title: newPageModel.Page,
        createdBy: newPageModel.DevelopedBy,
      };
      handleImpression(pageDataObj.eventType, pageDataObj);
      if (isDuplicate) {
        // fetchMore();
      } else {
        navigate(
          {
            pathname: '/edit-page',
            search: `?${createSearchParams({
              page: resp?.data?.authoring_createPage?.path.toString(),
            })}`,
          },
          { state: 'new' }
        );
      }
    })
    .catch((error) => {
      if (code) {
        showToastError(`${error.graphQLErrors[0].message} ${t('for')} ${code}`);
      } else {
        showToastError(error.graphQLErrors[0].message);
      }
    });
  return {
    type: 'CREATE_PAGEMODEL',
    pm: newPageModel,
  };
};
export const updatePageModel = (newPageModel: any) => {
  return {
    type: 'UPDATE_PAGEMODEL',
    pm: newPageModel,
  };
};
export const setUpdatedContent = (newContentPath, updatedContent, prelemAt) => {
  return {
    type: 'UPDATE_PRELEM_DATA',
    newPath: newContentPath,
    updatedContent,
    prelemAt,
  };
};
export const updatePrelemContent = (
  dispatch,
  mutatePrelemContentQuery,
  updatedContent,
  prelemAt,
  documentPath,
  documentCreationPath,
  documentType,
  instanceId
) => {
  mutatePrelemContentQuery({
    variables: {
      input: updatedContent,
      docPath: documentPath,
      docCreationPath: documentCreationPath,
      docType: documentType,
      instanceId: instanceId,
    },
  })
    .then((res) => {
      dispatch(
        setUpdatedContent(
          res.data.authoring_createOrUpdatePrelemContent.path,
          updatedContent,
          prelemAt
        )
      );
    })

    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
    });
};

export const setPrelemArray = (
  prelemContentValidation,
  prelemContentSchema,
  prelemToBeAdded,
  navigate,
  insertPrelemAt
) => {
  const prelemMetaInstance = {
    ...formatAddPrelem(prelemToBeAdded),
    content: JSON.parse(JSON.stringify(prelemContentSchema)),
  };
  const path = localStorage.getItem('path');
  if (path) {
    navigate(
      {
        pathname: '/edit-page',
        search: `?${createSearchParams({
          page: path.toString(),
        })}`,
      },
      { state: 'old' }
    );
  } else navigate('/edit-page', { state: 'old' });
  return {
    type: 'ADD_PRELEM',
    prelemMetaInstance: prelemMetaInstance,
    prelemValidation: prelemContentValidation,
    insertPrelemAt: insertPrelemAt,
  };
};
//fetch schema HERE
export const addPrelem = (
  dispatch: any,
  prelemToBeAdded: any,
  runFetchContentQuery,
  runFetchValidationQuery,
  navigate,
  insertPrelemAt: any
) => {
  const docPath = prelemToBeAdded.DocumentPath;
  const docType = prelemToBeAdded.DocumentType;
  return runFetchContentQuery({
    variables: {
      path: docPath,
      docType: docType,
      prelemId: prelemToBeAdded?.PrelemId,
    },
  })
    .then((resp) => {
      runFetchValidationQuery({
        variables: { input: docType },
      })
        .then((res) => {
          dispatch(
            setPrelemArray(
              res.data.authoring_getDocValidationSchema,
              resp.data.authoring_getCmsItemContent,
              prelemToBeAdded,
              navigate,
              insertPrelemAt
            )
          );
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    })
    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
    });
};
const setValidationForFetchPage = (res) => {
  return {
    type: 'SET_VALIDATION_OBJECT',
    validations: res,
  };
};
const fetchAllValidation = async (docTypes, runFetchValidationQuery) => {
  const validations = {};
  for (const documentType of docTypes) {
    const response = await runFetchValidationQuery({
      variables: { input: documentType },
    });
    validations[documentType] = response.data.authoring_getDocValidationSchema;
  }
  return validations;
};
const fetchValidationForPageSelected = (
  dispatch,
  runFetchValidationQuery,
  children
) => {
  const s = new Set();
  for (let i = 0; i < children.length; i++) {
    s.add(children[i].DocumentType);
  }
  fetchAllValidation(s, runFetchValidationQuery)
    .then((response) => {
      dispatch(setValidationForFetchPage(response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setPageModelStoreAfterFetch = (
  dispatch,
  resp,
  runFetchValidationQuery
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
  runFetchPageModel,
  runFetchValidationQuery,
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
    .then((resp) => {
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
    .catch((err) => {
      console.log(JSON.stringify(err, null, 2));
    });
};

export const updatePrelemsContent = (prelemsContentNew: any) => {
  return {
    type: 'UPDATE_PRELEMS_CONTENT',
    prelemsContentNew: prelemsContentNew,
  };
};
export const duplicatePrelemWithNewContent = (
  sourcePrelemIndex,
  path,
  instanceId
) => {
  return {
    type: 'DUPLICATE_PRELEM',
    sourcePrelemIndex: sourcePrelemIndex,
    path,
    instanceId,
  };
};
export const duplicatePrelem = (
  sourcePrelemIndex: any,
  prelemInstance: any,
  mutateDuplicatePrelem,
  dispatch,
  t
) => {
  const {
    DocumentPath,
    DocumentCreationPath,
    DocumentType,
    InstanceId,
    content,
  } = prelemInstance;
  return mutateDuplicatePrelem({
    variables: {
      DocumentPath,
      DocumentCreationPath,
      DocumentType,
      InstanceId,
      Content: content,
    },
  })
    .then((resp) => {
      dispatch(
        duplicatePrelemWithNewContent(
          sourcePrelemIndex,
          resp.data.authoring_createOrUpdatePrelemContent.path,
          resp.data.authoring_createOrUpdatePrelemContent.InstanceId
        )
      );
      showToastSuccess(`${t('prelem')} ${t('duplicated_toast')}`);
    })
    .catch((err) => {
      showToastError(t('prelem_duplicate_error_toast'));
    });
};

export const movePrelem = (prelemIndex: any, direction: string) => {
  return {
    type: 'MOVE_PRELEM',
    prelemIndex: prelemIndex,
    direction: direction,
  };
};
export const deletePrelem = (targtPrelemIndex: any) => {
  return {
    type: 'DELETE_PRELEM',
    targtPrelemIndex: targtPrelemIndex,
  };
};
export const hidePrelem = (targtPrelemIndex: any) => {
  return {
    type: 'HIDE_PRELEM',
    targtPrelemIndex: targtPrelemIndex,
  };
};
export const paddingTopPrelem = (targtPrelemIndex: any, checked: boolean) => {
  return {
    type: 'PADDINGTOP_PRELEM',
    targtPrelemIndex: targtPrelemIndex,
    checked: checked,
  };
};
export const paddingBottomPrelem = (
  targtPrelemIndex: any,
  checked: boolean
) => {
  return {
    type: 'PADDINGBOTTOM_PRELEM',
    targtPrelemIndex: targtPrelemIndex,
    checked: checked,
  };
};
export const resetPrelemContent = (prelemMeta, prelemContent, prelemAt) => {
  const prelemAfterReset = formatAddPrelem(prelemMeta);
  const prelemContentCopy = { ...prelemContent };
  delete prelemContentCopy.DocumentPath;
  return {
    type: 'RESET_PRELEM',
    content: prelemContentCopy,
    prelemAfterReset,
    prelemAt,
  };
};
export const resetPrelem = (
  dispatch,
  documentType: string,
  prelemid: string,
  prelemAt,
  fetchDefaultData,
  fetchPrelemDefaultInfo,
  t
) => {
  try {
    fetchPrelemDefaultInfo({ variables: { prelemId: prelemid } }).then((resp) =>
      fetchDefaultData({
        variables: { input: documentType, prelemId: prelemid },
      }).then((res) => {
        showToastSuccess(t('prelem_reset_success_toast'));
        dispatch(
          resetPrelemContent(
            resp.data.authoring_prelemById,
            res.data.authoring_resetContent,
            prelemAt
          )
        );
      })
    );
  } catch (error) {
    showToastError(t('prelem_reset_error_toast'));
  }
};
export const updateContentForCard = (
  selectedPrelemIndex,
  sectionToUpdate,
  info,
  assetIndex
) => {
  return {
    type: 'UPDATE_PRELEM_ASSET_INFO',
    selectedPrelemIndex,
    sectionToUpdate,
    info,
    assetIndex,
  };
};
export const updateContentHandleForCard = (
  selectedPrelemIndex,
  sectionToUpdate,
  info
) => {
  return {
    type: 'UPDATE_PRELEM_ASSET_INFO_DYNAMIC',
    selectedPrelemIndex,
    sectionToUpdate,
    info,
  };
};
export const updateContentHandleForLivestream = (
  selectedPrelemIndex,
  sectionToUpdate,
  info
) => {
  return {
    type: 'UPDATE_PRELEM_ASSET_INFO_LIVESTREAM',
    selectedPrelemIndex,
    sectionToUpdate,
    info,
  };
};
export const PrelemAnalyticsSave = (
  analyticsAttributeVal: string,
  prelemIndex: number
) => {
  return {
    type: 'PRELEM_ANALYTICS_BASIC',
    analyticsAttributeVal,
    prelemIndex,
  };
};
export const updatePageSettings = (pageInfo) => {
  return {
    type: 'UPDATE_PAGE_SETTINGS',
    pageInfo,
  };
};

export const setPublishedpages = (publishedPages: any) => {
  return {
    type: 'SET_PUBLISHED_PAGES',
    publishedPages: publishedPages,
  };
};

export const setDefaultPageModel = (state) => {
  return {
    type: 'SET_DEFAULT_PAGE_MODEL',
    state,
  };
};

export const updateMultiSlotContent = (
  slotContent: any,
  currentSlot: number,
  prelemIndex: number
) => {
  return {
    type: 'UPDATE_MULTISLOT_CONTENT',
    slotContent,
    currentSlot,
    prelemIndex,
  };
};

export const updateImageVideoGalleryContent = (
  content,
  selectedPrelemIndex,
  activeTab,
  EditorialItemPath
) => {
  return {
    type: 'UPDATE_IMAGE_VIDEO_GALLERY_CONTENT',
    content,
    selectedPrelemIndex,
    activeTab,
    EditorialItemPath,
  };
};

export const updateFeatureBoxServiceCardContent = (
  slotContent: any,
  prelemIndex: number
) => {
  return {
    type: 'UPDATE_FEATUREBOX_SERVICECARD_CONTENT',
    slotContent,
    prelemIndex,
  };
};

export const updateDynamicPrelemContent = (
  contentObj: any,
  prelemIndex: number
) => {
  return {
    type: 'UPDATE_DYNAMICPRELEM_CONTENT',
    payload: {
      contentObj,
      prelemIndex,
    },
  };
};

export const setDashboardData = (payload: any) => {
  return {
    type: 'DASHBOARD_CONTENT',
    payload: payload,
  };
};

export const updateEcommercePrelemQueryParam = (
  data: any,
  prelemIndex: number,
  selectedSlot: number
) => {
  return {
    type: 'UPDATE_ECOMMERCEPRELEM_QUERYPARAM',
    data,
    prelemIndex,
    selectedSlot,
  };
};

export const updatePageModelModificationDate = (date) => {
  return {
    type: 'UPDATE_MODIFIED_DATE',
    date,
  };
};
