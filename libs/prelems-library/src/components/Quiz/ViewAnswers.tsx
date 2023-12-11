import { Typography, Box, Button } from "@mui/material";
import React, { Fragment, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoneIcon from "@mui/icons-material/Done";
import QuizContext from "./QuizContext";
import { useTranslation } from "react-i18next";

const ViewAnswers = ({ backToHome, background, publishedImages, fetchCroppedUrl }: any) => {
  const { objectType = "Color", Url = "", Color = "black" } = background || {};
  const { t } = useTranslation();
  const quizData = useContext<any>(QuizContext);
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
      <style>{cssStyle}</style>
      <Box
        sx={{
          backgroundImage:
            objectType === "image"
              ? //`url(${Url})`
                fetchCroppedUrl(Url, publishedImages, {
                  1440: "hero",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                })
              : "",
          backgroundColor: objectType === "image" ? "black" : Color,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          backgroundPosition: { xs: "center", md: "center 0px" },
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}>
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: "100%",
            padding: { xs: "20px 8px", md: "40px 63px 39px" },
            height: "100vh",
          }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Button
              sx={{
                border: "1px solid #fff",
                borderRadius: "3px",
                minWidth: { xs: "34px" },
                padding: 0,
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 0,
                marginLeft: 0,
              }}
              endIcon={<ArrowBackIcon sx={{ marginRight: "12px", marginLeft: "0px" }} />}
              onClick={backToHome}
            />
          </Box>
          <Box
            className='scrollright'
            sx={{
              maxWidth: "618px",
              width: "100%",
              height: "calc(100vh - 134px)",
              margin: { xs: "40px auto 0", md: "60px auto 0" },
            }}>
            {quizData.map((question: any, key: number) => {
              return (
                <Box sx={{ marginBottom: "39px" }} key={key}>
                  <Typography
                    variant='h3medium'
                    color="textColor"
                    sx={{
                      width: "100%",
                      display: "inline-block",
                    }}>{`${question.question_key}. ${question.question}`}</Typography>
                  {question.options
                    .filter((x: any) =>
                      question.question_type === "Single"
                        ? x.option_id === question.answers
                        : question.answers.includes(x.option_id),
                    )
                    .map((option: any, optionIndex: number) => {
                      return (
                        <Fragment key={optionIndex}>
                          {question.question_type === "Single" && question.is_image_option ? (
                            <Box
                              key={optionIndex}
                              sx={{
                                padding: { xs: "10px", md: "13px 14px" },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "17px",
                                marginRight: "17px",
                                borderRadius: "3px",
                                border: "solid 1px #fff",
                                minWidth: { xs: "164px", md: "180px" },
                                maxWidth: "180px",
                                cursor: "pointer",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                              }}>
                              <Box
                                sx={{
                                  overflow: "hidden",
                                  maxWidth: { xs: "144px", md: "152px" },
                                  maxHeight: { xs: "114px", md: "120px" },
                                }}>
                                <img
                                  src={option.option_image}
                                  alt='ans1'
                                  style={{ width: "100%" }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  mt: "8.4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  minWidth: "100%",
                                }}>
                                <Typography variant='h5medium' color="textColor">{option.option_text}</Typography>
                                <Box>
                                  {option.is_correct ? (
                                    <DoneIcon sx={{ color: "#5cb75b" }} />
                                  ) : (
                                    <CloseIcon sx={{ color: "#ee6723" }} />
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              key={key}
                              sx={{
                                padding: "13px 14px",
                                height: "50px",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: "17px",
                                borderRadius: "3px",
                                marginLeft: "0px",
                                border: "solid 1px #fff",
                                color: { xs: "#2d2d39", md: "#ffffff" },
                                backgroundColor: {
                                  xs: "#fff",
                                  md: "rgba(0, 0, 0, 0.3)",
                                },
                              }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {question.question_type === "Multiple" && (
                                  <CheckBoxIcon sx={{ mr: "13px" }} />
                                )}
                                <Typography variant='h5medium' color="textColor">{option.option_text}</Typography>
                              </Box>
                              <Box>
                                {option.is_correct ? (
                                  <DoneIcon sx={{ color: "#5cb75b" }} />
                                ) : (
                                  <CloseIcon sx={{ color: "#ee6723" }} />
                                )}
                              </Box>
                            </Box>
                          )}
                        </Fragment>
                      );
                    })}
                  <Typography
                    variant='h5medium'
                    color="textColor"
                    sx={{
                      marginTop: { xs: "5px", md: "15px" },
                      width: "100%",
                      display: "inline-block",
                    }}>
                    {t("correct_answer")}
                    {question.options
                      .filter((x: any) => x.is_correct && !question.is_image_option)
                      .map((option: any, optionIndex: number) =>
                        question.question_type === "Single"
                          ? option.option_text
                          : optionIndex > 0
                          ? `, ${option.option_text}`
                          : option.option_text,
                      )}
                  </Typography>
                  {question.question_type === "Single" && question.is_image_option && (
                    <Box
                      sx={{
                        padding: { xs: "10px", md: "13px 14px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "17px",
                        marginRight: "17px",
                        borderRadius: "3px",
                        border: "solid 1px #fff",
                        minWidth: { xs: "164px", md: "180px" },
                        maxWidth: "180px",
                        cursor: "pointer",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}>
                      <Box
                        sx={{
                          overflow: "hidden",
                          maxWidth: { xs: "144px", md: "152px" },
                          maxHeight: { xs: "114px", md: "120px" },
                        }}>
                        <img
                          src={question.options.find((x: any) => x.is_correct).option_image}
                          alt='ans2'
                          style={{ width: "100%" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: "8.4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          minWidth: "100%",
                        }}>
                        <Typography variant='h5medium' color="textColor">
                          {question.options.find((x: any) => x.is_correct).option_text}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <hr
                    style={{
                      marginBottom: "34px",
                      marginTop: "39px",
                      border: "1px solid #ced3d9",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ViewAnswers;
