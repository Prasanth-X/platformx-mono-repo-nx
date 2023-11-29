import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import QuizContext from "./QuizContext";
import { useTranslation } from "react-i18next";

const ScoreScreen = ({ data, backToHome, showAnswers, fetchCroppedUrl }: any) => {
  const {
    page = "",
    background_content = {},
    title = "",
    display_scores = "Percentage",
    result_range_1 = "",
    result_range_2 = "",
    result_range_3 = "",
    result_range_4 = "",
    published_images = [],
  } = data || {};
  const { objectType = "Color", Url = "", Color = "black" } = background_content || {};
  const quizData = useContext<any>(QuizContext);
  const [score, setScore] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (page) {
      const takenQuizes = JSON.parse(localStorage.getItem("TakenQuizes") || "[]");
      localStorage.setItem("TakenQuizes", JSON.stringify([...takenQuizes, page]));
    }
  }, []);

  useEffect(() => {
    const correctAnswers = quizData.filter((ques: any) => ques.is_correct);
    setScore(correctAnswers.length);
    setPercentage(Math.trunc((correctAnswers.length / quizData.length) * 100));
  }, [quizData]);

  return (
    <Box
      sx={{
        backgroundImage:
          objectType === "image"
            ? //`url(${Url})`
              fetchCroppedUrl(Url, published_images, {
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
        justifyContent: "center",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        position: "relative",
      }}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Grid
          sx={{
            padding: { xs: "8px", md: "25px" },
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}>
          <Typography variant='h1bold' color="textColor">{title}</Typography>
          <Typography variant='h5medium' color="textColor" sx={{ margin: "6px 0 0px 0" }}>{`${t(
            "you_scored_text",
          )} ${score} ${t("out_of")} ${quizData.length}`}</Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "226px",
              height: "226px",
              margin: "36px auto",
            }}>
            <CircularProgress
              variant='determinate'
              disableShrink={false}
              value={percentage}
              sx={{ color: "#374fd5", position: "absolute", zIndex: 9 }}
              size={226}
              thickness={3}
            />
            <Box
              sx={{
                width: "215px",
                height: "215px",
                border: "5px solid #fff",
                borderRadius: "50%",
                position: "absolute",
                zIndex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
              }}></Box>
            <Typography variant='h1bold' color="textColor">
              {display_scores === "Percentage" ? `${percentage}%` : `${score}/${quizData.length}`}
            </Typography>
          </Box>
          <Box>
            <Button
              variant='defaultButton1'
              className='sm'
              startIcon={<VisibilityIcon />}
              onClick={showAnswers}>
              {t("view_answer")}
            </Button>
            <Button
              variant='defaultButton2'
              className='sm'
              startIcon={<HomeIcon />}
              onClick={backToHome}>
              {t("back_to_home")}
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              width: "100%",
              color: "#fff",
              textAlign: "center",
            }}>
            <Typography variant='h1bold' color="textColor">
              {percentage < 25
                ? `“${result_range_1}”`
                : percentage > 24 && percentage < 50
                ? `“${result_range_2}”`
                : percentage > 49 && percentage < 75
                ? `“${result_range_3}”`
                : percentage > 74 && percentage <= 100
                ? `“${result_range_4}”`
                : ""}
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default ScoreScreen;
