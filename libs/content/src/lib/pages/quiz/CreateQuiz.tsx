/* eslint-disable require-atomic-updates */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLazyQuery, useMutation } from "@apollo/client";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Box, Divider } from "@mui/material";
import {
  FETCH_TAG_LIST,
  commentsApi,
  contentTypeAPIs,
  useComment,
  useWorkflow,
} from "@platformx/authoring-apis";
import { RootState } from "@platformx/authoring-state";
import { CommentListPanel } from "@platformx/comment-review";
import {
  CATEGORY_CONTENT,
  PlateformXDialog,
  ShowToastError,
  ShowToastSuccess,
  XLoader,
  capitalizeFirstLetter,
  getCurrentLang,
  useUserSession,
  workflowKeys
} from "@platformx/utilities";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateHeader } from "../../components/CreateHeader/CreateHeader";
import Analytics from "../../components/Analytics/Analytics";
import ContentPageScroll from "../../components/ContentPageScroll";
import icons from "../../components/ContentWrapper/Utils/Constants";
import { ContentType } from "../../enums/ContentType";
import useQuizAPI from "../../hooks/useQuizAPI/useQuizAPI";
import { DRAFT, PUBLISHED } from '../../utils/Constants';
import { getCurrentQuiz, onBackButtonEvent, quizResponseMapper, unloadCallback, updateStructureData } from "../../utils/Helper";
import { QuizType } from "./Quiz.types";
import { TitleDescription } from "./components/TitleDescription";
import ChooseTags from "./components/choosetags/ChooseTags";
import { Question } from "./components/question/Question";
import Result from "./components/result/Result";
import SocialShare from "./components/socialshare/SocialShare";
import { createInitialQuizState, createNewQuiz } from "./helper";
import AddQuestion from "./components/addquestion/AddQuestion";

export const CreateQuiz = () => {

  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { currentContent } = useSelector((state: RootState) => state.content);
  const { currentQuiz } = useSelector((state: RootState) => state.quiz);
  // const { quiz, content } = state;
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const quizPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>("");
  const currentQuizData = useRef(
    quizPageUrl.searchParams.get("path") ? (quizPageUrl.searchParams.get("path") as string) : "",
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
  const [isFeatured, setIsFeatured] = useState(false);
  const [isQuiz] = useState(true);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [isClickedQueList, setIsClickedQueList] = useState(false);
  const [, setPublishUrl] = useState("");
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: "",
    title: "",
    description: "",
  });
  const [enableWorkflowHistory, setEnableWorkflowHistory] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: "",
    title: "",
    description: "",
    Url: "",
  });
  const [workflow, setWorkflow] = useState({});
  const [tagData, setTagData] = useState<any>({});
  const [tagArr, setTagArr] = useState<any>([]);
  const [key, setKey] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [parentToolTip, setParentToolTip] = useState("");
  const [, setFieldChanges] = useState();
  const [runFetchTagList] = useLazyQuery(FETCH_TAG_LIST);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const scrollDebounceRef = useRef<any>(null);
  const [timerState, setTimerState] = useState(
    localStorage.getItem("contentTypeTimerState") === "true" ? true : false,
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(new Date().toISOString());
  const { comments } = useComment();
  const login_user_id = userInfo?.user_id;
  const [isReload, setIsReload] = useState(false);
  const { createQuiz, publishQuiz, updateQuizSettings } = useQuizAPI();
  useEffect(() => {
    setIsReload(!isReload);
  }, [comments]);
  const [quizState, setQuizState] = useState<QuizType>(createInitialQuizState);
  useEffect(() => {
    if (Object.keys(quizInstance).length === 0 && !params.id) {
      setQuizInstance(createNewQuiz(username));
    }
    if (currentQuizData.current === "") {
      getWorkflowDetails(role, login_user_id, setWorkflow, capitalizeFirstLetter(ContentType.Quiz));
    }
  }, []);
  const updateField = (updatedPartialObj) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(quizInstance));
    const quesArr = quizState.questions.map((value) => value.current_page_url);
    const tempObjField = {
      questions: [...quesArr],
      background_content: {
        objectType: "image",
        Url: quizState?.imagevideoURL,
        Title: "",
        Thumbnail: quizState?.imagevideoURL,
        Color: "",
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
    imagevideoURL: "",
    title: "",
    description: "",
    short_title: "",
    short_description: "",
    tags: [],
  };
  const quizRef = useRef<any>(currentQuiz ? currentQuiz : defQuiz);
  const tagRef = useRef<any>([]);

  const [, setPublishDisabled] = useState<boolean>(true);
  const handleSchedulePublish = (isPublish, publishTime, isUnpublish, unPublishTime) => {
    setQuizState({
      ...quizState,
      is_schedule_publish: isPublish,
      schedule_publish_datetime: publishTime,
      is_schedule_unpublish: isUnpublish,
      schedule_unpublish_datetime: unPublishTime,
    });
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
      settings: { ...updateQuizSettings(quizRef, quizState, pageURL) },
    };
    updateField(updatedObj);
  };

  const [createquizmutate] = useMutation(contentTypeAPIs.createContentType);
  const [updatequizmutate] = useMutation(contentTypeAPIs.updateContentType);
  const [publishquizmutate] = useMutation(contentTypeAPIs.publishContentType);
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
      title === "" ||
      shortTitle === "" ||
      shortDesc === "" ||
      description === "" ||
      imagevideoURL === "" ||
      scoreBy === "" ||
      questions?.length === 0 ||
      tagArr?.length === 0
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [quizState]);
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), "h:mm aa, dd LLLL");
  };
  const publishPopup = useRef({
    publishTitle: "Congratulations!",
    publishDescription:
      "Your Quiz has been sent for publishing & will be published in a few seconds.",
    publishCloseText: "Go to Listing",
    publishConfirmText: "View QUIZ",
  });

  const [pageStatus, setPageStatus] = useState(DRAFT);
  const [editedSD, setEditedSD] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState(true);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(workflowObj, status);
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() && status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const handleQuizCreation = async (resp, pageState, IsDuplicate, isWorkflow) => {
    try {
      unsavedChanges.current = false;
      setTimerState(true);
      setLastmodifiedDate(new Date().toISOString());

      if (pageState !== "PUBLISHED") {
        setIsLoading(false);
        if (resp?.data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
          setPageStatus(pageState);
          setWorkflowStatus(isWorkflow);
        } else {
          if (!isWorkflow) {
            ShowToastSuccess(`${t("quiz")} ${t("saved_toast")}`);
          }
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
            await workflowSubmitRequest(workflowObj, workflowKeys.approve);
          }
        }
      } else {
        if (resp?.data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
          setPageStatus(pageState);
        } else {
          await publishQuiz(quizRef.current.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase(), quizState, publishPopup);
        }
      }

      const pageUrl = resp?.data?.authoring_createContent?.path.substring(
        resp?.data?.authoring_createContent?.path.lastIndexOf("/") + 1
      );
      quizRef.current.page = pageUrl;
      setDraftPageURL(pageUrl);

      const tagArrTemp = { ...currentQuiz };
      delete tagArrTemp.Description;
      const res = Object.keys(tagArrTemp).every((keyName) => tagArrTemp[keyName]);
      if (res && Object.keys(tagArrTemp).length > 0 && tagArrTemp.tags.length > 0) {
        setPublishDisabled(false);
      } else {
        setPublishDisabled(true);
      }
    } catch (error: any) {
      setTimerState(false);
      setLastmodifiedDate("");

      if (error?.graphQLErrors[0]) {
        ShowToastError(error.graphQLErrors[0].message);
      } else {
        ShowToastError(t("api_error_toast"));
      }
    }
  };

  const pageExistYesButtonHandle = async () => {
    setOpenPageExistModal(false);

    let pageState, isWorkflowStatus;

    if (pageStatus.toLowerCase() === DRAFT.toLowerCase()) {
      pageState = DRAFT;
      isWorkflowStatus = workflowStatus;
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      pageState = PUBLISHED;
      isWorkflowStatus = false;
    }

    if (pageState) {
      const resp = await createQuiz(pageState, true, isWorkflowStatus, quizState, editedSD, quizInstance, updateTempObj, isFeatured);
      await handleQuizCreation(resp, pageState, true, isWorkflowStatus);
    }
  };

  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
  };

  const updateQUIZ = (status, isWorkflow = true, props = {}, event_step = "") => {
    setIsLoading(true);
    const structureData = editedSD ? editedSD : JSON.stringify(updateStructureData(quizState));
    const newTempData = JSON.parse(JSON.stringify(quizInstance));
    const quesArr = quizState.questions.map((value) => value.current_page_url);
    const tempObjField = {
      questions: [...quesArr],
      background_content: {
        objectType: "image",
        Url: quizState?.original_image.original_image_relative_path,
        Title: "",
        Thumbnail: quizState?.original_image.original_image_relative_path,
        Color: "",
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
        current_page_url: `/${currentQuizData.current !== "" ? currentQuizData.current : draftPageURL
          }`,
        page: draftPageURL ? draftPageURL : currentQuizData.current,
        page_state: status,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        createdBy: username,
        page_lastmodifiedby: username,
        parent_page_url: "/",
        seo_enable: quizState?.seo_enable,
        analytics_enable: quizState?.analytics_enable,
        title: quizState?.title,
        description: quizState?.description,
        is_featured: isFeatured,
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
      .then(async () => {
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());

        if (status && status.toLowerCase() === DRAFT.toLowerCase()) {
          setIsLoading(false);
          if (!isWorkflow) {
            ShowToastSuccess(`${t("quiz")} ${t("updated_toast")}`);
          } else {
            workflowSubmitRequest(props, event_step);
          }
          unsavedChanges.current = false;
          // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
          setShowExitWarning(false);
        } else {
          const { showPublishConfirm: hasConfirm, publishUrl } = await publishQuiz(draftPageURL ? draftPageURL : currentQuizData.current, quizState, publishPopup);
          setShowPublishConfirm(hasConfirm);
          setPublishUrl(publishUrl);
        }
      })
      .catch(() => {
        setTimerState(false);
        setLastmodifiedDate("");

        ShowToastError(t("api_error_toast"));
      });
  };

  const saveQuiz = async (status = true, props = {}, event_step = "") => {
    // dispatch(previewContent({}));
    setShowExitWarning(false);
    setQuizState({
      ...quizState,
      "tags": tagArr,
    });

    if (quizState?.title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (quizState?.description === "") {
      ShowToastError(t("des_error"));
    } else if (
      quizState?.is_schedule_publish &&
      (quizState?.schedule_publish_datetime === "" || quizState?.schedule_publish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_publish")} ${t("is_required")}`);
    } else if (
      quizState?.is_schedule_unpublish &&
      (quizState?.schedule_unpublish_datetime === "" ||
        quizState?.schedule_unpublish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_unpublish")} ${t("is_required")}`);
    } else {
      const pageURL = currentQuizData.current
        ? currentQuizData.current
        : quizRef?.current?.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      updateCurrentInstance(pageURL);
      if (showExitWarning) {
        setShowExitWarning(false);
      }
      if (!currentQuizData.current && isDraft) {
        // createQuiz(DRAFT, false, status, props, event_step);
        const resp = await createQuiz(DRAFT, false, status, props, event_step, quizInstance, updateTempObj, isFeatured);
        await handleQuizCreation(resp, DRAFT, false, status);

      } else {
        updateQUIZ(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = async () => {
    // dispatch(previewContent({}));
    setQuizState({
      ...quizState,
      "tags": tagArr,
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
    if (title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (shortTitle === "") {
      ShowToastError(`${t("short_title")} ${t("is_required")}`);
    } else if (shortDesc === "") {
      ShowToastError(`${t("short_description")} ${t("is_required")}`);
    } else if (description === "") {
      ShowToastError(`${t("description")} ${t("is_required")}`);
    } else if (imagevideoURL === "") {
      ShowToastError(`${t("banner_image")} ${t("is_required")}`);
    } else if (questions.length <= 0) {
      ShowToastError(`${t("question")} ${t("is_required")}`);
    } else if (scoreBy === "") {
      ShowToastError(`${t("banner_image")} ${t("is_required")}`);
    } else if (quizState.result_range_1 === "") {
      ShowToastError(`${t("range")} 0-24 ${t("is_required")}`);
    } else if (quizState.result_range_2 === "") {
      ShowToastError(`${t("range")} 24-49 ${t("is_required")}`);
    } else if (quizState.result_range_3 === "") {
      ShowToastError(`${t("range")} 50-74 ${t("is_required")}`);
    } else if (quizState.result_range_4 === "") {
      ShowToastError(`${t("range")} 75-100 ${t("is_required")}`);
    } else if (quizState?.is_schedule_publish && quizState?.schedule_publish_datetime === "") {
      ShowToastError(`${t("scheduled_publish")} ${t("is_required")}`);
    } else if (quizState?.is_schedule_unpublish && quizState?.schedule_unpublish_datetime === "") {
      ShowToastError(`${t("scheduled_unpublish")} ${t("is_required")}`);
    } else if (tagArr?.length === 0) {
      ShowToastError(t("tag_error"));
    } else {
      const pageURL = currentQuizData.current
        ? currentQuizData.current
        : quizRef?.current?.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
      }

      if (!currentQuizData.current && isDraft) {
        const resp = await createQuiz("PUBLISHED", false, false, quizState, editedSD, quizInstance, updateTempObj, isFeatured);
        await handleQuizCreation(resp, "PUBLISHED", false, false);

        // createQuiz("PUBLISHED", false, false);
      } else {
        updateQUIZ("PUBLISHED", false);
      }
    }
  };
  useEffect(() => {
    if (timerState) {
      localStorage.setItem("contentTypeTimerState", "true");
    }
  }, [timerState]);

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
      title: "",
      Thumbnail: "",
      description: "",
    });
    setSelectedVideo({
      title: "",
      Thumbnail: "",
      description: "",
      Url: "",
    });
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type === "cancel") {
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
      // dispatch(previewContent({}));
      // navigate(-1);
      navigate("/content/quiz");
    }
  };

  const onClickEditQuestion = (id) => {
    setCurrentQuestionId(id);
    setOpenAddQuestion(true);
  };

  const onClickAddQuestion = () => {
    setCurrentQuestionId("");
    setOpenAddQuestion(true);
  };

  const handleTagOnChange = (event) => {
    let tagsArray = [...tagArr];

    if (event.target.checked && tagsArray?.length > 14) {
      event.target.checked = false;
      ShowToastError(t("allowed_tags_toast"));
    } else {
      if (event.target.checked) {
        tagsArray = [...tagArr, event.target.value];
      } else {
        tagsArray.splice(tagArr.indexOf(event.target.value), 1);
      }
      setTagArr(tagsArray);
      setQuizState({
        ...quizState,
        "tagsSocialShare": tagsArray,
      });
      quizRef.current = {
        ...quizRef.current,
        "tags": tagsArray,
        "tagsSocialShare": isDraft ? tagsArray : tagsArray, //[...quizState.tagsSocialShare],
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
      if (currentQuestionId !== "") {
        temp = quizState.questions.map((x) =>
          x.current_page_url === questionInfo.current_page_url ? questionInfo : x,
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
      ShowToastError(t("allowed_tags_toast"));
    }
    setCurrentQuestionId("");
    setOpenAddQuestion(false);
  };
  const [contentType] = useState(
    capitalizeFirstLetter(quizPageUrl?.pathname?.split("/")?.[4]?.split("-")?.[1]),
  );
  const [runFetchContentByPath, { loading }] = useLazyQuery(contentTypeAPIs.fetchContentByPath);
  useEffect(() => {
    debugger;
    if (
      (currentQuiz&&Object.keys(currentQuiz).length > 0 && params.id) ||
      Object.keys(currentQuiz).length
    ) {
      setQuizInstance(currentQuiz);
      setTagArr(currentQuiz?.Tag);
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
          ShowToastError(t("api_error_toast"));
        });
    }
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsEditMode(true);

        if (Object.keys(currentContent).length > 0) {
          setQuizState(currentContent);
          setTagArr(currentContent?.tagsSocialShare);
          quizRef.current = currentContent;
        } else if (currentQuizData.current && !unsavedChanges.current) {
          setIsLoading(true);

          const res = await runFetchContentByPath({
            variables: { contentType, path: currentQuizData.current },
          });

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
              is_featured,
              questions,
            } = res.data.authoring_getCmsContentByPath;

            setIsFeatured(is_featured);
            setWorkflow({
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              role,
              title,
              enable: stages?.length > 0,
              login_user_id,
              task_status,
              task_user_id: user_id,
              task_user_name: user_name,
            });

            if (!questions || questions.length === 0) {
              setIsLoading(false);
              return;
            }

            const tempArray = await Promise.all(
              questions
                .filter((val) => !val.startsWith("/"))
                .map(async (questionPath) => {
                  const resp = await runFetchContentByPath({
                    variables: { contentType: "Question", path: questionPath },
                  });

                  if (resp?.data?.authoring_getCmsContentByPath) {
                    setIsLoading(false);

                    return {
                      question: resp.data.authoring_getCmsContentByPath.question,
                      current_page_url: resp.data.authoring_getCmsContentByPath.current_page_url,
                      question_type: resp.data.authoring_getCmsContentByPath.question_type,
                      options_compound_fields:
                        resp.data.authoring_getCmsContentByPath.options_compound_fields,
                      background_content: resp.data.authoring_getCmsContentByPath.background_content,
                    };
                  }
                }),
            );

            setQuizState(quizResponseMapper(res, quizState, tempArray));
            setQuizInstance(quizResponseMapper(res, quizState, tempArray));
            quizRef.current = getCurrentQuiz(res);

            setTagArr(res.data.authoring_getCmsContentByPath.tags);
          }
        }
      } catch (error) {
        setIsLoading(false);
        ShowToastError(t("api_error_toast"));
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (Object.keys(tagData).length === 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
            setsrollToView(
              quizPageUrl.searchParams.get("open")
                ? (quizPageUrl.searchParams.get("open") as string)
                : "",
            );
          }
        })
        .catch(() => {
          ShowToastError(t("api_error_toast"));
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
      const container = document.getElementById("scrollableDiv");
      const active = icons.find((i) => isInViewport(i.id));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
      if (
        container &&
        Math.abs(container?.scrollHeight - container?.clientHeight - container?.scrollTop) < 1
      ) {
        setParentToolTip("seo");
      }
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };

  useEffect(() => {
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
    setShowWorkflowSubmit(false);
  };
  const closeButtonHandle = () => {
    if (qusUnsavedChanges.current === true) {
      setCurrentQuestionId("");
      setOpenAddQuestion(false);
      setShowExitWarning(false);
      qusUnsavedChanges.current = false;
    } else {
      unsavedChanges.current = false;
      // dispatch(previewContent({}));
      navigate("/content/quiz");
    }
  };
  const handleQuesReturn = () => {
    if (qusUnsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      setCurrentQuestionId("");
      setOpenAddQuestion(false);
    }
  };
  const navigateTo = () => {
    unsavedChanges.current = false;
    navigate("/content/quiz");
    // dispatch(previewContent({}));
  };
  const handelPreview = () => {
    const backgroundContent = {
      objectType: "image",
      Url: quizState?.imagevideoURL,
      Title: "",
      Thumbnail: quizState?.imagevideoURL,
      Color: "",
    };
    const tempObj = {
      ...quizState,
      background_content: backgroundContent,
      contentType: "Quiz",
    };
    // dispatch(previewContent(tempObj));
    navigate("/content-preview");
  };
  const [changes, setChanges] = useState(unsavedChanges.current);

  useEffect(() => {
    if (unsavedChanges.current === true) {
      window.history.pushState(null, "", window.location.pathname + window.location?.search);
      window.addEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.addEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning, navigateTo),
      );
    }
    return () => {
      window.removeEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.removeEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning, navigateTo),
      );
    };
  }, [unsavedChanges.current, changes]);
  useEffect(() => {
    // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  }, [quizState]);

  const [isOpenedOther, setIsOpenedOther] = useState(false);
  // flat = true: open add new question or choose from list and not scroll to question container.
  useEffect(() => {
    if (openAddQuestion || isClickedQueList) {
      setIsOpenedOther(true);
    } else if (isOpenedOther) {
      const container = document.getElementById("scrollableDiv");
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
      document_type: "Quiz",
      created_by: username,
      last_modified_by: username,
      reviewer_comments: [comments],
    };
    const result = await commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
     return result;
  };

  useEffect(() => {
    if (!currentQuizData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: "Quiz",
        },
      });
    }
  }, [tagData?.length > 0]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFF",
        }}>
        {/* {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={galleryType.current === "Images" ? "Image" : "Video"}
            keyName={key}
            id={answerId}
          />
        )} */}
      </Box>
      {/* {isClickedQueList && (
        <QuestionListing
          setIsClickedQueList={setIsClickedQueList}
          quizState={quizState}
          setQuizState={setQuizState}
          setOpenAddQuestion={setOpenAddQuestion}
          qusUnsavedChanges={qusUnsavedChanges}
          handleQuesReturn={handleQuesReturn}
          unsavedChanges={unsavedChanges}
        />
      )} */}
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
          display: isClickedQueList || openAddQuestion ? "none" : "initial",
        }}>
        {isLoading && <XLoader type="linear" />}

        <Box>
          <Box>
            <CreateHeader
              hasPreviewButton={previewButton}
              handelPreview={handelPreview}
              createText={currentQuizData.current ? `${t("edit")} ${t("quiz")}` : t("create_quiz")}
              handleReturn ={returnBack}
              isQuiz={isQuiz}
              hasPublishButton={publishButton}
              hasSaveButton={saveButton}
              handleSaveOrPublish={saveQuiz}
              publishText={t("publish")}
              saveText={t("save_as_draft")}
              previewText={t("preview")}
              toolTipText={t("preview_tooltip")}
              saveVariant='secondaryButton'
              handlePublish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Quiz}
              workflow={workflow}
              hasTimerState={timerState}
              lastModifiedDate={lastmodifiedDate}
              setEnableWorkflowHistory={setEnableWorkflowHistory}
              createComment={createComment}
              setIsFeatured={setIsFeatured}
              isFeatured={isFeatured}
            />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: {
                sm: "calc(100vh - 125px)",
                xs: "calc(100vh - 45px)",
              },
              overflowY: loading ? "hidden" : "scroll",
              overflowX: "hidden",
            }}
            id='scrollableDiv'>
            {!isClickedQueList && !galleryState && !enableWorkflowHistory && (
              <Box
                sx={{
                  position: "fixed",
                  top: "25%",
                  right: { sm: "5px", xs: 0 },
                  zIndex: 1000,
                }}>
                <ContentPageScroll
                  icons={icons}
                  parentToolTip={parentToolTip}
                  srollToView={srollToView}
                />
              </Box>
            )}
            {enableWorkflowHistory ? (
              <>WorkflowHistory</>
              // <WorkflowHistory
              //   workflow={workflow}
              //   setEnableWorkflowHistory={setEnableWorkflowHistory}
              // />
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
                {/* <ImageVideo
                  state={quizState}
                  setState={setQuizState}
                  showGallery={showGallery}
                  selectedImage={selectedImage}
                /> */}
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
                {/* <Seo
                  state={quizState}
                  setState={setQuizState}
                  setEditedSD={setEditedSD}
                  quizInstance={quizInstance}
                  unsavedChanges={unsavedChanges}
                /> */}
              </>
            )}
          </Box>
        </Box>
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("take_me_out")}
          confirmButtonText={t("done")}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={saveQuiz}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
        <PlateformXDialog
          isDialogOpen={onSavedModal}
          title={t("save_as_draft")}
          subTitle={t("quiz_save_popup")}
          closeButtonText={t("edit")}
          confirmButtonText={t("go_to_listing")}
          closeButtonHandle={crossButtonHandle}
          confirmButtonHandle={() => navigate("/content/quiz")}
          crossButtonHandle={crossButtonHandle}
          modalType='draft'
          closeIcon={<CreateRoundedIcon />}
        />
        {showPublishConfirm || showWorkflowSubmit ? (
          <PlateformXDialog
            isDialogOpen={showPublishConfirm || showWorkflowSubmit}
            title={t("congratulations")}
            subTitle={showPublishConfirm ? t("quiz_publish_popoup") : t("requested_action")}
            closeButtonHandle={handleCloseDialog}
            confirmButtonText={t("go_to_listing")}
            confirmButtonHandle={() => navigate("/content/quiz")}
            modalType='publish'
          />
        ) : null}
        {openPageExistModal ? (
          <PlateformXDialog
            isDialogOpen={openPageExistModal}
            title={`${t("quiz")} ${t("already_exists")}`}
            subTitle={t("conformation")}
            closeButtonText={t("no")}
            confirmButtonText={t("yes")}
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
