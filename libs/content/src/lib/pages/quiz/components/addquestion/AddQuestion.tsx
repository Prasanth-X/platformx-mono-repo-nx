import CachedIcon from "@mui/icons-material/Cached";
import { Box, Divider, Grid, RadioGroup, Typography } from "@mui/material";
import { ArrowUpwardIcon, AutoTextArea, CATEGORY_CONTENT, CommonBoxWithNumber, DuplicateContentPopup, Icon, PlateformXDialog, RadioControlLabel, Refresh, TextBox, ThemeConstants, TitleSubTitle, XLoader } from "@platformx/utilities";
import { onBackButtonEvent, unloadCallback } from "libs/content/src/lib/utils/Helper";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateHeader } from "../../../../components/CreateHeader/CreateHeader";
import { ContentType } from "../../../../enums/ContentType";
import useQuestion from "../../../../hooks/useQuestion/useQuestion";
import { useCustomStyle } from "../../quiz.style";
import AnswerContent from "./AnswerContent";

const AddQuestion = ({ setAddQuestion, saveQuestionCallBack, qusUnsavedChanges, questionId }) => {
  const { t } = useTranslation();
  // const [isLoading, setIsLoading] = useState(false);
  const [addImage, setAddImage] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([
    { id: "1", option: "", image: "", status: true },
    { id: "2", option: "", image: "", status: false },
  ]);

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
  const [, setOperationType] = useState("");
  const [, setGalleryState] = useState<boolean>(false);
  const [, setKey] = useState("");
  const [, setAnswerId] = useState("");
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
  const { isLoading, onSaveQuestion } = useQuestion(
    setAnswers,
    setAddImage,
    setAddQuestionInfo,
    saveQuestionCallBack,
    setOpenPageExistModal,
    addQuestionInfo,
    answers,
    addImage,
    setExitPopUp,
    questionId
  );

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

  const onUploadClick = (type) => {
    setOperationType(type);
    showGallery("Images", "queBackgroundImg");
    setAddQuestionInfo({
      ...addQuestionInfo,
      isImg: true,
    });
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
        {isLoading && <XLoader type="linear" />}

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
          doneButtonHandle={() => {
            onSaveQuestion(true);
          }}
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
