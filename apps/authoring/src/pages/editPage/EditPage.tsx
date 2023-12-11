import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material/';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import { addMinutes, format } from 'date-fns';
import DemositeHeader from 'platform-x-utils/dist/DemositeHeader';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Loader from '../../Common/Loader';
import { ErrorTooltip } from '../../components/Common/ErrorTooltip';
import Icons from '../../components/Icons';
import PlateformXDialog from '../../components/Modal';
import PlateformXSnackbar from '../../components/toastNotification/toastNotification';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { FETCH_PAGE_MODEL_DRAFT } from '../../graphql/fetchQueries';
import { FETCH_PRELEM_VALIDATION } from '../../graphql/prelemQueries';
import useAccess from '../../hooks/usePermissions/useAccess';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { getRequestFromDelivery } from '../../services/config/request';
import {
  fetchAllPageList,
  publishPageModel,
  savePageModel,
  schedulePublish,
  scheduleUnpublish,
  updatePrelemData,
} from '../../services/page/page.api';
import {
  deplicatePrelem,
  fetchPrelemDefaultMeta,
  fetchResetData,
} from '../../services/prelems/prelems.api';
import {
  callSaveandResetWarning,
  deletePrelem,
  duplicatePrelem,
  fetchPageModel,
  hidePrelem,
  movePrelem,
  resetPrelem,
  savePrelemPosition,
  setPublishedpages,
  setUpdatedContent,
  updateDynamicPrelemContent,
  updateEcommercePrelemQueryParam,
  updateFeatureBoxServiceCardContent,
  updateImageVideoGalleryContent,
  updateMultiSlotContent,
  updateSaveWarning,
} from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { CATEGORY_PAGE } from '../../utils/constants';
import { uriToJSON } from '../../utils/helper';
import { consolidatePageModel } from '../../utils/helperFunctions';
import {
  doneInsituEditing,
  initInsituEditing,
} from '../../utils/insituEditing';
import ContentGallery from '../ContentGallery/ContentGallery';
import DynamicContentGallery from '../ContentGallery/DynamicContentGallery';
import EcommerceAuthoring from '../EcommerceAuthoring/EcommerceAuthoring';
import Gallery from '../Gallery/Gallery';
import PageSettings from './PageSettings/PageSettings';
import PrelemCard from './PrelemCard';
import PrelemSettings from './PrelemSettings';
import { actionLabels, isGalleryContentTypeCheck } from './utils/constants';
import { PrelemInstance } from './utils/editTypes';
const actionEditLabels = actionLabels;
const publishUnpublishFieldCheck = (
  IsSchedulePublish,
  IsScheduleUnpublish,
  SchedulePublishDateTime,
  ScheduleUnpublishDateTime
) => {
  if (IsSchedulePublish && !SchedulePublishDateTime) {
    return false;
  }
  if (IsScheduleUnpublish && !ScheduleUnpublishDateTime) {
    return false;
  }
  return true;
};
const compareUpdatedInsituEditingValue = (obj1, obj2) => {
  for (const key in obj2) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};
export const EditPage: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [mutate] = useMutation(savePageModel);
  const [runAllFetchPageList] = useLazyQuery(fetchAllPageList);
  const [mutatePublish] = useMutation(publishPageModel);
  const [mutatePrelemContentQuery] = useMutation(updatePrelemData);
  const [mutateSchedulePublish] = useMutation(schedulePublish);
  const [mutateScheduleUnPublish] = useMutation(scheduleUnpublish);
  const [mutateDuplicatePrelem] = useMutation(deplicatePrelem);
  const [fetchDefaultData] = useLazyQuery(fetchResetData);
  const [fetchPrelemDefaultInfo] = useLazyQuery(fetchPrelemDefaultMeta);
  const Header = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.REACT_APP_HEADER}`)
  );
  const Footer = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.REACT_APP_FOOTER}`)
  );
  const theme = {
    LightTheme,
  };
  const {
    UP,
    DOWN,
    RESET,
    DELETE,
    VISIBILITY,
    VISIBILITYOFF,
    DUPLICATE,
    SETTINGS,
    EDIT,
  } = actionEditLabels;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const saveStatus = useRef(true);
  const selectedSlot = useRef(-1);
  const contentUpdateStatus = useRef(false);
  const selectedTab = useRef('image');
  const selectImageVideoGalleryPrelem = useRef();
  const selectedContentEditorialPath = useRef('');
  const prelemEditRef = useRef<any>();
  const [data, setData] = useState(page?.prelemMetaArray);
  const [fromPageContentType, setFromPageContentType] = useState('');
  const [contentGalleryStatus, setContentGalleryStatus] = useState(false);
  const [isDeletePopop, setIsDeletePopup] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [isResetPopop, setIsResetPopup] = useState(false);
  const [currentPrelemIndx, setCurrentPrelemIndx] = useState(-1);
  const [settingsPanelState, setSettingsPanelState] = useState<boolean>(false);
  const [selectedPrelemModelData, setSelectedPrelemModelData] = useState('');
  const [selectedPrelemModelDataIndex, setSelectedPrelemModelDataIndex] =
    useState(-1);
  const [selectedPrelemEditMode, setSelectedPrelemEditMode] = useState(-1);
  const [selectedPrelemEditState, setSelectedPrelemEditState] = useState(false);
  const [isNotificationToast, setIsNotificationToast] =
    useState<boolean>(false);
  const [isPrelemDataEditedToast, setIsPrelemDataEditedToast] =
    useState<boolean>(false);
  const [pageSettingsPanelState, setPageSettingsPanelState] =
    useState<boolean>(false);
  const [editableValue, setEditableValue] = useState<any>(null);
  const [insituEditingContentIndex, setInsituEditingContentIndex] =
    useState('');
  const [previewType, setPreviewType] = useState<string>('');
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [openPublishModal, setOpenPublishModal] = useState<boolean>(false);
  const [showSaveWarning, setShowSaveWarning] = useState<boolean>(false);
  const [triggerCase, setTriggerCase] = useState<string | null>(null);
  const [saveUpdate, setSaveUpdate] = useState<boolean>(true);
  const [runFetchValidationQuery] = useLazyQuery(FETCH_PRELEM_VALIDATION);
  const [runFetchPageModel] = useLazyQuery(FETCH_PAGE_MODEL_DRAFT);
  const [browserBackButtonState, setBrowserBackButtonState] =
    useState<boolean>(false);
  const [browserBackButtonClick, setBrowserBackButtonClick] =
    useState<boolean>(false);
  const [prelemDataReset, isPrelemDataReset] = useState<boolean>(false);
  const [prelemResetIndex, isPrelemResetIndex] = useState<number>(-1);
  const isPageMounted = useRef(false);
  const insituContentIndex = useRef(0);
  const publishPopup = useRef({
    publishTitle: 'Congratulations',
    publishDescription:
      'Your page has been sent for publishing & will be published in a few seconds.',
    publishCloseText: 'View',
    publishConfirmText: 'Go To Pages',
  });
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [isImageOrVideoDeletePopop, setIsImageOrVideoDeletePopup] =
    useState(false);
  const searchPageUrl = new URL(window.location.href);
  const [handleImpression] = usePlatformAnalytics();
  const { canAccessAction } = useAccess();
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(true);
  const isFrombuttonforEcommerce = useRef(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  useEffect(() => {
    if (location.state == 'new') {
      setPageSettingsPanelState(true);
    } else {
      setPageSettingsPanelState(false);
    }
  }, [location.state]);

  useEffect(() => {
    if (isPageMounted && page?.showSaveWarning) {
      setSaveUpdate(false);
      saveStatus.current = false;
    }
  }, [page?.showSaveWarning]);

  useEffect(() => {
    if (Object.keys(page?.pageModel).length === 0) {
      setLoader(true);
      fetchPageModel(
        dispatch,
        runFetchPageModel,
        runFetchValidationQuery,
        searchParams?.get('page')
      );
    } else {
      runAllFetchPageList({
        variables: {
          obj: { start: 0, rows: 2147483647 },
          type: 'PUBLISHED',
        },
      })
        .then((resp) => {
          const pageList = resp?.data?.authoring_pageList;
          if (pageList && pageList.length) {
            dispatch(setPublishedpages(pageList));
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
      setLoader(false);
    }
  }, [page?.pageModel]);
  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
    setSelectedVideo({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };
  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({ Title: '', Description: '', Thumbnail: '' });
    setGalleryState(toggleState);
    setGalleryType(type);
  };
  const unsavedChangesCrossButtonHandle = () => {
    setShowSaveWarning(false);
    setTriggerCase(null);
    setPublishLoading(false);
    setSaveLoading(false);
  };

  const routeChange = (path = '/prelem-search') => {
    const addPrelemObj = {
      eventType: 'Add Prelem',
      clickType: 'Add Prelem click on edit page',
    };
    handleImpression(addPrelemObj.eventType, addPrelemObj);
    if (path == 'prelem-search') {
      dispatch(
        savePrelemPosition(
          parseInt(page?.insertPrelemAt) + 1,
          parseInt(page?.insertPrelemAt) + 1
        )
      );
    }
    navigate(path);
  };
  const addSectionTouchPointClick = (
    prelemPosition: string,
    position: string
  ) => {
    let prelemInsertIndexAt = 0;
    if (position == 'top') prelemInsertIndexAt = parseInt(prelemPosition);
    if (position == 'bottom')
      prelemInsertIndexAt = parseInt(prelemPosition) + 1;
    dispatch(savePrelemPosition(prelemInsertIndexAt, prelemInsertIndexAt));
    routeChange();
  };
  const prelemReset = (prelemIndex: number) => {
    resetPrelem(
      dispatch,
      page?.prelemMetaArray[prelemIndex].DocumentType,
      page?.prelemMetaArray[prelemIndex].PrelemId,
      prelemIndex,
      fetchDefaultData,
      fetchPrelemDefaultInfo,
      t
    );
    isPrelemDataReset(true);
    isPrelemResetIndex(prelemIndex);
  };
  const onCloseButtonHandler = () => {
    setTimeout(() => {
      setIsPrelemDataEditedToast(false);
    }, 4000);
  };
  const onCloseSaveHandler = () => {
    setIsNotificationToast(false);
  };
  const closePageSettings = () => {
    setPageSettingsPanelState(false);
  };

  const onCloseDeleteHandler = () => {
    setIsDeleteSuccess(false);
  };
  const openPrelemSettings = (prelemIndexInitial) => {
    const existingEntries = page?.prelemMetaArray;
    setSelectedPrelemModelData({ ...existingEntries[prelemIndexInitial] });
    setSelectedPrelemModelDataIndex(prelemIndexInitial);
    setSettingsPanelState(true);
    closePageSettings();
  };
  const closePrelemSettings = () => {
    setSettingsPanelState(false);
    setImageOrVideoToDefault();
  };
  const openPageSettingsPanel = () => {
    setPageSettingsPanelState(true);
    closePrelemSettings();
    setImageOrVideoToDefault();
  };
  const updatePrelemModelChild = () => {
    const existingEntries = page?.prelemMetaArray;
    existingEntries[selectedPrelemModelDataIndex].IsModified = true;
    setData(existingEntries);
    setSelectedPrelemModelData({
      ...existingEntries[selectedPrelemModelDataIndex],
    });
    setIsPrelemDataEditedToast(true);
    onCloseButtonHandler();
  };
  const deleteCloseButtonHandle = () => {
    setIsDeletePopup(false);
  };
  const deleteConfirmButtonHandle = () => {
    dispatch(deletePrelem(currentPrelemIndx));
    setIsDeletePopup(false);
    setIsDeleteSuccess(true);
  };
  const resetCloseButtonHandle = () => {
    setIsResetPopup(false);
  };
  const resetConfirmButtonHandle = () => {
    prelemReset(currentPrelemIndx);
    setIsResetPopup(false);
  };

  const saveAsDraftViewButtonHandle = () => {
    setOpenSaveModal(false);
  };
  const saveAsDraftGoToPagesButtonHandle = () => {
    setOpenSaveModal(false);
    navigate('/page-list');
  };
  const saveAsDraftCrossButtonHandle = () => {
    setOpenSaveModal(false);
  };
  const publishGoToPagesButtonHandle = () => {
    setOpenPublishModal(false);
    navigate('/page-list');
  };
  const deleteImageOrVideoCloseButtonHandle = () => {
    setIsImageOrVideoDeletePopup(false);
    setConfirmImageOrVideoDelete(false);
  };
  const deleteImageOrVideoConfirmButtonHandle = () => {
    setIsImageOrVideoDeletePopup(false);
    setConfirmImageOrVideoDelete(true);
    showToastSuccess(
      `${t(galleryType == 'Images' ? ' image' : ' video')} ${t(
        'deleted_toast'
      )}`
    );
  };

  // const publishCrossButtonHandle = () => {};
  const scrollToTop = async (prelemRef) => {
    await prelemRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const handleScroll = (event) => {
    sessionStorage.setItem('prelemScrollValue', event.currentTarget.scrollTop);
  };
  const handlePrelemEditMode = async (
    prelemIndex: number,
    prelemRef,
    schemaArray
  ) => {
    prelemEditRef.current = prelemRef.current;
    await scrollToTop(prelemRef);
    await initInsituEditing(schemaArray, prelemRef);
    await setSelectedPrelemEditMode(prelemIndex);
    await setSelectedPrelemEditState(true);
    await isPrelemDataReset(false);
  };
  useEffect(() => {
    prelemEditRef?.current?.addEventListener('scroll', handleScroll);
    return () => {
      prelemEditRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPrelemEditMode]);
  const handleClick = (
    prelemIndexInitial,
    operation,
    prelemRef,
    schemaArray
  ) => {
    setCurrentPrelemIndx(prelemIndexInitial);
    switch (operation) {
      case EDIT:
        handlePrelemEditMode(prelemIndexInitial, prelemRef, schemaArray);
        break;
      case UP:
      case DOWN:
        dispatch(movePrelem(prelemIndexInitial, operation));
        break;
      case RESET:
        setIsResetPopup(true);
        break;
      case VISIBILITY:
      case VISIBILITYOFF:
        dispatch(hidePrelem(prelemIndexInitial));
        break;
      case DELETE:
        setIsDeletePopup(true);
        break;
      case DUPLICATE:
        duplicatePrelem(
          prelemIndexInitial,
          page?.prelemMetaArray[prelemIndexInitial],
          mutateDuplicatePrelem,
          dispatch,
          t
        );
        break;
      case SETTINGS:
        openPrelemSettings(prelemIndexInitial);
        break;
      default:
        break;
    }
  };

  // const handleScreenLayout = (name) => {};
  const handleSetSelectedPrelemEditState = (
    name,
    obj,
    schemaArray,
    prelemRef,
    index,
    buttonsKeysPopulatedObj
  ) => {
    dispatch(updateSaveWarning(true));
    setInsituEditingContentIndex(index);
    insituContentIndex.current = index;
    setEditableValue(
      doneInsituEditing(
        schemaArray,
        prelemRef,
        buttonsKeysPopulatedObj,
        page?.prelemMetaArray[insituContentIndex?.current]?.PrelemId
      )
    );
    const editableValueNotification = doneInsituEditing(
      schemaArray,
      prelemRef,
      buttonsKeysPopulatedObj,
      page?.prelemMetaArray[insituContentIndex?.current]?.PrelemId
    );
    saveStatus.current = false;
    editableValueNotification?.updatedEditableList.forEach((ele) => {
      if (ele?.errorString) {
        showToastError(`${ele.errorString}error with ${ele.id} field`);
      }
    });
  };
  const handleScreenPreview = (device) => {
    const previewObj = {
      eventType: 'Page Preview',
      previewType: `${device} Preview`,
    };
    handleImpression(previewObj.eventType, previewObj);
    setPreviewType(device);
    navigate(`/preview-page/${device}`);
  };
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), 'h:mm aa, dd LLLL');
  };
  const checkScheduleValidity = (
    scheduleType,
    publishtimeEntered,
    unpublishtimeEntered
  ) => {
    const currentDateTime = addMinutes(new Date(), 5);

    switch (scheduleType) {
      case 'PUBLISH':
        if (publishtimeEntered < currentDateTime) {
          setPublishLoading(false);
          showToastError(`${t('page')} ${t('publish_time_toast')}`);
          return false;
        }
        break;
      case 'UNPUBLISH':
        if (unpublishtimeEntered < currentDateTime) {
          setPublishLoading(false);
          showToastError(`${t('page')} ${t('unpublish_time_toast')}`);
          return false;
        } else {
          if (page?.pageSettings.IsSchedulePublish && publishtimeEntered) {
            const validUnpublishDateTime = addMinutes(publishtimeEntered, 10);
            if (unpublishtimeEntered < validUnpublishDateTime) {
              setPublishLoading(false);
              showToastError(`${t('page')} ${t('publish_vs_unpublish_toast')}`);
              return false;
            } else {
              return true;
            }
          }
        }
        return true;
    }
    return true;
  };
  const scheduleUnPublishPageAt = (
    unpublishrequestdto,
    pageModel,
    scheduleTime,
    timeZone,
    validPublishTime,
    validUnpublishTime
  ) => {
    mutateScheduleUnPublish({
      variables: {
        publishrequestdto: unpublishrequestdto,
        scheduleTime: scheduleTime,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        if (validUnpublishTime && validPublishTime) {
          return;
        } else {
          if (validUnpublishTime) {
            publishPopup.current = {
              publishTitle: 'Congratulations',
              publishDescription: `Your page has been sent for publishing & will be published in a few seconds and scheduled to unpublish at ${dateFormat(
                new Date(page?.pageSettings?.ScheduleUnpublishDateTime)
              )}`,
              publishCloseText: 'View',
              publishConfirmText: 'Go To Pages',
            };
            setOpenPublishModal(true);
            setPublishLoading(false);
            showToastSuccess(
              `${t('page')} ${t('scheduled_to_unpublish_toast')}`
            );
          }
        }
      })
      .catch((error) => {
        setPublishLoading(false);
        showToastError(`${t('page')} ${t('unpublish_error_toast')}`);
      });
  };
  const schedulePublishPageAt = (
    publishrequestdto,
    pageModel,
    scheduleTime,
    timeZone,
    validPublishTime,
    validUnpublishTime
  ) => {
    mutateSchedulePublish({
      variables: {
        publishrequestdto: publishrequestdto,
        scheduleTime: scheduleTime,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        if (validPublishTime && validUnpublishTime) {
          publishPopup.current = {
            publishTitle: 'Congratulations',
            publishDescription: `Your page has been scheduled to publish at ${dateFormat(
              new Date(page?.pageSettings?.SchedulePublishDateTime)
            )} & scheduled to unpublish at ${dateFormat(
              new Date(page?.pageSettings?.ScheduleUnpublishDateTime)
            )}`,
            publishCloseText: 'View',
            publishConfirmText: 'Go To Pages',
          };
          setOpenPublishModal(true);
          setPublishLoading(false);
          showToastSuccess(`${t('page')} ${t('scheduled_to_unpublish_toast')}`);
          showToastSuccess(`${t('page')} ${t('scheduled_to_publish_toast')}`);
        } else {
          if (validPublishTime) {
            if (!page?.pageSettings.IsScheduleUnpublish) {
              publishPopup.current = {
                publishTitle: 'Congratulations',
                publishDescription: `Your page has been scheduled to publish at ${dateFormat(
                  new Date(page?.pageSettings?.SchedulePublishDateTime)
                )}`,
                publishCloseText: 'View',
                publishConfirmText: 'Go To Pages',
              };
              setOpenPublishModal(true);
              setPublishLoading(false);
              showToastSuccess(
                `${t('page')} ${t('scheduled_to_publish_toast')}`
              );
            }
          }
        }
      })
      .catch((error) => {
        setPublishLoading(false);
        showToastError(`${t('page')} ${t('publish_error_toast')}`);
      });
  };
  const publishPageNow = (requestdto, pageModel, timeZone) => {
    mutatePublish({
      variables: {
        input: requestdto,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        showToastSuccess(`${t('page')} ${t('pubished_success_toast')}`);
        if (
          !page?.pageSettings.IsSchedulePublish &&
          !page?.pageSettings.IsScheduleUnpublish
        ) {
          publishPopup.current = {
            publishTitle: 'Congratulations',
            publishDescription:
              'Your page has been sent for publishing & will be published in a few seconds.',
            publishCloseText: 'View',
            publishConfirmText: 'Go To Pages',
          };
          setOpenPublishModal(true);
          setPublishLoading(false);
        }
        if (showSaveWarning) {
          setShowSaveWarning(false);
        }

        const pageDataObj = {
          eventType: 'Page Published',
          pagePublished: true,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
      })
      .catch((error) => {
        setPublishLoading(false);
        showToastError(`${t('page')} ${t('published_error_toast')}`);
      });
  };
  const saveCheck = () => {
    if (!saveStatus.current) {
      setShowSaveWarning(true);
      return false;
    }
    return true;
  };

  const savePage = () => {
    setSaveLoading(true);
    const {
      IsSchedulePublish,
      IsScheduleUnpublish,
      SchedulePublishDateTime,
      ScheduleUnpublishDateTime,
    } = page.pageSettings;
    if (
      publishUnpublishFieldCheck(
        IsSchedulePublish,
        IsScheduleUnpublish,
        SchedulePublishDateTime,
        ScheduleUnpublishDateTime
      )
    ) {
      if (page?.callSave === true) {
        dispatch(callSaveandResetWarning(false));
      } else {
        dispatch(updateSaveWarning(false));
      }
      setSaveUpdate(true);
      saveStatus.current = true;
      if (showSaveWarning) {
        setShowSaveWarning(false);
      }
      const newModel = consolidatePageModel(
        page?.pageModel,
        page?.prelemMetaArray,
        page?.pageSettings,
        username
      );
      mutate({
        variables: { input: newModel },
      })
        .then(() => {
          setIsNotificationToast(true);
          setOpenSaveModal(true);
          setSaveLoading(false);
          const pageDataObj = {
            eventType: 'Page Saved',
            pageSaved: true,
          };
          handleImpression(pageDataObj.eventType, pageDataObj);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      setSaveLoading(false);
      showToastError(`${t('publish_or_unpublish')}`);
    }
  };

  const publishPage = () => {
    const schedulePublish = page?.pageSettings?.SchedulePublishDateTime;
    const scheduleUnpublish = page?.pageSettings?.ScheduleUnpublishDateTime;
    const newModel = consolidatePageModel(
      page?.pageModel,
      page?.prelemMetaArray,
      page?.pageSettings,
      username
    );
    const requestdto = {
      page: page?.pageModel.Page,
      parentpageurl: '/',
      currentpageurl: page?.pageModel.CurrentPageURL,
    };
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const validPublishTime = page?.pageSettings.IsSchedulePublish
      ? checkScheduleValidity(
          'PUBLISH',
          new Date(schedulePublish),
          scheduleUnpublish
        )
      : false;
    const validUnpublishTime = page?.pageSettings.IsScheduleUnpublish
      ? checkScheduleValidity(
          'UNPUBLISH',
          new Date(schedulePublish),
          new Date(scheduleUnpublish)
        )
      : false;
    if (
      page?.pageSettings.IsSchedulePublish &&
      page?.pageSettings.IsScheduleUnpublish
    ) {
      if (validPublishTime && validUnpublishTime) {
        schedulePublishPageAt(
          requestdto,
          newModel,
          schedulePublish,
          timeZone,
          validPublishTime,
          validUnpublishTime
        );
        scheduleUnPublishPageAt(
          requestdto,
          newModel,
          scheduleUnpublish,
          timeZone,
          validPublishTime,
          validUnpublishTime
        );
      }
    } else {
      if (page?.pageSettings.IsSchedulePublish && validPublishTime) {
        schedulePublishPageAt(
          requestdto,
          newModel,
          schedulePublish,
          timeZone,
          validPublishTime,
          validUnpublishTime
        );
      }
      if (page?.pageSettings.IsScheduleUnpublish && validUnpublishTime) {
        publishPageNow(requestdto, newModel, timeZone);
        scheduleUnPublishPageAt(
          requestdto,
          newModel,
          scheduleUnpublish,
          timeZone,
          validPublishTime,
          validUnpublishTime
        );
      }
      if (
        !page?.pageSettings.IsSchedulePublish &&
        !page?.pageSettings.IsScheduleUnpublish
      ) {
        publishPageNow(requestdto, newModel, timeZone);
      }
    }
    if (showSaveWarning) {
      setShowSaveWarning(false);
    }
  };
  const updatePrelemContent = (
    updatedContent,
    prelemAt,
    documentPath,
    documentCreationPath,
    documentType,
    instanceId
  ) => {
    setIsSaveButtonEnabled(false);
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
        setIsSaveButtonEnabled(true);
      })
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
      });
  };
  const callFnsCase = (triggerCaseSent) => {
    setShowSaveWarning(false);
    const searchCat = searchPageUrl.searchParams.get('searchCat');
    const searchTerm = searchPageUrl.searchParams.get('searchTerm');
    const sortBy = searchPageUrl.searchParams.get('sortBy');
    switch (triggerCaseSent) {
      case 'PAGE_LIST':
        setSaveUpdate(true);
        navigate({
          pathname: '/page-list',
          search: `?${createSearchParams({
            ...(searchCat && {
              searchCat: searchCat ? searchCat.toString() : '',
            }),
            ...(searchTerm && {
              searchTerm: searchTerm ? searchTerm.toString() : '',
            }),
            ...(sortBy && { sortBy: sortBy ? sortBy.toString() : '' }),
          })}`,
        });
        break;
      case 'PUBLISH':
        publishPage();
        break;
    }
  };
  const backToPageList = () => {
    const status = saveCheck();
    if (!status) {
      setTriggerCase('PAGE_LIST');
    } else {
      callFnsCase('PAGE_LIST');
    }
  };
  const onPublishClick = () => {
    setPublishLoading(true);
    const status = saveCheck();
    if (!status) {
      setTriggerCase('PUBLISH');
    } else {
      callFnsCase('PUBLISH');
    }
  };
  useEffect(() => {
    if (isPageMounted.current && page?.callSave === true) {
      savePage();
    }
  }, [page?.callSave]);

  useEffect(() => {
    setData(page?.prelemMetaArray);
  }, [page?.prelemMetaArray]);

  const onCloseSaveWarningHandler = () => {
    savePage();
    setShowSaveWarning(false);
  };
  const unloadCallback = (event) => {
    event.preventDefault();
    if (!saveStatus.current) {
      event.returnValue = '';
      return '';
    }
  };
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (saveStatus.current) {
      backToPageList();
    } else {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );

      backToPageList();
    }
  };
  useEffect(() => {
    if (
      !compareUpdatedInsituEditingValue(
        page?.prelemMetaArray[insituEditingContentIndex]?.content,
        editableValue?.updatedEditableValue
      ) ||
      contentUpdateStatus?.current
    ) {
      if (contentUpdateStatus?.current) {
        contentUpdateStatus.current = false;
      }
      if (
        !editableValue?.updatedEditableList?.some((ele) => ele?.errorString)
      ) {
        if (editableValue && insituEditingContentIndex !== '') {
          updatePrelemContent(
            {
              ...page?.prelemMetaArray[insituEditingContentIndex]?.content,
              ...editableValue.updatedEditableValue,
            },
            insituEditingContentIndex,
            page?.prelemMetaArray?.[insituEditingContentIndex]?.DocumentPath,
            page?.prelemMetaArray?.[insituEditingContentIndex]
              ?.DocumentCreationPath,
            page?.prelemMetaArray?.[insituEditingContentIndex]?.DocumentType,
            page?.prelemMetaArray?.[insituEditingContentIndex]?.InstanceId
          );
          setSelectedPrelemEditState(false);
        }
      }
    } else {
      setSelectedPrelemEditState(false);
    }
  }, [editableValue, insituEditingContentIndex]);

  useEffect(() => {
    if (saveUpdate == false) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
    }
    window.addEventListener('beforeunload', unloadCallback);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, [saveUpdate]);

  useEffect(() => {
    isPageMounted.current = true;
  }, []);

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };

  const handleImageOrVedioDelete = (type) => {
    setGalleryType(type);
    setIsImageOrVideoDeletePopup(true);
    setConfirmImageOrVideoDelete(false);
  };

  const onOpenContentType = () => {
    setFromPageContentType('content');
    setContentGalleryStatus(!contentGalleryStatus);
  };

  const eComContentGalleryHandle = (
    data: string,
    fromButton = true,
    selectedMultiSlot = -1
  ) => {
    selectedSlot.current = selectedMultiSlot;
    isFrombuttonforEcommerce.current = fromButton;
    if (data && typeof data === 'string') {
      if (data.includes('ecomEnCodeParse') || !fromButton) {
        setFromPageContentType(uriToJSON(data));
      } else {
        setFromPageContentType('');
      }
    } else {
      setFromPageContentType('');
    }
    setContentGalleryStatus(!contentGalleryStatus);
  };
  /**
   * get params from contentType eCom component
   * @param data string
   */
  const ecomDoneClick = (data: string) => {
    setFromPageContentType('');
    setContentGalleryStatus(!contentGalleryStatus);
    if (!isFrombuttonforEcommerce.current) {
      contentUpdateStatus.current = true;
      dispatch(
        updateEcommercePrelemQueryParam(
          data,
          selectedPrelemEditMode,
          selectedSlot.current
        )
      );
    } else {
      selectedContentEditorialPath.current = data;
    }
  };

  const onToggleContentGallery = (
    activeTab?: string,
    imageVideoContentGallery?: any,
    slotNumber?: number
  ) => {
    selectedTab.current = activeTab || '';
    selectImageVideoGalleryPrelem.current = imageVideoContentGallery;
    if (slotNumber !== -1 && slotNumber !== undefined)
      selectedSlot.current = slotNumber;
    setContentGalleryStatus(!contentGalleryStatus);
    setFromPageContentType('');
  };

  const handleSelectedDynamicContent = async (contentObj) => {
    contentUpdateStatus.current = true;
    dispatch(updateDynamicPrelemContent(contentObj, selectedPrelemEditMode));
    setContentGalleryStatus(!contentGalleryStatus);
    setFromPageContentType('');
  };
  const handleSelectedContent = async (item) => {
    contentUpdateStatus.current = true;
    if (
      ['accolades', 'servicecard', 'testimonial', 'faq'].includes(
        item?.ContentType?.toLowerCase()
      )
    ) {
      dispatch(
        updateFeatureBoxServiceCardContent(item, selectedPrelemEditMode)
      );
    } else if (selectImageVideoGalleryPrelem.current) {
      let updatedGalleryContent = [];
      await getRequestFromDelivery(
        `api/v1/web/en/delivery/multi-slot-content?path=${item?.EditorialItemPath}&contentType=${item?.ContentType}&documentType=${data[currentPrelemIndx].DocumentType}`
      ).then((res) => {
        updatedGalleryContent = res?.data?.fetchMultiSlotContent?.Gallery;
      });
      if (updatedGalleryContent?.length) {
        dispatch(
          updateImageVideoGalleryContent(
            updatedGalleryContent,
            selectedPrelemEditMode,
            selectedTab,
            item?.EditorialItemPath
          )
        );
      }
    } else if (selectedSlot.current !== -1) {
      dispatch(
        updateMultiSlotContent(
          item,
          selectedSlot.current,
          selectedPrelemEditMode
        )
      );
    } else {
      const {
        Title = '',
        Author = '',
        ContentType = '',
        PublishedDate = '',
        CurrentPageURL = '',
        lastModifiedDate = '',
        EditorialItemPath = '',
      } = item;

      const isGalleryArray = isGalleryContentTypeCheck(ContentType); //contentType check

      // convertTo string
      const contentTypeObj = JSON.stringify({
        Title: Title,
        Author: Author,
        ContentType: ContentType,
        isGalleryArray: isGalleryArray,
        contentCreatedBy: PublishedDate,
        isQueryType: 'ContentEnCodeParse',
        contentCreatedDate: lastModifiedDate,
        currentPath: isGalleryArray ? EditorialItemPath : CurrentPageURL, // condition based add endPath
      });
      selectedContentEditorialPath.current = contentTypeObj;
    }
    setContentGalleryStatus(!contentGalleryStatus);
    setFromPageContentType('');
  };

  const renderHeader = () => {
    const demoUsers = {
      'finance@demosite.com': 'finwiz',
      'retail@demosite.com': 'retail',
      'media@demosite.com': 'finwiz',
      'sports@demosite.com': 'finwiz',
    };
    return userInfo &&
      userInfo.username &&
      Object.keys(demoUsers).includes(userInfo.username) ? (
      <ThemeProvider theme={LightTheme}>
        <DemositeHeader headerSitename={demoUsers[userInfo.username]} />
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={theme[`${process.env?.REACT_APP_HEADER_THEME}`]}>
        <Header isAuthoring />
      </ThemeProvider>
    );
  };

  return (
    //Top Header Starts
    <Box
      sx={{
        backgroundColor: '#FFF',
      }}
    >
      {(saveLoading || publishLoading) && <Loader />}
      {galleryState && (
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType}
          handleVideoSelected={handleSelectedVideo}
        />
      )}
      {contentGalleryStatus &&
        (['Prelem_048', 'Prelem_053', 'Prelem_068'].includes(
          data[currentPrelemIndx]?.PrelemId
        ) ? (
          <DynamicContentGallery
            handleSelectedContent={handleSelectedDynamicContent}
            onToggleContentGallery={onToggleContentGallery}
            selectedFilters={data[currentPrelemIndx]?.content?.QueryParam}
            prelemId={data[currentPrelemIndx]?.PrelemId}
          />
        ) : ['Prelem_073', 'Prelem_074', 'Prelem_075', 'Prelem_072'].includes(
            data[currentPrelemIndx]?.PrelemId
          ) ? (
          <>
            <EcommerceAuthoring
              ecomDoneClick={ecomDoneClick}
              ecomCancelClick={onToggleContentGallery}
              fromPageContentType={fromPageContentType}
            />
          </>
        ) : (
          <ContentGallery
            fromPageContentType={fromPageContentType}
            handleSelectedContent={handleSelectedContent}
            onToggleContentGallery={onToggleContentGallery}
            contentType={data[currentPrelemIndx]?.content?.PrelemContentType}
          />
        ))}
      {/* mobile header starts */}
      {pageSettingsPanelState || settingsPanelState ? (
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '10%' }}>
            <Icons
              nameIcon="back"
              enable
              styleObject={{
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
                borderRadius: 0,
                fontSize: '40px',
              }}
              listIndx="back"
              handleClick={() => backToPageList()}
            />
          </Box>
          {pageSettingsPanelState && (
            <Typography variant="h6" sx={{ width: '90%', textAlign: 'center' }}>
              Manage Page
            </Typography>
          )}
          {settingsPanelState && (
            <Typography variant="h6" sx={{ width: '90%', textAlign: 'center' }}>
              Prelem Setting
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
            alignItems: 'center',
            border: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
            height: '48px',
          }}
        >
          <Icons
            nameIcon="back"
            enable
            styleObject={{
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
              borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
              fontSize: '40px',
            }}
            listIndx="back"
            handleClick={() => backToPageList()}
          />
          <Icons
            nameIcon="settings"
            enable
            styleObject={{
              color: pageSettingsPanelState
                ? ThemeConstants.RED_COLOR
                : ThemeConstants.PRIMARY_MAIN_COLOR,
              borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
            }}
            listIndx="settings"
            handleClick={openPageSettingsPanel}
          />
          <Icons
            nameIcon="undo"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderRadius: 0,
            }}
            listIndx="undo"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }} // handleClick={() => handleScreenLayout('undo')}
          />
          <Icons
            nameIcon="redo"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderRadius: 0,
            }}
            listIndx="redo"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }} // handleClick={() => handleScreenLayout('redo')}
          />
          <Icons
            nameIcon="reset"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderRight: '1px solid #dfe1e3',
              borderRadius: 0,
            }}
            listIndx="reset"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Icons
            nameIcon="mobile"
            enable
            styleObject={{
              color: Object.values(data).every((v: any) => v.IsHidden)
                ? ThemeConstants.DIVIDER_COLOR
                : ThemeConstants.PRIMARY_MAIN_COLOR,
              pointerEvents: Object.values(data).every((v: any) => v.IsHidden)
                ? 'none'
                : '',
              marginLeft: 'auto',
              borderRadius: 0,
            }}
            listIndx="mobile"
            handleClick={() => handleScreenPreview('mobile')}
          />
          <Box sx={{ marginLeft: 'auto' }}>
            <ErrorTooltip
              component={
                <Icons
                  nameIcon="save"
                  enable={
                    canAccessAction(CATEGORY_PAGE, '', 'Create')
                      ? isSaveButtonEnabled
                      : false
                  }
                  loader={
                    canAccessAction(CATEGORY_PAGE, '', 'Create') ? true : false
                  }
                  styleObject={{
                    color: '#2d2d39',
                    borderLeft: '1px solid #dfe1e3',
                    borderRadius: 0,
                  }}
                  listIndx={'save'}
                  handleClick={() => savePage()}
                />
              }
              doAccess={!canAccessAction(CATEGORY_PAGE, '', 'Create')}
            />
            <ErrorTooltip
              component={
                <Icons
                  nameIcon="publish"
                  enable={
                    canAccessAction(CATEGORY_PAGE, '', 'publish') ? true : false
                  }
                  styleObject={{
                    color:
                      Object.values(page?.prelemMetaArray).every(
                        (v: any) => v.IsHidden
                      ) || !saveStatus.current
                        ? '#cccccc'
                        : '#2d2d39',
                    pointerEvents:
                      Object.values(page?.prelemMetaArray).every(
                        (v: any) => v.IsHidden
                      ) || !saveStatus.current
                        ? 'none'
                        : '',
                    borderRadius: 0,
                  }}
                  listIndx={'publish'}
                  handleClick={() => onPublishClick()}
                />
              }
              doAccess={!canAccessAction(CATEGORY_PAGE, '', 'publish')}
            />
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #dfe1e3',
          height: '40px',
        }}
      >
        <Box>
          <Icons
            nameIcon="back"
            enable
            styleObject={{
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
              borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
              fontSize: '40px',
            }}
            listIndx="back"
            handleClick={() => backToPageList()}
          />
          <Icons
            nameIcon="settings"
            enable
            styleObject={{
              color: pageSettingsPanelState
                ? ThemeConstants.RED_COLOR
                : ThemeConstants.PRIMARY_MAIN_COLOR,
              borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
            }}
            listIndx="settings"
            handleClick={openPageSettingsPanel}
          />
          <Icons
            nameIcon="undo"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderLeft: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
            }}
            listIndx="undo"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }} // handleClick={() => handleScreenLayout('undo')}
          />
          <Icons
            nameIcon="redo"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderRadius: 0,
            }}
            listIndx="redo"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }} // handleClick={() => handleScreenLayout('redo')}
          />
          <Icons
            nameIcon="reset"
            enable
            styleObject={{
              color: ThemeConstants.DIVIDER_COLOR,
              borderRight: `1px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
              borderRadius: 0,
            }}
            listIndx="reset"
            handleClick={function (
              prelemIndex: string,
              operation: string
            ): void {
              throw new Error('Function not implemented.');
            }}
          />
        </Box>
        {data.length == 0 ||
        Object.values(page?.prelemMetaArray).every((v: any) => v.IsHidden) ==
          true ? (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              opacity: '0.4',
            }}
          >
            <Icons
              nameIcon="desktop"
              enable
              styleObject={{
                color:
                  previewType == 'desktop'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="desktop"
              handleClick={() => handleScreenPreview('desktop')}
            />
            <Icons
              nameIcon="tablet"
              enable
              styleObject={{
                color:
                  previewType == 'tablet'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="tablet"
              handleClick={() => handleScreenPreview('tablet')}
            />
            <Icons
              nameIcon="mobile"
              enable
              styleObject={{
                color:
                  previewType == 'mobile'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="mobile"
              handleClick={() => handleScreenPreview('mobile')}
            />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Icons
              nameIcon="desktop"
              enable
              styleObject={{
                color:
                  previewType == 'desktop'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="desktop"
              handleClick={() => handleScreenPreview('desktop')}
            />
            <Icons
              nameIcon="tablet"
              enable
              styleObject={{
                color:
                  previewType == 'tablet'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="tablet"
              handleClick={() => handleScreenPreview('tablet')}
            />
            <Icons
              nameIcon="mobile"
              enable
              styleObject={{
                color:
                  previewType == 'mobile'
                    ? ThemeConstants.RED_COLOR
                    : ThemeConstants.PRIMARY_MAIN_COLOR,
                borderRadius: 0,
              }}
              listIndx="mobile"
              handleClick={() => handleScreenPreview('mobile')}
            />
          </Box>
        )}
        <Box>
          <ErrorTooltip
            component={
              <Icons
                nameIcon="save"
                enable={
                  canAccessAction(CATEGORY_PAGE, '', 'Create')
                    ? isSaveButtonEnabled
                    : false
                }
                loader={
                  canAccessAction(CATEGORY_PAGE, '', 'Create') ? true : false
                }
                styleObject={{
                  color: '#2d2d39',
                  borderLeft: '1px solid #dfe1e3',
                  borderRadius: 0,
                }}
                listIndx={'save'}
                handleClick={() => savePage()}
              />
            }
            doAccess={!canAccessAction(CATEGORY_PAGE, '', 'Create')}
          />
          <ErrorTooltip
            component={
              <Icons
                nameIcon="publish"
                enable={
                  canAccessAction(CATEGORY_PAGE, '', 'publish') ? true : false
                }
                styleObject={{
                  color:
                    Object.values(page?.prelemMetaArray).every(
                      (v: any) => v.IsHidden
                    ) || !saveStatus.current
                      ? '#cccccc'
                      : '#2d2d39',
                  pointerEvents:
                    Object.values(page?.prelemMetaArray).every(
                      (v: any) => v.IsHidden
                    ) || !saveStatus.current
                      ? 'none'
                      : '',
                  borderRadius: 0,
                }}
                listIndx={'publish'}
                handleClick={() => onPublishClick()}
              />
            }
            doAccess={!canAccessAction(CATEGORY_PAGE, '', 'publish')}
          />
        </Box>
      </Box>
      {/* desktop header ends */}
      {isDeletePopop ? (
        <PlateformXDialog
          isDialogOpen={isDeletePopop}
          title={t('prelem_delete')}
          subTitle={t('prelem_delete_title')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={deleteCloseButtonHandle}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      ) : null}
      {isResetPopop ? (
        <PlateformXDialog
          isDialogOpen={isResetPopop}
          title={t('prelem_reset')}
          subTitle={t('prelem_reset_title')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={resetCloseButtonHandle}
          confirmButtonHandle={resetConfirmButtonHandle}
        />
      ) : null}
      {isImageOrVideoDeletePopop && (
        <PlateformXDialog
          isDialogOpen={isImageOrVideoDeletePopop}
          title={`${t('delete')} ${
            galleryType == 'Images' ? t('image') : t('video')
          }`}
          subTitle={`${t('prelem_delete_title')} ${
            galleryType == 'Images' ? t('image') : t('video')
          }`}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={deleteImageOrVideoCloseButtonHandle}
          confirmButtonHandle={deleteImageOrVideoConfirmButtonHandle}
        />
      )}
      {openSaveModal ? (
        <PlateformXDialog
          isDialogOpen={openSaveModal}
          title={t('page_save_title')}
          subTitle={t('page_save_subtitle')}
          closeButtonText={t('view')}
          confirmButtonText={t('go_to_pages')}
          closeButtonHandle={saveAsDraftViewButtonHandle}
          confirmButtonHandle={saveAsDraftGoToPagesButtonHandle}
          crossButtonHandle={saveAsDraftCrossButtonHandle}
          modalType="save"
        />
      ) : null}
      {openPublishModal ? (
        <PlateformXDialog
          isDialogOpen={openPublishModal}
          title={t('page_published_title')}
          subTitle={t('page_published_subtitle')}
          confirmButtonText={t('go_to_pages')}
          confirmButtonHandle={publishGoToPagesButtonHandle}
          // crossButtonHandle={publishCrossButtonHandle}
          modalType="publish"
        />
      ) : null}
      {showSaveWarning ? (
        <PlateformXDialog
          isDialogOpen={showSaveWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={
            triggerCase === 'PUBLISH' ? t('publish_anyways') : t('take_me_out')
          }
          confirmButtonText={t('done')}
          closeButtonHandle={
            browserBackButtonClick
              ? () => setBrowserBackButtonState(true)
              : () => callFnsCase(triggerCase)
          }
          confirmButtonHandle={onCloseSaveWarningHandler}
          crossButtonHandle={unsavedChangesCrossButtonHandle}
          modalType="unsavedChanges"
        />
      ) : null}
      {isNotificationToast ? (
        <PlateformXSnackbar
          isDefaultOpen={isNotificationToast}
          message={t('page_save_toast')}
          messageType="success"
          onCloseButtonClick={onCloseSaveHandler}
        />
      ) : null}
      {isDeleteSuccess ? (
        <PlateformXSnackbar
          isDefaultOpen={isDeleteSuccess}
          message={`${t('prelem')} ${t('deleted_toast')}`}
          messageType="success"
          onCloseButtonClick={onCloseDeleteHandler}
        />
      ) : null}
      <Box sx={{ display: 'flex' }}>
        {pageSettingsPanelState && (
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: '35%', lg: '35%' },
              height: { xs: '100%', sm: '100%', md: 'auto' },
              boxShadow: '-4px 0 8px 0 rgba(0, 0, 0, 0.18)',
              backgroundColor: '#f5f5f5',
              position: {
                xs: 'fixed',
                sm: 'fixed',
                md: 'absolute',
                lg: 'absolute',
              },
              zIndex: { xs: 1, sm: 1, md: 99, lg: 99 },
              transition: 'all 0.7s',
            }}
          >
            <PageSettings
              handleDelete={handleImageOrVedioDelete}
              confirmImageOrVideoDelete={confirmImageOrVideoDelete}
              handleClose={closePageSettings}
              toggleGallery={toggleGallerySettings}
              selectedImage={selectedImage}
            />
          </Box>
        )}
        {loader ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'calc(100vh - 250px)',
              width: '100%',
            }}
          >
            <CircularProgress
              sx={{ color: ThemeConstants.PRIMARY_MAIN_COLOR }}
            />
          </Box>
        ) : page?.prelemMetaArray.length > 0 ? (
          <Box
            id="container_editpg"
            data-testid="container_editpg"
            sx={{
              backgroundColor: 'white',
              paddingTop: '20px',
              paddingBottom: '20px',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              display: {
                xs: 'inline-block',
                sm: 'inline-block',
                md: 'inline-block',
                lg: 'block',
              },
              height: 'calc(100vh - 40px)',
              overflowX: 'hidden',
              overflowY:
                selectedPrelemEditState || settingsPanelState
                  ? 'hidden'
                  : 'scroll',
            }}
          >
            <Box sx={{ display: 'none' }}>{renderHeader()}</Box>
            <ThemeProvider
              theme={theme[`${process.env?.REACT_APP_COMPONENT_THEME}`]}
            >
              <Box
                sx={{
                  margin: (themeOptions) => themeOptions.prelemMargin.value,
                }}
              >
                {page?.prelemMetaArray?.map((arrayTuple: PrelemInstance, i) => {
                  const showIconsState = {
                    showCreate: true,
                    showVisible: arrayTuple.IsHidden,
                    showCopy: true,
                    showUp: i == 0 ? false : true,
                    showDown:
                      i == page?.prelemMetaArray.length - 1 ? false : true,
                    showReset: arrayTuple.IsModified,
                    showDelete: true,
                    showSettings: true,
                  };
                  const showAddSection = {
                    showAtTop: true,
                    showAtBottom:
                      i == page?.prelemMetaArray.length - 1 ? true : false,
                  };
                  return (
                    <PrelemCard
                      key={`card${i}`}
                      keyIndex={i}
                      showIconsState={showIconsState}
                      prelemInfo={arrayTuple.PrelemId}
                      documentPath={arrayTuple.DocumentPath}
                      prelemDataReset={
                        prelemResetIndex == i ? prelemDataReset : false
                      }
                      handleClick={handleClick}
                      showAddSection={showAddSection}
                      addSectionTouchPointClick={addSectionTouchPointClick}
                      prelemEditState={
                        selectedPrelemEditMode == i
                          ? selectedPrelemEditState
                          : false
                      }
                      eComContentGalleryHandle={eComContentGalleryHandle}
                      contentGalleryStatus={contentGalleryStatus}
                      onToggleContentGallery={onToggleContentGallery}
                      onOpenContentType={onOpenContentType}
                      handlePrelemEditSubmit={(
                        abc,
                        obj,
                        prelemRef,
                        schemaArray,
                        index,
                        buttonsKeysPopulatedObj
                      ) =>
                        handleSetSelectedPrelemEditState(
                          abc,
                          obj,
                          prelemRef,
                          schemaArray,
                          index,
                          buttonsKeysPopulatedObj
                        )
                      }
                      selectedContentForButton={
                        selectedContentEditorialPath.current
                      }
                    />
                  );
                })}
              </Box>
            </ThemeProvider>
            <Box sx={{ display: 'none' }}>
              <ThemeProvider
                theme={theme[`${process.env?.REACT_APP_FOOTER_THEME}`]}
              >
                <Footer />
              </ThemeProvider>
            </Box>
          </Box>
        ) : (
          <Box
            component="div"
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: '320px', sm: '320px', md: '320px', lg: '512px' },
              backgroundColor: '#ffffff',
            }}
          >
            <Box
              component="div"
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: {
                  xs: '320px',
                  sm: '320px',
                  md: '320px',
                  lg: '512px',
                },
                backgroundColor: '#ffffff',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Icons
                    styleObject={{
                      color: '#6d6dff',
                      display: 'block',
                      '& svg': {
                        fontSize: '40px',
                      },
                    }}
                    nameIcon="add"
                    enable
                    listIndx="top"
                    handleClick={() => routeChange()}
                  />
                </Box>
                <Typography sx={{ color: '#6d6dff' }}>
                  {t('add_prelem')}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        {settingsPanelState && (
          <Box
            sx={{
              width: '100%',
              height: { xs: '100%', sm: '100%', md: 'auto' },
              boxShadow: '-4px 0 8px 0 rgba(0, 0, 0, 0.18)',
              position: {
                xs: 'fixed',
                sm: 'fixed',
                md: 'absolute',
                lg: 'absolute',
              },
              right: 0,
              zIndex: { xs: 2, sm: 2, md: 99, lg: 99 },
              transition: 'all 0.7s',
            }}
          >
            <PrelemSettings
              handleClose={closePrelemSettings}
              handleUpdatedPrelemModelChild={updatePrelemModelChild}
              selectedPrelemIndex={selectedPrelemModelDataIndex}
              toggleGallery={toggleGallerySettings}
              selectedImage={selectedImage}
              selectedVideo={selectedVideo}
              handleDelete={handleImageOrVedioDelete}
              confirmImageOrVideoDelete={confirmImageOrVideoDelete}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
