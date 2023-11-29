import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import VoteProgress from "./VoteProgress";

interface ImageQuestionProps {
  data: [];
  callBack?: (a: any) => void;
  isResultPage: boolean;
  displayScores?: string;
}

const ImageQuestion = ({
  data = [],
  callBack,
  isResultPage = false,
  displayScores = "Percentage",
}: ImageQuestionProps) => {
  const [activeItem, setActiveItem] = useState(0);

  const setSelectedItem = (id: any) => {
    setActiveItem(id);
    if (callBack) {
      callBack(id);
    }
  };

  return (
    <>
      {data.map((item) => {
        const {
          option_id: optionId = 0,
          option_text: optionText = "",
          option_image: optionImg = { url: "" },
          count = 0,
          percentage = "0%",
        } = item;
        return (
          <Box
            key={`option_${optionId}`}
            sx={{
              display: "inline-block",
              margin: { xs: "5px", md: "15px" },
            }}>
            <Box
              onClick={() => (isResultPage ? "" : setSelectedItem(optionId))}
              className={`${activeItem === optionId && "activeClass"}`}
              sx={{
                padding: { xs: "5px", md: "13px 14px" },
                display: { xs: "flex", md: "inline-block" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&.activeClass": {
                  background: "#fff",
                  color: "#000",
                },
                borderRadius: "3px",
                border: "solid 1px #fff",
                minWidth: { xs: "150px", md: "180px" },
                maxWidth: { xs: "150px", md: "180px" },
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}>
              <Box
                sx={{
                  maxWidth: { xs: "144px", md: "152px" },
                  borderRadius: "3px",
                  minHeight: { xs: "114px", md: "120px" },
                  maxHeight: { xs: "114px", md: "120px" },
                  display: "flex",
                  overflow: "hidden",
                }}>
                <img
                  src={optionImg.url}
                  alt={optionText}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography
                variant='h5medium'
                color={activeItem === optionId ? "textColor1" : "textColor"}
                sx={{
                  mt: "8.4px",
                  minHeight: { xs: "48px", md: "auto" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                {optionText}
              </Typography>
            </Box>
            {isResultPage ? (
              <VoteProgress
                text={displayScores === "Percentage" ? percentage : count}
                progress={percentage}
              />
            ) : (
              ""
            )}
          </Box>
        );
      })}
    </>
  );
};

export default ImageQuestion;
