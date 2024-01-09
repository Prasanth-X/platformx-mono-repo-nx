import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  ShowToastError,
  ShowToastSuccess,
} from '@platformx/utilities';
import { DashboardTypes, Dashboard_Keys } from '../../services/utils/dashboard/Dashboard.types';
import { previewContent, previewArticle } from '@platformx/authoring-state';
import fetchContentByPathAPI, {
  createContentType,
  deleteContentType,
  fetchContentByPath,
  publishContentType,
} from '../../services/contentTypes/contentTypes.api';
import dashboardApi from '../../services/dashboard/dashBoard.api';
import { LanguageList } from '../../utils/constants';
import {
  capitalizeFirstLetter,
  getSubDomain,
} from '@platformx/utilities';
import usePage from '../usePage/usePage';
import { CONTENT_CONSTANTS } from '../useQuizPollEvents/Utils/Constants';
import {
  mapDeleteContent,
  mapDuplicateContent,
  mapUnPublishContent,
  pageObjectMapper,
} from '../useQuizPollEvents/mapper';
import { useUserSession } from "@platformx/utilities";
import { useDispatch } from 'react-redux';
import { UPDATE_TASK_STATUS } from '../../graphQL/queries/dashboardQueries';

const {
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
const useDashboardData = (contentType = 'ALL') => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [deleteMutate] = useMutation(deleteContentType);
  const [unPublishMutate] = useMutation(publishContentType);
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const [taskMutate] = useMutation(UPDATE_TASK_STATUS);

  const [createMutate] = useMutation(createContentType, {
    context: {
      headers: {
        language: localStorage.getItem(LANG),
      },
    },
  });

  const [dashBoardData, setDashBoardData] = useState<DashboardTypes>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchDashBoardData = async () => {
    try {
      setLoading(true);
      const response: any = await dashboardApi.fetchDashboardData({
        contentType: Dashboard_Keys.SITE_PAGE,
        all: Dashboard_Keys.ALL,
        unPublish: Dashboard_Keys.SCHEDULED_UNPUBLISH,
        publish: Dashboard_Keys.SCHEDULED_PUBLISH,
        contentFilter: Dashboard_Keys.ALL,
        pagePagination: { start: 0, rows: 50 },
        contentPagination: { start: 0, rows: 10 },
        scheduledPagination: { start: 0, rows: 5 },
        sort: Dashboard_Keys.DESC,
        searchTerm: '',
        dashboardPage: Dashboard_Keys.DASHBOARD,
        boostPage: Dashboard_Keys.BOOST_PAGE,
      });
      if (response) {
        const {
          publish = [],
          unPublish = [],
          recentPages = [],
          boostContent = [],
          createContent = [],
          recentContent = [],
          taskPages = [],
          userCourseList = [],
          coursesList = [],
        } = response || {};
        const dt: any = {
          ...dashBoardData,
          recentPages: recentPages
            ?.filter((page: any) => page?.page_state !== 'unpublished')
            ?.slice(0, 10),
          boostContent: boostContent[0]?.compoundData?.slice(0, 15),
          scheduled: [...publish, ...unPublish]?.slice(0, 9),
          createContent: createContent[0]?.compoundData?.slice(0, 15),
          recentContent: recentContent,
          taskPages: taskPages,
          userCourseList: userCourseList,
          coursesList: coursesList,
        };
        setDashBoardData(dt);
      } else {
        console.log('error in dashboard api');

        //ShowToastError(t('api_error_toast'));
      }
    } catch (err: any) {
      // setError(err);
      // ShowToastError(err);
      console.log('error in dashboard api');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  const fetchContentDetails = async (listItemDetails: any) => {
    try {
      const response: any = await fetchContentByPathAPI.fetchContent({
        contentType: capitalizeFirstLetter(listItemDetails?.ContentType),
        path: listItemDetails?.page,
      });
      if (response.authoring_getCmsContentByPath) {
        const { authoring_getCmsContentByPath: content } = response;
        return content;
      }
    } catch (err) {
      ShowToastError(t('api_error_toast'));
    }
  };
  const deleteContent = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    const { ContentType } = listItemDetails;

    if (selectedItem && Object.keys(selectedItem).length > 0) {
      if (selectedItem.page_state == PUBLISHED) {
        await unPublish(listItemDetails);
      }
      try {
        const contentToSend = mapDeleteContent(ContentType, selectedItem);

        const unPublishResponse = await deleteMutate({
          variables: {
            ...contentToSend,
          },
        });
        if (unPublishResponse) {
          fetchDashBoardData();
          ShowToastSuccess(`${ContentType} ${t('deleted_toast')}`);
        }
      } catch (error: any) {
        ShowToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const unPublish = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        const contentToSend = mapUnPublishContent(
          listItemDetails?.ContentType,
          selectedItem.page
        );
        const unPublishResponse = await unPublishMutate({
          variables: {
            ...contentToSend,
          },
        });
        if (unPublishResponse) {
          fetchDashBoardData();
          ShowToastSuccess(
            `${listItemDetails?.ContentType} ${t('unpublished_toast')}`
          );
        }
      } catch (error: any) {
        ShowToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const view = (listItemDetails: any) => {
    window.open(
      `${getSubDomain()}/${
        i18n.language
      }/${listItemDetails?.ContentType?.toLowerCase()}${
        listItemDetails?.currentPageUrl
      }`
    );
  };
  const { editPage } = usePage();
  const edit = (listItemDetails: any, obj = {}) => {
    if (listItemDetails?.ContentType?.toLowerCase() === 'sitepage') {
      editPage(pageObjectMapper(obj));
    } else {
      navigate(
        `/content/create-${listItemDetails?.ContentType?.toLowerCase()}?path=${
          listItemDetails.page
        }`
      );
    }
  };

  const preview = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    const { contentType } = listItemDetails;
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        if (
          selectedItem?.page_state === DRAFT ||
          selectedItem?.page_state == UNPUBLISHED
        ) {
          const qusArry: any = [];
          if (selectedItem?.questions?.length && contentType === QUIZ) {
            selectedItem?.questions?.map((qus: any) => {
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
            ShowToastError(t(PREVIEW_PATH));
          }
        }
      } catch (error: any) {
        ShowToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };
  const duplicate = async (
    IsDuplicate = false,
    title = '',
    language = '',
    listItemDetails: any
  ) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    try {
      if (selectedItem && Object.keys(selectedItem).length > 0) {
        const contentToSend = mapDuplicateContent(
          listItemDetails?.ContentType,
          title,
          IsDuplicate,
          selectedItem,
          username,
          i18n.language
        );
        const selectedLanguage = LanguageList.filter((langObj) =>
          language.includes(langObj.value)
        );
        const response: any = [];
        for (const lang of selectedLanguage) {
          const result = await createMutate({
            variables: {
              contenttype: listItemDetails?.ContentType,
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
          fetchDashBoardData();

          for (const res of response) {
            ShowToastSuccess(
              `${t(contentType)} ${t('duplicated_toast')} ${t('for')} ${
                res.language
              }`
            );
          }
        }
      }
    } catch (error: any) {
      ShowToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t('for')} ` //${l.value}
          : t('api_error_toast')
      );
    }
  };

  const changeStatus = async (data: any) => {
    setLoading(true);
    try {
      const responseAccept = await taskMutate({
        variables: {
          input: {
            last_modified_by: data.last_modified_by,
            task_status: data.status,
            title: data.title,
          },
        },
        onCompleted: (res) => {
          fetchDashBoardData();
        },
      });
      setLoading(false);
      ShowToastSuccess(responseAccept.data.authoring_updateTask.message);
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
      setLoading(false);
    }
  };

  return {
    dashBoard: dashBoardData,
    loading,
    error,
    unPublish,
    duplicate,
    preview,
    view,
    deleteContent,
    edit,
    fetchDashBoardData,
    fetchContentDetails,
    changeStatus
  };
};

export default useDashboardData;
