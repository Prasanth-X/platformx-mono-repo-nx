import { Typography, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SingleQuestionResultCard from "./SingleQuestionResultCard";
import ImageQuestion from "./ImageQuestion";
import CloseIcon from "../../assets/svgIcon/Cross.svg";
import PollContext from "./PollContext";
import { useTranslation } from "react-i18next";

interface ResultProps {
  data: {
    title: string;
    is_image_option: boolean;
    background_content: {
      objectType: string;
      Url: string;
      Color: string;
    };
    poll_question: string;
    poll_description: string;
    options_compound_fields: [];
    results: [];
    display_scores: string;
    published_images: [];
    original_image: {};
  };
  callBack: (e: any) => void;
  onClickClose: () => void;
  fetchCroppedUrl: (a: string, b: [], c: {}, d: {}) => string;
}

const Result = ({ data, callBack, onClickClose, fetchCroppedUrl }: ResultProps) => {
  const pollData = useContext<any>(PollContext);
  const { t } = useTranslation();

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
    title = "",
    is_image_option: isImgQuestion = false,
    background_content: background,
    display_scores: displayScores = "",
    published_images = [],
    original_image = {},
  } = data || {};
  const { objectType = "color", Url = "", Color = "black" } = background || {};

  return (
    <>
      <style>{cssStyle}</style>
      <Box
        sx={{
          backgroundImage:
            objectType === "image"
              ? //`url(${Url})`
                fetchCroppedUrl(
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
          margin: "0px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          padding: 0,
        }}>
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
          onClick={onClickClose}>
          <img src={CloseIcon} style={{ width: "100%" }} alt='Close Icon' />
        </Button>
        <Box
          className='animatedWarp'
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: { xs: "20px 15px", md: "53px 63px 39px" },
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              maxWidth: "1064px",
              textAlign: "center",
              width: "100%",
              margin: 0,
            }}>
            <Box
              sx={{
                textAlign: "center",
                display: "inline-block",
                width: "100%",
              }}>
              <Typography
                variant='h1bold'
                color="textColor"
                sx={{
                  width: "100%",
                  display: "inline-block",
                  marginBottom: "6px",
                }}>
                {title}
              </Typography>
              <Typography variant='h4regular' color="textColor" sx={{ width: "100%", display: "inline-block" }}>
                {t("thanks_msg")}
              </Typography>
            </Box>
            <Box sx={{ maxWidth: "1064px", width: "100%", margin: "auto" }}>
              <Box
                sx={{
                  display: "inline-block",
                  width: "100%",
                  marginTop: { xs: "5px", md: "15px" },
                }}>
                {isImgQuestion ? (
                  <Box
                    className='scrollright'
                    sx={{
                      textAlign: "center",
                      maxHeight: { xs: "340px", em: "calc(100vh - 285px)" },
                    }}>
                    <ImageQuestion
                      data={pollData.options}
                      displayScores={displayScores}
                      isResultPage={true}
                    />
                  </Box>
                ) : (
                  <Box sx={{ maxWidth: "618px", margin: "auto" }}>
                    <Box
                      className='scrollright'
                      sx={{
                        maxHeight: { xs: "340px", md: "calc(100vh - 285px)" },
                      }}>
                      <SingleQuestionResultCard
                        data={pollData.options}
                        displayScores={displayScores}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ marginTop: "28px" }}>
              <Button
                variant='defaultButton2'
                sx={{
                  minWidth: { xs: "279px", md: "100px" },
                  height: "40px",
                  fontSize: "14px",
                  margin: { xs: "0px 0px 10px 0px", md: "0 20px 0 0px" },
                }}
                startIcon={<HomeIcon />}
                onClick={callBack}>
                {t("back_to_home")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Result;
