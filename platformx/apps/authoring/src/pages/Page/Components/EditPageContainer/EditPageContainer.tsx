import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { addMinutes, format } from 'date-fns';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Icons from '../../../../components/Icons';
import PlateformXDialog from '../../../../components/Modal';
import {
  showToastError,
  showToastSuccess,
} from '../../../../components/toastNotification/toastNotificationReactTostify';
import { FETCH_PAGE_MODEL_DRAFT } from '../../../../graphql/fetchQueries';
import { FETCH_PRELEM_VALIDATION } from '../../../../graphql/prelemQueries';
import useAccess from '../../../../hooks/usePermissions/useAccess';
import { getRequestFromDelivery } from '../../../../services/config/request';
import {
  fetchAllPageList,
  publishPageModel,
  savePageModel,
  schedulePublish,
  scheduleUnpublish,
  updatePrelemData,
} from '../../../../services/page/page.api';
import {
  deplicatePrelem,
  fetchPrelemDefaultMeta,
  fetchResetData,
} from '../../../../services/prelems/prelems.api';
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
  updatePageModelModificationDate,
  updateSaveWarning,
} from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../theme/variable';
import { CATEGORY_PAGE } from '../../../../utils/constants';
import { uriToJSON } from '../../../../utils/helper';
import {
  consolidatePageModel,
  getCurrentLang,
  getSelectedSite,
} from '../../../../utils/helperFunctions';
import {
  doneInsituEditing,
  initInsituEditing,
} from '../../../../utils/insituEditing';
import ContentGallery from '../../../ContentGallery/ContentGallery';
import DynamicContentGallery from '../../../ContentGallery/DynamicContentGallery';
import EcommerceAuthoring from '../../../EcommerceAuthoring/EcommerceAuthoring';
import Gallery from '../../../Gallery/Gallery';
import {
  DYNAMIC_PRELEM_LIST,
  PageSettingListData,
  PrelemActions,
  PrelemSettingCardList,
  isGalleryContentTypeCheck,
} from '../../utils/constant';
import { PrelemInstance } from '../../utils/editTypes';
import Prelem from '../AddPrelem/Prelem';
import Header from '../EditPageHeader/Header';
import HeaderMobile from '../EditPageHeader/HeaderMobile';
import LeftBox from '../PageContainer/LeftBox';
import PageLayout from '../PageContainer/PageContainer';
import RightBox from '../PageContainer/RightBox';
import Analytics from '../PageSettings/Analytics';
import PageInfo from '../PageSettings/PageInfo';
import SEOBasics from '../PageSettings/SEOBasics';
import Schedule from '../PageSettings/Schedule';
import SocialShare from '../PageSettings/SocialShare';
import PrelemSettingMenu from '../PrelemSettingMenu/PrelemSettingMenu';
import PrelemInfo from '../PrelemSettings/PrelemInfo';
import PrelemSettingsCard from '../PrelemSettings/PrelemSettingsCard';
import { useStyles } from './EditPageContainer.styles';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { StatusKey } from '../../../../Common/Listing/Utils/Constants';
import EditIcon from '../../../../assets/svg/editIcon.svg';
import SettingIcon from '../../../../assets/svg/settingIcon.svg';
import LoadingTextModal from '../../../../components/Common/LoadingTextModal';
import { workflowKeys } from '../../../../components/Submit/Utils/contstants';
import WorkflowHistory from '../../../../components/WorkflowHistory/WorkflowHistory';
import { useCommentContext } from '../../../../context/CommentsContext/CommentsContext';
import useUserSession from '../../../../hooks/useUserSession/useUserSession';
import useWorkflow from '../../../../hooks/useWorkflow/useWorkflow';
import commentsApi from '../../../../services/comments/comments.api';
import LightTheme from '../../../../theme/lightTheme';
import { Dashboard_Keys } from '../../../Dashboard/utils/constant';
import PrelemLoader from '../../PrelemSearch/PrelemLoader/PrelemLoader';
import PageSettingList from '../PageSettingList/PageSettingList';

const EditPageContainer = () => {
  const [pageId, setPageId] = useState('pageSetting');
  const classes = useStyles();
  const [previewType, setPreviewType] = React.useState('web');
  const [prelemIndex, setPrelemIndex] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { role, userInfo } = getSession();
  //Prelem related fields
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(page?.prelemMetaArray);
  const [workflow, setWorkflow] = useState({});
  const [currentPrelemIndx, setCurrentPrelemIndx] = useState(-1);
  const prelemEditRef = useRef<any>();
  const [selectedPrelemEditMode, setSelectedPrelemEditMode] = useState(-1);
  const [selectedPrelemEditState, setSelectedPrelemEditState] = useState(false);
  const [prelemDataReset, isPrelemDataReset] = useState<boolean>(false);
  const [contentGalleryStatus, setContentGalleryStatus] = useState(false);
  const [fromPageContentType, setFromPageContentType] = useState('');
  const [insituEditingContentIndex, setInsituEditingContentIndex] =
    useState('');
  const [editableValue, setEditableValue] = useState<any>(null);
  const [prelemResetIndex, isPrelemResetIndex] = useState<number>(-1);
  const [isResetPopop, setIsResetPopup] = useState(false);
  const [isDeletePopop, setIsDeletePopup] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [selectedPrelemModelData, setSelectedPrelemModelData] = useState('');
  const [selectedPrelemModelDataIndex, setSelectedPrelemModelDataIndex] =
    useState(-1);
  const [browserBackButtonState, setBrowserBackButtonState] =
    useState<boolean>(false);
  const [isPrelemDataEditedToast, setIsPrelemDataEditedToast] =
    useState<boolean>(false);
  const [showSaveWarning, setShowSaveWarning] = useState<boolean>(false);
  const insituContentIndex = useRef(0);
  const [triggerCase, setTriggerCase] = useState<string | null>(null);
  const [saveUpdate, setSaveUpdate] = useState<boolean>(true);
  const [isNotificationToast, setIsNotificationToast] =
    useState<boolean>(false);
  const searchPageUrl = new URL(window.location.href);
  const selectedTab = useRef('image');
  const selectImageVideoGalleryPrelem = useRef();
  const isPageMounted = useRef(false);
  const selectedSlot = useRef(-1);
  const saveStatus = useRef(true);
  const contentUpdateStatus = useRef(false);
  const selectedContentEditorialPath = useRef('');
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(true);
  const [handleImpression] = usePlatformAnalytics();
  const [loader, setLoader] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  //Prelem related queries
  const [runFetchPageModel] = useLazyQuery(FETCH_PAGE_MODEL_DRAFT);
  const [runFetchValidationQuery] = useLazyQuery(FETCH_PRELEM_VALIDATION);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');
  const [mutatePrelemContentQuery] = useMutation(updatePrelemData);
  const [mutateDuplicatePrelem] = useMutation(deplicatePrelem);
  const [fetchDefaultData] = useLazyQuery(fetchResetData);
  const [fetchPrelemDefaultInfo] = useLazyQuery(fetchPrelemDefaultMeta);
  const [runAllFetchPageList] = useLazyQuery(fetchAllPageList);
  const [mutatePublish] = useMutation(publishPageModel);
  const [mutateSchedulePublish] = useMutation(schedulePublish);
  const [mutate] = useMutation(savePageModel);
  const [gifPlaying, setGifPlaying] = useState(false);
  const { workflowRequest } = useWorkflow();
  const [enableWorkflowHistory, setEnableWorkflowHistory] =
    useState<boolean>(false);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const login_user_id = userInfo?.user_id;
  // const { state: editPageState } = useLocation();
  const [timerState, setTimerState] = useState(
    localStorage.getItem('pageTimerState') == 'true' ? true : false
  );
  const isFrombuttonforEcommerce = useRef(true);
  const publishPopup = useRef({
    publishTitle: 'Congratulations',
    publishDescription:
      'Your page has been sent for publishing & will be published in a few seconds.',
    publishCloseText: 'View',
    publishConfirmText: 'Go To Pages',
  });
  const [value, setValue] = React.useState('Page_Setting');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const DesignTab = useMediaQuery(`@media(max-width:${ThemeConstants.SM}px)`);
  const DesignWeb = useMediaQuery(`@media(max-width:${ThemeConstants.SM}px)`);

  useEffect(() => {
    setValue(DesignTab ? 'Page_Design' : 'Page_Setting');
  }, [DesignTab]);

  useEffect(() => {
    if (timerState) {
      localStorage.setItem('pageTimerState', 'true');
    }
  }, [timerState]);
  const {
    setIsReviewEnabled,
    setIsCommentPanelOpen,
    isReviewEnabled,
    comments,
  } = useCommentContext();
  console.log('data123', comments);
  useEffect(() => {
    const {
      Title,
      Path,
      workflow_status,
      stages,
      Page_LastModifiedBy,
      Page_CreatedBy,
      Page,
      task_status,
      user_id,
      user_name,
    } = page.pageModel;
    if (Object.keys(page?.pageModel).length === 0) {
      setLoader(true);
      fetchPageModel(
        dispatch,
        runFetchPageModel,
        runFetchValidationQuery,
        searchParams?.get('page')
      );
    } else {
      setLoader(false);
      runAllFetchPageList({
        variables: {
          obj: { start: 0, rows: 1000 },
          type: 'PUBLISHED',
        },
        context: {
          headers: {
            language: localStorage.getItem('lang'),
            sitename: getSelectedSite(),
          },
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
      setWorkflow({
        title: Title,
        description: '',
        path: Path,
        workflow_status,
        stages,
        tag_name: Dashboard_Keys.SITE_PAGE,
        last_modifiedBy: Page_LastModifiedBy,
        createdBy: Page_CreatedBy,
        role,
        page: Page,
        enable: stages?.length > 0 ? true : false,
        login_user_id,
        task_status,
        task_user_id: user_id,
        task_user_name: user_name,
      });
    }
  }, [page?.pageModel]);

  useEffect(() => {
    if (isPageMounted && page?.showSaveWarning) {
      setSaveUpdate(false);
      saveStatus.current = false;
    }
  }, [page?.showSaveWarning]);

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
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(
      workflowObj,
      status
    );
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() &&
      status === workflowKeys.approve
        ? setOpenPublishModal(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const savePage = (isWorkflow = false, props = {}, event_step = '') => {
    setSaveLoading(true);
    setGifPlaying(true);
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
      dispatch(updatePageModelModificationDate(new Date()));
      mutate({
        variables: { input: newModel },
        context: {
          headers: {
            sitename: getSelectedSite(),
          },
        },
      })
        .then(() => {
          setTimerState(true);
          setGifPlaying(false);

          if (isWorkflow) {
            workflowSubmitRequest(props, event_step);
          } else {
            setIsNotificationToast(true);
            setGifPlaying(false);
            showToastSuccess(t('page_save_toast'));
          }
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
      setTimerState(false);
      showToastError(`${t('page')} ${t('publish_or_unpublish')}`);
    }
  };

  useEffect(() => {
    if (isPageMounted.current && page?.callSave === true) {
      savePage();
    }
  }, [page?.callSave]);
  useEffect(() => {
    isPageMounted.current = true;
  }, []);

  useEffect(() => {
    setData(page?.prelemMetaArray);
  }, [page?.prelemMetaArray]);

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

  const compareUpdatedInsituEditingValue = (obj1, obj2) => {
    for (const key in obj2) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
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
    const { prelemMetaArray = [], insertPrelemAt = 0, scrollIndex = 0 } = page;
    if (prelemMetaArray.length > 1 && scrollIndex !== 0) {
      document?.getElementById(`prelem${insertPrelemAt}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [page]);

  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [isImageOrVideoDeletePopop, setIsImageOrVideoDeletePopup] =
    useState(false);
  const [browserBackButtonClick, setBrowserBackButtonClick] =
    useState<boolean>(false);
  const [mutateScheduleUnPublish] = useMutation(scheduleUnpublish);
  const [openPublishModal, setOpenPublishModal] = useState<boolean>(false);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState<boolean>(false);
  const { canAccessAction } = useAccess();
  const handleChange = (event: React.SyntheticEvent, updatedVal: string) => {
    setPreviewType(updatedVal);
    handleScreenPreview(updatedVal);
  };

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
    console.log('toogle', toggleState);
    setGalleryState(toggleState);
    setGalleryType(type);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };

  const onCloseButtonHandler = () => {
    setTimeout(() => {
      setIsPrelemDataEditedToast(false);
    }, 4000);
  };

  const updatePrelemModelChild = () => {
    const existingEntries = page?.prelemMetaArray;
    existingEntries[prelemIndex].IsModified = true;
    setData(existingEntries);
    setSelectedPrelemModelData({
      ...existingEntries[selectedPrelemModelDataIndex],
    });
    setIsPrelemDataEditedToast(true);
    onCloseButtonHandler();
  };

  // to open prelem settings section
  const openPrelemSettings = (prelemIndexInitial, operation) => {
    setPageId(operation);
    setPrelemIndex(prelemIndexInitial);
  };

  const scrollToTop = async (prelemRef) => {
    await prelemRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handlePrelemEditMode = async (
    prelemIndex: number,
    prelemRef,
    schemaArray
  ) => {
    dispatch(savePrelemPosition(page?.insertPrelemAt, 0));
    prelemEditRef.current = prelemRef.current;
    await initInsituEditing(schemaArray, prelemRef);
    await setSelectedPrelemEditMode(prelemIndex);
    await setSelectedPrelemEditState(true);
    await isPrelemDataReset(false);
    await scrollToTop(prelemRef);
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

  const handleScreenPreview = (device) => {
    const previewObj = {
      eventType: 'Page Preview',
      previewType: `${device} Preview`,
    };
    handleImpression(previewObj.eventType, previewObj);
    setPreviewType(device);
    navigate(`/preview-page/${device}`);
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

  const handleOperations = (
    prelemIndexInitial,
    operation,
    prelemRef,
    schemaArray
  ) => {
    setCurrentPrelemIndx(prelemIndexInitial);
    if (page?.scrollIndex !== 0) {
      dispatch(savePrelemPosition(page?.insertPrelemAt, 0));
    }
    switch (operation) {
      case PrelemActions.PRELEM_INFO:
        setPageId('new');
        setPageId(operation);
        setPrelemIndex(prelemIndexInitial);
        console.log('jhgf', prelemIndexInitial);
        break;
      case PrelemActions.EDIT:
        handlePrelemEditMode(prelemIndexInitial, prelemRef, schemaArray);
        break;
      case PrelemActions.COPY:
        duplicatePrelem(
          prelemIndexInitial,
          page?.prelemMetaArray[prelemIndexInitial],
          mutateDuplicatePrelem,
          dispatch,
          t
        );
        break;
      case PrelemActions.SHOW:
      case PrelemActions.HIDE:
        dispatch(hidePrelem(prelemIndexInitial));
        break;
      case PrelemActions.UP:
      case PrelemActions.DOWN:
        dispatch(movePrelem(prelemIndexInitial, operation));
        break;
      case PrelemActions.RESET:
        setIsResetPopup(true);
        break;
      case PrelemActions.DELETE:
        setIsDeletePopup(true);
        break;
      case PrelemActions.PRELEM_SETTING:
        openPrelemSettings(prelemIndexInitial, operation);
        break;
    }
  };

  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({ Title: '', Description: '', Thumbnail: '' });
    setGalleryState(toggleState);
    setGalleryType(type);
  };

  const handleGallery = (toggleState, galleryType, settingsSection) => {
    toggleGallerySettings(toggleState, galleryType);
    setSelectedOperation('replace');
    setSelectedSection(settingsSection);
  };

  const handleImageOrVedioDelete = (type) => {
    setGalleryType(type);
    setIsImageOrVideoDeletePopup(true);
    setConfirmImageOrVideoDelete(false);
  };

  const handleImageDelete = (settingsSection) => {
    handleImageOrVedioDelete('Images');
    setSelectedOperation('delete');
    setSelectedSection(settingsSection);
  };
  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };

  const resetCloseButtonHandle = () => {
    setIsResetPopup(false);
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

  const resetConfirmButtonHandle = () => {
    prelemReset(currentPrelemIndx);
    setIsResetPopup(false);
  };

  const deleteConfirmButtonHandle = () => {
    dispatch(deletePrelem(currentPrelemIndx));
    setIsDeletePopup(false);
    setIsDeleteSuccess(true);
    showToastSuccess(t('prelem_deleted_toast'));
    setPageId('pageSetting');
  };
  const deleteCloseButtonHandle = () => {
    setIsDeletePopup(false);
  };
  const onCloseDeleteHandler = () => {
    setIsDeleteSuccess(false);
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
    dispatch(updatePageModelModificationDate(new Date()));
    mutateScheduleUnPublish({
      variables: {
        publishrequestdto: unpublishrequestdto,
        scheduleTime: scheduleTime,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        setTimerState(true);
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
    dispatch(updatePageModelModificationDate(new Date()));
    mutateSchedulePublish({
      variables: {
        publishrequestdto: publishrequestdto,
        scheduleTime: scheduleTime,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        setTimerState(true);
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
    dispatch(updatePageModelModificationDate(new Date()));
    mutatePublish({
      variables: {
        input: requestdto,
        pageModelRequest: pageModel,
        timeZone: timeZone,
      },
      context: {
        headers: {
          sitename: getSelectedSite(),
        },
      },
    })
      .then(() => {
        setTimerState(true);
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
          StatusKey.publish.toUpperCase(),
          new Date(schedulePublish),
          scheduleUnpublish
        )
      : false;
    const validUnpublishTime = page?.pageSettings.IsScheduleUnpublish
      ? checkScheduleValidity(
          StatusKey.unpublish.toUpperCase(),
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
        if (!saveStatus.current) {
          savePage();
        }
        publishPage();
        break;
    }
  };

  const saveCheck = () => {
    if (!saveStatus.current) {
      setShowSaveWarning(true);
      return false;
    }
    return true;
  };

  const handleBack = () => {
    const status = saveCheck();
    if (!status) {
      setTriggerCase('PAGE_LIST');
    } else {
      callFnsCase('PAGE_LIST');
    }
  };

  const onCloseSaveWarningHandler = () => {
    savePage();
    setShowSaveWarning(false);
  };

  const unsavedChangesCrossButtonHandle = () => {
    setShowSaveWarning(false);
    setTriggerCase(null);
  };

  const onCloseSaveHandler = () => {
    setIsNotificationToast(false);
  };
  const closeButtonHandle = () => {
    setOpenPublishModal(false);
    setShowWorkflowSubmit(false);
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

  const changePublishDialogState = () => {
    setOpenPublishModal(false);
  };

  const onPublishClick = () => {
    setPublishLoading(true);
    callFnsCase('PUBLISH');
  };
  const theme = useTheme();
  const mobileHeader = useMediaQuery(
    `@media(max-width:${ThemeConstants.EM - 1}px)`
  );
  const webHeader = useMediaQuery(
    `@media(min-width:${ThemeConstants.EM - 1}px)`
  );
  const RightBoxWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const arr = searchParams?.get('page')?.split('/');
  const pathnm = `${arr[arr.length - 1]}`; //`${arr[6]}/${arr[7]}`;
  //create comment
  const createComment = async () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/page/${pathnm}`,
      status: false,
      document_type: 'Page',
      created_by: username, //articleInstance.CommonFields.createdBy,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };
  let count = 0;
  return (
    <>
      {mobileHeader && (
        <HeaderMobile
          lastmodifiedDate={page?.pageModel.Page_LastModificationDate}
          value={previewType}
          handleChange={handleChange}
          handleBack={handleBack}
          isSaveButtonEnabled={
            canAccessAction(CATEGORY_PAGE, '', 'Create')
              ? isSaveButtonEnabled
              : false
          }
          isPublishButtonEnabled={
            canAccessAction(CATEGORY_PAGE, '', 'publish')
              ? Object.values(page?.prelemMetaArray).every(
                  (v: any) => v.IsHidden
                )
                ? false
                : true
              : false
          }
          previewStatus={
            Object.values(page?.prelemMetaArray).every(
              (v: any) => v.IsHidden
            ) || page?.prelemMetaArray.length == 0
              ? false
              : true
          }
          handleSaveClick={() => savePage()}
          handlePublishClick={() => onPublishClick()}
          timerState={timerState}
          prelemEditState={selectedPrelemEditState}
          workflow={workflow}
          setEnableWorkflowHistory={setEnableWorkflowHistory}
        />
      )}
      {enableWorkflowHistory ? (
        <Box className={classes.workflowPage}>
          <WorkflowHistory
            workflow={workflow}
            setEnableWorkflowHistory={setEnableWorkflowHistory}
          />
        </Box>
      ) : (
        <Box>
          {publishLoading && <PrelemLoader />}
          <PageLayout>
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
            {isDeletePopop ? (
              <PlateformXDialog
                isDialogOpen={isDeletePopop}
                title={t('prelem_delete')}
                subTitle={`${t('prelem_delete_title')} ${t('prelem')}`}
                closeButtonText={t('no')}
                confirmButtonText={t('yes')}
                closeButtonHandle={deleteCloseButtonHandle}
                confirmButtonHandle={deleteConfirmButtonHandle}
              />
            ) : null}
            {openPublishModal || showWorkflowSubmit ? (
              <LoadingTextModal
                isDialogOpen={openPublishModal || showWorkflowSubmit}
                closeButtonHandle={closeButtonHandle}
                subTitle={
                  openPublishModal
                    ? t('page_loading_text')
                    : t('requested_action_progress')
                }
                successText={
                  openPublishModal
                    ? t('page_success_text')
                    : t('requested_action')
                }
                changeDialogState={changePublishDialogState}
              />
            ) : null}
            {showSaveWarning ? (
              <PlateformXDialog
                isDialogOpen={showSaveWarning}
                title={t('save_warn_title')}
                subTitle={t('save_warn_subtitle')}
                closeButtonText={
                  triggerCase === 'PUBLISH'
                    ? t('publish_anyways')
                    : t('take_me_out')
                }
                confirmButtonText={t('done')}
                closeButtonHandle={
                  browserBackButtonClick
                    ? () => setBrowserBackButtonState(true)
                    : () => callFnsCase(triggerCase)
                }
                confirmButtonHandle={onCloseSaveWarningHandler}
                crossButtonHandle={unsavedChangesCrossButtonHandle}
                modalType='unsavedChanges'
              />
            ) : null}
            {galleryState && (
              <Gallery
                handleImageSelected={handleSelectedImage}
                toggleGallery={toggleGallery}
                galleryMode={galleryType}
                handleVideoSelected={handleSelectedVideo}
              />
            )}
            {contentGalleryStatus &&
              (DYNAMIC_PRELEM_LIST.includes(
                data[currentPrelemIndx]?.PrelemId
              ) ? (
                <DynamicContentGallery
                  handleSelectedContent={handleSelectedDynamicContent}
                  onToggleContentGallery={onToggleContentGallery}
                  selectedFilters={data[currentPrelemIndx]?.content?.QueryParam}
                  prelemId={data[currentPrelemIndx]?.PrelemId}
                />
              ) : ['Prelem_073', 'Prelem_074', 'Prelem_075'].includes(
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
                  contentType={
                    data[currentPrelemIndx]?.content?.PrelemContentType
                  }
                />
              ))}

            <LeftBox>
              <Box className={classes.pageSettingBox}>
                {/* Page Settings */}
                {pageId === PageSettingListData[0].id && (
                  <PageInfo setPageId={setPageId} />
                )}
                {pageId === PageSettingListData[1].id && (
                  <SEOBasics setPageId={setPageId} />
                )}
                {pageId === PageSettingListData[2].id && (
                  <SocialShare
                    setPageId={setPageId}
                    handleImageDelete={handleImageDelete}
                    handleGallery={handleGallery}
                    selectedImage={selectedImage}
                    selectedSection={selectedSection}
                    confirmImageDelete={
                      selectedOperation == 'delete'
                        ? confirmImageOrVideoDelete
                        : false
                    }
                  />
                )}
                {pageId === PageSettingListData[3].id && (
                  <Analytics setPageId={setPageId} />
                )}
                {pageId === PageSettingListData[4].id && (
                  <Schedule setPageId={setPageId} />
                )}

                {/* Prelem Settings */}
                {PrelemSettingCardList.includes(pageId) && (
                  <PrelemSettingsCard
                    handleUpdatedPrelemModelChild={updatePrelemModelChild}
                    selectedPrelemIndex={prelemIndex}
                    toggleGallery={toggleGallery}
                    selectedImage={selectedImage}
                    selectedVideo={selectedVideo}
                    pageId={pageId}
                    setPageId={setPageId}
                  />
                )}
              </Box>

              {pageId === 'pageSetting' && (
                <Box className={classes.PageSettingMenuTabs}>
                  <TabContext value={value}>
                    <Box
                      className={classes.tabButtonsBottom}
                      sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                      {DesignWeb && (
                        <TabList
                          TabIndicatorProps={{
                            style: { display: 'none' },
                          }}
                          className={classes.TabButtons}
                          onChange={handleChangeTab}
                          aria-label='lab API tabs example'
                        >
                          (
                          <Tab
                            icon={<img src={EditIcon} alt='icon' />}
                            iconPosition='start'
                            label='Design'
                            value='Page_Design'
                          />
                          )
                          {DesignWeb && (
                            <Tab
                              icon={<img src={SettingIcon} alt='icon' />}
                              iconPosition='start'
                              label='Page Setting'
                              value='Page_Setting'
                            />
                          )}
                        </TabList>
                      )}

                      {!DesignWeb && (
                        <Typography variant='p3semibold'>
                          Page Setting
                        </Typography>
                      )}
                    </Box>
                    {DesignTab && (
                      <TabPanel
                        sx={{ padding: 0 }}
                        className={classes.tabPanelSettingPage}
                        value='Page_Design'
                      >
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
                            className={classes.addEditPrelemBox}
                            sx={{
                              overflowY: selectedPrelemEditState
                                ? { xs: 'auto', em: 'hidden' }
                                : 'auto',
                            }}
                          >
                            <ThemeProvider theme={LightTheme}>
                              <Box className={classes.innerBoxWeb}>
                                {page?.prelemMetaArray?.map(
                                  (prelemData: PrelemInstance, i) => {
                                    const showIconsState = {
                                      showCreate: true,
                                      showVisible: prelemData.IsHidden,
                                      showCopy: true,
                                      showUp: i == 0 ? false : true,
                                      showDown:
                                        i == page?.prelemMetaArray.length - 1
                                          ? false
                                          : true,
                                      showReset: prelemData.IsModified,
                                      showDelete: true,
                                      showSettings: true,
                                    };
                                    const showAddSection = {
                                      showAtTop: true,
                                      showAtBottom:
                                        i == page?.prelemMetaArray.length - 1
                                          ? true
                                          : false,
                                    };
                                    return (
                                      <Prelem
                                        onOpenContentType={onOpenContentType}
                                        count={count++}
                                        key={`card${i}`}
                                        prelemEditState={
                                          selectedPrelemEditMode == i
                                            ? selectedPrelemEditState
                                            : false
                                        }
                                        showIconsState={showIconsState}
                                        prelemData={prelemData}
                                        index={i}
                                        handleOperationClick={handleOperations}
                                        setPageId={setPageId}
                                        onToggleContentGallery={
                                          onToggleContentGallery
                                        }
                                        contentGalleryStatus={
                                          contentGalleryStatus
                                        }
                                        eComContentGalleryHandle={
                                          eComContentGalleryHandle
                                        }
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
                                        prelemDataReset={
                                          prelemResetIndex == i
                                            ? prelemDataReset
                                            : false
                                        }
                                        showAddSection={showAddSection}
                                        addSectionTouchPointClick={
                                          addSectionTouchPointClick
                                        }
                                      />
                                    );
                                  }
                                )}
                              </Box>
                            </ThemeProvider>
                          </Box>
                        ) : (
                          <Box
                            component='div'
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
                              position: 'relative',
                            }}
                          >
                            <Box className={classes.emptWpBoxInner}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Icons
                                  styleObject={{
                                    color: '#4B9EF9',
                                    display: 'block',
                                    padding: 0,
                                    maxHeight: '50px',
                                    maxWidth: '50px',
                                    '& svg': {
                                      fontSize: '50px',
                                    },
                                  }}
                                  nameIcon='add'
                                  enable
                                  listIndx='top'
                                  handleClick={() => routeChange()}
                                />
                              </Box>
                              <Typography
                                variant='p3regular'
                                mb='10px'
                                mt='10px'
                              >
                                {t('create_first_section_now')}
                              </Typography>
                              <Typography sx={{ color: '#4B9EF9' }}>
                                {t('add_prelem')}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </TabPanel>
                    )}
                    <TabPanel
                      sx={{ padding: 0 }}
                      className={classes.tabPanelSettingPage}
                      value='Page_Setting'
                    >
                      <PageSettingList setPageId={setPageId} />
                    </TabPanel>
                  </TabContext>
                </Box>
              )}
              {pageId === 'prelemSetting' && (
                <PrelemSettingMenu
                  setPageId={setPageId}
                  selectedPrelemIndex={prelemIndex}
                />
              )}
              {pageId === 'prelemInfo' && prelemIndex != -1 && (
                <PrelemInfo
                  setPageId={setPageId}
                  selectedPrelemIndex={prelemIndex}
                />
              )}
            </LeftBox>
            {RightBoxWeb && (
              <RightBox>
                {webHeader && (
                  <Header
                    lastmodifiedDate={page?.pageModel.Page_LastModificationDate}
                    gifPlaying={gifPlaying}
                    value={previewType}
                    handleChange={handleChange}
                    handleBack={handleBack}
                    isSaveButtonEnabled={
                      canAccessAction(CATEGORY_PAGE, '', 'Create')
                        ? isSaveButtonEnabled
                        : false
                    }
                    isPublishButtonEnabled={
                      canAccessAction(CATEGORY_PAGE, '', 'publish')
                        ? Object.values(page?.prelemMetaArray).every(
                            (v: any) => v.IsHidden
                          )
                          ? false
                          : true
                        : false
                    }
                    previewStatus={
                      Object.values(page?.prelemMetaArray).every(
                        (v: any) => v.IsHidden
                      ) || page?.prelemMetaArray.length == 0
                        ? false
                        : true
                    }
                    handleSaveClick={savePage}
                    handlePublishClick={() => onPublishClick()}
                    workflow={workflow}
                    timerState={timerState}
                    prelemEditState={selectedPrelemEditState}
                    setEnableWorkflowHistory={setEnableWorkflowHistory}
                    createComment={createComment}
                  />
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
                    className={classes.addEditPrelemBox}
                    sx={{
                      overflowY: selectedPrelemEditState ? 'hidden' : 'scroll',
                    }}
                  >
                    <ThemeProvider theme={LightTheme}>
                      <Box className={classes.innerBoxWeb}>
                        {page?.prelemMetaArray?.map(
                          (prelemData: PrelemInstance, i) => {
                            const showIconsState = {
                              showCreate: true,
                              showVisible: prelemData.IsHidden,
                              showCopy: true,
                              showUp: i == 0 ? false : true,
                              showDown:
                                i == page?.prelemMetaArray.length - 1
                                  ? false
                                  : true,
                              showReset: prelemData.IsModified,
                              showDelete: true,
                              showSettings: true,
                            };
                            const showAddSection = {
                              showAtTop: true,
                              showAtBottom:
                                i == page?.prelemMetaArray.length - 1
                                  ? true
                                  : false,
                            };
                            return (
                              <Prelem
                                onOpenContentType={onOpenContentType}
                                count={count++}
                                key={`card${i}`}
                                prelemEditState={
                                  selectedPrelemEditMode == i
                                    ? selectedPrelemEditState
                                    : false
                                }
                                showIconsState={showIconsState}
                                prelemData={prelemData}
                                index={i}
                                handleOperationClick={handleOperations}
                                setPageId={setPageId}
                                onToggleContentGallery={onToggleContentGallery}
                                contentGalleryStatus={contentGalleryStatus}
                                eComContentGalleryHandle={
                                  eComContentGalleryHandle
                                }
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
                                prelemDataReset={
                                  prelemResetIndex == i
                                    ? prelemDataReset
                                    : false
                                }
                                showAddSection={showAddSection}
                                addSectionTouchPointClick={
                                  addSectionTouchPointClick
                                }
                              />
                            );
                          }
                        )}
                      </Box>
                    </ThemeProvider>
                  </Box>
                ) : (
                  <Box
                    component='div'
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
                      position: 'relative',
                    }}
                  >
                    <Box className={classes.emptWpBoxInner}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Icons
                          styleObject={{
                            color: '#4B9EF9',
                            display: 'block',
                            padding: 0,
                            maxHeight: '50px',
                            maxWidth: '50px',
                            '& svg': {
                              fontSize: '50px',
                            },
                          }}
                          nameIcon='add'
                          enable
                          listIndx='top'
                          handleClick={() => routeChange()}
                        />
                      </Box>
                      <Typography variant='p3regular' mb='10px' mt='10px'>
                        {t('create_first_section_now')}
                      </Typography>
                      <Typography variant='p3regular' sx={{ color: '#4B9EF9' }}>
                        {t('add_prelem')}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </RightBox>
            )}
          </PageLayout>
        </Box>
      )}
    </>
  );
};

export default EditPageContainer;
