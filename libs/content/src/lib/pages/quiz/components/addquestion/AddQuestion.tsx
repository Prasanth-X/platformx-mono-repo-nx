import { useLazyQuery, useMutation } from "@apollo/client";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Divider, Grid, RadioGroup, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
// import CommonBoxWithNumber from "../../../Common/CommonBoxWithNumber/CommonBoxWithNumber";
// import Loader from "../../../Common/Loader";
// import { ReactComponent as Icon } from "../../../assets/Icon.svg";
// import { ReactComponent as Refresh } from "../../../assets/Refresh.svg";
// import ArrowUpwardIcon from "../../../assets/svg/UploadThumbnail.svg";
// import useUserSession from "../../../hooks/useUserSession/useUserSession";
// import CommonImageRender from "../../../pages/Gallery/CommonImageRender";
// import DuplicateContentPopup from "../../../pages/articles/DuplicateContentPopup";
// import {
//   createContentType,
//   fetchContentByPath,
//   publishContentType,
//   updateContentType,
// } from "../../../services/contentTypes/contentTypes.api";
// import ThemeConstants from "../../../theme/variable";
// import { ContentType } from "../../../utils/Enums/ContentType";
// import { CATEGORY_CONTENT } from "../../../utils/constants";
// import { onBackButtonEvent, unloadCallback } from "../../../utils/helperFunctions";
// import AutoTextArea from "../../Common/AutoTextArea";
// import DamContentGallery from "../../Common/DamContentGallery/DamContentGallery";
// import RadioControlLabel from "../../Common/RadioControlLabel";
// import TextBox from "../../Common/TextBox";
// import TitleSubTitle from "../../Common/TitleSubTitle";
// import PlateformXDialog from "../../Modal";
// import {
//   ShowToastError,
//   ShowToastSuccess,
// } from "../../toastNotification/toastNotificationReactTostify";
import { useCustomStyle } from "../../quiz.style";
import AnswerContent from "./AnswerContent";
import { contentTypeAPIs } from "@platformx/authoring-apis";
import { DuplicateContentPopup, AutoTextArea, Refresh, Icon, ArrowUpwardIcon, CATEGORY_CONTENT, CommonBoxWithNumber, PlateformXDialog, RadioControlLabel, ShowToastError, TextBox, ThemeConstants, TitleSubTitle, XLoader, useUserSession, ShowToastSuccess } from "@platformx/utilities";
import { onBackButtonEvent, unloadCallback } from "libs/content/src/lib/utils/Helper";
// import DuplicateContentPopup from "libs/content/src/lib/components/DuplicateContentPopup/DuplicateContentPopup";
import { CreateHeader } from "../../../../components/CreateHeader/CreateHeader";
import { ContentType } from "libs/content/src/lib/enums/ContentType";

const AddQuestion = ({ setAddQuestion, saveQuestionCallBack, qusUnsavedChanges, questionId }) => {
  const { t } = useTranslation();
  const pageExistPopup = {
    saveAsDraftTitle: "Question already exists!",
    saveAsDraftDescription: "Are you sure you want to continue?",
    saveAsDraftCloseText: "No",
    saveAsDraftConfirmText: "Yes",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [addImage, setAddImage] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([
    { id: "1", option: "", image: "", status: true },
    { id: "2", option: "", image: "", status: false },
  ]);
  const [questionData, setQuestionData] = useState({
    createdBy: "",
    creationDate: "",
  });
  const [addQuestionInfo, setAddQuestionInfo] = useState<any>({
    questionId: "",
    questionType: "Single",
    queBackgroundImg: "",
    question: "",
    shortDesc: "",
    isImg: true,
    backgroundColor: "",
  });
  const galleryType = useRef<string>("Images");
  const [operationType, setOperationType] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [originalImage, setOriginalImage] = useState({});
  const [publishedImages, setPublishedImages] = useState([]);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [exitPopUp, setExitPopUp] = useState(false);
  const colorCode = [
    "#b29a53",
    "#ba8b78",
    "#ae6958",
    "#d86057",
    "#b75c8d",
    "#68669a",
    "#5c98ba",
    "#334075",
    "#246d73",
    "#806a71",
    "#514146",
  ];
  const [createmutate] = useMutation(contentTypeAPIs.createContentType);
  const [updatemutate] = useMutation(contentTypeAPIs.updateContentType);
  const [publishmutate] = useMutation(contentTypeAPIs.publishContentType);
  const [runFetchContentByPath] = useLazyQuery(contentTypeAPIs.fetchContentByPath);

  const getDuplicateTitle = () => {
    const newVal = `${t("copy_of")} ${addQuestionInfo.Title}`.trim();
    const duplicateQuestionTitle = newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateQuestionTitle.trim();
  };

  const handleRefresh = () => {
    setAddQuestionInfo({
      ...addQuestionInfo,
      queBackgroundImg: "",
      isImg: true,
      backgroundColor: "",
    });
  };
  const handleColorPallete = (color) => {
    qusUnsavedChanges.current = true;
    setAddQuestionInfo({
      ...addQuestionInfo,
      queBackgroundImg: "",
      isImg: false,
      backgroundColor: color,
    });
  };
  const handleChange = (event) => {
    qusUnsavedChanges.current = true;
    setAddQuestionInfo({
      ...addQuestionInfo,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "questionType" && event.target.value === "Multiple") {
      let lastAnswerID = 0;
      if (answers.length > 0) {
        lastAnswerID = parseInt(answers[answers.length - 1].id);
      }
      if (answers.length < 3) {
        const temp = Array.from(Array(3 - (answers.length + 1) + 1).keys())
          .map((x) => x + (lastAnswerID + 1))
          .map((val) => {
            return { id: `${val}`, option: "", image: "", status: false };
          });
        setAnswers([...answers, ...temp]);
      }
      if (addImage) {
        setAddImage(false);
      }
    }
    if (event.target.name === "questionType" && event.target.value === "Single") {
      if (answers.length > 2) {
        const temp = answers.filter((x, k) => x.option === "" && parseInt(k) > 1).map((y) => y.id);
        setAnswers([...answers.filter((val) => !temp.includes(val.id))]);
      }
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

  const updateField = (updatedPartialObj) => {
    const { original_image = {}, published_images = [] } = updatedPartialObj || {};
    setOriginalImage(original_image);
    setPublishedImages(published_images);
  };

  const handleSelectedImage = (image, keyName, id?: any) => {
    setSelectedImage(image);
    qusUnsavedChanges.current = true;
    if (keyName === "queBackgroundImg") {
      setAddQuestionInfo({ ...addQuestionInfo, [keyName]: image?.Thumbnail });
    }
    if (keyName === "answers") {
      setAnswers(
        answers.map((answer) =>
          answer.id === id ? { ...answer, image: image?.Thumbnail } : answer,
        ) as [],
      );
    }
    ShowToastSuccess(`${t("image")} ${t("added_toast")}`);
  };

  const handleSelectedVideo = (video, id) => {
    qusUnsavedChanges.current = true;
    setAddQuestionInfo({ ...addQuestionInfo, image: video?.thumbnailURL });
  };

  const onUploadClick = (type) => {
    setOperationType(type);
    showGallery("Images", "queBackgroundImg");
    setAddQuestionInfo({
      ...addQuestionInfo,
      isImg: true,
    });
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    // if (type == "cancel") {
    // }
  };

  const OnBackClick = () => {
    if (qusUnsavedChanges.current === true) {
      setExitPopUp(true);
    } else {
      setAddQuestion(false);
    }
  };
  const onHandleCloseButton = () => {
    setExitPopUp(false);
    setAddQuestion(false);
    qusUnsavedChanges.current = false;
  };
  const onHandleCrossButton = () => {
    setExitPopUp(false);
  };

  const PublishQuestion = (IsDuplicate = false, path = "", IsUpdate = false, qusObj = {}) => {
    const questionToSend = {
      page: path,
    };
    publishmutate({
      variables: {
        contentType: "Question",
        input: questionToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (IsDuplicate) {
          ShowToastSuccess(`${t("question")} ${t("duplicated_toast")}`);
        } else if (IsUpdate) {
          ShowToastSuccess(`${t("question")} ${t("updated_toast")}`);
        } else {
          ShowToastSuccess(`${t("question")} ${t("created_and_added_toast")}`);
        }
        saveQuestionCallBack({ ...qusObj, current_page_url: path });
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };

  const createQuestion = (IsDuplicate) => {
    const { question, questionType, queBackgroundImg, shortDesc, isImg, backgroundColor } =
      addQuestionInfo;
    const questionToSend = {
      CommonFields: {
        page: question,
        short_description: shortDesc,
        category: "Question",
        createdBy: username,
        page_lastmodifiedby: username,
        IsConfirm: IsDuplicate,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
      },
      ObjectFields: {
        is_image_option: addImage,
        options_compound_fields: answers.map((ans) => {
          return {
            option_image: {
              url: ans.image,
              title: "Option Image",
            },
            is_correct: ans.status,
            option_text: ans.option,
            option_id: ans.id,
          };
        }),
        background_content: {
          Url: isImg ? queBackgroundImg : "",
          IsImage: isImg,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: !isImg ? backgroundColor : "",
        },
        question: question,
        question_type: questionType,
        original_image: originalImage,
        published_images: publishedImages,
      },
    };
    createmutate({
      variables: {
        contenttype: "Question",
        input: questionToSend,
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
        } else {
          if (resp?.data?.authoring_createContent?.path) {
            const pathArr = resp?.data?.authoring_createContent?.path.split("/");
            const quesId = pathArr[pathArr.length - 1];
            if (resp?.data?.authoring_createContent?.isExist === null) {
              PublishQuestion(false, quesId, false, questionToSend.ObjectFields);
            } else {
              setOpenPageExistModal(false);
              PublishQuestion(true, quesId, false, questionToSend.ObjectFields);
            }
          } else {
            ShowToastError(t("qus_path_empty"));
          }
        }
      })
      .catch((error) => {
        if (error && error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };

  const updateQuestion = () => {
    const { question, questionType, queBackgroundImg, shortDesc, isImg, backgroundColor } =
      addQuestionInfo;
    const { createdBy, creationDate } = questionData;
    const questionToSend = {
      CommonFields: {
        page: questionId,
        current_page_url: questionId,
        short_description: shortDesc,
        category: "Question",
        page_lastmodifiedby: username,
        modificationDate: new Date().toISOString(),
        createdBy,
        creationDate,
      },
      ObjectFields: {
        is_image_option: addImage,
        options_compound_fields: answers.map((ans) => {
          return {
            option_image: {
              url: ans.image,
              title: "Option Image",
            },
            is_correct: ans.status,
            option_text: ans.option,
            option_id: ans.id,
          };
        }),
        background_content: {
          Url: isImg ? queBackgroundImg : "",
          IsImage: isImg,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: !isImg ? backgroundColor : "",
        },
        question: question,
        question_type: questionType,
        original_image: originalImage,
        published_images: publishedImages,
      },
    };
    updatemutate({
      variables: {
        contenttype: "Question",
        input: questionToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        PublishQuestion(false, questionId, true, questionToSend.ObjectFields);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error && error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };

  const onSaveQuestion = (IsDuplicate = false) => {
    setExitPopUp(false);
    const { question, questionType, queBackgroundImg, backgroundColor } = addQuestionInfo;
    if (question === "") {
      ShowToastError(`${t("question")} ${t("is_required")}`);
    } else if (backgroundColor === "" && queBackgroundImg === "") {
      ShowToastError(`${t("question")} ${t("banner_image")} ${t("is_required")}`);
    } else if (answers.length === 0) {
      ShowToastError(`${t("answers")} ${t("is_required")}`);
    } else if (questionType === "Single" && answers.length < 2) {
      ShowToastError(`${t("one_option")} ${t("is_required")}`);
    } else if (questionType === "Multiple" && answers.length < 3) {
      ShowToastError(`${t("two_option")} ${t("is_required")}`);
    } else if (addImage && answers.length > 10) {
      ShowToastError(`${t("max_option")} 10!`);
    } else if (!addImage && answers.length > 15) {
      ShowToastError(`${t("max_option")} 15!`);
    } else {
      const emptyAnswers = answers.filter((ans) => ans.option === "");
      const rightAnswers = answers.filter((ans) => ans.status === true);
      const emptyImageOptions = answers.filter((ans) => ans.image === "");
      const checkOptionsChars = answers.filter((ans) => ans.option.length > 100);
      if (emptyAnswers.length > 0) {
        ShowToastError(t("answers_empty"));
      } else if (questionType === "Single" && rightAnswers.length === 0) {
        ShowToastError(t("sigle_choice_validation"));
      } else if (questionType === "Single" && rightAnswers.length > 1) {
        ShowToastError(t("one_correct_answer_toast"));
      } else if (questionType === "Multiple" && rightAnswers.length < 2) {
        ShowToastError(t("multi_choice_validation"));
      } else if (addImage && emptyImageOptions.length > 0) {
        ShowToastError(t("empty_images"));
      } else if (checkOptionsChars.length > 0) {
        ShowToastError(`${t("max_char")} 100!`);
      } else {
        setIsLoading(true);
        if (questionId !== "") {
          updateQuestion();
        } else {
          createQuestion(IsDuplicate);
        }
      }
    }
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    onSaveQuestion(true);
  };

  const pageExistCloseHandle = () => {
    setOpenPageExistModal(false);
  };

  const onClickClose = () => {
    setShowDuplicateModal(false);
  };

  const navigateTo = () => {
    setAddQuestion(false);
    qusUnsavedChanges.current = false;
  };

  useEffect(() => {
    if (qusUnsavedChanges.current === true) {
      window.history.pushState(null, "", window.location.pathname + window.location?.search);
      window.addEventListener("beforeunload", (e) => unloadCallback(e, qusUnsavedChanges.current));
      window.addEventListener("popstate", (e) =>
        onBackButtonEvent(e, qusUnsavedChanges.current, setExitPopUp, navigateTo),
      );
    }
    return () => {
      window.removeEventListener("beforeunload", (e) =>
        unloadCallback(e, qusUnsavedChanges.current),
      );
      window.removeEventListener("popstate", (e) =>
        onBackButtonEvent(e, qusUnsavedChanges.current, setExitPopUp, navigateTo),
      );
    };
  }, [qusUnsavedChanges.current]);

  useEffect(() => {
    if (questionId !== "") {
      setIsLoading(true);
      runFetchContentByPath({
        variables: { contentType: "Question", path: questionId },
      })
        .then((res) => {
          setIsLoading(false);
          if (res?.data?.authoring_getCmsContentByPath) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            const {
              page,
              question,
              question_type: questionType,
              is_image_option: isImgOpt,
              background_content: backgroundContent,
              short_description: shortDescription,
              options_compound_fields: options,
              createdBy,
              creationDate,
              original_image,
              published_images,
            } = contentObj;
            const { Url, IsImage, ColorCode } = backgroundContent;
            setOriginalImage(original_image);
            setPublishedImages(published_images);
            setAddQuestionInfo({
              questionId: page,
              questionType: questionType,
              queBackgroundImg: IsImage ? Url : "",
              question: question,
              shortDesc: shortDescription,
              isImg: IsImage,
              backgroundColor: IsImage ? "" : ColorCode,
            });
            setAddImage(isImgOpt === "true");
            const temp = options.map((x) => {
              return {
                id: x.option_id,
                option: x.option_text,
                image: x.option_image.url,
                status: x.is_correct,
              };
            });
            setAnswers([...temp]);
            setQuestionData({ createdBy, creationDate });
          } else {
            ShowToastError(t("api_error_toast"));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.graphQLErrors[0]) {
            ShowToastError(error.graphQLErrors[0].message);
          } else {
            ShowToastError(t("api_error_toast"));
          }
        });
    }
  }, [questionId]);
  const classes = useCustomStyle();
  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: "#FFF",
        }}>
        {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={galleryType.current === "Images" ? "Image" : "Video"}
            handleSelectedVideo={handleSelectedVideo}
            keyName={key}
            id={answerId}
          />
          // <Gallery
          //   handleImageSelected={handleSelectedImage}
          //   toggleGallery={toggleGallery}
          //   galleryMode={galleryType.current}
          //   handleVideoSelected={handleSelectedVideo}
          //   keyName={key}
          //   id={answerId}
          // />
        )}
      </Box> */}
      <Box>
        {isLoading && <XLoader type ="linear"/>}

        <Box
        // sx={{
        //   width: { xs: 'calc(100% - 0px)', lg: 'calc(100% - 250px)' },
        // }}
        >
          <Box>
            <CreateHeader
              hasPreviewButton
              createText={questionId !== "" ? `${t("add")} ${t("quiz_question_head")}` : t("add_questions")}
              handleReturn={OnBackClick}
              isQuiz
              hasPublishButton={false}
              hasSaveButton={false}
              handleSaveOrPublish={onSaveQuestion}
              saveText={questionId !== "" ? t("update") : t("done")}
              previewText='Preview'
              showPreview={false}
              toolTipText='Unable to preview please add required details'
              saveVariant='contained'
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Quiz}
              isFeatured={false} />
            <Divider></Divider>
          </Box>
          <Box
            sx={{
              position: "relative",
              height: { sm: "calc(100vh - 125px)", xs: "calc(100vh - 42px)" },
              maxWidth: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            id='scrollableDiv'
            className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='01'
              title={t("quiz_question_content")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t("quiz_question_type")}
                    subTitle={t("quiz_question_type_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiled'>
                  <Box>
                    <RadioGroup
                      name='questionType'
                      value={addQuestionInfo.questionType}
                      onChange={handleChange}
                      row>
                      <RadioControlLabel value='Single' label={t("quiz_sigle_choise")} />
                      <RadioControlLabel value='Multiple' label={t("quiz_multi_choise")} />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={`${t("quiz_question_head")}*`}
                    subTitle={t("quiz_addqus_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <TextBox
                    name='question'
                    placeHolder={t("qus_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={120}
                    state={addQuestionInfo.question}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t("quiz_addqus_description")}
                    subTitle={t("quiz_addqus_subdes")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiled'>
                  <AutoTextArea
                    name='shortDesc'
                    placeHolder={t("quiz_description_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={400}
                    state={addQuestionInfo.shortDesc}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("quiz_addqus_image_title")}
                    subTitle={t("quiz_addqus_image_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                  {addQuestionInfo.queBackgroundImg && addQuestionInfo.isImg ? (
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "15px",
                        minHeight: "206px",
                        "& picture": {
                          height: "206px",
                        },
                      }}
                      mb={1}>
                      {/* <CommonImageRender
                        content={selectedImage}
                        imgOrder={{
                          1440: "hero",
                          1280: "landscape",
                          1024: "card2",
                          768: "square",
                          600: "card2",
                          320: "card2",
                        }}
                        updateField={updateField}
                        originalImage={originalImage}
                        publishedImages={publishedImages}
                        operationType={operationType}
                      /> */}
                      {/* <img
                        style={{
                          width: '100%',
                          height: '206px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                        src={addQuestionInfo.queBackgroundImg}
                        //   controls
                      /> */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0",
                          width: "100%",
                          height: { xs: "100%", lg: "206px" },
                          aspectRatio: {
                            xs: "4 / 3",
                            sm: "4 / 3",
                            md: "1 / 1",
                            em: "4 / 3",
                            lg: "16 / 9",
                            xl: "3 / 1",
                          },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#7470708a",
                          borderRadius: "15px",
                        }}>
                        <Box sx={{ display: "flex" }}>
                          <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick("replace")}>
                            <Box
                              sx={{
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                width: "25px",
                                height: "25px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "auto",
                              }}>
                              <CachedIcon sx={{ color: "#626060" }} />
                            </Box>
                            <Typography
                              mt={1}
                              sx={{
                                fontSize: ThemeConstants.FONTSIZE_XS,
                                color: ThemeConstants.WHITE_COLOR,
                              }}>
                              {t("replace")}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : addQuestionInfo.backgroundColor && !addQuestionInfo.isImg ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "206px",
                        aspectRatio: {
                          xs: "4 / 3",
                          sm: "4 / 3",
                          md: "1 / 1",
                          em: "4 / 3",
                          lg: "16 / 9",
                          xl: "3 / 1",
                        },
                        backgroundColor: addQuestionInfo.backgroundColor,
                        borderRadius: "15px",
                      }}></Box>
                  ) : (
                    <>
                      <Box></Box>
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: "15px",
                          // border: 'dashed 2px #707070',
                          // paddingLeft: {
                          //   xs: "30px",
                          //   sm: "30px",
                          //   md: "100px",
                          // },
                          cursor: "pointer",
                          height: "206px",
                          aspectRatio: {
                            xs: "4 / 3",
                            sm: "4 / 3",
                            md: "1 / 1",
                            em: "4 / 3",
                            lg: "16 / 9",
                            xl: "3 / 1",
                          },
                          backgroundColor: "#EFF0F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        onClick={() => onUploadClick("upload")}>
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          m={1}>
                          <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            color: ThemeConstants.PRIMARY_MAIN_COLOR,
                          }}>
                          <Typography variant='h5medium' component='h5' sx={{ color: "#000000" }}>
                            {t("page_choose_image")}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}

                  <Box
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                      flexFlow: { xs: "wrap", lg: "nowrap" },
                    }}>
                    <Box
                      onClick={() => onUploadClick("upload")}
                      sx={{
                        width: "27px",
                        height: "27px",
                        flexGrow: "0",
                        borderRadius: "20px",
                        backgroundColor: "#fff",
                        margin: {
                          xs: "0px 8px 8px 0px",
                          lg: "0px 8px 8px 0px",
                        },
                        border: "solid 1px #2d2d39",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}>
                      <img src={Icon} alt="Icon" />
                    </Box>

                    {colorCode.map((val, index) => {
                      return (
                        <Box
                          key={index}
                          onClick={() => handleColorPallete(val)}
                          sx={{
                            width: "27px",
                            height: "27px",
                            flexGrow: "0",
                            borderRadius: "20px",
                            backgroundColor: val,
                            margin: {
                              xs: "0px 8px 8px 0px",
                              lg: "0px 8px 8px 0px",
                            },
                            border: val === "#fff" ? "solid 1px #e6eaed" : null,
                            cursor: "pointer",
                          }}></Box>
                      );
                    })}
                    <Box
                      onClick={handleRefresh}
                      sx={{
                        width: "27px",
                        height: "27px",
                        flexGrow: "0",
                        borderRadius: "20px",
                        backgroundColor: "#fff",
                        border: "solid 1px #ced3d9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        margin: {
                          xs: "0px 8px 8px 0px",
                          lg: "0px 0px 8px 0px",
                        },
                      }}>
                      <img src={Refresh} alt="Refresh" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
            <AnswerContent
              showGallery={showGallery}
              answers={answers}
              setAnswers={setAnswers}
              addImage={addImage}
              setAddImage={setAddImage}
              questionType={addQuestionInfo.questionType}
              qusUnsavedChanges={qusUnsavedChanges}
            />
          </Box>
        </Box>
      </Box>
      {showDuplicateModal ? (
        <DuplicateContentPopup
          titledata={`${getDuplicateTitle()}`}
          isDialogOpen={showDuplicateModal}
          closeButtonHandle={onClickClose}
          doneButtonHandle={onSaveQuestion}
          contentType='Question'
        />
      ) : null}
      {openPageExistModal ? (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={`${t("quiz")} ${t("duplicate_exists")}`}
          subTitle={t("conformation")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={pageExistCloseHandle}
          confirmButtonHandle={pageExistYesButtonHandle}
          crossButtonHandle={pageExistCloseHandle}
          modalType=''
        />
      ) : null}
      {exitPopUp ? (
        <PlateformXDialog
          isDialogOpen={exitPopUp}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("take_me_out")}
          confirmButtonText={t("done")}
          closeButtonHandle={onHandleCloseButton}
          confirmButtonHandle={onSaveQuestion}
          crossButtonHandle={onHandleCrossButton}
          modalType='unsavedChanges'
        />
      ) : null}
    </>
  );
};
export default AddQuestion;
