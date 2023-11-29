import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Typography } from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ExitModal from "../../Common/ExitModal";
import CloseIcon from "../../assets/svgIcon/Cross.svg";
import { triggerAnalytics } from "../../utils/helperFns";
import ImageQuestion from "./ImageQuestion";
import ManyOptionQuestion from "./ManyOptionQuestion";
import MultiQuestion from "./MultiQuestion";
import ProgressBar from "./ProgressBar";
import QuizContext from "./QuizContext";
import SingleQuestion from "./SingleQuestion";

const QuestionIndex = ({
  data,
  callBack,
  setQuizData,
  analytics,
  defaultObj,
  enablePreview,
  fetchCroppedUrl,
}: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isActiveContent, setActiveContent] = useState(false);
  const [open, setOpen] = React.useState(false);
  const quizData = useContext<any>(QuizContext);
  const [handleTrack] = usePlatformAnalytics();
  const { t } = useTranslation();

  const handleClickOpen = () => {
    if (!enablePreview) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    setOpen(false);
    callBack(true);
  };

  const HandlerShowHide = (e: any) => {
    if (!isActiveContent) {
      triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    }
    setActiveContent(!isActiveContent);
  };

  const OnClickNext = (e: any) => {
    if (currentIndex === data.length) {
      callBack(false);
      triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsNextDisabled(true);
    }
  };

  const updateQuizData = (ans: any) => {
    setQuizData(
      quizData.map((ques: any) => {
        if (ques.question_key === currentIndex) {
          let isCorrect = false;
          const correctOptions = ques.options.filter((q: any) => q.is_correct);
          if (ques.question_type === "Single") {
            const temp = correctOptions.find((opt: any) => opt.option_id === ans);
            if (temp) {
              isCorrect = true;
            }
          } else if (ques.question_type === "Multiple") {
            if (ans.length !== correctOptions.length) isCorrect = false;
            else {
              isCorrect = true;
              for (let i = 0; i < ans.length; i++)
                if (ans[i] !== correctOptions[i].option_id) {
                  isCorrect = false;
                }
            }
          }
          return { ...ques, answers: ans, is_correct: isCorrect };
        } else {
          return ques;
        }
      }),
    );
  };

  const cssStyle = `
  .animation {
    transition: margin-top 0.3s;   
  }
  .activeAnimation {
    margin-top: 100vh;
    transition: margin-top 0.3s;
  }
  .scrollright {
    overflow-y: auto;
    padding-right: 5px;
  }
  .scrollright::-webkit-scrollbar {
    width: 4px;
  }
  .scrollright::-webkit-scrollbar-track {
    background: rgb(177, 177, 177); 
    border-radius: 5px;
  }
  .scrollright::-webkit-scrollbar-thumb {
    background: #fff;    
    border-radius: 5px; 
  }
  `;
  return (
    <>
      {data.map((question: any, key: number) => {
        return (
          <Fragment key={`question_${key}`}>
            <style>{cssStyle}</style>
            <Box
              sx={{
                display: key + 1 === currentIndex ? "flex" : "none",
                backgroundImage: question.background_content.IsImage
                  ? fetchCroppedUrl(question.background_content.Url, question.published_images, {
                      1440: "hero",
                      1280: "landscape",
                      1024: "card2",
                      768: "square",
                      600: "card1",
                      320: "portrait",
                    })
                  : "",
                backgroundColor: question.background_content.IsImage
                  ? "black"
                  : question.background_content.ColorCode,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                backgroundPosition: { xs: "center", md: "center top" },
                flexDirection: "column",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}>
              <Box
                className={isActiveContent ? "activeAnimation" : "animation"}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: { xs: "20px 15px", md: "53px 63px 39px" },
                  height: "100vh",
                  width: "100%",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <ProgressBar
                      progressText={`${currentIndex}/${data.length}`}
                      progress={(currentIndex / data.length) * 100}
                    />
                    {!enablePreview && (
                      <Button
                        onClick={handleClickOpen}
                        sx={{
                          minWidth: { xs: "34px" },
                          height: "34px",
                          width: "34px",
                          padding: { xs: 0 },
                          marginRight: "7px",
                        }}>
                        <img src={CloseIcon} alt='Close Icon' />
                      </Button>
                    )}
                  </Box>
                  <Box sx={{ maxWidth: "1064px", width: "100%", margin: "auto" }}>
                    <Box
                      sx={{
                        marginBottom: "12px",
                        textAlign: "center",
                        display: "inline-block",
                        width: "100%",
                      }}>
                      <Typography
                        variant='h3medium'
                        color='textColor'
                        sx={{ width: "100%", display: "inline-block" }}>
                        {question.question}
                      </Typography>
                      {question.short_description && (
                        <Typography
                          variant='h5regular'
                          color='textColor'
                          sx={{
                            width: "100%",
                            display: "inline-block",
                            marginTop: "10px",
                          }}>
                          {question.short_description}
                        </Typography>
                      )}
                    </Box>
                    {question.question_type === "Single" && question.is_image_option ? (
                      <Box
                        className='scrollright'
                        sx={{
                          maxHeight: { xs: "360px", em: "calc(100vh - 315px)" },
                        }}>
                        <ImageQuestion
                          data={question.options_compound_fields}
                          setIsNextDisabled={setIsNextDisabled}
                          updateQuizData={updateQuizData}
                        />
                      </Box>
                    ) : question.question_type === "Single" &&
                      question.options_compound_fields.length > 4 ? (
                      <Box sx={{ maxWidth: "618px", margin: "auto" }}>
                        <Box
                          className='scrollright'
                          sx={{
                            maxHeight: {
                              xs: "360px",
                              em: "calc(100vh - 315px)",
                            },
                          }}>
                          <ManyOptionQuestion
                            data={question.options_compound_fields}
                            setIsNextDisabled={setIsNextDisabled}
                            updateQuizData={updateQuizData}
                          />
                        </Box>
                      </Box>
                    ) : question.question_type === "Single" ? (
                      <Box sx={{ maxWidth: "618px", margin: "auto" }}>
                        <Box
                          className='scrollright'
                          sx={{
                            maxHeight: {
                              xs: "360px",
                              em: "calc(100vh - 315px)",
                            },
                          }}>
                          <SingleQuestion
                            data={question.options_compound_fields}
                            setIsNextDisabled={setIsNextDisabled}
                            updateQuizData={updateQuizData}
                          />
                        </Box>
                      </Box>
                    ) : question.question_type === "Multiple" ? (
                      <Box sx={{ maxWidth: "618px", margin: "auto" }}>
                        <Box
                          className='scrollright'
                          sx={{
                            maxHeight: {
                              xs: "360px",
                              em: "calc(100vh - 315px)",
                            },
                          }}>
                          <MultiQuestion
                            data={question.options_compound_fields}
                            setIsNextDisabled={setIsNextDisabled}
                            updateQuizData={updateQuizData}
                          />
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                    <Box sx={{ textAlign: "center", marginTop: "23px" }}>
                      <Button
                        variant='defaultButton1'
                        className='sm'
                        disabled={
                          data.length === currentIndex && enablePreview
                            ? enablePreview
                            : isNextDisabled
                        }
                        startIcon={<DoneIcon />}
                        onClick={OnClickNext}>
                        {" "}
                        {data.length === currentIndex ? t("submit_text") : t("next")}
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {question.background_content.IsImage && (
                  <Box
                    sx={{
                      textAlign: "right",
                      position: "absolute",
                      bottom: "39px",
                      right: "63px",
                      display: { xs: "none", md: "block" },
                    }}>
                    <Button
                      onClick={HandlerShowHide}
                      variant='text'
                      sx={{
                        padding: "0 !important",
                        margin: "0",
                        minWidth: "auto !important",
                        fontSize: "14px",
                        textDecoration: "underline",
                      }}>
                      {isActiveContent ? t("view_question") : t("view_image")}
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Fragment>
        );
      })}
      {open && (
        <ExitModal
          isDialogOpen={open}
          title={t("exit_modal_quiz_title")}
          subTitle={t("exit_modal_quiz_text")}
          handleClose={handleClose}
          handleExit={handleExit}
          closeButtonText={t("exit_CTA_back")}
          confirmButtonText={t("exit_CTA_yes")}
        />
      )}
    </>
  );
};

export default QuestionIndex;
