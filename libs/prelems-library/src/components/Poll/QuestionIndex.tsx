import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Typography } from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ExitModal from "../../Common/ExitModal";
import loadergif from "../../assets/holi-loader.gif";
import CloseIcon from "../../assets/svgIcon/Cross.svg";
import { triggerAnalytics } from "../../utils/helperFns";
import ImageQuestion from "./ImageQuestion";
import PollContext from "./PollContext";
import SingleQuestion from "./SingleQuestion";

interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}
interface QuestionIndexProps {
  data: {
    is_image_option: boolean;
    question_background_content: {
      objectType: string;
      Url: string;
      Color: string;
      published_images: [];
      original_image: {};
    };
    poll_question: string;
    poll_description: string;
    options_compound_fields: [];
  };
  onSubmit: (a: any) => void;
  setPollDataHandle: (a: any) => void;
  setShowQuestion: (a: any) => void;
  analytics: Analytics;
  defaultObj: {};
  showLoading: boolean;
  enablePreview: boolean;
  fetchCroppedUrl: (a: string, b: [], c: {}, d: {}) => string;
}

const QuestionIndex = ({
  data,
  onSubmit,
  setPollDataHandle,
  setShowQuestion,
  analytics,
  defaultObj,
  showLoading,
  enablePreview,
  fetchCroppedUrl,
}: QuestionIndexProps) => {
  const [isActiveContent, setActiveContent] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const pollData = useContext<any>(PollContext);
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

  const HandlerShowHide = (e: any) => {
    if (!isActiveContent) {
      triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    }
    setActiveContent(!isActiveContent);
  };

  const handleExit = () => {
    setOpen(false);
    setShowQuestion(false);
  };

  const questionCallBack = (id: any) => {
    setPollDataHandle({
      ...pollData,
      options: pollData.options.map((option: any) => {
        if (option.option_id === id) {
          return { ...option, count: 1 };
        } else {
          return { ...option, count: 0 };
        }
      }),
    });

    if (enablePreview) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  };

  const onClickSubmit = (e: any) => {
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    onSubmit(pollData);
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

  const {
    is_image_option: isImgQuestion = false,
    question_background_content: background,
    poll_question: pollQuestion = "",
    poll_description: pollDescription = "",
    options_compound_fields: options = [],
  } = data || {};
  const {
    objectType = "color",
    Url = "",
    Color = "black",
    published_images = [],
    original_image = {},
  } = background || {};

  return (
    <>
      <style>{cssStyle}</style>
      <Box
        sx={{
          backgroundImage:
            objectType === "image"
              ? fetchCroppedUrl(
                  Url,
                  published_images,
                  {
                    1440: "hero",
                    1280: "landscape",
                    1024: "card2",
                    768: "square",
                    600: "card1",
                    320: "portrait",
                  },
                  original_image,
                )
              : "",
          backgroundColor: objectType === "image" ? "black" : Color,
          position: "relative",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          backgroundPosition: "center",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          padding: 0,
        }}>
        <Box
          className={isActiveContent ? "activeAnimation" : "animation"}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: { xs: "20px 15px", md: "53px 63px 39px" },
            height: "100vh",
            width: "100%",
          }}>
          {showLoading ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img alt='qus1' src={loadergif} style={{ width: "80px", borderRadius: "5px" }} />
            </Box>
          ) : (
            <>
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
                  {!enablePreview && (
                    <Button
                      sx={{
                        minWidth: { xs: "34px" },
                        height: "34px",
                        width: "34px",
                        padding: "0px !important",
                        marginRight: "7px",
                        position: "absolute",
                        right: { xs: "8px", md: "63px" },
                        top: { xs: "20px", md: "53px" },
                      }}
                      onClick={handleClickOpen}>
                      <img src={CloseIcon} style={{ width: "100%" }} alt='Close Icon' />
                    </Button>
                  )}
                </Box>
                <Box
                  sx={{
                    maxWidth: "1064px",
                    width: "100%",
                    margin: "auto",
                    color: "#fff",
                  }}>
                  <Box
                    sx={{
                      marginBottom: "25px",
                      textAlign: "center",
                      display: "inline-block",
                      width: "100%",
                    }}>
                    <Typography
                      variant='h3medium'
                      color='textColor'
                      sx={{ width: "100%", display: "inline-block" }}>
                      {pollQuestion}
                    </Typography>
                    <Typography
                      variant='h5regular'
                      color='textColor'
                      sx={{
                        width: "100%",
                        display: "inline-block",
                        marginTop: "10px",
                        maxWidth: { xs: "100%", lg: "800px" },
                      }}>
                      {pollDescription}
                    </Typography>
                  </Box>
                  {isImgQuestion ? (
                    <Box
                      className='scrollright'
                      sx={{
                        textAlign: "center",
                        maxHeight: { xs: "340px", em: "calc(100vh - 285px)" },
                      }}>
                      <ImageQuestion
                        data={options}
                        callBack={questionCallBack}
                        isResultPage={false}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ maxWidth: "618px", margin: "auto" }}>
                      <Box
                        className='scrollright'
                        sx={{
                          maxHeight: { xs: "340px", md: "calc(100vh - 285px)" },
                        }}>
                        <SingleQuestion data={options} callBack={questionCallBack} />
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ textAlign: "center", marginTop: "23px" }}>
                    <Button
                      variant='defaultButton1'
                      disabled={isNextDisabled}
                      startIcon={<DoneIcon />}
                      onClick={onClickSubmit}
                      className='sm'>
                      {t("submit_text")}
                    </Button>
                  </Box>
                </Box>
              </Box>
              {objectType !== "color" && (
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
            </>
          )}
        </Box>
      </Box>
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
