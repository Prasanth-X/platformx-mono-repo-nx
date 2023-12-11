import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box, Divider } from '@mui/material';
import { addMinutes } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Common/Loader';
import Constants from '../../components/Common/Constants/Constants';
import { CreateHeader } from '../../components/Common/CreateHeader';
import EventPageScroll from '../../components/Common/PageScroll';
import { previewContent } from '../../components/Common/contentTypes/store/ContentAction';
import PlateformXDialog from '../../components/Modal';
import { workflowKeys } from '../../components/Submit/Utils/contstants';
import WorkflowHistory from '../../components/WorkflowHistory/WorkflowHistory';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import useWorkflow from '../../hooks/useWorkflow/useWorkflow';
import Gallery from '../../pages/Gallery/Gallery';
import createEventAPI from '../../services/createEvent/createEvent.api';
import { Store } from '../../store/ContextStore';
import { ContentType } from '../../utils/Enums/ContentType';
import { authInfo } from '../../utils/authConstants';
import { CATEGORY_CONTENT } from '../../utils/constants';
import {
  capitalizeFirstLetter,
  onBackButtonEvent,
  unloadCallback,
} from '../../utils/helperFunctions';
import EventAnalytics from './Components/EventAnalytics/EventAnalytics';
import EventChooseTags from './Components/EventChooseTags/EventChooseTags';
import EventImageAndThumbnail from './Components/EventImageAndThumbnail/EventImageAndThumbnail';
import EventSEO from './Components/EventSEO/EventSEO';
import EventScheduleDate from './Components/EventScheduleDate/EventScheduleDate';
import EventSocialShare from './Components/EventSocialShare/EventSocialShare';
import EventTimeAndLocation from './Components/EventTimeAndLocation/EventTimeAndLocation';
import EventTitleDescription from './Components/EventTitleDescription/EventTitleDescription';
import {
  AnalyticsRef,
  EventInstance,
  EventWhole,
  SeoRef,
} from './CreateEvent.types';
import icons, {
  BEFORE_UNLOAD,
  CANCEL,
  DRAFT,
  EVENT,
  IMAGE_URL,
  PAGE_EXIST_POP_UP,
  PATH,
  POP_STATE,
  PUBLISHED,
  PUBLISH_POP_UP,
  SAVE_AS_DRAFT_POP_UP,
  SCROLL,
  SEO,
  SOCIAL_SHARE,
  SOCIAL_SHARE_IMG_URL,
  seo,
} from './Utils/Constants';
import {
  DefEvent,
  EventData,
  SelectedImageData,
  analyticInputDefaultData,
  eventStartEndTimeValidation,
  getEventToSend,
  getModifiedField,
  getNewEvent,
  getPreviewContentData,
  getTempObj,
  getUpdateEvent,
  isInViewport,
  seoInputDefaultData,
  updateEventSettings,
  updateStructureData,
  validateUrl,
} from './Utils/helper';
import { checkIfUnsavedChanges } from './store/Actions';

const CreateEvent = () => {
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { content } = state;
  const { currentContent = {} } = content || {};
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [workflow, setWorkflow] = useState({});
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const params = useParams();
  const createdUser = useRef(username);
  const analyticsRef = useRef<AnalyticsRef>(analyticInputDefaultData);
  const seoRef = useRef<SeoRef>(seoInputDefaultData);

  const quizPageUrl = new URL(window.location.href);
  const currentQuizData = useRef(
    quizPageUrl.searchParams.get('path')
      ? (quizPageUrl.searchParams.get('path') as string)
      : ''
  );
  const [scrollToView, setScrollToView] = useState('');
  const [showExitWarning, setShowExitWarning] = useState(false);
  const navigate = useNavigate();
  const [previewButton, setPreviewButton] = useState(true);
  const [publishButton, setPublishButton] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [, setIsSideMenuOpen] = useState(false);
  const [galleryState, setGalleryState] = useState<boolean>(false);

  const galleryType = useRef<string>('Images');

  const [key, setKey] = useState('');
  const [answerId] = useState('');
  const [parentToolTip, setParentToolTip] = useState('');

  const [eventInstance, setEventInstance] = useState<EventInstance | unknown>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [editedSD, setEditedSD] = useState({});

  const unsavedChanges = useRef<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const updateTempObj = useRef<unknown>({});
  const eventPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>('');
  const currentEventData = useRef(
    eventPageUrl.searchParams.get(PATH)
      ? (eventPageUrl.searchParams.get(PATH) as string)
      : ''
  );
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState(DRAFT);
  const [onSavedModal, setOnSavedModal] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [selectedImage, setSelectedImage] = useState(SelectedImageData);
  const [eventState, setEventState] = useState(EventData);
  const [socialShareExpanded, setSocialShareExpanded] = useState(
    quizPageUrl.searchParams.get('open') ? true : false
  );
  const [enableWorkflowHistory, setEnableWorkflowHistory] =
    useState<boolean>(false);
  const publishPopup = useRef(PUBLISH_POP_UP);
  const login_user_id = userInfo?.user_id;
  const updateField = (updatedPartialObj) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const modifiedEvent = getModifiedField(
      eventState,
      newTempData,
      updatedPartialObj
    );
    setEventInstance(modifiedEvent);
  };

  const eventWholeRef = useRef<EventWhole>(DefEvent);

  const updateCurrentInstance = (callPreview = false) => {
    const pageURL = eventWholeRef.current?.title
      .replace(/[^A-Z0-9]+/gi, '-')
      .toLowerCase();
    const updatedObj = {
      page: pageURL,
      title: eventWholeRef.current?.title,
      short_title: eventWholeRef.current?.short_title,
      description: eventWholeRef.current?.description,
      short_description: eventWholeRef.current?.short_description,
      tags: eventWholeRef.current?.tags,
      current_page_url: `/${pageURL}`,
      settings: {
        ...updateEventSettings(eventWholeRef, eventState, authInfo, i18n),
      },
    };
    updateField(updatedObj);
  };

  const publishEvent = async (pageURL) => {
    const eventToSend = {
      page: pageURL,
    };
    try {
      // Don't remove the data, API call to publish the event
      const data: any = await createEventAPI.publishContentType({
        contenttype: EVENT,
        input: eventToSend,
      });

      setIsLoading(false);
    } catch (error: any) {
      if (error.graphQLErrors[0]) {
        showToastError(error?.graphQLErrors[0].message);
      } else {
        showToastError(Constants.API_ERROR_MESSAGE);
      }
      setIsLoading(false);
    }
  };
  const [workflowStatus, setWorkflowStatus] = useState(true);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(
      workflowObj,
      status
    );
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() &&
      status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const createEvent = async (
    pageState,
    IsDuplicate = false,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD }
        : updateStructureData(eventState, pageState);

    const eventToSend = getEventToSend(
      eventState,
      newTempData,
      updateTempObj,
      pageState,
      structureData,
      IsDuplicate
    );
    try {
      const data: any = await createEventAPI.createContentType({
        contenttype: EVENT,
        input: eventToSend,
      });

      unsavedChanges.current = false;
      dispatch(checkIfUnsavedChanges(unsavedChanges.current));
      if (pageState !== PUBLISHED) {
        setIsLoading(false);
        if (data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
          setPageStatus(pageState);
          setWorkflowStatus(isWorkflow);
        } else {
          if (!isWorkflow) {
            showToastSuccess(`${t('event')} ${t('saved_toast')}`);
          }
          // setOnSavedModal(true);
          setIsDraft(false);
          const { createdBy, title, description } = eventToSend.CommonFields;
          const workflowObj = {
            createdBy,
            title,
            description,
            path: data?.authoring_createContent?.path,
            workflow_status: workflowKeys.draft,
            tag_name: capitalizeFirstLetter(ContentType.Event),
            last_modifiedBy: createdBy,
          };
          if (isWorkflow) {
            workflowSubmitRequest(workflowObj, workflowKeys.approve);
          }
          setWorkflow({ ...workflow, ...workflowObj });
        }
      } else {
        if (data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
          setPageStatus(pageState);
        } else {
          // showToastSuccess(`${t('event')} ${t('published_toast')}`);
          setShowPublishConfirm(true);
          publishEvent(
            eventWholeRef.current.title
              .replace(/[^A-Z0-9]+/gi, '-')
              .toLowerCase()
          );
        }
      }
      const pageUrl = data?.authoring_createContent?.path.substring(
        data?.authoring_createContent?.path.lastIndexOf('/') + 1
      );
      eventWholeRef.current.page = pageUrl;
      setDraftPageURL(pageUrl);
    } catch (error: any) {
      console.log('error', error);
      if (error?.graphQLErrors[0]) {
        showToastError(error.graphQLErrors[0].message);
      } else {
        showToastError(t('api_error_toast'));
      }
      setIsLoading(false);
    }
  };

  const updateEvent = async (
    pageState,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD }
        : updateStructureData(eventState, pageState);

    const updateEventToSend = getUpdateEvent(
      eventState,
      newTempData,
      updateTempObj,
      pageState,
      structureData,
      username,
      currentEventData,
      draftPageURL
    );
    try {
      // Don't remove the data, API call to update the event
      const data = await createEventAPI.updateContentType({
        contenttype: EVENT,
        input: updateEventToSend,
      });

      unsavedChanges.current = false;
      if (pageState && pageState.toLowerCase() === DRAFT.toLowerCase()) {
        setIsLoading(false);
        if (!isWorkflow) {
          showToastSuccess(`${t('event')} ${t('updated_toast')}`);
        } else {
          workflowSubmitRequest(props, event_step);
        }
        dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setShowExitWarning(false);
        setIsEdited(true);
      } else {
        showToastSuccess(`${t('event')} ${t('published_toast')}`);
        setShowPublishConfirm(true);
        publishEvent(draftPageURL ? draftPageURL : currentEventData.current);
      }
    } catch (error) {
      showToastError(t('api_error_toast'));
      setIsLoading(false);
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
    setIsLoading(false);
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    if (pageStatus.toLowerCase() === DRAFT.toLowerCase()) {
      createEvent(DRAFT, true, workflowStatus);
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      createEvent(PUBLISHED, true);
    }
  };

  const crossButtonHandle = () => {
    setShowExitWarning(false);
    setOnSavedModal(false);
    navigate(`?path=${eventWholeRef?.current?.page}`);
  };

  const saveEvent = (status = true, props = {}, event_step = '') => {
    dispatch(previewContent({}));
    setShowExitWarning(false);
    updateCurrentInstance();
    const currentDateTime = addMinutes(new Date(), 15).toISOString();
    if (eventState?.title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (eventStartEndTimeValidation(eventState)) {
      showToastError(t(`${eventStartEndTimeValidation(eventState)}`));
    } else if (!validateUrl(eventState?.webLink)) {
      showToastError(`${t('weblink_validate')}`);
    } else if (
      eventState?.is_schedule_publish &&
      (eventState?.schedule_publish_datetime === '' ||
        eventState?.schedule_publish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_publish')} ${t('time')} ${t('is_required')}`
      );
    } else if (
      eventState?.is_schedule_unpublish &&
      (eventState?.schedule_unpublish_datetime === '' ||
        eventState?.schedule_unpublish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_unpublish')} ${t('time')} ${t('is_required')}`
      );
    } else if (
      eventState?.schedule_publish_datetime &&
      eventState?.schedule_publish_datetime < currentDateTime
    ) {
      showToastError(`${t('ss_publish_time')}`);
    } else if (
      eventState?.schedule_unpublish_datetime &&
      eventState?.schedule_unpublish_datetime <
        eventState?.schedule_publish_datetime
    ) {
      showToastError(`${t('schedule_publish_unpublish_validate')}`);
    } else {
      if (!currentEventData.current && isDraft) {
        createEvent(DRAFT, false, status, props, event_step);
      } else {
        updateEvent(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = () => {
    const {
      title,
      short_title: shortTitle,
      description,
      short_description: shortDescription,
      imageUrl,
      tags,
    } = eventState;
    updateCurrentInstance();
    const currentDateTime = addMinutes(new Date(), 15).toISOString();
    if (title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (shortTitle === '') {
      showToastError(`${t('short_title')} ${t('is_required')}`);
    } else if (description === '') {
      showToastError(`${t('description')} ${t('is_required')}`);
    } else if (shortDescription === '') {
      showToastError(`${t('short_description')} ${t('is_required')}`);
    } else if (imageUrl === '') {
      showToastError(`${t('banner_image')} ${t('is_required')}`);
    } else if (tags?.length === 0) {
      showToastError(t('tag_error'));
    } else if (eventStartEndTimeValidation(eventState)) {
      showToastError(t(`${eventStartEndTimeValidation(eventState)}`));
    } else if (!validateUrl(eventState?.webLink)) {
      showToastError(`${t('weblink_validate')}`);
    } else if (
      eventState?.is_schedule_publish &&
      (eventState?.schedule_publish_datetime === '' ||
        eventState?.schedule_publish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_publish')} ${t('time')} ${t('is_required')}`
      );
    } else if (
      eventState?.is_schedule_unpublish &&
      (eventState?.schedule_unpublish_datetime === '' ||
        eventState?.schedule_unpublish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_unpublish')} ${t('time')} ${t('is_required')}`
      );
    } else if (
      eventState?.schedule_publish_datetime &&
      eventState?.schedule_publish_datetime < currentDateTime
    ) {
      showToastError(`${t('ss_publish_time')}`);
    } else if (
      eventState?.schedule_unpublish_datetime &&
      eventState?.schedule_unpublish_datetime <
        eventState?.schedule_publish_datetime
    ) {
      showToastError(`${t('schedule_publish_unpublish_validate')}`);
    } else {
      if (!currentEventData.current && isDraft) {
        createEvent(PUBLISHED, false, false);
      } else {
        updateEvent(PUBLISHED, false);
      }
    }
  };

  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
    setShowWorkflowSubmit(false);
  };

  const handleSelectedImage = (image, keyName, id?: any) => {
    setSelectedImage(image);
    if (keyName === IMAGE_URL) {
      setEventState({
        ...eventState,
        imageUrl: image?.Thumbnail,
        socialShareImgURL: image?.Thumbnail,
      });
      eventWholeRef.current = {
        ...eventWholeRef.current,
        [keyName]: image?.Thumbnail,
        [SOCIAL_SHARE_IMG_URL]: image?.Thumbnail,
      };
    } else if (keyName === SOCIAL_SHARE) {
      setEventState({
        ...eventState,
        socialShareImgURL: image?.Thumbnail,
      });
      eventWholeRef.current = {
        ...eventWholeRef.current,
        [SOCIAL_SHARE_IMG_URL]: image?.Thumbnail,
      };
    }
    unsavedChanges.current = true;
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == CANCEL) {
      return null;
    }
  };

  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      dispatch(previewContent({}));
      navigate('/content/event');
    }
  };

  const scrollHandler = () => {
    if (isInViewport(seo, true)) {
      setParentToolTip(SEO);
    } else {
      const active = icons.find((i) => isInViewport(i.id, false));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
    }
  };

  useEffect(() => {
    const dataHolder = document.getElementById('scrollableDiv');
    dataHolder?.addEventListener(SCROLL, scrollHandler);

    if (Object.keys(eventInstance).length === 0 && !params.id) {
      const newEvent = getNewEvent(username);
      setEventInstance(newEvent);
    }
    if (currentQuizData.current === '') {
      9;
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Event)
      );
    }
    return () => {
      window.removeEventListener(SCROLL, scrollHandler);
    };
  }, []);

  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      short_description: shortDesc,
      description,
      imageUrl,
      tags,
    } = eventState;
    if (
      [title, shortTitle, shortDesc, description, imageUrl].includes('') ||
      tags.length === 0
    ) {
      setPublishButton(true);
    } else {
      setPublishButton(false);
    }
  }, [eventState]);

  const handelPreview = () => {
    const tempObj = getPreviewContentData(
      eventState,
      eventWholeRef,
      createdUser.current,
      authInfo,
      i18n
    );
    dispatch(previewContent(tempObj));
    navigate('/content-preview');
  };

  const eventAnalyticsHandle = (event) => {
    analyticsRef.current = event;
  };

  const seoEvenDataHandle = (event) => {
    seoRef.current = event;
  };

  const showGalleryHandle = (gType = '', keyName = '') => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKey(keyName);
  };

  const closeButtonHandle = () => {
    unsavedChanges.current = false;
    dispatch(previewContent({}));
    navigate('/content/event');
  };

  useEffect(() => {
    if (unsavedChanges.current === true) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
      window.addEventListener(BEFORE_UNLOAD, (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.addEventListener(POP_STATE, (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          closeButtonHandle
        )
      );
    }
    return () => {
      window.removeEventListener(BEFORE_UNLOAD, (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.removeEventListener(POP_STATE, (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          closeButtonHandle
        )
      );
    };
  }, [unsavedChanges.current]);

  const getContentByPath = async () => {
    try {
      const data: any = await createEventAPI.fetchContent({
        contentType: EVENT,
        path: currentEventData.current,
      });

      setIsLoading(false);
      const contentObj = data?.authoring_getCmsContentByPath;
      const {
        title,
        short_title: shortTitle,
        short_description: shortDesc,
        description,
        tags,
        settingsProperties,
        banner_image: imageUrl,
        path,
        workflow_status,
        stages,
        tag_name,
        last_modifiedBy,
        createdBy,
        task_status,
        user_id,
        user_name,
      } = contentObj;
      createdUser.current = createdBy;
      const tempObj = getTempObj(data, contentObj, eventState);
      setWorkflow({
        path,
        workflow_status,
        stages,
        tag_name,
        last_modifiedBy,
        createdBy,
        role,
        title,
        enable: stages?.length > 0 ? true : false,
        login_user_id,
        task_status,
        task_user_id: user_id,
        task_user_name: user_name,
      });
      setEventState(tempObj);
      setEventInstance({
        ...tempObj,
        page_state: data?.authoring_getCmsContentByPath?.page_state,
      });
      eventWholeRef.current = {
        title: title,
        short_title: shortTitle,
        short_description: shortDesc,
        description: description,
        imageUrl: imageUrl,
        tags: tags,
        socialShareImgURL: settingsProperties?.socialog_image,
        short_titleSocialShare: settingsProperties?.socialog_title,
        short_descriptionSocialShare: settingsProperties?.socialog_description,
        tagsSocialShare: settingsProperties?.keywords,
      };
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      eventWholeRef.current = currentContent?.eventWholeRef;
      setSaveButton(false);
      setPreviewButton(false);
      setEventState(currentContent?.eventState);
    } else if (currentEventData.current && unsavedChanges.current !== true) {
      setIsLoading(true);
      setSaveButton(false);
      setPreviewButton(false);
      getContentByPath();
    }
  }, [currentContent]);
  useEffect(() => {
    dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  }, [eventState]);

  useEffect(() => {
    const handleResize = () => {
      const { innerHeight } = window;
      const isKeyboardOpen = window.innerHeight < innerHeight;
      setIsKeyboardOpen(isKeyboardOpen);
    };

    const handleScroll = () => {
      const { innerHeight } = window;
      const isKeyboardOpen = window.innerHeight < innerHeight;
      setIsKeyboardOpen(isKeyboardOpen);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const styles = `.sticky-header { position: sticky; top: 0; background-color: #fff; z-index:1} 
  .sticky-header.keyboard-open { position: relative; }`;
  return (
    <>
      <style> {styles} </style>
      <Box
        sx={{
          backgroundColor: '#FFF',
        }}
      >
        {galleryState && (
          <Gallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            galleryMode={galleryType.current}
            keyName={key}
            id={answerId}
          />
        )}
      </Box>
      <Box>
        {isLoading && <Loader />}
        <Box>
          <Box>
            <CreateHeader
              className={
                isKeyboardOpen ? 'sticky-header keyboard-open' : 'sticky-header'
              }
              previewButton={previewButton}
              handelPreview={handelPreview}
              createText={
                currentQuizData.current
                  ? `${t('edit')} ${t('event')}`
                  : `${t('create')} ${t('event')}`
              }
              returnBack={returnBack}
              publishButton={publishButton}
              saveButton={saveButton}
              saveorPublish={saveEvent}
              publishText={t('publish')}
              saveText={t('save_as_draft')}
              previewText={t('preview')}
              toolTipText={t('preview_tooltip')}
              saveVariant='secondaryButton'
              publish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Event}
              workflow={workflow}
              setEnableWorkflowHistory={setEnableWorkflowHistory}
            />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              position: 'relative',
              height: {
                sm: 'calc(100vh - 125px)',
                xs: 'calc(100vh - 45px)',
              },
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
            id='scrollableDiv'
          >
            {!galleryState && !enableWorkflowHistory && (
              <Box
                sx={{
                  position: 'fixed',
                  top: '25%',
                  right: { sm: '5px', xs: 0 },
                  zIndex: 1000,
                }}
              >
                <EventPageScroll
                  icons={icons}
                  srollToView={scrollToView}
                  parentToolTip={parentToolTip}
                />
              </Box>
            )}
            {enableWorkflowHistory ? (
              <WorkflowHistory
                workflow={workflow}
                setEnableWorkflowHistory={setEnableWorkflowHistory}
              />
            ) : (
              <>
                <EventImageAndThumbnail
                  state={eventState}
                  setState={setEventState}
                  setPreviewButton={setPreviewButton}
                  showGalleryHandle={showGalleryHandle}
                  selectedImage={selectedImage}
                />

                <EventTitleDescription
                  setSaveButton={setSaveButton}
                  setPreviewButton={setPreviewButton}
                  eventWholeRef={eventWholeRef}
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                  setPublishButton={setPublishButton}
                />

                <EventTimeAndLocation
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                />

                <EventScheduleDate
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                />

                <EventChooseTags
                  state={eventState}
                  setState={setEventState}
                  eventWholeRef={eventWholeRef}
                  content={content}
                  unsavedChanges={unsavedChanges}
                  isEdit={currentEventData.current ? true : false}
                  setScrollToView={setScrollToView}
                  socialShareExpanded={socialShareExpanded}
                />
                <EventSocialShare
                  state={eventState}
                  setState={setEventState}
                  eventWholeRef={eventWholeRef}
                  showGalleryHandle={showGalleryHandle}
                  unsavedChanges={unsavedChanges}
                  selectedImage={selectedImage.Thumbnail}
                />
                <EventAnalytics
                  state={eventState}
                  setState={setEventState}
                  eventAnalyticsHandle={eventAnalyticsHandle}
                  unsavedChanges={unsavedChanges}
                />
                <EventSEO
                  state={eventState}
                  setState={setEventState}
                  eventInstance={eventInstance}
                  seoEvenDataHandle={seoEvenDataHandle}
                  updateStructureData={updateStructureData}
                  unsavedChanges={unsavedChanges}
                  setEditedSD={setEditedSD}
                  isEdited={isEdited}
                />
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: { xs: '15px', md: '40px' },
                  }}
                  expanded={socialShareExpanded}
                  onChange={() => setSocialShareExpanded(!socialShareExpanded)}
                >
                  <AccordionSummary
                    sx={{ paddingLeft: '0px' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <TitleSubTitle
                      title={t('social_share')}
                      subTitle={t('subhead')}
                      titleVarient='h3medium'
                      subTitleVarient='h7regular'
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <EventSocialShare
                      state={eventState}
                      setState={setEventState}
                      eventWholeRef={eventWholeRef}
                      showGalleryHandle={showGalleryHandle}
                      unsavedChanges={unsavedChanges}
                      selectedImage={selectedImage.Thumbnail}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: { xs: '15px', md: '40px' },
                  }}
                >
                  <AccordionSummary
                    sx={{ paddingLeft: '0px' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2a-content'
                    id='panel2a-header'
                  >
                    <TitleSubTitle
                      title={t('analytics')}
                      subTitle={t('subhead')}
                      titleVarient='h3medium'
                      subTitleVarient='h7regular'
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <EventAnalytics
                      state={eventState}
                      setState={setEventState}
                      eventAnalyticsHandle={eventAnalyticsHandle}
                      unsavedChanges={unsavedChanges}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: { xs: '15px', md: '40px' },
                  }}
                >
                  <AccordionSummary
                    sx={{ paddingLeft: '0px' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2a-content'
                    id='panel2a-header'
                  >
                    <TitleSubTitle
                      title={t('SEO')}
                      subTitle={t('subhead')}
                      titleVarient='h3medium'
                      subTitleVarient='h7regular'
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <EventSEO
                      state={eventState}
                      setState={setEventState}
                      eventInstance={eventInstance}
                      seoEvenDataHandle={seoEvenDataHandle}
                      updateStructureData={updateStructureData}
                      unsavedChanges={unsavedChanges}
                      setEditedSD={setEditedSD}
                      isEdited={isEdited}
                    />
                  </AccordionDetails>
                </Accordion>*/}
              </>
            )}
            {/* <EventSocialShare
              state={eventState}
              setState={setEventState}
              eventWholeRef={eventWholeRef}
              showGalleryHandle={showGalleryHandle}
              unsavedChanges={unsavedChanges}
            />

            <EventAnalytics
              state={eventState}
              setState={setEventState}
              eventAnalyticsHandle={eventAnalyticsHandle}
              unsavedChanges={unsavedChanges}
            />

            <EventSEO
              state={eventState}
              setState={setEventState}
              eventInstance={eventInstance}
              seoEvenDataHandle={seoEvenDataHandle}
              updateStructureData={updateStructureData}
              unsavedChanges={unsavedChanges}
              setEditedSD={setEditedSD}
              isEdited={isEdited}
            /> */}
          </Box>
        </Box>
      </Box>

      {showExitWarning && (
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={t('done')}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={saveEvent}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
      )}
      <PlateformXDialog
        isDialogOpen={onSavedModal}
        title={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftTitle)}
        subTitle={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftDescription)}
        closeButtonText={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftCloseText)}
        confirmButtonText={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftConfirmText)}
        confirmButtonHandle={() => navigate('/content/event')}
        closeButtonHandle={crossButtonHandle}
        crossButtonHandle={crossButtonHandle}
        modalType='draft'
        closeIcon={<CreateRoundedIcon />}
      />

      <PlateformXDialog
        isDialogOpen={showPublishConfirm || showWorkflowSubmit}
        title={t(publishPopup.current.publishTitle)}
        subTitle={
          showPublishConfirm
            ? t(publishPopup.current.publishDescription)
            : t('requested_action')
        }
        confirmButtonText={t(publishPopup.current.publishCloseText)}
        confirmButtonHandle={() => navigate('/content/event')}
        modalType='publish'
        closeButtonHandle={handleCloseDialog}
      />
      {openPageExistModal && (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={t(PAGE_EXIST_POP_UP.saveAsDraftTitle)}
          subTitle={t(PAGE_EXIST_POP_UP.saveAsDraftDescription)}
          closeButtonText={t(PAGE_EXIST_POP_UP.saveAsDraftCloseText)}
          confirmButtonText={t(PAGE_EXIST_POP_UP.saveAsDraftConfirmText)}
          confirmButtonHandle={pageExistYesButtonHandle}
          closeButtonHandle={pageExistCloseHandle}
          crossButtonHandle={pageExistCloseHandle}
          modalType=''
        />
      )}
    </>
  );
};
export default React.memo(CreateEvent);
