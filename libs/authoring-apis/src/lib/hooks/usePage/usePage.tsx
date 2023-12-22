import { useLazyQuery, useMutation } from '@apollo/client';
import { addMinutes } from 'date-fns';
import { usePlatformAnalytics } from '@platformx/utilities';
import { SetStateAction, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PageData } from '@platformx/authoring-state';
import { consolidatePageModel } from './mapper';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { PageQueries } from '../../graphQL/queries/pageQueries';
import { FETCH_PRELEM_VALIDATION } from '../../graphQL/queries/prelemQueries';
import { useUserSession } from '@platformx/utilities';
import {
  getCurrentLang,
  getSelectedSite,
  getSubDomain,
} from '@platformx/utilities';
import { TFunction } from 'i18next';
import { ShowToastError, ShowToastSuccess } from '@platformx/utilities';

const PageModelInstanceDefault = {
  Page: '',
  SiteName: '',
  Title: '',
  ParentPageURL: '/',
  CurrentPageURL: '/',
  DevelopedBy: '',
  DevelopedDate: '',
  IsEdit: false,
  SeoEnable: true,
  AnalyticsEnable: true,
  RobotTxt: false,
  SiteMap: false,
  Children: null,
  Analytics: '',
  Others: '',
  StructureData: '',
  PageSettings: {},
  Page_LastModificationDate: '',
};
const usePage = (filter = 'ALL') => {
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { t, i18n } = useTranslation();
  const { pageInfo } = useSelector((state: PageData) => state);
  const [runFetchPageModel] = useLazyQuery(PageQueries.FETCH_PAGE_MODEL_DRAFT);
  const [runFetchValidationQuery] = useLazyQuery(FETCH_PRELEM_VALIDATION);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const useremail = userInfo.username;

  const [handleImpression] = usePlatformAnalytics();
  const [mutate] = useMutation(PageQueries.CREATE_PAGE_MODEL, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
        sitename: getSelectedSite(),
      },
    },
  });
  const [mutateUnpublish] = useMutation(PageQueries.UNPUBLISH_PAGE);
  const [mutateDelete] = useMutation(PageQueries.DELETE_PAGE);
  const [directDelete, setDirectDelete] = useState<boolean>(false);
  const [rescheduleDto, setRescheduledDto] = useState({});
  const [currentPublishTime, setCurrentPublishTime] = useState('');
  const [currentUnpublishTime, setCurrentUnpublishTime] = useState('');
  const [mutatePublishSchedule] = useMutation(PageQueries.RESCHEDULE_PUBLISH);
  const [mutateUnpublishSchedule] = useMutation(
    PageQueries.RESCHEDULE_UNPUBLISH
  );
  const [cancelTriggerType, setCancelTriggerType] = useState('');
  const [selectedPageData, setPageData] = useState<any>({});
  const [mutateCancelPublishSchedule] = useMutation(PageQueries.CANCEL_PUBLISH);
  const [mutateCancelUnpublishSchedule] = useMutation(
    PageQueries.CANCEL_UNPUBLISH
  );
  const [isCancelTrigger, setIsCancelTrigger] = useState(false);
  const navigate = useNavigate();
  const [mutatePublish] = useMutation(PageQueries.PUBLISH_PAGE_MODEL);
  localStorage.setItem('lang', getCurrentLang());

  // operations
  const cardClickHandle = useCallback(
    (
      parameter: string,
      status: string,
      pathForSelectedPage: string,
      actionType?: string,
      deviceType?: string,
      editOption?: string,
      searchCatURL?: string,
      searchTermURL?: string,
      sortByURL?: string
    ) => {
      // const publishPageURL = `${process.env.NX_PUBLISH_URI + i18n.language
      //   }/${parameter}`;
      const publishPageURL = `${getSubDomain()}/${i18n.language}/${parameter}`;
      // if (
      //   status?.toLowerCase() === 'draft' ||
      //   status?.toLowerCase() === 'unpublished'
      // ) {
      //   fetchPageModel(
      //     dispatch,
      //     runFetchPageModel,
      //     runFetchValidationQuery,
      //     pathForSelectedPage,
      //     navigate,
      //     actionType,
      //     deviceType,
      //     editOption,
      //     searchCatURL,
      //     searchTermURL,
      //     sortByURL
      //   );
      // } else {
      //   window.open(publishPageURL);
      // }
    },
    []
  );

  /**edit page click handle here*/
  const editPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || '',
      'draft',
      selectedPage.path || '',
      selectedPage.status == 'draft' &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? 'preview'
        : '',
      selectedPage.status == 'draft' &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? 'window'
        : '',
      selectedPage.status == 'draft' &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? 'no'
        : '',
      '',
      '',
      ''
    );
  };

  /**view page click handle here */
  const viewPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || '',
      selectedPage.status == 'published' ? 'published' : 'draft',
      selectedPage.path || '',
      'preview',
      'window',
      selectedPage.status == 'draft' &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? 'no'
        : 'yes',
      '',
      '',
      ''
    );
  };

  /**preview page click handle here */
  const previewPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || '',
      selectedPage.status == 'published' ? 'published' : 'draft',
      selectedPage.path || '',
      'preview',
      'window',
      selectedPage.status == 'draft' &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? 'no'
        : 'yes',
      '',
      '',
      ''
    );
  };

  /**handle duplicate page popup data */
  const handleDuplicatePopup = (
    duplicate: any,
    pageSelected: { path: any; status: any }
  ) => {
    if (duplicate) {
      // fetchPageModel(
      //   dispatch,
      //   runFetchPageModel,
      //   runFetchValidationQuery,
      //   pageSelected.path,
      //   null,
      //   pageSelected.status
      // );
    }
  };

  /**create page */
  const createPageByName = async (pageName: any, pageUrl: any) => {
    const newPageModel = JSON.parse(JSON.stringify(PageModelInstanceDefault));
    newPageModel.Page = pageUrl;
    newPageModel.Title = pageName;
    newPageModel.DevelopedBy = username;
    newPageModel.Page_LastModifiedBy = username;
    newPageModel.Page_LastModificationDate = new Date();
    newPageModel.DevelopedDate = new Date().toISOString();
    newPageModel.Page_LastModificationDate = new Date().toISOString();
    newPageModel.CurrentPageURL = `/${pageUrl}`;
    newPageModel.PageSettings = { PageName: pageName };
    newPageModel.SiteName = useremail;
    createPageModel(newPageModel, mutate, navigate, handleImpression, t);
    // dispatch(
    //   updatePageSettings(
    //     setDefaultPageSettings(
    //       pageName,
    //       undefined,
    //       undefined,
    //       `${authInfo.publishUri + i18n.language}/${pageUrl}`
    //     )
    //   )
    // );
    // dispatch(updateSaveWarning(false));
    // dispatch(
    //   await fetchContent(
    //     state.content.contentType,
    //     location,
    //     filter,
    //     state,
    //     true
    //   )
    // );
  };

  /**create page model */
  const createPageModel = (
    newPageModel: any,
    mutate: any,
    navigate: any,
    handleImpression: any,
    t: TFunction<'translation', undefined>,
    isDuplicate?: any,
    code?: any
  ) => {
    mutate({
      variables: { input: newPageModel },
      context: {
        headers: {
          language: localStorage.getItem('lang'),
          sitename: getSelectedSite(),
        },
      },
    })
      .then(
        async (resp: { data: { authoring_createPage: { path: string } } }) => {
          localStorage.removeItem('lang');
          if (code) {
            ShowToastSuccess(
              `${t('page')} ${t('created_toast')} ${t('for')} ${code}`
            );
          } else {
            ShowToastSuccess(`${t('page')} ${t('created_toast')}`);
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
            // dispatch(
            //   await fetchContent(
            //     state.content.contentType,
            //     location,
            //     filter,
            //     state,
            //     true
            //   )
            // );
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
        }
      )
      .catch((error: { graphQLErrors: { message: any }[] }) => {
        if (code) {
          ShowToastError(
            `${error.graphQLErrors[0].message} ${t('for')} ${code}`
          );
        } else {
          ShowToastError(error.graphQLErrors[0].message);
        }
      });
  };

  /**duplicate page */
  const duplicatePage = (
    isDuplicate: any,
    pageName: { trim: () => { (): any; new (): any; length: number } },
    pageUrl: any,
    language: any[]
  ) => {
    if (pageName.trim().length > 0) {
      if (isDuplicate) {
        const copyPageModel = JSON.parse(JSON.stringify(pageInfo?.pageModel));
        // const newPageModel = formatChildrenForPageDuplicate(
        //   copyPageModel,
        //   pageName,
        //   pageUrl,
        //   username
        // );
        // language.map((lang: any) => {
        //   LanguageList.map((l: { value: any; id: string }) => {
        //     if (l.value === lang) {
        //       localStorage.setItem('lang', l.id);
        //       createPageModel(
        //         newPageModel,
        //         mutate,
        //         navigate,
        //         handleImpression,
        //         t,
        //         isDuplicate,
        //         l.value
        //       );
        //     }
        //   });
        // });
      } else {
        createPageByName(pageName, pageUrl);
      }
    }
  };

  /**handle delete popup data */
  const handleDeleteData = (pageSelected: {
    status: string;
    scheduledUnPublishTriggerDateTime: null;
    page: any;
    currentPageUrl: any;
    parentPageUrl: any;
    scheduledPublishTriggerDateTime: null;
  }) => {
    setPageData(pageSelected);
    if (pageSelected.status == 'published') {
      setDirectDelete(true);
      if (pageSelected?.scheduledUnPublishTriggerDateTime != null) {
        const requestDto = {
          page: pageSelected.page,
          currentpageurl: pageSelected.currentPageUrl,
          parentpageurl: pageSelected.parentPageUrl,
        };
        setRescheduledDto(requestDto);
        setCancelTriggerType('2');
      }
    }
    if (
      pageSelected.status == 'draft' &&
      pageSelected.scheduledPublishTriggerDateTime != null
    ) {
      setDirectDelete(true);
      const requestDto = {
        page: pageSelected.page,
        currentpageurl: pageSelected.currentPageUrl,
        parentpageurl: pageSelected.parentPageUrl,
      };
      setRescheduledDto(requestDto);
      setCancelTriggerType('1');
    }
  };

  /**remove page */
  const handleRemove = (itemsdata: {
    page: any;
    currentPageUrl: any;
    parentPageUrl: any;
  }) => {
    mutateDelete({
      variables: {
        page: itemsdata.page,
        currentpageurl: itemsdata.currentPageUrl,
        parentpageurl: itemsdata.parentPageUrl,
      },
    })
      .then(async () => {
        // handleDeleteData;
        ShowToastSuccess(`${t('page')} ${t('deleted_toast')}`);
        // dispatch(
        //   await fetchContent(
        //     state.content.contentType,
        //     location,
        //     filter,
        //     state,
        //     true
        //   )
        // );
        setDirectDelete(false);
      })
      .catch(() => {
        ShowToastError(t('api_error_toast'));
      });
  };

  /**unpublish page */
  const unPublishPage = (selectedPageData: any) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    mutateUnpublish({
      variables: {
        page: selectedPageData.page,
        currentpageurl: selectedPageData.currentPageUrl,
        parentpageurl: selectedPageData.parentPageUrl,
        timeZone: timeZone,
      },
    })
      .then(async () => {
        if (selectedPageData.status != 'draft') {
          // dispatch(
          //   await fetchContent(
          //     state.content.contentType,
          //     location,
          //     filter,
          //     state,
          //     true
          //   )
          // );
          ShowToastSuccess(t('unpublish_toast'));
        }
        if (directDelete) {
          handleRemove(selectedPageData);
        }
      })
      .catch(() => {
        ShowToastError(t('api_error_toast'));
      });
  };

  /**handle page delete conditions */
  const handlePageDelete = () => {
    const requestDto = {
      page: selectedPageData.page,
      currentpageurl: selectedPageData.currentPageUrl,
      parentpageurl: selectedPageData.parentPageUrl,
    };
    if (selectedPageData?.status === 'published') {
      if (selectedPageData?.scheduledUnPublishTriggerDateTime != null) {
        cancelPublishUnpublishTrigger('2', requestDto, selectedPageData);
      } else {
        unPublishPage(selectedPageData);
      }
    } else {
      if (selectedPageData?.scheduledPublishTriggerDateTime != null) {
        cancelPublishUnpublishTrigger('1', requestDto, selectedPageData);
      } else {
        handleRemove(selectedPageData);
      }
    }
  };

  /**handle reschedule popup */
  const handleReschedulePopup = useCallback(
    (
      type: any,
      itemsdata: {
        path: string;
        page: any;
        currentPageUrl: any;
        parentPageUrl: any;
        scheduledUnPublishTriggerDateTime: SetStateAction<string>;
        scheduledPublishTriggerDateTime: SetStateAction<string>;
      }
    ) => {
      const arr = itemsdata.path?.split('/');
      // const folder = arr[5];
      // const pathnm = `${arr[6]}/${arr[7]}`;
      const folder = arr[6];
      const pathnm = arr[10];
      runFetchPageModel({
        variables: { folder: folder, path: pathnm },
      })
        .then((resp) => {
          // dispatch(
          //   setPageModelStoreAfterFetch(
          //     dispatch,
          //     resp.data.authoring_getCmsItemByPath,
          //     runFetchValidationQuery
          //   )
          // );
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
      const requestDto = {
        page: itemsdata.page,
        currentpageurl: itemsdata.currentPageUrl,
        parentpageurl: itemsdata.parentPageUrl,
      };
      setRescheduledDto(requestDto);
      setCurrentUnpublishTime(itemsdata.scheduledUnPublishTriggerDateTime);
      setCurrentPublishTime(itemsdata.scheduledPublishTriggerDateTime);
    },
    []
  );

  /**reschedule publish page */
  const reschedulePublishPage = (
    publishTime: string | number | Date,
    rescheduleDto: any
  ) => {
    const currentDateTime = addMinutes(new Date(), 5);
    const enteredPublishTime = new Date(publishTime);
    const validPublishTime =
      currentUnpublishTime != null
        ? addMinutes(new Date(currentUnpublishTime), 10)
        : null;
    if (
      validPublishTime != null &&
      new Date(currentUnpublishTime) < addMinutes(enteredPublishTime, 10)
    ) {
      ShowToastError(`${t('page')} ${t('scheduled_publish_time')}`);
    } else {
      if (enteredPublishTime > currentDateTime) {
        mutatePublishSchedule({
          variables: {
            requestdto: rescheduleDto,
            scheduleTime: publishTime?.toString(),
          },
        })
          .then(async () => {
            // dispatch(
            //   await fetchContent(
            //     state.content.contentType,
            //     location,
            //     filter,
            //     state,
            //     true
            //   )
            // );
            ShowToastSuccess(
              `${t('page')} ${t('publish')} ${t('rescheduled_success_toast')}`
            );
          })
          .catch(() => {
            ShowToastError(t('api_error_toast'));
          });
      } else {
        ShowToastError(`${t('page')} ${t('publish_time_toast')}`);
      }
    }
  };

  const publishPage = () => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const newModel = consolidatePageModel(
      pageInfo?.pageModel,
      pageInfo?.prelemMetaArray,
      pageInfo?.pageSettings,
      username
    );
    const requestdto = {
      page: pageInfo?.pageModel.Page,
      parentpageurl: '/',
      currentpageurl: pageInfo?.pageModel.CurrentPageURL,
    };
    mutatePublish({
      variables: {
        input: requestdto,
        pageModelRequest: newModel,
        timeZone: timeZone,
      },
    })
      .then(async () => {
        // dispatch(
        //   await fetchContent(
        //     state.content.contentType,
        //     location,
        //     filter,
        //     state,
        //     true
        //   )
        // );
        // ShowToastSuccess(`${t('page')} ${t('pubished_success_toast')}`);
        const pageDataObj = {
          eventType: 'Page Published',
          pagePublished: true,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
      })
      .catch((error) => {
        ShowToastError(`${t('page')} ${t('published_error_toast')}`);
      });
  };

  /**reschedule unpublish page */
  const rescheduleUnPublishPage = (
    unpublishTime: string | number | Date,
    rescheduleDto: any,
    listItemDetails: { status: string }
  ) => {
    const currentDateTime = addMinutes(new Date(), 5);
    const enteredUnpublishTime = new Date(unpublishTime);
    const validPublishTime =
      currentPublishTime != ''
        ? addMinutes(new Date(currentPublishTime), 10)
        : null;
    if (validPublishTime != null && validPublishTime > enteredUnpublishTime) {
      ShowToastError(`${t('page')} ${t('publish_vs_unpublish_toast')}`);
    } else {
      if (enteredUnpublishTime > currentDateTime) {
        listItemDetails?.status.toLowerCase() === 'published' && publishPage();
        mutateUnpublishSchedule({
          variables: {
            requestdto: rescheduleDto,
            scheduleTime: unpublishTime,
          },
        })
          .then(async () => {
            // dispatch(
            //   await fetchContent(
            //     state.content.contentType,
            //     location,
            //     filter,
            //     state,
            //     true
            //   )
            // );
            ShowToastSuccess(
              `${t('page')} ${t('unpublish')} ${t('rescheduled_success_toast')}`
            );
          })
          .catch(() => {
            ShowToastError(t('api_error_toast'));
          });
      } else {
        ShowToastError(`${t('page')} ${t('unpublish_time_toast')}`);
      }
    }
  };

  /**handle cancel publish/unpublish popup */
  const handleCancelTriggerPopup = (
    itemsdata: {
      path: string;
      page: any;
      currentPageUrl: any;
      parentPageUrl: any;
    },
    triggerType: SetStateAction<string>
  ) => {
    const arr = itemsdata.path?.split('/');
    // const folder = arr[5];
    // const pathnm = `${arr[6]}/${arr[7]}`;
    const folder = arr[6];
    const pathnm = arr[10];
    runFetchPageModel({
      variables: { folder: folder, path: pathnm },
    })
      .then((resp) => {
        // dispatch(
        //   setPageModelStoreAfterFetch(
        //     dispatch,
        //     resp.data.authoring_getCmsItemByPath,
        //     runFetchValidationQuery
        //   )
        // );
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
    const requestDto = {
      page: itemsdata.page,
      currentpageurl: itemsdata.currentPageUrl,
      parentpageurl: itemsdata.parentPageUrl,
    };
    setRescheduledDto(requestDto);
    setCancelTriggerType(triggerType);
    setPageData(itemsdata);
  };

  /**cancel publish/unpublish page */
  const cancelPublishUnpublishTrigger = (
    triggerType: string,
    requestDto: { page: any; currentpageurl: any; parentpageurl: any },
    listItemDetails: { scheduledUnPublishTriggerDateTime: null; status: string }
  ) => {
    if (triggerType == '1') {
      mutateCancelPublishSchedule({
        variables: { requestdto: requestDto },
      })
        .then(async () => {
          // dispatch(
          //   await fetchContent(
          //     state.content.contentType,
          //     location,
          //     filter,
          //     state,
          //     true
          //   )
          // );
          ShowToastSuccess(
            `${t('page')} ${t('publish')} ${t('schedule_cancel_toast')}`
          );
          if (
            (directDelete &&
              listItemDetails &&
              listItemDetails?.scheduledUnPublishTriggerDateTime == null) ||
            undefined
          ) {
            // handleRemove(listItemDetails);
          }
        })
        .catch(() => {
          ShowToastError(t('api_error_toast'));
        });
    }
    if (
      (triggerType === '1' &&
        listItemDetails &&
        listItemDetails?.scheduledUnPublishTriggerDateTime) ||
      triggerType == '2'
    ) {
      listItemDetails?.status.toLowerCase() === 'published' && publishPage();
      mutateCancelUnpublishSchedule({
        variables: { requestdto: requestDto },
      })
        .then(async () => {
          // dispatch(
          //   await fetchContent(
          //     state.content.contentType,
          //     location,
          //     filter,
          //     state,
          //     true
          //   )
          // );
          ShowToastSuccess(
            `${t('page')} ${t('unpublish')} ${t('schedule_cancel_toast')}`
          );
          if (directDelete) {
            if (listItemDetails?.status != 'published') {
              //  handleRemove(listItemDetails);
            } else {
              unPublishPage(listItemDetails);
            }
          }
          setIsCancelTrigger(false);
        })
        .catch(() => {
          ShowToastError(t('api_error_toast'));
        });
    }
  };

  return {
    editPage,
    viewPage,
    previewPage,
    handleDuplicatePopup,
    duplicatePage,
    unPublishPage,
    handleReschedulePopup,
    reschedulePublishPage,
    rescheduleUnPublishPage,
    handleCancelTriggerPopup,
    cancelPublishUnpublishTrigger,
    handleDeleteData,
    handlePageDelete,
  };
};

export default usePage;
