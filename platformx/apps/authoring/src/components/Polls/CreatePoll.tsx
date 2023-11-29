import { useLazyQuery, useMutation } from '@apollo/client';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box, Divider } from '@mui/material';
import { format } from 'date-fns';
import { useContext, useEffect, useRef, useState } from 'react';
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
} from '../../utils/helperFunctions';
import { CreateHeader } from '../Common/CreateHeader';
import { previewContent } from '../Common/contentTypes/store/ContentAction';
import CommentListPanel from '../ContentRewiew/CommentListPanel';
import PlateformXDialog from '../Modal';
import Analytics from '../Quiz/Analytics';
import icons from '../Quiz/Constants';
import { workflowKeys } from '../Submit/Utils/contstants';
import WorkflowHistory from '../WorkflowHistory/WorkflowHistory';
import AddQuestion from './AddQuestion';
import ChooseTags from './ChooseTags';
import { ImageVideo } from './ImageVideo';
import PollPageScroll from './PollPageScroll';
import Result from './Result';
import Seo from './Seo';
import SocialShare from './SocialShare';
import { TitleDescription } from './TitleDescription';
import { DRAFT, PUBLISHED } from './Utils/constants';
import { checkIfUnsavedChanges } from './store/Actions';

export const CreatePoll = (): JSX.Element => {
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { state, dispatch } = useContext(Store);
  const { poll, content } = state;
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const pollPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>('');
  const currentPollData = useRef(
    pollPageUrl.searchParams.get('path')
      ? (pollPageUrl.searchParams.get('path') as string)
      : ''
  );
  const [srollToView, setsrollToView] = useState<any>();
  const [pollInstance, setPollInstance] = useState<any>({});
  const [onSavedModal, setOnSavedModal] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const qusUnsavedChanges = useRef<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const navigate = useNavigate();
  const [previewButton, setPreviewButton] = useState(true);
  const [publishButton, setPublishButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [isPoll, setisPoll] = useState(true);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [openAddQestion, setOpenAddQuestion] = useState(false);
  const [isClickedQueList, setIsClickedQueList] = useState(false);
  const [PublishUrl, setPublishUrl] = useState('');
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    title: '',
    description: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    title: '',
    description: '',
    Url: '',
  });
  const [tagData, setTagData] = useState<any>({});
  const [tagArr, setTagArr] = useState<any>([]);
  const [workflow, setWorkflow] = useState({});
  const [selectedTag, setselectedTag] = useState<any>([]);
  const [key, setKey] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [parentToolTip, setParentToolTip] = useState('');
  const [addImage, setAddImage] = useState<boolean>(false);
  const scrollDebounceRef = useRef<any>(null);
  const [runFetchTagList] = useLazyQuery(fetchTagList);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [socialShareExpanded, setSocialShareExpanded] = useState(
    pollPageUrl.searchParams.get('open') ? true : false
  );
  const [timerState, setTimerState] = useState(
    localStorage.getItem('contentTypeTimerState') == 'true' ? true : false
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(
    new Date().toISOString()
  );
  const [enableWorkflowHistory, setEnableWorkflowHistory] =
    useState<boolean>(false);
  const [pollState, setPollState] = useState<any>({
    title: '',
    short_title: '',
    short_description: '',
    description: '',
    imagevideoURL: '',
    colorCode: '',
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
    is_schedule_publish: false,
    schedule_publish_datetime: '',
    is_schedule_unpublish: false,
    schedule_unpublish_datetime: '',
    poll_title: '',
    poll_description: '',
    queBackgroundColor: '',
    queBackgroundImg: '',
    original_image: {},
    published_images: [],
    question_original_image: {},
    question_published_images: [],
  });
  const [answers, setAnswers] = useState<any>([
    { id: '1', option: '', image: '' },
    { id: '2', option: '', image: '' },
  ]);
  const [editedSD, setEditedSD] = useState({});
  const [filedChanges, setFieldChanges] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const { selectedComment, comments, clearComment } = useCommentContext();
  const login_user_id = userInfo?.user_id;

  useEffect(() => {
    setIsReload(!isReload);
  }, [comments]);
  useEffect(() => {
    if (Object.keys(pollInstance).length === 0 && !params.id) {
      const newPoll = {
        CommonFields: {
          page: '',
          title: '',
          short_title: '',
          description: '',
          short_description: '',
          category: 'Poll',
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
          background_content: {
            objectType: 'image',
            Url: '',
            Title: '',
            Thumbnail: '',
            Color: 'black',
          },
          question_background_content: {
            objectType: 'image',
            Url: '',
            Title: '',
            Thumbnail: '',
            Color: 'black',
            original_image: {},
            published_images: [],
          },
          display_scores: 'Count',
          // background_color: "",
          poll_description: '',
          poll_title: '',
          poll_question: '',
          // poll_answer_image: "",
          options_compound_fields: [],
          original_image: {},
          published_images: [],
        },
      };
      setPollInstance(newPoll);
    }
    if (currentPollData.current === '') {
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Poll)
      );
    }
  }, []);
  const updateField = (updatedPartialObj, callPreview = false) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL
          ? 'image'
          : pollState?.colorCode
          ? 'color'
          : '',
        Url: pollState?.imagevideoURL,
        Title: '',
        Thumbnail: pollState?.imagevideoURL,
        Color: pollState?.colorCode,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? 'image'
          : pollState?.queBackgroundColor
          ? 'color'
          : '',
        Url: pollState?.queBackgroundImg,
        Title: '',
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      // background_color: pollState?.queBackgroundColor,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      // poll_answer_image: pollState?.queBackgroundImg,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : '',
            title: 'Option Image',
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const modifiedPoll = {
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
    setPollInstance(modifiedPoll);
  };
  const defPoll = {
    imagevideoURL: '',
    title: '',
    description: '',
    short_title: '',
    short_description: '',
    tags: [],
  };
  const pollRef = useRef<any>(
    state.poll.currentPoll ? state.poll.currentPoll : defPoll
  );
  const tagRef = useRef<any>([]);

  const [isPublishDisabled, setPublishDisabled] = useState<boolean>(true);
  const [isPublishPreviewDisabled, setIsPublishPreviewDisabled] =
    useState<boolean>(false);
  const [isDraftDisabled, setDraftDisabled] = useState<boolean>(true);
  const publishViewButtonHandle = () => {
    setShowPublishConfirm(false);
  };
  const handleSchedulePublish = (
    isPublish,
    publishTime,
    isUnpublish,
    unPublishTime
  ) => {
    setPollState({
      ...pollState,
      is_schedule_publish: isPublish,
      schedule_publish_datetime: publishTime,
      is_schedule_unpublish: isUnpublish,
      schedule_unpublish_datetime: unPublishTime,
    });
  };
  const updatePollSettings = (pageUrl) => {
    const PollSettings = {
      socialog_url:
        `${getSubDomain()}/${i18n.language}/` + `poll` + `/${pageUrl}`,
      socialog_type: 'poll',
      socialog_sitename: pollRef.current?.title
        ? trimString(handleHtmlTags(pollRef.current?.title), 100)
        : 'poll',
      seo_title: pollRef.current?.short_title
        ? trimString(handleHtmlTags(pollRef.current?.short_title), 100)
        : '',
      socialog_title: pollRef.current?.titleSocialShare
        ? trimString(handleHtmlTags(pollRef.current?.titleSocialShare), 100)
        : '',
      socialog_twitter_title: pollRef.current?.titleSocialShare
        ? trimString(handleHtmlTags(pollRef.current?.titleSocialShare), 100)
        : '',
      socialog_description: pollRef.current?.short_description
        ? trimString(handleHtmlTags(pollRef.current?.short_description), 163)
        : '',
      socialog_twitter_description: pollRef.current?.descriptionSocialShare
        ? trimString(
            handleHtmlTags(pollRef.current?.descriptionSocialShare),
            163
          )
        : '',
      socialog_twitter_url:
        `${getSubDomain()}/${i18n.language}/` + `poll` + `/${pageUrl}`,
      keywords: pollState?.tagsSocialShare, //pollRef.current.tags,
      seo_keywords: pollRef.current.tags,
      seo_description: pollRef.current?.description
        ? trimString(handleHtmlTags(pollRef.current?.description), 163)
        : '',
      socialog_image: pollRef.current?.socialShareImgURL,
      socialog_twitter_image: pollRef.current?.socialShareImgURL,
      is_schedule_publish: pollState?.is_schedule_publish,
      schedule_publish_datetime: pollState?.schedule_publish_datetime,
      is_schedule_unpublish: pollState?.is_schedule_unpublish,
      schedule_unpublish_datetime: pollState?.schedule_unpublish_datetime,
    };
    return PollSettings;
  };

  const updateCurrentInstance = (pageURL, callPreview = false) => {
    const updatedObj = {
      page: pageURL,
      title: pollRef?.current?.title,
      short_title: pollRef?.current?.short_title
        ? pollRef?.current?.short_title
        : '',
      description: pollRef?.current?.description,
      short_description: pollRef?.current?.short_description
        ? pollRef?.current?.short_description
        : '',
      tags: pollRef?.current?.tags ? pollRef?.current?.tags : tagRef?.current,
      current_page_url: `/${pageURL}`,
      settings: { ...updatePollSettings(pageURL) },
    };
    updateField(updatedObj, callPreview);
  };
  const buildUrl = (page_state) => {
    const url =
      currentPollData.current !== ''
        ? page_state === 'PUBLISHED'
          ? `${getSubDomain()}/${i18n.language}/` +
            `poll/${currentPollData.current}`
          : currentPollData.current
        : page_state === 'PUBLISHED'
        ? `${getSubDomain()}/${i18n.language}/` +
          `poll/${pollState?.title
            ?.replace(/[^A-Z0-9]+/gi, '-')
            ?.toLowerCase()}`
        : pollState?.title?.replace(/[^A-Z0-9]+/gi, '-')?.toLowerCase();
    return url;
  };
  const updateStructureData = (pageState = 'DRAFT') => {
    const PollStructureData = {
      '@context': 'https://schema.org',
      '@type': 'VoteAction',
      name: pollState?.poll_title,
      description: pollState?.poll_description,
      url: buildUrl(pageState),
      startTime: new Date().toISOString(),
      option: answers?.map((ans) => ans.option),
    };
    return PollStructureData;
  };
  const [createpollmutate] = useMutation(createContentType);
  const [updatepollmutate] = useMutation(updateContentType);
  const [publishpollmutate] = useMutation(publishContentType);
  const [contentType, setContentType] = useState(
    capitalizeFirstLetter(
      pollPageUrl?.pathname?.split('/')?.[4]?.split('-')?.[1]
    )
  );
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const taglength = useRef();
  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
    } = pollState;
    const emptyAnswers = answers.filter((ans) => ans.option === '');
    const emptyImageOptions = answers.filter((ans) => ans.image === '');
    const shortDesc = pollState.short_description;
    if (
      title === '' ||
      shortTitle === '' ||
      shortDesc === '' ||
      description === '' ||
      (colorCode === '' && imagevideoURL === '') ||
      pollState?.poll_title === '' ||
      pollState?.poll_description === '' ||
      scoreBy === '' ||
      emptyAnswers.length > 0 ||
      (addImage && emptyImageOptions.length > 0) ||
      tagArr?.length === 0
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [pollState, answers, addImage]);

  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
    } = pollState;
    const emptyAnswers = answers.filter((ans) => ans.option === '');
    const emptyImageOptions = answers.filter((ans) => ans.image === '');
    const shortDesc = pollState.short_description;
    if (
      title === '' ||
      shortTitle === '' ||
      shortDesc === '' ||
      description === '' ||
      (colorCode === '' && imagevideoURL === '') ||
      pollState?.poll_title === '' ||
      pollState?.poll_description === '' ||
      scoreBy === '' ||
      emptyAnswers.length > 0 ||
      (addImage && emptyImageOptions.length > 0) ||
      (taglength.current === 0 && tagArr?.length === 0)
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [pollState, answers, addImage, currentPollData.current]);
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), 'h:mm aa, dd LLLL');
  };
  const pageExistPopup = {
    saveAsDraftTitle: 'Poll already exists!',
    saveAsDraftDescription: 'Are you sure you want to continue?',
    saveAsDraftCloseText: 'No',
    saveAsDraftConfirmText: 'Yes',
  };
  const publishPopup = useRef({
    publishTitle: 'Congratulations!',
    publishDescription:
      'Your Poll has been sent for publishing & will be published in a few seconds.',
    publishCloseText: 'Go to Listing',
    publishConfirmText: 'View POLL',
  });
  const publishPoll = (pageURL) => {
    const pollToSend = {
      page: pageURL,
    };
    publishpollmutate({
      variables: {
        contentType: contentType,
        input: pollToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (
          pollState?.is_schedule_publish &&
          pollState?.schedule_publish_datetime &&
          !pollState?.is_schedule_unpublish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to publish at ${dateFormat(
              new Date(pollState?.schedule_publish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          pollState?.is_schedule_unpublish &&
          pollState?.schedule_unpublish_datetime &&
          !pollState?.is_schedule_publish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to unpublish at ${dateFormat(
              new Date(pollState?.schedule_unpublish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          pollState?.is_schedule_unpublish &&
          pollState?.schedule_unpublish_datetime &&
          pollState?.is_schedule_publish &&
          pollState?.schedule_publish_datetime
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to publish at ${dateFormat(
              new Date(pollState?.schedule_publish_datetime)
            )} & scheduled to unpublish at ${dateFormat(
              new Date(pollState?.schedule_unpublish_datetime)
            )}`,
          };
          setShowPublishConfirm(true);
        } else {
          setShowPublishConfirm(true);
        }
        // showToastSuccess(`${t('poll')} ${t('published_toast')}`);
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
  const createPoll = (
    pageState,
    IsDuplicate = false,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD, url: buildUrl(pageState) }
        : updateStructureData(pageState);
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL
          ? 'image'
          : pollState?.colorCode
          ? 'color'
          : '',
        Url: pollState?.original_image.original_image_relative_path,
        Title: '',
        Thumbnail: pollState?.original_image.original_image_relative_path,
        Color: pollState?.colorCode,
        ext: pollState?.original_image.ext,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? 'image'
          : pollState?.queBackgroundColor
          ? 'color'
          : '',
        Url: pollState?.queBackgroundImg,
        Title: '',
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      // background_color: pollState?.queBackgroundColor,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      // poll_answer_image: pollState?.queBackgroundImg,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : '',
            title: 'Option Image',
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const pollToSend = {
      ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        page_state: pageState,
        structure_data: JSON.stringify(structureData),
        IsConfirm: IsDuplicate,
        seo_enable: pollState?.seo_enable,
        analytics_enable: pollState?.analytics_enable,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };

    createpollmutate({
      variables: {
        contenttype: contentType,
        input: pollToSend,
      },
    })
      .then((resp) => {
        unsavedChanges.current = false;
        dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());
        if (pageState.toLowerCase() !== PUBLISHED.toLowerCase()) {
          setIsLoading(false);
          if (resp?.data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
            setWorkflowStatus(isWorkflow);
          } else {
            if (!isWorkflow) {
              showToastSuccess(`${t('poll')} ${t('saved_toast')}`);
            }
            //setOnSavedModal(true);
            setIsDraft(false);
            const { createdBy } = pollInstance.CommonFields;
            const { title, description } = updateTempObj.current;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: resp?.data?.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ContentType.Poll),
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
            publishPoll(
              pollRef.current.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()
            );
          }
        }
        const pageUrl = resp?.data?.authoring_createContent?.path.substring(
          resp?.data?.authoring_createContent?.path.lastIndexOf('/') + 1
        );
        pollRef.current.page = pageUrl;
        setDraftPageURL(pageUrl);
        const tagArrTemp = { ...poll.current };
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
      createPoll(DRAFT, true, workflowStatus);
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      createPoll(PUBLISHED, true);
    }
  };
  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
    setIsLoading(false);
  };
  useEffect(() => {
    if (timerState) {
      localStorage.setItem('contentTypeTimerState', 'true');
    }
  }, [timerState]);
  const updatePOLL = (
    status,
    isWorkflow = true,
    props = {},
    event_step = ''
  ) => {
    setIsLoading(true);
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD, url: buildUrl(status) }
        : updateStructureData(status);
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL
          ? 'image'
          : pollState?.colorCode
          ? 'color'
          : '',
        Url: pollState?.original_image.original_image_relative_path,
        Title: '',
        Thumbnail: pollState?.original_image.original_image_relative_path,
        Color: pollState?.colorCode,
        ext: pollState?.original_image.ext,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? 'image'
          : pollState?.queBackgroundColor
          ? 'color'
          : '',
        Url: pollState?.queBackgroundImg,
        Title: '',
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      // background_color: pollState?.queBackgroundColor,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      // poll_answer_image: pollState?.queBackgroundImg,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : '',
            title: 'Option Image',
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const updatePollToSend = {
      // ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        structure_data: JSON.stringify(structureData),
        current_page_url: `/${
          currentPollData.current !== ''
            ? currentPollData.current
            : draftPageURL
        }`,
        page: draftPageURL ? draftPageURL : currentPollData.current,
        page_state: status,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        createdBy: username,
        page_lastmodifiedby: username,
        parent_page_url: '/',
        seo_enable: pollState?.seo_enable,
        analytics_enable: pollState?.analytics_enable,
        title: pollState?.title,
        description: pollState?.description,
        short_title: pollState?.short_title,
        short_description: pollState?.short_description,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };
    // delete updatePollToSend.__typename;
    updatepollmutate({
      variables: {
        contenttype: contentType,
        input: updatePollToSend,
      },
    })
      .then((resp) => {
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());
        if (status && status?.toLowerCase() === DRAFT.toLowerCase()) {
          setIsLoading(false);
          if (!isWorkflow) {
            showToastSuccess(`${t('poll')} ${t('updated_toast')}`);
          } else {
            workflowSubmitRequest(props, event_step);
          }
          unsavedChanges.current = false;
          dispatch(checkIfUnsavedChanges(unsavedChanges.current));
          setShowExitWarning(false);
          setIsEdited(false);
        } else {
          publishPoll(draftPageURL ? draftPageURL : currentPollData.current);
        }
      })
      .catch((error) => {
        setTimerState(false);
        setLastmodifiedDate('');
        showToastError(t('api_error_toast'));
        setIsLoading(false);
        console.log(JSON.stringify(error, null, 2));
      });
  };
  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
    setShowWorkflowSubmit(false);
  };
  const savePoll = (status = true, props = {}, event_step = '') => {
    dispatch(previewContent({}));
    setShowExitWarning(false);

    setPollState({
      ...pollState,
      ['tags']: tagArr,
    });

    if (pollState?.title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (pollState?.description === '') {
      showToastError(`${t('description')} ${t('is_required')}`);
    } else if (
      pollState?.is_schedule_publish &&
      (pollState?.schedule_publish_datetime === '' ||
        pollState?.schedule_publish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_publish')} ${t('time')} ${t('is_required')}`
      );
    } else if (
      pollState?.is_schedule_unpublish &&
      (pollState?.schedule_unpublish_datetime === '' ||
        pollState?.schedule_unpublish_datetime === null)
    ) {
      showToastError(
        `${t('scheduled_unpublish')} ${t('time')} ${t('is_required')}`
      );
    } else {
      const pageURL = currentPollData.current
        ? currentPollData.current
        : pollRef?.current?.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
        setIsEdited(false);
      }
      if (!currentPollData.current && isDraft) {
        createPoll(DRAFT, false, status, props, event_step);
      } else {
        updatePOLL(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = () => {
    dispatch(previewContent({}));
    setPollState({
      ...pollState,
      ['tags']: tagArr,
    });
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
      queBackgroundColor,
      queBackgroundImg,
    } = pollState;
    const emptyAnswers = answers.filter((ans) => ans.option === '');
    const emptyImageOptions = answers.filter((ans) => ans.image === '');
    const checkOptionsChars = answers.filter((ans) => ans.option.length > 50);
    const shortDesc = pollState.short_description;
    if (title === '') {
      showToastError(`${t('title')} ${t('is_required')}`);
    } else if (shortTitle === '') {
      showToastError(`${t('short_title')} ${t('is_required')}`);
    } else if (shortDesc === '') {
      showToastError(`${t('short_description')} ${t('is_required')}`);
    } else if (description === '') {
      showToastError(`${t('description')} ${t('is_required')}`);
    } else if (colorCode === '' && imagevideoURL === '') {
      showToastError(`${t('banner_image')} ${t('is_required')}`);
    } else if (pollState?.poll_title === '') {
      showToastError(
        `${t('poll')} ${t('question')} ${t('title')} ${t('is_required')}`
      );
    } else if (pollState?.poll_description === '') {
      showToastError(
        `${t('poll')} ${t('question')} ${t('description')} ${t('is_required')}`
      );
    } else if (queBackgroundColor === '' && queBackgroundImg === '') {
      showToastError(
        `${t('poll')} ${t('question')} ${t('banner_image')} ${t('is_required')}`
      );
    } else if (emptyAnswers.length > 0) {
      showToastError(`${t('answers')} ${t('is_required')}`);
    } else if (addImage && emptyImageOptions.length > 0) {
      showToastError(t('empty_images'));
    } else if (scoreBy === '') {
      showToastError(`${t('score')} ${t('is_required')}`);
    } else if (
      pollState?.is_schedule_publish &&
      pollState?.schedule_publish_datetime === ''
    ) {
      showToastError(`${t('scheduled_publish')} ${t('is_required')}`);
    } else if (
      pollState?.is_schedule_unpublish &&
      pollState?.schedule_unpublish_datetime === ''
    ) {
      showToastError(`${t('scheduled_unpublish')} ${t('is_required')}`);
    } else if (tagArr?.length === 0) {
      showToastError(t('tag_error'));
    } else {
      const pageURL = currentPollData.current
        ? currentPollData.current
        : pollRef?.current?.title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
        setIsEdited(false);
      }

      if (!currentPollData.current && isDraft) {
        createPoll(PUBLISHED, false, false);
      } else {
        updatePOLL(PUBLISHED, false);
      }
    }
  };

  const handleSelectedImage = (image, keyName, id?: any) => {
    setSelectedImage(image);
    if (keyName === 'imagevideoURL') {
      setPollState({
        ...pollState,
        [keyName]: image?.Thumbnail,
        thumbnailURL: image?.Thumbnail,
        socialShareImgURL: image?.Thumbnail,
      });
      pollRef.current = {
        ...pollRef.current,
        [keyName]: image?.Thumbnail,
        ['socialShareImgURL']: image?.Thumbnail,
      };

      unsavedChanges.current = true;
      setIsEdited(true);
    } else if (keyName === 'answers') {
      setAnswers(
        answers.map((answer) =>
          answer.id == id ? { ...answer, image: image?.Thumbnail } : answer
        ) as []
      );
    } else {
      setPollState({ ...pollState, [keyName]: image?.Thumbnail });
      pollRef.current = {
        ...pollRef.current,
        [keyName]: image?.Thumbnail,
      };
      unsavedChanges.current = true;
    }
  };
  const handleSelectedVideo = (video, id) => {
    setSelectedVideo(video);
    setPollState({
      ...pollState,
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
      navigate('/content/poll');
    }
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
      setPollState({
        ...pollState,
        ['tagsSocialShare']: tagsArray,
      });
      pollRef.current = {
        ...pollRef.current,
        ['tags']: tagsArray,
        ['tagsSocialShare']: isDraft ? tagsArray : tagsArray, //[...pollState.tagsSocialShare],
      };
      setIsEdited(true);
      unsavedChanges.current = true;
    }
  };

  const crossButtonHandle = () => {
    setShowExitWarning(false);
    setOnSavedModal(false);
    navigate(`?path=${pollRef.current?.page}`);
  };

  const saveAsDraftPopup = {
    saveAsDraftTitle: 'Saved as draft',
    saveAsDraftDescription: 'Your Poll has been saved successfully!',
    saveAsDraftCloseText: 'Edit',
    saveAsDraftConfirmText: 'Go to Poll Listing',
  };

  const saveQuestionCallBack = (queTitle, queDesc) => {
    setPollState({
      ...pollState,
      poll_title: queTitle,
      poll_description: queDesc,
    });

    // setOpenAddQuestion(false);
  };

  useEffect(() => {
    setIsEditMode(true);
    if (Object.keys(content?.currentContent).length > 0) {
      setPollState(content?.currentContent);
      pollRef.current = content?.currentContent;
      setAnswers(
        content?.currentContent?.options_compound_fields.map((x) => {
          return {
            id: x.option_id,
            option: x.option_text,
            image: x.option_image.url,
          };
        })
      );
      setTagArr(content?.currentContent?.tags);
    } else if (currentPollData.current && unsavedChanges.current != true) {
      setIsLoading(true);
      runFetchContentByPath({
        variables: { contentType: contentType, path: currentPollData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            setIsLoading(false);
            console.log('data', res?.data?.authoring_getCmsContentByPath);
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            const {
              title,
              short_title: shortTitle,
              short_description: shortDesc,
              description,
              background_content: backgroundContent,
              question_background_content: questionBackgroundContent,

              display_scores: scoreBy,
              tags,
              settingsProperties,
              poll_title: pollTitle,
              poll_description: pollDesc,
              is_image_option: isImgOpt,
              options_compound_fields: options,
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
            const temp = options.map((x) => {
              return {
                id: x.option_id,
                option: x.option_text,
                image: x.option_image.url,
              };
            });
            setAddImage(isImgOpt);
            setAnswers([...temp]);
            const tempObj = {
              ...pollState,
              title: title,
              short_title: shortTitle,
              short_description: shortDesc,
              description: description,
              imagevideoURL: backgroundContent?.Url,
              colorCode: backgroundContent?.Color,
              poll_title: pollTitle,
              poll_description: pollDesc,
              queBackgroundColor: questionBackgroundContent?.Color,
              queBackgroundImg: questionBackgroundContent?.Url,
              scoreBy: scoreBy,
              tags: tags,
              is_schedule_publish: settingsProperties?.is_schedule_publish,
              is_schedule_unpublish: settingsProperties?.is_schedule_unpublish,
              schedule_publish_datetime:
                settingsProperties?.schedule_publish_datetime,
              schedule_unpublish_datetime:
                settingsProperties?.schedule_unpublish_datetime,
              socialShareImgURL: settingsProperties?.socialog_image,
              titleSocialShare: settingsProperties?.socialog_title,
              descriptionSocialShare: settingsProperties?.socialog_description,
              tagsSocialShare: settingsProperties?.keywords,
              seo_enable: res?.data?.authoring_getCmsContentByPath?.seo_enable,
              structure_data:
                res?.data?.authoring_getCmsContentByPath?.structure_data,
              analytics_enable:
                res?.data?.authoring_getCmsContentByPath?.analytics_enable,
              original_image: contentObj.original_image,
              published_images: contentObj.published_images,
              question_original_image:
                contentObj.question_background_content.original_image,
              question_published_images:
                contentObj.question_background_content.published_images,
            };
            setPollState(tempObj);
            setPollInstance({
              ...tempObj,
              options_compound_fields:
                res?.data?.authoring_getCmsContentByPath
                  ?.options_compound_fields,
              page_state: res?.data?.authoring_getCmsContentByPath?.page_state,
            });
            pollRef.current = {
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
            taglength.current =
              res?.data?.authoring_getCmsContentByPath?.tags?.length;
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  }, [content]);

  useEffect(() => {
    if (Object.keys(tagData).length == 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
            setsrollToView(
              pollPageUrl.searchParams.get('open')
                ? (pollPageUrl.searchParams.get('open') as string)
                : ''
            );
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  }, []);

  const isInViewport = (element, isSeo) => {
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
      const active = icons.find((i) => isInViewport(i.id, false));
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
      dataHolder.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const closeButtonHandle = () => {
    if (qusUnsavedChanges.current === true) {
      setOpenAddQuestion(false);
      setShowExitWarning(false);
      qusUnsavedChanges.current = false;
    } else {
      dispatch(previewContent({}));
      navigate('/content/poll');
    }
  };
  const handleQuesReturn = () => {
    if (qusUnsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      setOpenAddQuestion(false);
    }
  };
  const navigateTo = () => {
    navigate('/content/poll');
    dispatch(previewContent({}));
  };
  const handelPreview = (contentPayload) => {
    const backgroundContent = {
      objectType: pollState?.imagevideoURL
        ? 'image'
        : pollState?.colorCode
        ? 'color'
        : '',
      Url: pollState?.thumbnailURL,
      Color: pollState?.colorCode,
    };
    const questionBackgroundContent = {
      objectType: pollState?.queBackgroundImg
        ? 'image'
        : pollState?.queBackgroundColor
        ? 'color'
        : '',
      Url: pollState?.queBackgroundImg,
      Title: '',
      Thumbnail: pollState?.queBackgroundImg,
      Color: pollState?.queBackgroundColor,
    };
    const optionsCompoundFields = answers.map((ans) => {
      return {
        option_image: {
          url: addImage ? ans.image : '',
          title: 'Option Image',
        },
        is_correct: ans.status,
        option_text: ans.option,
        option_id: ans.id,
      };
    });
    const tempObj = {
      ...pollState,
      background_content: backgroundContent,
      options_compound_fields: optionsCompoundFields,
      question_background_content: questionBackgroundContent,
      contentType: 'Poll',
    };
    console.log('handelPreview', tempObj);
    dispatch(previewContent(tempObj));
    navigate('/content-preview');
  };

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
  }, [unsavedChanges.current]);
  useEffect(() => {
    dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  }, [pollState]);
  //create comment
  const createComment = async () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/poll/${currentPollData.current}`,
      status: false,
      document_type: 'Poll',
      created_by: username,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };

  useEffect(() => {
    if (!currentPollData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: 'Polls',
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

      <Box
        sx={{
          display: isClickedQueList || openAddQestion ? 'none' : 'initial',
        }}
      >
        {isLoading && <Loader />}
        <Box>
          <Box>
            <CreateHeader
              previewButton={previewButton}
              handelPreview={handelPreview}
              createText={
                currentPollData.current ? t('edit_poll') : t('create_poll')
              }
              returnBack={returnBack}
              isQuiz
              publishButton={publishButton}
              saveButton={saveButton}
              saveorPublish={savePoll}
              publishText={t('publish')}
              saveText={t('save_as_draft')}
              previewText={t('preview')}
              toolTipText={t('preview_tooltip')}
              saveVariant='secondaryButton'
              publish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Poll}
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
              overflowY: 'scroll',
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
                <PollPageScroll
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
                  state={pollState}
                  setState={setPollState}
                  setSaveButton={setSaveButton}
                  unsavedChanges={unsavedChanges}
                  pollRef={pollRef}
                  isDraft={isDraft}
                  setFieldChanges={setFieldChanges}
                />
                <ImageVideo
                  state={pollState}
                  setState={setPollState}
                  showGallery={showGallery}
                  pollRef={pollRef}
                  selectedImage={selectedImage}
                />
                <AddQuestion
                  saveQuestionCallBack={saveQuestionCallBack}
                  qusUnsavedChanges={unsavedChanges}
                  showGallery={showGallery}
                  state={pollState}
                  setState={setPollState}
                  answers={answers}
                  setAnswers={setAnswers}
                  addImage={addImage}
                  setAddImage={setAddImage}
                  setFieldChanges={setFieldChanges}
                  selectedImage={selectedImage}
                />
                <Result
                  state={pollState}
                  setState={setPollState}
                  unsavedChanges={unsavedChanges}
                />
                {/* <SchedulePublish
              handleSchedulePublish={handleSchedulePublish}
              isEditMode={isEditMode}
              state={pollState}
              setState={setPollState}
            /> */}
                <ChooseTags
                  tagData={tagData}
                  selectedTag={tagArr}
                  handleTagOnChange={handleTagOnChange}
                  isEdit={currentPollData.current ? true : false}
                />
                <SocialShare
                  showGallery={showGallery}
                  state={pollState}
                  setState={setPollState}
                  pollRef={pollRef}
                  unsavedChanges={unsavedChanges}
                  selectedImage={selectedImage}
                />
                <Analytics
                  number='08'
                  state={pollState}
                  setState={setPollState}
                  unsavedChanges={unsavedChanges}
                />
                <Seo
                  state={pollState}
                  setState={setPollState}
                  setEditedSD={setEditedSD}
                  pollInstance={pollInstance}
                  unsavedChanges={unsavedChanges}
                  updateStructureData={updateStructureData}
                  answers={answers}
                />
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: '40px',
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
                      state={pollState}
                      setState={setPollState}
                      pollRef={pollRef}
                      unsavedChanges={unsavedChanges}
                      selectedImage={selectedImage}
                    />
                  </AccordionDetails>
                </Accordion> */}
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: '40px',
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
                    <Analytics
                      state={pollState}
                      setState={setPollState}
                      unsavedChanges={unsavedChanges}
                    />
                  </AccordionDetails>
                </Accordion> */}
                {/* <Accordion
                  sx={{
                    borderRadius: '0 !important',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    paddingLeft: '40px',
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
                    <Seo
                      state={pollState}
                      setState={setPollState}
                      setEditedSD={setEditedSD}
                      pollInstance={pollInstance}
                      unsavedChanges={unsavedChanges}
                      updateStructureData={updateStructureData}
                      answers={answers}
                    />
                  </AccordionDetails>
                </Accordion> */}
              </>
            )}
            {/* <SocialShare
              showGallery={showGallery}
              state={pollState}
              setState={setPollState}
              pollRef={pollRef}
              unsavedChanges={unsavedChanges}
            />
            <Analytics
              state={pollState}
              setState={setPollState}
              unsavedChanges={unsavedChanges}
            />
            <Seo
              state={pollState}
              setState={setPollState}
              setEditedSD={setEditedSD}
              pollInstance={pollInstance}
              unsavedChanges={unsavedChanges}
              updateStructureData={updateStructureData}
              answers={answers}
            /> */}
          </Box>
        </Box>
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={t('done')}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={savePoll}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
        <PlateformXDialog
          isDialogOpen={onSavedModal}
          title={t('save_as_draft')}
          subTitle={t('poll_draft_subtitle')}
          closeButtonText={t('edit')}
          confirmButtonText={t('go_to_listing')}
          closeButtonHandle={crossButtonHandle}
          confirmButtonHandle={() => navigate('/content/poll')}
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
                ? t('poll_publish_popoup')
                : t('requested_action')
            }
            closeButtonHandle={handleCloseDialog}
            confirmButtonText={t('go_to_listing')}
            confirmButtonHandle={() => navigate('/content/poll')}
            modalType='publish'
          />
        ) : null}
        {openPageExistModal ? (
          <PlateformXDialog
            isDialogOpen={openPageExistModal}
            title={`${t('poll')} ${t('already_exists')}`}
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
