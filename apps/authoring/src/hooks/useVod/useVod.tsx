import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { VodInstance } from '../../pages/vod/vodListing/vodListing.types';
import fetchVodByIdAPI, {
  create_vod,
  delete_vod,
  unpublish_vod,
} from '../../services/vod/vod.api';
import { LanguageList, MENU_STATE_DRAFT } from '../../utils/constants';
import { formatUrl, updateStructureDataVOD } from '../../utils/helperFunctions';
import useFetchContentList from '../useContentList/useContentList';
import useUserSession from '../useUserSession/useUserSession';
import { getSampVod } from './mapper';

interface ApiResponse {
  authoring_getContentTypeItems: any[];
}

const useVod = (filter = 'ALL') => {
  const { data: contentList, fetchContent } = useFetchContentList('Vod', false);
  const location = useLocation();
  const [getSession] = useUserSession();
  const navigate = useNavigate();

  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const vodInstance = useRef<VodInstance>(getSampVod(username));

  // const variables = mapFetchVod(0, location.state, filter);
  // const { data, loading, error, refetch, fetchMore } = useQuery<ApiResponse>(
  //   SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
  //   {
  //     variables,
  //     fetchPolicy: 'network-only',
  //   }
  // );

  // const vods = useMemo(() => {
  //   return data?.authoring_getContentTypeItems?.sort(
  //     (a, b) => b?.last_modification_date - a.last_modification_date
  //   );
  // }, [data]);

  const { t, i18n } = useTranslation();

  const [mutateDelete] = useMutation(delete_vod, {
    onCompleted: () => fetchContent(0, 'ALL', true),
  });
  const [mutateUnpublish] = useMutation(unpublish_vod, {
    update: (cache, { data: { mutateUnpublish } }) => {
      cache.modify({
        id: cache.identify(mutateUnpublish),
        fields: {
          Status: mutateUnpublish.Status,
        },
      });
    },
    onCompleted: () => fetchContent(0, 'ALL', true),
  });
  const [createvodemutate] = useMutation(create_vod, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
      },
    },
  });

  const fetchContentDetails = async (listItemDetails) => {
    try {
      const data: any = await fetchVodByIdAPI.fetchContent({
        folder: 'vodcontent',
        path: listItemDetails?.page,
      });
      const vodObj = data?.authoring_getCmsVodByPath;
      delete vodObj.__typename;
      return vodObj;
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };

  const deleteVod = async (selectedVod: any) => {
    try {
      const vodInfo = {
        page: selectedVod?.page,
        currentpageurl: selectedVod?.currentPageUrl,
        parentpageurl: selectedVod?.parentPageUrl,
      };
      const deleteResponse = await mutateDelete({
        variables: {
          input: vodInfo,
        },
        update: () => {
          fetchContent(0, 'ALL', true);
        },
      });
      if (deleteResponse) {
        fetchContent(0, 'ALL', true);
        showToastSuccess(`${t('vod')} ${t('deleted_toast')}`);
      } else {
        showToastError(t('api_error_toast'));
        return deleteResponse;
      }
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };

  const unPublish = async (selectedVod, calledFromDelete = false) => {
    if (selectedVod && Object.keys(selectedVod).length > 0) {
      try {
        const unPublishResponse = await mutateUnpublish({
          variables: {
            page: selectedVod?.page,
            parentpageurl: selectedVod?.parentPageUrl,
            currentpageurl: selectedVod?.currentPageUrl,
          },
          update: () => {
            fetchContent(0, 'ALL', true);
          },
        });
        if (unPublishResponse) {
          fetchContent(0, 'ALL', true);
          if (calledFromDelete) {
            deleteVod(selectedVod);
          } else {
            showToastSuccess(`${t('vod')} ${t('unpublished_toast')}`);
          }
        }
      } catch (error: any) {
        showToastError(
          error?.graphQLErrors[0]?.message || t('api_error_toast')
        );
      }
    }
  };

  const onCopy = (pageUrl) => {
    if (pageUrl) {
      navigator.clipboard.writeText(
        `${process.env.NX_PUBLISH_URI + i18n.language}/` + `video${pageUrl}`
      );
      showToastSuccess(t('url_copy_toast'));
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  const handleOpenVod = (item) => {
    const pageState = item?.page_state;
    if (pageState?.toLowerCase() === 'pending') {
      return;
    }
    navigate(`/content/create-vod?path=${item.page}`);
  };

  const getVodInstance = (selectedVod) => {
    const creatorDetails = {
      Page_CreatedBy: username,
      Page_LastModifiedBy: username,
      Page_PublishedBy: '',
      Author: username,
    };
    vodInstance.current = {
      ...vodInstance.current,
      ...selectedVod,
      ...creatorDetails,
    };
  };

  const duplicate = async ({
    IsDuplicate,
    title,
    language,
    listItemDetails,
    isCalled,
    arr,
    setArr,
    setOpenPageExistModal,
    setLangContent,
  }) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    getVodInstance(selectedItem);

    let temp = '';
    const url = formatUrl(title ? title : vodInstance.current.Title);
    if (title) {
      vodInstance.current.Title = title;
    }

    const structureData = updateStructureDataVOD(
      title,
      vodInstance.current?.Description,
      vodInstance.current?.DsapceVideoUrl,
      vodInstance.current?.Thumbnail
    );
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance.current)),
      Title: vodInstance.current.Title,
      Page: url,
      CurrentPageURL: `/${url}`,
      Page_State: MENU_STATE_DRAFT,
      IsConfirm: IsDuplicate,
      StructureData: JSON.stringify(structureData),
    };

    if (!isCalled) {
      language.map((lang) => {
        LanguageList.map((l) => {
          if (l.value === lang) {
            localStorage.setItem('lang', l.id);
            createvodemutate({
              variables: {
                input: vodToSend,
              },
              context: {
                headers: {
                  language: localStorage.getItem('lang'),
                },
              },
            })
              .then((resp) => {
                localStorage.removeItem('lang');
                if (resp?.data?.authoring_createVod?.isExist) {
                  temp += `${l.value},`;
                  setLangContent(temp);

                  setOpenPageExistModal(true);
                  setArr((prev) => [...prev, { id: l.id, value: lang }]);
                } else {
                  showToastSuccess(
                    `${t('vod')} ${t('duplicated_toast')} ${t('for')} ${
                      l.value
                    }`
                  );

                  fetchContent(0, 'ALL', true);
                }
              })
              .catch((error) => {
                if (error?.graphQLErrors[0]) {
                  showToastError(error.graphQLErrors[0].message);
                } else {
                  showToastError(t('api_error_toast'));
                }
              });
          }
        });
      });
    } else {
      arr.map((val) => {
        localStorage.setItem('lang', val.id);
        createvodemutate({
          variables: {
            input: vodToSend,
          },
          context: {
            headers: {
              language: localStorage.getItem('lang'),
            },
          },
        })
          .then((resp) => {
            localStorage.removeItem('lang');
            if (resp?.data?.authoring_createVod?.isExist) {
              setOpenPageExistModal(true);
            } else {
              setOpenPageExistModal(false);

              showToastSuccess(
                `${t('vod')} ${t('duplicated_toast')} ${t('for')} ${val.value}`
              );
              fetchContent(0, 'ALL', true);
            }
          })
          .catch((error) => {
            if (error?.graphQLErrors[0]) {
              showToastError(error.graphQLErrors[0].message);
            } else {
              showToastError(t('api_error_toast'));
            }
          });
      });
      setArr([]);
    }
  };

  // const handleFetchMore = useCallback(() => {
  //   const variables = mapFetchVod(vods.length + 1, location.state, filter);

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
  // }, [fetchMore, vods?.length]);

  return {
    deleteVod,
    // handleFetchMore,
    duplicate,
    fetchContentDetails,
    unPublish,
    onCopy,
    handleOpenVod,
    // loading,
    // contents: vods,
    // error,
  };
};

export default useVod;
