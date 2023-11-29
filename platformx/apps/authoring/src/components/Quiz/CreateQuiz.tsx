import { useLazyQuery, useMutation } from '@apollo/client';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box, Divider } from '@mui/material';
import { format } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Common/Loader';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { useCommentContext } from '../../context/CommentsContext/CommentsContext';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import useWorkflow from '../../hooks/useWorkflow/useWorkflow';
import Gallery from '../../pages/Gallery/Gallery';
import commentsApi from '../../services/comments/comments.api';
import { fetchTagList } from '../../services/common/tags.aps';
import {
  createContentType,
  fetchContentByPath,
  publishContentType,
  updateContentType,
} from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { ContentType } from '../../utils/Enums/ContentType';
import { CATEGORY_CONTENT } from '../../utils/constants';
import {
  capitalizeFirstLetter,
  getCurrentLang,
  getSubDomain,
  handleHtmlTags,
  onBackButtonEvent,
  trimString,
  unloadCallback,
  updateStructureData,
} from '../../utils/helperFunctions';
import { CreateHeader } from '../Common/CreateHeader';
import { previewContent } from '../Common/contentTypes/store/ContentAction';
import CommentListPanel from '../ContentRewiew/CommentListPanel';
import PlateformXDialog from '../Modal';
import { workflowKeys } from '../Submit/Utils/contstants';
import WorkflowHistory from '../WorkflowHistory/WorkflowHistory';
import AddQuestion from './AddQuestion/AddQuestion';
import Analytics from './Analytics';
import ChooseTags from './ChooseTags';
import icons, { DRAFT, PUBLISHED } from './Constants';
import ImageVideo from './ImageVideo';
import { Question } from './Question';
import QuestionListing from './QuestionListing';
import QuizPageScroll from './QuizPageScroll';
import Result from './Result';
import Seo from './Seo';
import SocialShare from './SocialShare';
import { TitleDescription } from './TitleDescription';
import { checkIfUnsavedChanges } from './store/Actions';
export const CreateQuiz: React.FC = () => {
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { state, dispatch } = useContext(Store);
  const { quiz, content } = state;
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const quizPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>('');
  const currentQuizData = useRef(
    quizPageUrl.searchParams.get('path')
      ? (quizPageUrl.searchParams.get('path') as string)
      : ''
  );
  const [srollToView, setsrollToView] = useState<any>();
  const [quizInstance, setQuizInstance] = useState<any>({});
  const [onSavedModal, setOnSavedModal] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const qusUnsavedChanges = useRef<boolean>(false);
  const navigate = useNavigate();
  const [previewButton, setPreviewButton] = useState(true);
  const [publishButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [, setIsSideMenuOpen] = useState(false);
  const [isQuiz] = useState(true);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState('');
  const [isClickedQueList, setIsClickedQueList] = useState(false);
  const [, setPublishUrl] = useState('');
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    title: '',
    description: '',
  });
  const [enableWorkflowHistory, setEnableWorkflowHistory] =
    useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    title: '',
    description: '',
    Url: '',
  });
  const [workflow, setWorkflow] = useState({});
  const [tagData, setTagData] = useState<any>({});
  const [tagArr, setTagArr] = useState<any>([]);
  const [key, setKey] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [parentToolTip, setParentToolTip] = useState('');
  const [, setFieldChanges] = useState();
  const [runFetchTagList] = useLazyQuery(fetchTagList);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [socialShareExpanded, setSocialShareExpanded] = useState(true);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(true);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const scrollDebounceRef = useRef<any>(null);
  const [timerState, setTimerState] = useState(
    localStorage.getItem('contentTypeTimerState') == 'true' ? true : false
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(
    new Date().toISOString()
  );
  const { selectedComment, comments, clearComment } = useCommentContext();
  const login_user_id = userInfo?.user_id;
  const [isReload, setIsReload] = useState(false);
  useEffect(() => {
    setIsReload(!isReload);
  }, [comments]);
  const [quizState, setQuizState] = useState<any>({
    title: '',
    short_title: '',
    short_description: '',
    description: '',
    imagevideoURL: '',
    thumbnailURL: '',
    socialShareImgURL: '',
    titleSocialShare: '',
    descriptionSocialShare: '',
    tagsSocialShare: [],
    analytics_enable: true,
    impression: true,
    contentInsight: false,
    seo_enable: true,
    seoShared: true,
    scoreBy: t('count'),
    tags: [],
    questions: [],
    result_range_1: t('quiz_quotes_quote1'),
    result_range_2: t('quiz_quotes_quote2'),
    result_range_3: t('quiz_quotes_quote3'),
    result_range_4: t('quiz_quotes_quote4'),
    is_schedule_publish: false,
    schedule_publish_datetime: '',
    is_schedule_unpublish: false,
    schedule_unpublish_datetime: '',
    original_image: {},
    published_images: [],
  });
  useEffect(() => {
    if (Object.keys(quizInstance).length === 0 && !params.id) {
      const newQuiz = {
        CommonFields: {
          page: '',
          title: '',
          short_title: '',
          description: '',
          short_description: '',
          category: 'Quiz',
          site_name: 'PlatX',
          page_state: '',
          is_edit: false,
          seo_enable: true,
          analytics_enable: true,
          robot_txt: false,
          sitemap: false,
          analytics: '',
          others: '',
          structure_data: '',
          creationDate: new Date().toISOString(),
          modificationDate: new Date().toISOString(),
          tags: [],
          createdBy: username,
          parent_page_url: '/',
          current_page_url: '',
          page_lastmodifiedby: username,
          settings: {},
        },
        ObjectFields: {
          questions: [],
          background_content: {
            objectType: 'image',
            Url: '',
            Title: '',
            Thumbnail: '',
            Color: 'black',
          },
          display_scores: 'Count',
          result_range_1: t('quiz_quotes_quote1'),
          result_range_2: t('quiz_quotes_quote2'),
          result_range_3: t('quiz_quotes_quote3'),
          result_range_4: t('quiz_quotes_quote4'),
        },
      };
      setQuizInstance(newQuiz);
    }
    if (currentQuizData.current === '') {
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Quiz)
      );
    }
  }, []);
  const updateField = (updatedPartialObj) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(quizInstance));
    const quesArr = quizState.questions.map((value) => value.current_page_url);
    const tempObjField = {
      questions: [...quesArr],
      background_content: {
        objectType: 'image',
        Url: quizState?.imagevideoURL,
        Title: '',
        Thumbnail: quizState?.imagevideoURL,
        Color: '',
      },
      display_scores: quizState?.scoreBy,
      result_range_1: quizState?.result_range_1,
      result_range_2: quizState?.result_range_2,
      result_range_3: quizState?.result_range_3,
      result_range_4: quizState?.result_range_4,
      published_images: quizState?.published_images,
      original_image: quizState?.original_image,
    };
    const modifiedQuiz = {
      ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updatedPartialObj,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };
    setQuizInstance(modifiedQuiz);
  };
  const defQuiz = {
    imagevideoURL: '',
    title: '',
    description: '',
    short_title: '',
    short_description: '',
    tags: [],
  };
  const quizRef = useRef<any>(
    state.quiz.currentQuiz ? state.quiz.currentQuiz : defQuiz
  );
  const tagRef = useRef<any>([]);

  const [, setPublishDisabled] = useState<boolean>(true);
  const handleSchedulePublish = (
    isPublish,
    publishTime,
    isUnpublish,
    unPublishTime
  ) => {
    setQuizState({
      ...quizState,
      is_schedule_publish: isPublish,
      schedule_publish_datetime: publishTime,
      is_schedule_unpublish: isUnpublish,
      schedule_unpublish_datetime: unPublishTime,
    });
  };
  const updateQuizSettings = (pageUrl = '') => {
    const QuizSettings = {
      socialog_url:
        `${getSubDomain()}/${i18n.language}/` + `quiz` + `/${pageUrl}`,
      socialog_type: 'quiz',
      socialog_sitename: quizRef.current?.title
        ? trimString(handleHtmlTags(quizRef.current?.title), 100)
        : 'quiz',
      seo_title: quizRef.current?.title
        ? trimString(handleHtmlTags(quizRef.current?.title), 100)
        : '',
      socialog_title: quizRef.current?.short_title
        ? trimString(handleHtmlTags(quizRef.current?.short_title), 100)
        : '',
      socialog_twitter_title: quizRef.current?.titleSocialShare
        ? trimString(handleHtmlTags(quizRef.current?.titleSocialShare), 100)
        : '',
      socialog_description: quizRef.current?.short_description
        ? trimString(handleHtmlTags(quizRef.current?.short_description), 163)
        : '',
      socialog_twitter_description: quizRef.current?.descriptionSocialShare
        ? trimString(
            handleHtmlTags(quizRef.current?.descriptionSocialShare),
            163
          )
        : '',
      socialog_twitter_url:
        `${getSubDomain()}/${i18n.language}/` + `quiz` + `/${pageUrl}`,
      keywords: quizState?.tagsSocialShare, //quizRef.current.tags,
      seo_keywords: quizRef.current.tags,
      seo_description: quizRef.current?.description
        ? trimString(handleHtmlTags(quizRef.current?.description), 163)
        : '',
      socialog_image: quizRef.current?.socialShareImgURL,
      socialog_twitter_image: quizRef.current?.socialShareImgURL,
      is_schedule_publish: quizState?.is_schedule_publish,
      schedule_publish_datetime: quizState?.schedule_publish_datetime,
      is_schedule_unpublish: quizState?.is_schedule_unpublish,
      schedule_unpublish_datetime: quizState?.schedule_unpublish_datetime,
    };
    return QuizSettings;
  };

  const updateCurrentInstance = (pageURL) => {
    const updatedObj = {
      page: pageURL,
      title: quizRef.current.title,
      short_title: quizRef.current.short_title,
      description: quizRef.current.description,
      short_description: quizRef.current.short_description,
      tags: quizRef?.current?.tags ? quizRef.current.tags : tagRef.current,
      current_page_url: `/${pageURL}`,
      settings: { ...updateQuizSettings(pageURL) },
    };
    updateField(updatedObj);
  };

  const [createquizmutate] = useMutation(createContentType);
  const [updatequizmutate] = useMutation(updateContentType);
  const [publishquizmutate] = useMutation(publishContentType);
  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      questions,
    } = quizState;
    const shortDesc = quizState.short_description;
    if (
      title === '' ||
      shortTitle === '' ||
      shortDesc === '' ||
      description === '' ||
      imagevideoURL === '' ||
      scoreBy === '' ||
      questions?.length === 0 ||
      tagArr?.length === 0
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [quizState]);
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), 'h:mm aa, dd LLLL');
  };
  const publishPopup = useRef({
    publishTitle: 'Congratulations!',
    publishDescription:
      'Your Quiz has been sent for publishing & will be published in a few seconds.',
    publishCloseText: 'Go to Listing',
    publishConfirmText: 'View QUIZ',
  });
  const publishQuiz = (pageURL) => {
    const quizToSend = {
      page: pageURL,
    };
    publishquizmutate({
      variables: {
        contentType: 'Quiz',
        input: quizToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (
          quizState?.is_schedule_publish &&
          quizState?.schedule_publish_datetime &&
          !quizState?.is_schedule_unpublish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Quiz has been scheduled to publish at ${dateFormat(
              new Date(quizState?.schedule_publish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          quizState?.is_schedule_unpublish &&
          quizState?.schedule_unpublish_datetime &&
          !quizState?.is_schedule_publish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Quiz has been scheduled to unpublish at ${dateFormat(
              new Date(quizState?.schedule_unpublish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          quizState?.is_schedule_unpublish &&
          quizState?.schedule_unpublish_datetime &&
          quizState?.is_schedule_publish &&
          quizState?.schedule_publish_datetime
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Quiz has been scheduled to publish at ${dateFormat(
              new Date(quizState?.schedule_publish_datetime)
            )} & scheduled to unpublish at ${dateFormat(
              new Date(quizState?.schedule_unpublish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else {
          setShowPublishConfirm(true);
        }
        // showToastSuccess(`${t('quiz')} ${t('published_toast')}`);
        setPublishUrl(resp?.data?.authoring_publishContent?.current_page_url);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const [pageStatus, setPageStatus] = useState(DRAFT);
  const [editedSD, setEditedSD] = useState('');
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
  const createQuiz = async (
    pageState,
    IsDuplicate = false,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const structureData = editedSD
      ? editedSD
      : JSON.stringify(updateStructureData(quizState));
    const newTempData = JSON.parse(JSON.stringify(quizInstance));
    const quesArr = quizState.questions.map((value) => value.current_page_url);
    const tempObjField = {
      questions: [...quesArr],
      background_content: {
        objectType: 'image',
        Url: quizState?.original_image.original_image_relative_path,
        Title: '',
        Thumbnail: quizState?.original_image.original_image_relative_path,
        Color: '',
        ext: quizState?.original_image.ext,
      },
      display_scores: quizState?.scoreBy,
      result_range_1: quizState?.result_range_1,
      result_range_2: quizState?.result_range_2,
      result_range_3: quizState?.result_range_3,
      result_range_4: quizState?.result_range_4,
      published_images: quizState?.published_images,
      original_image: quizState?.original_image,
    };
    const quizToSend = {
      ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        page_state: pageState,
        structure_data: structureData,
        IsConfirm: IsDuplicate,
        seo_enable: quizState?.seo_enable,
        analytics_enable: quizState?.analytics_enable,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };

    createquizmutate({
      variables: {
        contenttype: 'Quiz',
        input: quizToSend,
      },
    })
      .then((resp) => {
        unsavedChanges.current = false;
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());

        dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        if (pageState !== 'PUBLISHED') {
          setIsLoading(false);
          if (resp?.data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
            setWorkflowStatus(isWorkflow);
          } else {
            if (!isWorkflow) {
              showToastSuccess(`${t('quiz')} ${t('saved_toast')}`);
            }
            // setOnSavedModal(true);
            setIsDraft(false);
            const { createdBy } = quizInstance.CommonFields;
            const { title, description } = updateTempObj.current;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: resp?.data?.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ContentType.Quiz),
              last_modifiedBy: createdBy,
            };
            setWorkflow({ ...workflow, ...workflowObj });
            if (isWorkflow) {
              workflowSubmitRequest(workflowObj, workflowKeys.approve);
            }
          }
        } else {
          if (resp?.data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
          } else {
            publishQuiz(
              quizRef.current.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()
            );
          }
        }
        const pageUrl = resp?.data?.authoring_createContent?.path.substring(
          resp?.data?.authoring_createContent?.path.lastIndexOf('/') + 1
        );
        quizRef.current.page = pageUrl;
        setDraftPageURL(pageUrl);
        const tagArrTemp = { ...quiz.current };
        delete tagArrTemp.Description;
        const res = Object.keys(tagArrTemp).every(
          (keyName) => tagArrTemp[keyName]
        );
        if (
          res &&
          Object.keys(tagArrTemp).length > 0 &&
          tagArrTemp.tags.length > 0
        ) {
          setPublishDisabled(false);
        } else {
          setPublishDisabled(true);
        }
      })
      .catch((error) => {
        setTimerState(false);
        setLastmodifiedDate('');

        if (error?.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    if (pageStatus.toLowerCase() === DRAFT.toLowerCase()) {
      createQuiz(DRAFT, true, workflowStatus);
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      createQuiz(PUBLISHED, true);
    }
  };
  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
  };

  const updateQUIZ = (
    status,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const structureData = editedSD
      ? editedSD
      : JSON.stringify(updateStructureData(quizState));
    const newTempData = JSON.parse(JSON.stringify(quizInstance));
    const quesArr = quizState.questions.map((value) => value.current_page_url);
    const tempObjField = {
      questions: [...quesArr],
      background_content: {
        objectType: 'image',
        Url: quizState?.original_image.original_image_relative_path,
        Title: '',
        Thumbnail: quizState?.original_image.original_image_relative_path,
        Color: '',
        ext: quizState?.original_image.ext,
      },
      display_scores: quizState?.scoreBy,
      result_range_1: quizState?.result_range_1,
      result_range_2: quizState?.result_range_2,
      result_range_3: quizState?.result_range_3,
      result_range_4: quizState?.result_range_4,
      published_images: quizState?.published_images,
      original_image: quizState?.original_image,
    };
    const updateQuizToSend = {
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        structure_data: structureData,
        current_page_url: `/${
          currentQuizData.current !== ''
            ? currentQuizData.current
            : draftPageURL
        }`,
        page: draftPageURL ? draftPageURL : currentQuizData.current,
        page_state: status,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        createdBy: username,
        page_lastmodifiedby: username,
        parent_page_url: '/',
        seo_enable: quizState?.seo_enable,
        analytics_enable: quizState?.analytics_enable,
        title: quizState?.title,
        description: quizState?.description,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };
    updatequizmutate({
      variables: {
        contenttype: capitalizeFirstLetter(ContentType.Quiz),
        input: updateQuizToSend,
      },
    })
      .then(() => {
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());

        if (status && status.toLowerCase() === DRAFT.toLowerCase()) {
          setIsLoading(false);
          if (!isWorkflow) {
            showToastSuccess(`${t('quiz')} ${t('updated_toast')}`);
          } else {
            workflowSubmitRequest(props, event_step);
          }
          unsavedChanges.current = false;
          dispatch(checkIfUnsavedChanges(unsavedChanges.current));
          setShowExitWarning(false);
        } else {
          publishQuiz(draftPageURL ? draftPageURL : currentQuizData.current);
        }
      })
      .catch(() => {
        setTimerState(false);
        setLastmodifiedDate('');

        showToastError(t('api_error_toast'));
      });
  };

  const saveQuiz = (status = true, props = {}, event_step = '') => {
    dispatch(previewContent({}));
    setShowExitWarning(false);
    setQuizState({
      ...quizState,
      ['tags']: tagArr,
    });

    if (quizState?.title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (quizState?.description === '') {
      showToastError(t('des_error'));
    } else if (
      quizState?.is_schedule_publish &&
      (quizState?.schedule_publish_datetime === '' ||
        quizState?.schedule_publish_datetime === null)
    ) {
      showToastError(`${t('scheduled_publish')} ${t('is_required')}`);
    } else if (
      quizState?.is_schedule_unpublish &&
      (quizState?.schedule_unpublish_datetime === '' ||
        quizState?.schedule_unpublish_datetime === null)
    ) {
      showToastError(`${t('scheduled_unpublish')} ${t('is_required')}`);
    } else {
      const pageURL = currentQuizData.current
        ? currentQuizData.current
        : quizRef?.current?.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
      updateCurrentInstance(pageURL);
      if (showExitWarning) {
        setShowExitWarning(false);
      }
      if (!currentQuizData.current && isDraft) {
        createQuiz(DRAFT, false, status, props, event_step);
      } else {
        updateQUIZ(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = () => {
    dispatch(previewContent({}));
    setQuizState({
      ...quizState,
      ['tags']: tagArr,
    });
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      questions,
    } = quizState;
    const shortDesc = quizState.short_description;
    if (title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (shortTitle === '') {
      showToastError(`${t('short_title')} ${t('is_required')}`);
    } else if (shortDesc === '') {
      showToastError(`${t('short_description')} ${t('is_required')}`);
    } else if (description === '') {
      showToastError(`${t('description')} ${t('is_required')}`);
    } else if (imagevideoURL === '') {
      showToastError(`${t('banner_image')} ${t('is_required')}`);
    } else if (questions.length <= 0) {
      showToastError(`${t('question')} ${t('is_required')}`);
    } else if (scoreBy === '') {
      showToastError(`${t('banner_image')} ${t('is_required')}`);
    } else if (quizState.result_range_1 === '') {
      showToastError(`${t('range')} 0-24 ${t('is_required')}`);
    } else if (quizState.result_range_2 === '') {
      showToastError(`${t('range')} 24-49 ${t('is_required')}`);
    } else if (quizState.result_range_3 === '') {
      showToastError(`${t('range')} 50-74 ${t('is_required')}`);
    } else if (quizState.result_range_4 === '') {
      showToastError(`${t('range')} 75-100 ${t('is_required')}`);
    } else if (
      quizState?.is_schedule_publish &&
      quizState?.schedule_publish_datetime === ''
    ) {
      showToastError(`${t('scheduled_publish')} ${t('is_required')}`);
    } else if (
      quizState?.is_schedule_unpublish &&
      quizState?.schedule_unpublish_datetime === ''
    ) {
      showToastError(`${t('scheduled_unpublish')} ${t('is_required')}`);
    } else if (tagArr?.length === 0) {
      showToastError(t('tag_error'));
    } else {
      const pageURL = currentQuizData.current
        ? currentQuizData.current
        : quizRef?.current?.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
      }

      if (!currentQuizData.current && isDraft) {
        createQuiz('PUBLISHED', false, false);
      } else {
        updateQUIZ('PUBLISHED', false);
      }
    }
  };
  useEffect(() => {
    if (timerState) {
      localStorage.setItem('contentTypeTimerState', 'true');
    }
  }, [timerState]);

  const handleSelectedImage = (image, keyName) => {
    setSelectedImage(image);
    if (keyName === 'imagevideoURL') {
      setQuizState({
        ...quizState,
        [keyName]: image?.Thumbnail,
        thumbnailURL: image?.Thumbnail,
        socialShareImgURL: image?.Thumbnail,
      });
      quizRef.current = {
        ...quizRef.current,
        [keyName]: image?.Thumbnail,
        ['socialShareImgURL']: image?.Thumbnail,
      };
      unsavedChanges.current = true;
    } else {
      setQuizState({ ...quizState, [keyName]: image?.Thumbnail });
      quizRef.current = {
        ...quizRef.current,
        [keyName]: image?.Thumbnail,
      };
      unsavedChanges.current = true;
    }
  };
  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
    setQuizState({
      ...quizState,
      title: video?.title,
      description: video?.description,
      imagevideoURL: video?.imagevideoURL,
      thumbnailURL: video?.thumbnailURL,
    });
  };
  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      title: '',
      Thumbnail: '',
      description: '',
    });
    setSelectedVideo({
      title: '',
      Thumbnail: '',
      description: '',
      Url: '',
    });
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };
  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKey(keyName);
    if (id) {
      setAnswerId(id);
    }
  };
  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      dispatch(previewContent({}));
      // navigate(-1);
      navigate('/content/quiz');
    }
  };

  const onClickEditQuestion = (id) => {
    setCurrentQuestionId(id);
    setOpenAddQuestion(true);
  };

  const onClickAddQuestion = () => {
    setCurrentQuestionId('');
    setOpenAddQuestion(true);
  };

  const handleTagOnChange = (event) => {
    let tagsArray = [...tagArr];

    if (event.target.checked && tagsArray?.length > 14) {
      event.target.checked = false;
      showToastError(t('allowed_tags_toast'));
    } else {
      if (event.target.checked) {
        tagsArray = [...tagArr, event.target.value];
      } else {
        tagsArray.splice(tagArr.indexOf(event.target.value), 1);
      }
      setTagArr(tagsArray);
      setQuizState({
        ...quizState,
        ['tagsSocialShare']: tagsArray,
      });
      quizRef.current = {
        ...quizRef.current,
        ['tags']: tagsArray,
        ['tagsSocialShare']: isDraft ? tagsArray : tagsArray, //[...quizState.tagsSocialShare],
      };
      unsavedChanges.current = true;
    }
  };

  const crossButtonHandle = () => {
    setShowExitWarning(false);
    setOnSavedModal(false);
    navigate(`?path=${quizRef.current?.page}`);
  };

  const saveQuestionCallBack = (questionInfo) => {
    if (quizState?.questions?.length < 16) {
      let temp = [...quizState.questions];
      if (currentQuestionId !== '') {
        temp = quizState.questions.map((x) =>
          x.current_page_url === questionInfo.current_page_url
            ? questionInfo
            : x
        );
      } else {
        temp = [...quizState.questions, questionInfo];
      }
      setQuizState({
        ...quizState,
        questions: [...temp],
      });
      unsavedChanges.current = true;
    } else {
      showToastError(t('allowed_tags_toast'));
    }
    setCurrentQuestionId('');
    setOpenAddQuestion(false);
  };
  const [contentType] = useState(
    capitalizeFirstLetter(
      quizPageUrl?.pathname?.split('/')?.[4]?.split('-')?.[1]
    )
  );
  const [runFetchContentByPath, { loading }] = useLazyQuery(fetchContentByPath);
  useEffect(() => {
    if (
      (Object.keys(quiz?.currentQuiz).length > 0 && params.id) ||
      Object.keys(quiz?.currentQuiz).length
    ) {
      setQuizInstance(quiz?.currentQuiz);
      setTagArr(quiz?.currentQuiz?.Tag);
    } else if (params.id) {
      runFetchContentByPath({
        variables: { contentType: contentType, path: currentQuizData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            const tempdata = { ...contentObj };
            delete tempdata.__typename;
            setQuizInstance(tempdata);
            setTagArr(tempdata.tags);
          }
        })
        .catch(() => {
          showToastError(t('api_error_toast'));
        });
    }
  }, [quiz, params.id]);
  useEffect(() => {
    setIsEditMode(true);
    if (Object.keys(content?.currentContent).length > 0) {
      setQuizState(content?.currentContent);
      setTagArr(content?.currentContent?.tagsSocialShare);
      quizRef.current = content?.currentContent;
    } else if (currentQuizData.current && unsavedChanges.current != true) {
      setIsLoading(true);
      const tempArray: any = [];
      runFetchContentByPath({
        variables: { contentType: contentType, path: currentQuizData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            const {
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              title,
              task_status,
              user_id,
              user_name,
            } = res.data.authoring_getCmsContentByPath;
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
            let filtered =
              res?.data?.authoring_getCmsContentByPath?.questions.filter(
                (val) => !val.startsWith('/')
              );
            if (filtered.length === 0) {
              setIsLoading(false);
            }
            filtered?.map((val, index) => {
              runFetchContentByPath({
                variables: { contentType: 'Question', path: val },
              })
                .then((resp) => {
                  if (resp?.data?.authoring_getCmsContentByPath) {
                    !loading && setIsLoading(false);
                    tempArray[index] = {
                      question:
                        resp?.data?.authoring_getCmsContentByPath.question,
                      current_page_url:
                        resp?.data?.authoring_getCmsContentByPath
                          .current_page_url,
                      question_type:
                        resp?.data?.authoring_getCmsContentByPath.question_type,
                      options_compound_fields:
                        resp?.data?.authoring_getCmsContentByPath
                          .options_compound_fields,
                      background_content:
                        resp?.data?.authoring_getCmsContentByPath
                          .background_content,
                    };
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  console.log(JSON.stringify(err, null, 2));
                });
            });
            const tempObj = {
              ...quizState,
              title: res?.data?.authoring_getCmsContentByPath?.title,
              short_title:
                res?.data?.authoring_getCmsContentByPath?.short_title,
              short_description:
                res?.data?.authoring_getCmsContentByPath?.short_description,
              description:
                res?.data?.authoring_getCmsContentByPath?.description,
              imagevideoURL:
                res?.data?.authoring_getCmsContentByPath?.background_content
                  ?.Url,
              questions: tempArray,
              // questions: res?.data?.authoring_getCmsContentByPath?.questions.length>0 ? [...quizState.questions,{current_page_url:res?.data?.authoring_getCmsContentByPath?.questions}]:quizState.questions,
              scoreBy: res?.data?.authoring_getCmsContentByPath?.display_scores,
              tags: res?.data?.authoring_getCmsContentByPath?.tags,
              result_range_1:
                res?.data?.authoring_getCmsContentByPath?.result_range_1,
              result_range_2:
                res?.data?.authoring_getCmsContentByPath?.result_range_2,
              result_range_3:
                res?.data?.authoring_getCmsContentByPath?.result_range_3,
              result_range_4:
                res?.data?.authoring_getCmsContentByPath?.result_range_4,
              original_image:
                res?.data?.authoring_getCmsContentByPath?.original_image,
              published_images:
                res?.data?.authoring_getCmsContentByPath?.published_images,
              is_schedule_publish:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.is_schedule_publish,
              is_schedule_unpublish:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.is_schedule_unpublish,
              schedule_publish_datetime:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.schedule_publish_datetime,
              schedule_unpublish_datetime:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.schedule_unpublish_datetime,
              socialShareImgURL:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_image,
              titleSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_title,
              descriptionSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_description,
              tagsSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.keywords,
              structure_data:
                res?.data?.authoring_getCmsContentByPath?.structure_data,
              seo_enable: res?.data?.authoring_getCmsContentByPath?.seo_enable,
              analytics_enable:
                res?.data?.authoring_getCmsContentByPath?.analytics_enable,
              createdBy: res?.data?.authoring_getCmsContentByPath?.createdBy,
            };
            setQuizState(tempObj);
            setQuizInstance(tempObj);
            quizRef.current = {
              title: res?.data?.authoring_getCmsContentByPath?.title,
              short_title:
                res?.data?.authoring_getCmsContentByPath?.short_title,
              short_description:
                res?.data?.authoring_getCmsContentByPath?.short_description,
              description:
                res?.data?.authoring_getCmsContentByPath?.description,
              imagevideoURL:
                res?.data?.authoring_getCmsContentByPath?.background_content
                  ?.Url,
              tags: res?.data?.authoring_getCmsContentByPath?.tags,
              titleSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_title,
              descriptionSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_description,
              socialShareImgURL:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.socialog_image,
              tagsSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties
                  ?.keywords,
            };
            setTagArr(res?.data?.authoring_getCmsContentByPath?.tags);
          }
        })
        .catch(() => {
          showToastError(t('api_error_toast'));
        });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(tagData).length == 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
            setsrollToView(
              quizPageUrl.searchParams.get('open')
                ? (quizPageUrl.searchParams.get('open') as string)
                : ''
            );
          }
        })
        .catch(() => {
          showToastError(t('api_error_toast'));
        });
    }
  }, []);

  const isInViewport = (element) => {
    const mainElement = document.querySelector(`#${element}`);
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      return (
        rect.top <= window.pageYOffset + window.innerHeight &&
        rect.left <= window.pageXOffset + window.innerWidth &&
        rect.top >= window.pageYOffset &&
        rect.left >= window.pageXOffset
      );
    }
    return false;
  };
  const scrollHandler = () => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }
    const timeOutId = setTimeout(() => {
      const container = document.getElementById('scrollableDiv');
      const active = icons.find((i) => isInViewport(i.id));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
      if (
        container &&
        Math.abs(
          container?.scrollHeight -
            container?.clientHeight -
            container?.scrollTop
        ) < 1
      ) {
        setParentToolTip('seo');
      }
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };

  useEffect(() => {
    const dataHolder = document.getElementById('scrollableDiv');
    dataHolder?.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
    setShowWorkflowSubmit(false);
  };
  const closeButtonHandle = () => {
    if (qusUnsavedChanges.current === true) {
      setCurrentQuestionId('');
      setOpenAddQuestion(false);
      setShowExitWarning(false);
      qusUnsavedChanges.current = false;
    } else {
      unsavedChanges.current = false;
      dispatch(previewContent({}));
      navigate('/content/quiz');
    }
  };
  const handleQuesReturn = () => {
    if (qusUnsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      setCurrentQuestionId('');
      setOpenAddQuestion(false);
    }
  };
  const navigateTo = () => {
    unsavedChanges.current = false;
    navigate('/content/quiz');
    dispatch(previewContent({}));
  };
  const handelPreview = () => {
    const backgroundContent = {
      objectType: 'image',
      Url: quizState?.imagevideoURL,
      Title: '',
      Thumbnail: quizState?.imagevideoURL,
      Color: '',
    };
    const tempObj = {
      ...quizState,
      background_content: backgroundContent,
      contentType: 'Quiz',
    };
    dispatch(previewContent(tempObj));
    navigate('/content-preview');
  };
  const [changes, setChanges] = useState(unsavedChanges.current);

  useEffect(() => {
    if (unsavedChanges.current == true) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
      window.addEventListener('beforeunload', (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.addEventListener('popstate', (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          navigateTo
        )
      );
    }
    return () => {
      window.removeEventListener('beforeunload', (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.removeEventListener('popstate', (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          navigateTo
        )
      );
    };
  }, [unsavedChanges.current, changes]);
  useEffect(() => {
    dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  }, [quizState]);

  const [isOpenedOther, setIsOpenedOther] = useState(false);
  // flat = true: open add new question or choose from list and not scroll to question container.
  useEffect(() => {
    if (openAddQuestion || isClickedQueList) {
      setIsOpenedOther(true);
    } else if (isOpenedOther) {
      const container = document.getElementById('scrollableDiv');
      const questionContainer = document.getElementById(icons[2].id); // id: 'questions'
      container?.scrollTo({
        top: questionContainer?.offsetTop,
      });
      setIsOpenedOther(false);
    }
  }, [openAddQuestion, isClickedQueList, isOpenedOther]);

  //create comment
  const createComment = async () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/quiz/${currentQuizData.current}`,
      status: false,
      document_type: 'Quiz',
      created_by: username,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };

  useEffect(() => {
    if (!currentQuizData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: 'Quiz',
        },
      });
    }
  }, [tagData?.length > 0]);
  return (
    <>
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
            handleVideoSelected={handleSelectedVideo}
            keyName={key}
            id={answerId}
          />
        )}
      </Box>
      {isClickedQueList && (
        <QuestionListing
          setIsClickedQueList={setIsClickedQueList}
          quizState={quizState}
          setQuizState={setQuizState}
          setOpenAddQuestion={setOpenAddQuestion}
          qusUnsavedChanges={qusUnsavedChanges}
          handleQuesReturn={handleQuesReturn}
          unsavedChanges={unsavedChanges}
        />
      )}
      {openAddQuestion && (
        <AddQuestion
          setAddQuestion={setOpenAddQuestion}
          saveQuestionCallBack={saveQuestionCallBack}
          qusUnsavedChanges={qusUnsavedChanges}
          questionId={currentQuestionId}
        />
      )}
      <Box
        sx={{
          display: isClickedQueList || openAddQuestion ? 'none' : 'initial',
        }}
      >
        {isLoading && <Loader />}

        <Box>
          <Box>
            <CreateHeader
              previewButton={previewButton}
              handelPreview={handelPreview}
              createText={
                currentQuizData.current
                  ? `${t('edit')} ${t('quiz')}`
                  : t('create_quiz')
              }
              returnBack={returnBack}
              isQuiz={isQuiz}
              publishButton={publishButton}
              saveButton={saveButton}
              saveorPublish={saveQuiz}
              publishText={t('publish')}
              saveText={t('save_as_draft')}
              previewText={t('preview')}
              toolTipText={t('preview_tooltip')}
              saveVariant='secondaryButton'
              publish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Quiz}
              workflow={workflow}
              timerState={timerState}
              lastmodifiedDate={lastmodifiedDate}
              setEnableWorkflowHistory={setEnableWorkflowHistory}
              createComment={createComment}
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
              overflowY: loading ? 'hidden' : 'scroll',
              overflowX: 'hidden',
            }}
            id='scrollableDiv'
          >
            {!isClickedQueList && !galleryState && !enableWorkflowHistory && (
              <Box
                sx={{
                  position: 'fixed',
                  top: '25%',
                  right: { sm: '5px', xs: 0 },
                  zIndex: 1000,
                }}
              >
                <QuizPageScroll
                  icons={icons}
                  parentToolTip={parentToolTip}
                  srollToView={srollToView}
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
                <TitleDescription
                  state={quizState}
                  setState={setQuizState}
                  setSaveButton={setSaveButton}
                  unsavedChanges={unsavedChanges}
                  quizRef={quizRef}
                  isDraft={isDraft}
                  setFieldChanges={setFieldChanges}
                />
                <ImageVideo
                  state={quizState}
                  setState={setQuizState}
                  showGallery={showGallery}
                  selectedImage={selectedImage}
                />
                <Question
                  quizState={quizState}
                  setQuizState={setQuizState}
                  onClickAddQuestion={onClickAddQuestion}
                  setIsClickedQueList={setIsClickedQueList}
                  onClickEditQuestion={onClickEditQuestion}
                />
                <Result
                  state={quizState}
                  setState={setQuizState}
                  unsavedChanges={unsavedChanges}
                  setFieldChanges={setFieldChanges}
                />
                {/* <SchedulePublish
              handleSchedulePublish={handleSchedulePublish}
              isEditMode={isEditMode}
              state={quizState}
              setState={setQuizState}
              unsavedChanges={unsavedChanges}
            /> */}
                <ChooseTags
                  tagData={tagData}
                  selectedTag={tagArr}
                  handleTagOnChange={handleTagOnChange}
                  isEdit={currentQuizData.current ? true : false}
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
                    <SocialShare
                      showGallery={showGallery}
                      state={quizState}
                      setState={setQuizState}
                      quizRef={quizRef}
                      unsavedChanges={unsavedChanges}
                      setFieldChanges={setFieldChanges}
                      selectedImage={selectedImage}
                    />
                  </AccordionDetails>
                </Accordion> */}
                <SocialShare
                  showGallery={showGallery}
                  state={quizState}
                  setState={setQuizState}
                  quizRef={quizRef}
                  unsavedChanges={unsavedChanges}
                  setFieldChanges={setFieldChanges}
                  selectedImage={selectedImage}
                />
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: { xs: '15px', md: '40px' },
                  }}
                  expanded={analyticsExpanded}
                  onChange={() => setAnalyticsExpanded(!analyticsExpanded)}
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
                    <Analytics
                      state={quizState}
                      setState={setQuizState}
                      unsavedChanges={unsavedChanges}
                    />
                  </AccordionDetails>
                </Accordion> */}
                <Analytics
                  number='07'
                  state={quizState}
                  setState={setQuizState}
                  unsavedChanges={unsavedChanges}
                />
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: { xs: '15px', md: '40px' },
                  }}
                  expanded={seoExpanded}
                  onChange={() => setSeoExpanded(!seoExpanded)}
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
                    <Seo
                      state={quizState}
                      setState={setQuizState}
                      setEditedSD={setEditedSD}
                      quizInstance={quizInstance}
                      unsavedChanges={unsavedChanges}
                    />
                  </AccordionDetails>
                </Accordion> */}
                <Seo
                  state={quizState}
                  setState={setQuizState}
                  setEditedSD={setEditedSD}
                  quizInstance={quizInstance}
                  unsavedChanges={unsavedChanges}
                />
              </>
            )}
          </Box>
        </Box>
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={t('done')}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={saveQuiz}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
        <PlateformXDialog
          isDialogOpen={onSavedModal}
          title={t('save_as_draft')}
          subTitle={t('quiz_save_popup')}
          closeButtonText={t('edit')}
          confirmButtonText={t('go_to_listing')}
          closeButtonHandle={crossButtonHandle}
          confirmButtonHandle={() => navigate('/content/quiz')}
          crossButtonHandle={crossButtonHandle}
          modalType='draft'
          closeIcon={<CreateRoundedIcon />}
        />
        {showPublishConfirm || showWorkflowSubmit ? (
          <PlateformXDialog
            isDialogOpen={showPublishConfirm || showWorkflowSubmit}
            title={t('congratulations')}
            subTitle={
              showPublishConfirm
                ? t('quiz_publish_popoup')
                : t('requested_action')
            }
            closeButtonHandle={handleCloseDialog}
            confirmButtonText={t('go_to_listing')}
            confirmButtonHandle={() => navigate('/content/quiz')}
            modalType='publish'
          />
        ) : null}
        {openPageExistModal ? (
          <PlateformXDialog
            isDialogOpen={openPageExistModal}
            title={`${t('quiz')} ${t('already_exists')}`}
            subTitle={t('conformation')}
            closeButtonText={t('no')}
            confirmButtonText={t('yes')}
            closeButtonHandle={pageExistCloseHandle}
            confirmButtonHandle={pageExistYesButtonHandle}
            crossButtonHandle={pageExistCloseHandle}
            modalType=''
          />
        ) : null}
      </Box>
      <CommentListPanel></CommentListPanel>
    </>
  );
};
