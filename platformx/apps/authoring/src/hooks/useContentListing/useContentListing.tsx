import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { previewArticle } from '../../articles/Actions';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';

import { fetchContent } from '../../Common/Listing/Utils/Helper';
import { previewContent } from '../../pages/QuizPollEvents/store/ContentAction';
import fetchContentByPathAPI, {
  createContentType,
  deleteContentType,
  fetchContentByPath,
  publishContentType,
} from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { LanguageList } from '../../utils/constants';
import {
  capitalizeFirstLetter,
  convertToLowerCase,
  getCurrentLang,
  getSelectedSite,
  getSubDomain,
} from '../../utils/helperFunctions';
import {
  mapDeleteContent,
  mapDuplicateContent,
  mapUnPublishContent,
} from '../useQuizPollEvents/mapper';
import { CONTENT_CONSTANTS } from '../useQuizPollEvents/Uitls/Constants';
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
const useContentListing = (filter?: string, contentType?: string) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(Store);
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
        sitename: getSelectedSite(),
      },
    },
  });

  const location = useLocation();

  const fetchContentDetails = async (listItemDetails) => {
    try {
      const response: any = await fetchContentByPathAPI.fetchContent({
        contentType:
          listItemDetails.tagName === 'VOD'
            ? 'Vod'
            : capitalizeFirstLetter(listItemDetails.tagName),
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
  const deleteContent = async (listItemDetails) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      if (selectedItem.page_state == PUBLISHED) {
        await unPublish(listItemDetails);
      }
      try {
        const contentToSend = mapDeleteContent(
          listItemDetails.tagName === 'VOD'
            ? 'Vod'
            : capitalizeFirstLetter(listItemDetails.tagName),
          selectedItem
        );
        const unPublishResponse = await deleteMutate({
          variables: {
            ...contentToSend,
          },
        });
        if (unPublishResponse) {
          dispatch(
            await fetchContent(
              state.content.contentType,
              location,
              filter,
              state,
              true
            )
          );
          showToastSuccess(
            `${capitalizeFirstLetter(listItemDetails.tagName)} ${t(
              'deleted_toast'
            )}`
          );
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
          listItemDetails.tagName === 'VOD'
            ? 'Vod'
            : capitalizeFirstLetter(listItemDetails.tagName),
          selectedItem.page
        );
        const unPublishResponse = await unPublishMutate({
          variables: {
            ...contentToSend,
          },
        });
        if (unPublishResponse) {
          dispatch(
            await fetchContent(
              state.content.contentType,
              location,
              filter,
              state,
              true
            )
          );
          showToastSuccess(
            `${capitalizeFirstLetter(listItemDetails.tagName)} ${t(
              'unpublished_toast'
            )}`
          );
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const view = async (listItemDetails) => {
    // window.open(
    //   `${authInfo.publishUri + i18n.language
    //   }/${listItemDetails.tagName?.toLowerCase()}${listItemDetails?.currentPageUrl
    //   }`
    // );

    if (listItemDetails.tagName.toUpperCase() === 'VOD') {
      window.open(
        `${getSubDomain()}/${i18n.language}/video${
          listItemDetails?.currentPageUrl
        }`
      );
    } else if (listItemDetails.tagName === convertToLowerCase('Courses')) {
      window.open(
        `${getSubDomain()}/${i18n.language}/course/course-details?courseId=${
          listItemDetails?.course_id
        }`
      );
      // window.open(`${listItemDetails?.currentPageUrl}`);
    } else {
      window.open(
        `${getSubDomain()}/${
          i18n.language
        }/${listItemDetails.tagName?.toLowerCase()}${
          listItemDetails?.currentPageUrl
        }`
      );
    }
  };

  const edit = async (listItemDetails) => {
    dispatch(previewContent({}));
    dispatch(previewArticle({}));
    navigate(
      `/content/create-${listItemDetails.tagName?.toLowerCase()}?path=${
        listItemDetails.page
      }`
    );
  };

  const preview = async (listItemDetails) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    const type = capitalizeFirstLetter(listItemDetails?.tagName);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        if (
          selectedItem?.page_state === DRAFT ||
          selectedItem?.page_state == UNPUBLISHED
        ) {
          const qusArry = [];
          if (
            selectedItem?.questions?.length &&
            capitalizeFirstLetter(listItemDetails.tagName) === QUIZ
          ) {
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
              contentType: type,
            };
            dispatch(previewContent(tempObj));
            navigate(PREVIEW_PATH);
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === POLL) {
            dispatch(previewContent({ ...selectedItem, contentType: type }));
            navigate(PREVIEW_PATH);
          } else if (
            capitalizeFirstLetter(listItemDetails.tagName) === 'Article'
          ) {
            dispatch(
              previewArticle({
                ...selectedItem,
                page_lastmodifiedby: selectedItem.last_modifiedBy,
                developed_date: selectedItem.creationDate,
              })
            );
            navigate('/article-preview');
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === EVENT) {
            const eventToPreview = {
              ...selectedItem,
              settings: selectedItem?.settingsProperties,
              PageTags: selectedItem?.tags,
              lastModifiedDate: selectedItem?.modificationDate,
              last_modification_date: selectedItem?.modificationDate,
              AnalyticsEnable: selectedItem?.analytics_enable,
            };
            dispatch(previewContent({ ...eventToPreview, contentType: type }));
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
          capitalizeFirstLetter(listItemDetails.tagName),
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
              contenttype: capitalizeFirstLetter(listItemDetails.tagName),
              input: { ...contentToSend },
            },
            context: {
              headers: {
                language: lang.id,
                sitename: getSelectedSite(),
              },
            },
          });
          response.push({
            language: lang.value,
            data: result?.data?.authoring_createArticle,
          });
        }
        if (response && response.length > 0) {
          dispatch(
            await fetchContent(
              state.content.contentType,
              location,
              filter,
              state,
              true
            )
          );
          for (const res of response) {
            showToastSuccess(
              `${t(capitalizeFirstLetter(listItemDetails.tagName))} ${t(
                'duplicated_toast'
              )} ${t('for')} ${res.language}`
            );
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      showToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t('for')} ` //${l.value}
          : t('api_error_toast')
      );
    }
  };

  const duplicateToSite = async (
    IsDuplicate = false,
    title,
    listItemDetails: any,
    siteTitle
  ) => {
    try {
      const selectedItem = await fetchContentDetails(listItemDetails);

      if (selectedItem && Object.keys(selectedItem).length > 0) {
        const contentToSend = mapDuplicateContent(
          capitalizeFirstLetter(listItemDetails.tagName),
          title,
          IsDuplicate,
          selectedItem,
          username,
          i18n.language
        );
        // const selectedLanguage = LanguageList.filter((langObj) =>
        //   language.includes(langObj.value)
        // );
        // const response = [];
        //   for (const lang of selectedLanguage) {
        const result = await createMutate({
          variables: {
            contenttype: capitalizeFirstLetter(listItemDetails.tagName),
            input: { ...contentToSend },
          },
          context: {
            headers: {
              language: getCurrentLang(),
              sitename: siteTitle,
            },
          },
        });
        return result;
        // response.push({
        //   language: lang.value,
        //   data: result?.data?.authoring_createArticle,
        // });
        //   }
        // if (response && response.length > 0) {
        //   dispatch(
        //     await fetchContent(
        //       state.content.contentType,
        //       location,
        //       filter,
        //       state,
        //       true
        //     )
        //   );
        //   for (const res of response) {
        //     showToastSuccess(
        //       `${t(capitalizeFirstLetter(listItemDetails.tagName))} ${t(
        //         'duplicated_toast'
        //       )} ${t('for')} ${res.language}`
        //     );
        //   }
        // }
      }
    } catch (error: any) {
      console.log(error);
      showToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t('for')} ` //${l.value}
          : t('api_error_toast')
      );
    }
  };

  return {
    unPublish,
    duplicate,
    preview,
    view,
    deleteContent,
    edit,
    fetchContentDetails,
    duplicateToSite,
  };
};

export default useContentListing;
