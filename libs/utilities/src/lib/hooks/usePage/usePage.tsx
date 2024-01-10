// import { useLazyQuery, useMutation } from '@apollo/client';
// import { addMinutes } from 'date-fns';
// import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
// import { useCallback, useContext, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
// import { fetchContent } from '../../Common/Listing/Utils/Helper';
// import {
//   showToastError,
//   showToastSuccess,
// } from '../../components/toastNotification/toastNotificationReactTostify';
// import { FETCH_PAGE_MODEL_DRAFT } from '../../graphql/fetchQueries';
// import {
//   cancelPublish,
//   cancelUnpublish,
//   createPgModel,
//   deletePage,
//   publishPageModel,
//   reschedulePublish,
//   rescheduleUnpublish,
//   unpublishPage,
// } from '../../services/page/page.api';
// import { fetchPrelemValidation } from '../../services/prelems/prelems.api';
// import {
//   fetchPageModel,
//   setPageModelStoreAfterFetch,
//   updatePageSettings,
//   updateSaveWarning,
// } from '../../store/Actions';
// import { Store } from '../../store/ContextStore';
// import { authInfo } from '../../utils/authConstants';
// import { LanguageList } from '../../utils/constants';
// import {
//   // consolidatePageModel,
//   // formatChildrenForPageDuplicate,
//   getCurrentLang,
//   getSelectedSite,
//   getSubDomain,
//   setDefaultPageSettings,
// } from '../../utils/helperFns';
// import useUserSession from '../useUserSession/useUserSession';
// const PageModelInstanceDefault = {
//   Page: '',
//   SiteName: '',
//   Title: '',
//   ParentPageURL: '/',
//   CurrentPageURL: '/',
//   DevelopedBy: '',
//   DevelopedDate: '',
//   IsEdit: false,
//   SeoEnable: true,
//   AnalyticsEnable: true,
//   RobotTxt: false,
//   SiteMap: false,
//   Children: null,
//   Analytics: '',
//   Others: '',
//   StructureData: '',
//   PageSettings: {},
//   Page_LastModificationDate: '',
// };
// const usePage = (filter = 'ALL') => {
//   // const location = useLocation();
//   // const [getSession] = useUserSession();
//   // const { userInfo } = getSession();
//   // const { t, i18n } = useTranslation();
//   // const { state, dispatch } = useContext(Store);
//   // const [runFetchPageModel] = useLazyQuery(FETCH_PAGE_MODEL_DRAFT);
//   // const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
//   // const username = `${userInfo.first_name} ${userInfo.last_name}`;
//   // const useremail = userInfo.username;
//   // const { page } = state;
//   // const [handleImpression] = usePlatformAnalytics();
//   // const [mutate] = useMutation(createPgModel, {
//   //   context: {
//   //     headers: {
//   //       language: localStorage.getItem('lang'),
//   //       sitename: getSelectedSite()
//   //     },
//   //   },
//   // });
//   // const [mutateUnpublish] = useMutation(unpublishPage);
//   // const [mutateDelete] = useMutation(deletePage);
//   // const [directDelete, setDirectDelete] = useState<boolean>(false);
//   // const [rescheduleDto, setRescheduledDto] = useState({});
//   // const [currentPublishTime, setCurrentPublishTime] = useState('');
//   // const [currentUnpublishTime, setCurrentUnpublishTime] = useState('');
//   // const [mutatePublishSchedule] = useMutation(reschedulePublish);
//   // const [mutateUnpublishSchedule] = useMutation(rescheduleUnpublish);
//   // const [cancelTriggerType, setCancelTriggerType] = useState('');
//   // const [selectedPageData, setPageData] = useState<any>({});
//   // const [mutateCancelPublishSchedule] = useMutation(cancelPublish);
//   // const [mutateCancelUnpublishSchedule] = useMutation(cancelUnpublish);
//   // const [isCancelTrigger, setIsCancelTrigger] = useState(false);
//   // const navigate = useNavigate();
//   // const [mutatePublish] = useMutation(publishPageModel);
//   // localStorage.setItem('lang', getCurrentLang());

//   // // operations
//   const cardClickHandle = useCallback(
//     (
//       parameter: string,
//       status: string,
//       pathForSelectedPage: string,
//       actionType?: string,
//       deviceType?: string,
//       editOption?: string,
//       searchCatURL?: string,
//       searchTermURL?: string,
//       sortByURL?: string
//     ) => {
//       // const publishPageURL = `${process.env.REACT_APP_PUBLISH_URI + i18n.language
//       //   }/${parameter}`;
//       const publishPageURL = `${getSubDomain()}/${i18n.language}/${parameter}`;
//       if (
//         status?.toLowerCase() === 'draft' ||
//         status?.toLowerCase() === 'unpublished'
//       ) {
//         fetchPageModel(
//           dispatch,
//           runFetchPageModel,
//           runFetchValidationQuery,
//           pathForSelectedPage,
//           navigate,
//           actionType,
//           deviceType,
//           editOption,
//           searchCatURL,
//           searchTermURL,
//           sortByURL
//         );
//       } else {
//         window.open(publishPageURL);
//       }
//     },
//     []
//   );

//   /**edit page click handle here*/
//   const editPage = (selectedPage: any) => {
//     cardClickHandle(
//       selectedPage.page || '',
//       'draft',
//       selectedPage.path || '',
//       selectedPage.status == 'draft' &&
//         (selectedPage.scheduledPublishTriggerDateTime ||
//           selectedPage.scheduledUnPublishTriggerDateTime)
//         ? 'preview'
//         : '',
//       selectedPage.status == 'draft' &&
//         (selectedPage.scheduledPublishTriggerDateTime ||
//           selectedPage.scheduledUnPublishTriggerDateTime)
//         ? 'window'
//         : '',
//       selectedPage.status == 'draft' &&
//         (selectedPage.scheduledPublishTriggerDateTime ||
//           selectedPage.scheduledUnPublishTriggerDateTime)
//         ? 'no'
//         : '',
//       '',
//       '',
//       ''
//     );
//   };

//   /**view page click handle here */
//   // const viewPage = (selectedPage: any) => {
//   //   cardClickHandle(
//   //     selectedPage.page || '',
//   //     selectedPage.status == 'published' ? 'published' : 'draft',
//   //     selectedPage.path || '',
//   //     'preview',
//   //     'window',
//   //     selectedPage.status == 'draft' &&
//   //       (selectedPage.scheduledPublishTriggerDateTime ||
//   //         selectedPage.scheduledUnPublishTriggerDateTime)
//   //       ? 'no'
//   //       : 'yes',
//   //     '',
//   //     '',
//   //     ''
//   //   );
//   // };

//   // /**preview page click handle here */
//   // const previewPage = (selectedPage: any) => {
//   //   cardClickHandle(
//   //     selectedPage.page || '',
//   //     selectedPage.status == 'published' ? 'published' : 'draft',
//   //     selectedPage.path || '',
//   //     'preview',
//   //     'window',
//   //     selectedPage.status == 'draft' &&
//   //       (selectedPage.scheduledPublishTriggerDateTime ||
//   //         selectedPage.scheduledUnPublishTriggerDateTime)
//   //       ? 'no'
//   //       : 'yes',
//   //     '',
//   //     '',
//   //     ''
//   //   );
//   // };

//   // /**handle duplicate page popup data */
//   // const handleDuplicatePopup = (duplicate, pageSelected) => {
//   //   if (duplicate) {
//   //     fetchPageModel(
//   //       dispatch,
//   //       runFetchPageModel,
//   //       runFetchValidationQuery,
//   //       pageSelected.path,
//   //       null,
//   //       pageSelected.status
//   //     );
//   //   }
//   // };

//   // /**create page */
//   // const createPageByName = async (pageName, pageUrl) => {
//   //   const newPageModel = JSON.parse(JSON.stringify(PageModelInstanceDefault));
//   //   newPageModel.Page = pageUrl;
//   //   newPageModel.Title = pageName;
//   //   newPageModel.DevelopedBy = username;
//   //   newPageModel.Page_LastModifiedBy = username;
//   //   newPageModel.Page_LastModificationDate = new Date();
//   //   newPageModel.DevelopedDate = new Date().toISOString();
//   //   newPageModel.Page_LastModificationDate = new Date().toISOString();
//   //   newPageModel.CurrentPageURL = `/${pageUrl}`;
//   //   newPageModel.PageSettings = { PageName: pageName };
//   //   newPageModel.SiteName = useremail;
//   //   createPageModel(newPageModel, mutate, navigate, handleImpression, t);
//   //   dispatch(
//   //     updatePageSettings(
//   //       setDefaultPageSettings(
//   //         pageName,
//   //         undefined,
//   //         undefined,
//   //         `${authInfo.publishUri + i18n.language}/${pageUrl}`
//   //       )
//   //     )
//   //   );
//   //   dispatch(updateSaveWarning(false));
//   //   dispatch(
//   //     await fetchContent(
//   //       state.content.contentType,
//   //       location,
//   //       filter,
//   //       state,
//   //       true
//   //     )
//   //   );
//   // };

//   // /**create page model */
//   // const createPageModel = (
//   //   newPageModel: any,
//   //   mutate: any,
//   //   navigate: any,
//   //   handleImpression: any,
//   //   t,
//   //   isDuplicate?: any,
//   //   code?: any
//   // ) => {
//   //   mutate({
//   //     variables: { input: newPageModel },
//   //     context: {
//   //       headers: {
//   //         language: localStorage.getItem('lang'),
//   //         sitename: getSelectedSite()
//   //       },
//   //     },
//   //   })
//   //     .then(async (resp) => {
//   //       localStorage.removeItem('lang');
//   //       if (code) {
//   //         showToastSuccess(
//   //           `${t('page')} ${t('created_toast')} ${t('for')} ${code}`
//   //         );
//   //       } else {
//   //         showToastSuccess(`${t('page')} ${t('created_toast')}`);
//   //       }
//   //       localStorage.setItem('path', resp?.data?.authoring_createPage?.path);
//   //       const pageDataObj = {
//   //         eventType: 'Successful Page Creation',
//   //         pageCreated: true,
//   //         created_page_title: newPageModel.Page,
//   //         createdBy: newPageModel.DevelopedBy,
//   //       };
//   //       handleImpression(pageDataObj.eventType, pageDataObj);
//   //       if (isDuplicate) {
//   //         dispatch(
//   //           await fetchContent(
//   //             state.content.contentType,
//   //             location,
//   //             filter,
//   //             state,
//   //             true
//   //           )
//   //         );
//   //       } else {
//   //         navigate(
//   //           {
//   //             pathname: '/edit-page',
//   //             search: `?${createSearchParams({
//   //               page: resp?.data?.authoring_createPage?.path.toString(),
//   //             })}`,
//   //           },
//   //           { state: 'new' }
//   //         );
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       if (code) {
//   //         showToastError(
//   //           `${error.graphQLErrors[0].message} ${t('for')} ${code}`
//   //         );
//   //       } else {
//   //         showToastError(error.graphQLErrors[0].message);
//   //       }
//   //     });
//   // };

//   // /**duplicate page */
//   // const duplicatePage = (isDuplicate, pageName, pageUrl, language) => {
//   //   if (pageName.trim().length > 0) {
//   //     if (isDuplicate) {
//   //       const copyPageModel = JSON.parse(JSON.stringify(page?.pageModel));
//   //       const newPageModel = formatChildrenForPageDuplicate(
//   //         copyPageModel,
//   //         pageName,
//   //         pageUrl,
//   //         username
//   //       );
//   //       language.map((lang) => {
//   //         LanguageList.map((l) => {
//   //           if (l.value === lang) {
//   //             localStorage.setItem('lang', l.id);
//   //             createPageModel(
//   //               newPageModel,
//   //               mutate,
//   //               navigate,
//   //               handleImpression,
//   //               t,
//   //               isDuplicate,
//   //               l.value
//   //             );
//   //           }
//   //         });
//   //       });
//   //     } else {
//   //       createPageByName(pageName, pageUrl);
//   //     }
//   //   }
//   // };

//   // /**handle delete popup data */
//   // const handleDeleteData = (pageSelected) => {
//   //   setPageData(pageSelected);
//   //   if (pageSelected.status == 'published') {
//   //     setDirectDelete(true);
//   //     if (pageSelected?.scheduledUnPublishTriggerDateTime != null) {
//   //       const requestDto = {
//   //         page: pageSelected.page,
//   //         currentpageurl: pageSelected.currentPageUrl,
//   //         parentpageurl: pageSelected.parentPageUrl,
//   //       };
//   //       setRescheduledDto(requestDto);
//   //       setCancelTriggerType('2');
//   //     }
//   //   }
//   //   if (
//   //     pageSelected.status == 'draft' &&
//   //     pageSelected.scheduledPublishTriggerDateTime != null
//   //   ) {
//   //     setDirectDelete(true);
//   //     const requestDto = {
//   //       page: pageSelected.page,
//   //       currentpageurl: pageSelected.currentPageUrl,
//   //       parentpageurl: pageSelected.parentPageUrl,
//   //     };
//   //     setRescheduledDto(requestDto);
//   //     setCancelTriggerType('1');
//   //   }
//   // };

//   // /**remove page */
//   // const handleRemove = (itemsdata) => {
//   //   mutateDelete({
//   //     variables: {
//   //       page: itemsdata.page,
//   //       currentpageurl: itemsdata.currentPageUrl,
//   //       parentpageurl: itemsdata.parentPageUrl,
//   //     },
//   //   })
//   //     .then(async () => {
//   //       // handleDeleteData;
//   //       showToastSuccess(`${t('page')} ${t('deleted_toast')}`);
//   //       dispatch(
//   //         await fetchContent(
//   //           state.content.contentType,
//   //           location,
//   //           filter,
//   //           state,
//   //           true
//   //         )
//   //       );
//   //       setDirectDelete(false);
//   //     })
//   //     .catch(() => {
//   //       showToastError(t('api_error_toast'));
//   //     });
//   // };

//   // /**unpublish page */
//   // const unPublishPage = (selectedPageData: any) => {
//   //   const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
//   //   mutateUnpublish({
//   //     variables: {
//   //       page: selectedPageData.page,
//   //       currentpageurl: selectedPageData.currentPageUrl,
//   //       parentpageurl: selectedPageData.parentPageUrl,
//   //       timeZone: timeZone,
//   //     },
//   //   })
//   //     .then(async () => {
//   //       if (selectedPageData.status != 'draft') {
//   //         dispatch(
//   //           await fetchContent(
//   //             state.content.contentType,
//   //             location,
//   //             filter,
//   //             state,
//   //             true
//   //           )
//   //         );
//   //         showToastSuccess(t('unpublish_toast'));
//   //       }
//   //       if (directDelete) {
//   //         handleRemove(selectedPageData);
//   //       }
//   //     })
//   //     .catch(() => {
//   //       showToastError(t('api_error_toast'));
//   //     });
//   // };

//   // /**handle page delete conditions */
//   // const handlePageDelete = () => {
//   //   const requestDto = {
//   //     page: selectedPageData.page,
//   //     currentpageurl: selectedPageData.currentPageUrl,
//   //     parentpageurl: selectedPageData.parentPageUrl,
//   //   };
//   //   if (selectedPageData?.status === 'published') {
//   //     if (selectedPageData?.scheduledUnPublishTriggerDateTime != null) {
//   //       cancelPublishUnpublishTrigger('2', requestDto, selectedPageData);
//   //     } else {
//   //       unPublishPage(selectedPageData);
//   //     }
//   //   } else {
//   //     if (selectedPageData?.scheduledPublishTriggerDateTime != null) {
//   //       cancelPublishUnpublishTrigger('1', requestDto, selectedPageData);
//   //     } else {
//   //       handleRemove(selectedPageData);
//   //     }
//   //   }
//   // };

//   // /**handle reschedule popup */
//   // const handleReschedulePopup = useCallback((type, itemsdata) => {
//   //   const arr = itemsdata.path?.split('/');
//   //   // const folder = arr[5];
//   //   // const pathnm = `${arr[6]}/${arr[7]}`;
//   //   const folder = arr[6];
//   //   const pathnm = arr[10];
//   //   runFetchPageModel({
//   //     variables: { folder: folder, path: pathnm },
//   //   })
//   //     .then((resp) => {
//   //       dispatch(
//   //         setPageModelStoreAfterFetch(
//   //           dispatch,
//   //           resp.data.authoring_getCmsItemByPath,
//   //           runFetchValidationQuery
//   //         )
//   //       );
//   //     })
//   //     .catch((err) => {
//   //       console.log(JSON.stringify(err, null, 2));
//   //     });
//   //   const requestDto = {
//   //     page: itemsdata.page,
//   //     currentpageurl: itemsdata.currentPageUrl,
//   //     parentpageurl: itemsdata.parentPageUrl,
//   //   };
//   //   setRescheduledDto(requestDto);
//   //   setCurrentUnpublishTime(itemsdata.scheduledUnPublishTriggerDateTime);
//   //   setCurrentPublishTime(itemsdata.scheduledPublishTriggerDateTime);
//   // }, []);

//   // /**reschedule publish page */
//   // const reschedulePublishPage = (publishTime, rescheduleDto) => {
//   //   const currentDateTime = addMinutes(new Date(), 5);
//   //   const enteredPublishTime = new Date(publishTime);
//   //   const validPublishTime =
//   //     currentUnpublishTime != null
//   //       ? addMinutes(new Date(currentUnpublishTime), 10)
//   //       : null;
//   //   if (
//   //     validPublishTime != null &&
//   //     new Date(currentUnpublishTime) < addMinutes(enteredPublishTime, 10)
//   //   ) {
//   //     showToastError(`${t('page')} ${t('scheduled_publish_time')}`);
//   //   } else {
//   //     if (enteredPublishTime > currentDateTime) {
//   //       mutatePublishSchedule({
//   //         variables: {
//   //           requestdto: rescheduleDto,
//   //           scheduleTime: publishTime?.toISOString(),
//   //         },
//   //       })
//   //         .then(async () => {
//   //           dispatch(
//   //             await fetchContent(
//   //               state.content.contentType,
//   //               location,
//   //               filter,
//   //               state,
//   //               true
//   //             )
//   //           );
//   //           showToastSuccess(
//   //             `${t('page')} ${t('publish')} ${t('rescheduled_success_toast')}`
//   //           );
//   //         })
//   //         .catch(() => {
//   //           showToastError(t('api_error_toast'));
//   //         });
//   //     } else {
//   //       showToastError(`${t('page')} ${t('publish_time_toast')}`);
//   //     }
//   //   }
//   // };

//   // const publishPage = () => {
//   //   const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
//   //   const newModel = consolidatePageModel(
//   //     page?.pageModel,
//   //     page?.prelemMetaArray,
//   //     page?.pageSettings,
//   //     username
//   //   );
//   //   const requestdto = {
//   //     page: page?.pageModel.Page,
//   //     parentpageurl: '/',
//   //     currentpageurl: page?.pageModel.CurrentPageURL,
//   //   };
//   //   mutatePublish({
//   //     variables: {
//   //       input: requestdto,
//   //       pageModelRequest: newModel,
//   //       timeZone: timeZone,
//   //     },
//   //   })
//   //     .then(async () => {
//   //       dispatch(
//   //         await fetchContent(
//   //           state.content.contentType,
//   //           location,
//   //           filter,
//   //           state,
//   //           true
//   //         )
//   //       );
//   //       // showToastSuccess(`${t('page')} ${t('pubished_success_toast')}`);
//   //       const pageDataObj = {
//   //         eventType: 'Page Published',
//   //         pagePublished: true,
//   //       };
//   //       handleImpression(pageDataObj.eventType, pageDataObj);
//   //     })
//   //     .catch((error) => {
//   //       showToastError(`${t('page')} ${t('published_error_toast')}`);
//   //     });
//   // };

//   // /**reschedule unpublish page */
//   // const rescheduleUnPublishPage = (
//   //   unpublishTime,
//   //   rescheduleDto,
//   //   listItemDetails
//   // ) => {
//   //   const currentDateTime = addMinutes(new Date(), 5);
//   //   const enteredUnpublishTime = new Date(unpublishTime);
//   //   const validPublishTime =
//   //     currentPublishTime != ''
//   //       ? addMinutes(new Date(currentPublishTime), 10)
//   //       : null;
//   //   if (validPublishTime != null && validPublishTime > enteredUnpublishTime) {
//   //     showToastError(`${t('page')} ${t('publish_vs_unpublish_toast')}`);
//   //   } else {
//   //     if (enteredUnpublishTime > currentDateTime) {
//   //       listItemDetails?.status.toLowerCase() === 'published' && publishPage();
//   //       mutateUnpublishSchedule({
//   //         variables: {
//   //           requestdto: rescheduleDto,
//   //           scheduleTime: unpublishTime,
//   //         },
//   //       })
//   //         .then(async () => {
//   //           dispatch(
//   //             await fetchContent(
//   //               state.content.contentType,
//   //               location,
//   //               filter,
//   //               state,
//   //               true
//   //             )
//   //           );
//   //           showToastSuccess(
//   //             `${t('page')} ${t('unpublish')} ${t('rescheduled_success_toast')}`
//   //           );
//   //         })
//   //         .catch(() => {
//   //           showToastError(t('api_error_toast'));
//   //         });
//   //     } else {
//   //       showToastError(`${t('page')} ${t('unpublish_time_toast')}`);
//   //     }
//   //   }
//   // };

//   // /**handle cancel publish/unpublish popup */
//   // const handleCancelTriggerPopup = (itemsdata, triggerType) => {
//   //   const arr = itemsdata.path?.split('/');
//   //   // const folder = arr[5];
//   //   // const pathnm = `${arr[6]}/${arr[7]}`;
//   //   const folder = arr[6];
//   //   const pathnm = arr[10];   
//   //   runFetchPageModel({
//   //     variables: { folder: folder, path: pathnm },
//   //   })
//   //     .then((resp) => {
//   //       dispatch(
//   //         setPageModelStoreAfterFetch(
//   //           dispatch,
//   //           resp.data.authoring_getCmsItemByPath,
//   //           runFetchValidationQuery
//   //         )
//   //       );
//   //     })
//   //     .catch((err) => {
//   //       console.log(JSON.stringify(err, null, 2));
//   //     });
//   //   const requestDto = {
//   //     page: itemsdata.page,
//   //     currentpageurl: itemsdata.currentPageUrl,
//   //     parentpageurl: itemsdata.parentPageUrl,
//   //   };
//   //   setRescheduledDto(requestDto);
//   //   setCancelTriggerType(triggerType);
//   //   setPageData(itemsdata);
//   // };

//   // /**cancel publish/unpublish page */
//   // const cancelPublishUnpublishTrigger = (
//   //   triggerType,
//   //   requestDto,
//   //   listItemDetails
//   // ) => {
//   //   if (triggerType == '1') {
//   //     mutateCancelPublishSchedule({
//   //       variables: { requestdto: requestDto },
//   //     })
//   //       .then(async () => {
//   //         dispatch(
//   //           await fetchContent(
//   //             state.content.contentType,
//   //             location,
//   //             filter,
//   //             state,
//   //             true
//   //           )
//   //         );
//   //         showToastSuccess(
//   //           `${t('page')} ${t('publish')} ${t('schedule_cancel_toast')}`
//   //         );
//   //         if (
//   //           (directDelete &&
//   //             listItemDetails &&
//   //             listItemDetails?.scheduledUnPublishTriggerDateTime == null) ||
//   //           undefined
//   //         ) {
//   //           handleRemove(listItemDetails);
//   //         }
//   //       })
//   //       .catch(() => {
//   //         showToastError(t('api_error_toast'));
//   //       });
//   //   }
//   //   if (
//   //     (triggerType === '1' &&
//   //       listItemDetails &&
//   //       listItemDetails?.scheduledUnPublishTriggerDateTime) ||
//   //     triggerType == '2'
//   //   ) {
//   //     listItemDetails?.status.toLowerCase() === 'published' && publishPage();
//   //     mutateCancelUnpublishSchedule({
//   //       variables: { requestdto: requestDto },
//   //     })
//   //       .then(async () => {
//   //         dispatch(
//   //           await fetchContent(
//   //             state.content.contentType,
//   //             location,
//   //             filter,
//   //             state,
//   //             true
//   //           )
//   //         );
//   //         showToastSuccess(
//   //           `${t('page')} ${t('unpublish')} ${t('schedule_cancel_toast')}`
//   //         );
//   //         if (directDelete) {
//   //           if (listItemDetails?.status != 'published') {
//   //             handleRemove(listItemDetails);
//   //           } else {
//   //             unPublishPage(listItemDetails);
//   //           }
//   //         }
//   //         setIsCancelTrigger(false);
//   //       })
//   //       .catch(() => {
//   //         showToastError(t('api_error_toast'));
//   //       });
//   //   }
//   // };

//   return {
//     editPage,
//     // viewPage,
//     // previewPage,
//     // handleDuplicatePopup,
//     // duplicatePage,
//     // unPublishPage,
//     // handleReschedulePopup,
//     // reschedulePublishPage,
//     // rescheduleUnPublishPage,
//     // handleCancelTriggerPopup,
//     // cancelPublishUnpublishTrigger,
//     // handleDeleteData,
//     // handlePageDelete,
//   };
// };

// export default usePage;
