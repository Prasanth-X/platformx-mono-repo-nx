import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { previewArticle } from '../../../src/articles/Actions';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { previewContent } from '../../pages/QuizPollEvents/store/ContentAction';

import fetchContentByPathAPI, {
  createContentType,
  deleteContentType,
  fetchContentByPath,
  publishContentType,
} from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { authInfo } from '../../utils/authConstants';
import { LanguageList } from '../../utils/constants';
import useFetchContentList from '../useContentList/useContentList';
import {
  mapDeleteContent,
  mapDuplicateContent,
  mapFetchALL,
  mapUnPublishContent,
} from './mapper';
import { CONTENT_CONSTANTS, ROW_SIZE } from './Uitls/Constants';
import useUserSession from '../useUserSession/useUserSession';
const {
  ALL,
  LANG,
  DRAFT,
  EVENT,
  POLL,
  PUBLISHED,
  QUESTION,
  QUIZ,
  UNPUBLISHED,
  PREVIEW_PATH,
} = CONTENT_CONSTANTS;
const useQuizPollEvents = (contentType, filter = 'ALL') => {
  const { data: contentList, fetchContent } = useFetchContentList(
    contentType,
    false
  );
  const { t, i18n } = useTranslation();
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [deleteMutate] = useMutation(deleteContentType);
  const [unPublishMutate] = useMutation(publishContentType);
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const [createMutate] = useMutation(createContentType, {
    context: {
      headers: {
        language: localStorage.getItem(LANG),
      },
    },
  });
  const [pagination, setPagination] = useState({ start: 0, rows: ROW_SIZE });
  let list = [];
  const location = useLocation();
  interface ApiResponse {
    authoring_getContentTypeItems: any[];
  }

  const variables = mapFetchALL(
    location.state,
    filter,
    contentType,
    pagination
  );
  // const { data, loading, error, fetchContent, fetchMore } = useQuery<ApiResponse>(
  //   SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
  //   {
  //     variables,
  //     fetchPolicy: 'network-only',
  //   }
  // );

  // list = useMemo(() => {
  //   return data?.authoring_getContentTypeItems?.sort(
  //     (a, b) => b?.last_modification_date - a.last_modification_date
  //   );
  // }, [data]);

  const fetchContentDetails = async (listItemDetails) => {
    try {
      const response: any = await fetchContentByPathAPI.fetchContent({
        contentType: contentType,
        path: listItemDetails?.page,
      });
      if (response.authoring_getCmsContentByPath) {
        const { authoring_getCmsContentByPath: content } = response;
        return content;
      }
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };

  // const fetchMoreContent = () => {
  //   const newPagination = {
  //     start: list?.length + 1,
  //     rows: ROW_SIZE,
  //   };
  //   const variables = mapFetchALL(
  //     list.length + 1,
  //     location.state,
  //     filter,
  //     contentType,
  //     newPagination
  //   );
  //   fetchMore({
  //     variables: variables,
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       return {
  //         authoring_getContentTypeItems:
  //           prev.authoring_getContentTypeItems?.concat(
  //             fetchMoreResult.authoring_getContentTypeItems || []
  //           ),
  //       };
  //     },
  //   });
  //   setPagination(newPagination);
  // };

  const deleteContent = async (listItemDetails) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      if (selectedItem.page_state == PUBLISHED) {
        await unPublish(selectedItem);
      }
      try {
        const contentToSend = mapDeleteContent(contentType, selectedItem);

        const unPublishResponse = await deleteMutate({
          variables: {
            ...contentToSend,
          },
          update: () => {
            fetchContent(0, 'ALL', true);
          },
        });
        if (unPublishResponse) {
          showToastSuccess(`${contentType} ${t('deleted_toast')}`);
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const unPublish = async (listItemDetails) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        const contentToSend = mapUnPublishContent(
          contentType,
          selectedItem.page
        );
        const unPublishResponse = await unPublishMutate({
          variables: {
            ...contentToSend,
          },
          update: () => {
            fetchContent(0, 'ALL', true);
          },
        });
        if (unPublishResponse) {
          // fetchMore();
          showToastSuccess(`${contentType} ${t('unpublished_toast')}`);
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const duplicate = async (
    IsDuplicate = false,
    title,
    language,
    listItemDetails: any
  ) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    try {
      if (selectedItem && Object.keys(selectedItem).length > 0) {
        const contentToSend = mapDuplicateContent(
          contentType,
          title,
          IsDuplicate,
          selectedItem,
          username,
          i18n.language
        );
        const selectedLanguage = LanguageList.filter((langObj) =>
          language.includes(langObj.value)
        );
        const response = [];
        for (const lang of selectedLanguage) {
          const result = await createMutate({
            variables: {
              contenttype: contentType,
              input: { ...contentToSend },
            },
            context: {
              headers: {
                language: lang.id,
              },
            },
          });
          response.push({
            language: lang.value,
            data: result?.data?.authoring_createArticle,
          });
        }
        if (response && response.length > 0) {
          fetchContent(0, 'ALL', true);
          for (const res of response) {
            showToastSuccess(
              `${t(contentType)} ${t('duplicated_toast')} ${t('for')} ${
                res.language
              }`
            );
          }
        }
      }
    } catch (error: any) {
      showToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t('for')} ` //${l.value}
          : t('api_error_toast')
      );
    }
  };

  const view = (listItemDetails) => {
    window.open(
      `${authInfo.publishUri + i18n.language}/${contentType?.toLowerCase()}${
        listItemDetails?.currentPageUrl
      }`
    );
  };

  const edit = (listItemDetails) => {
    navigate(
      `/content/create-${contentType.toLowerCase()}?path=${
        listItemDetails.page
      }`
    );
  };

  const preview = async (listItemDetails) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        if (
          selectedItem?.page_state === DRAFT ||
          selectedItem?.page_state == UNPUBLISHED
        ) {
          const qusArry = [];
          if (selectedItem?.questions?.length && contentType === QUIZ) {
            selectedItem?.questions?.map((qus) => {
              runFetchContentByPath({
                variables: { contentType: QUESTION, path: qus },
              })
                .then((res) => {
                  if (res?.data?.authoring_getCmsContentByPath) {
                    const qusObj = res?.data
                      ?.authoring_getCmsContentByPath as never;
                    qusArry.push(qusObj);
                  }
                })
                .catch((err) => {
                  console.log(JSON.stringify(err, null, 2));
                });
            });
            const tempObj = {
              ...selectedItem,
              questions: qusArry,
              contentType,
            };
            dispatch(previewContent(tempObj));
            navigate(PREVIEW_PATH);
          } else if (contentType === POLL) {
            dispatch(previewContent({ ...selectedItem, contentType }));
            navigate(PREVIEW_PATH);
          } else if (contentType === 'Article') {
            dispatch(previewArticle(selectedItem));
            navigate('/article-preview');
          } else if (contentType === EVENT) {
            const eventToPreview = {
              ...selectedItem,
              settings: selectedItem?.settingsProperties,
              PageTags: selectedItem?.tags,
              lastModifiedDate: selectedItem?.modificationDate,
              last_modification_date: selectedItem?.modificationDate,
              AnalyticsEnable: selectedItem?.analytics_enable,
            };
            dispatch(previewContent({ ...eventToPreview, contentType }));
            navigate(PREVIEW_PATH);
          } else {
            showToastError(t(PREVIEW_PATH));
          }
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  return {
    contents: list,
    // fetchMoreContent,
    deleteContent,
    unPublish,
    duplicate,
    view,
    edit,
    preview,
    // loading,
    // error,
  };
};

export default useQuizPollEvents;
