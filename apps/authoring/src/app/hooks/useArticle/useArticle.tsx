import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { SearchContentListQueries } from '../../graphql/searchContentList/searchContentListQueries';
import {
  createContentType,
  deleteContentType,
  publishContentType,
} from '../../services/contentTypes/contentTypes.api';
import { LanguageList } from '../../utils/constants';
import { getSelectedSite } from '../../utils/helperFunctions';
import useUserSession from '../useUserSession/useUserSession';
import {
  mapDuplicateArticle,
  mapFetchArticles,
  mapPublishArticle,
} from './mapper';
interface ApiResponse {
  authoring_getContentTypeItems: any[];
}
const useArticle = (filter = 'ALL') => {
  const rows = 20;
  const { t } = useTranslation();
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  /** fetch all the article */
  const variables = mapFetchArticles(0, location.state, filter);
  const { data, loading, error, refetch, fetchMore } = useQuery<ApiResponse>(
    SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
    {
      variables,
      fetchPolicy: 'network-only',
    }
  );

  const articles = useMemo(() => {
    return data?.authoring_getContentTypeItems?.sort(
      (a, b) => b?.last_modification_date - a.last_modification_date
    );
  }, [data]);

  /** delete article */
  const [mutateDelete] = useMutation(deleteContentType, {
    onCompleted: () => refetch(),
  });

  /** create article */
  const [createMutate] = useMutation(createContentType, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
        sitename: getSelectedSite()
      },
    },
  });

  /** create article */
  const [unPublishMutate] = useMutation(publishContentType, {
    update: (cache, { data: { unPublishMutate } }) => {
      cache.modify({
        id: cache.identify(unPublishMutate),
        fields: {
          Status: unPublishMutate.Status,
        },
      });
    },
    onCompleted: () => refetch(),
  });

  /** delete article */
  const deleteArticle = async (selectedArticle: any) => {
    try {
      const deleteResponse = await mutateDelete({
        variables: {
          contentInfo: {
            page: selectedArticle?.page,
            current_page_url: selectedArticle?.currentPageUrl,
            parent_page_url: selectedArticle?.parentPageUrl,
          },
          contentType: 'Article',
        },
        update: () => {
          refetch();
        },
      });
      if (deleteResponse) {
        showToastSuccess(`${t('article')} ${t('deleted_toast')}`);
      } else {
        showToastError(t('api_error_toast'));
      }
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };

  /** duplicate article */
  const duplicate = async (title, language, selectedArticle: any) => {
    try {
      if (selectedArticle && Object.keys(selectedArticle).length > 0) {
        const articleRequest = mapDuplicateArticle(
          title,
          username,
          selectedArticle
        );
        const selectedLanguage = LanguageList.filter((langObj) =>
          language.includes(langObj.value)
        );
        const response = [];
        for (const lang of selectedLanguage) {
          const result = await createMutate({
            variables: {
              contenttype: 'Article',
              input: articleRequest,
            },
            context: {
              headers: {
                language: lang.id,
                sitename: getSelectedSite()
              },
            },
          });
          response.push({
            language: lang.value,
            data: result?.data?.authoring_createArticle,
          });
        }
        if (response && response.length > 0) {
          refetch();
          for (const res of response) {
            showToastSuccess(
              `${t('article')} ${t('duplicated_toast')} ${t('for')} ${res.language
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

  /**unPublish article */
  const unPublish = async (selectedItem) => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        const articleToSend = mapPublishArticle(selectedItem);
        const unPublishResponse = await unPublishMutate({
          variables: {
            contentType: 'Article',
            input: articleToSend,
          },
          update: () => {
            refetch();
          },
        });
        if (unPublishResponse) {
          refetch();
          showToastSuccess(`${t('article')} ${t('unpublished_toast')}`);
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  /**fetchMore articles */
  const handleFetchMore = useCallback(() => {
    const variables = mapFetchArticles(
      articles.length + 1,
      location.state,
      filter
    );

    fetchMore({
      variables: variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          authoring_getContentTypeItems:
            prev.authoring_getContentTypeItems?.concat(
              fetchMoreResult.authoring_getContentTypeItems || []
            ),
        };
      },
    });
  }, [fetchMore, articles?.length]);

  return {
    deleteArticle,
    handleFetchMore,
    duplicate,
    unPublish,
    loading,
    contents: articles,
    error,
  };
};

export default useArticle;
