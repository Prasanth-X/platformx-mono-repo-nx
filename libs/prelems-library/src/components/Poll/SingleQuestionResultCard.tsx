import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import VoteProgress from "./VoteProgress";

interface SingleQuestionResultCardProps {
  data: [];
  displayScores: string;
}

const SingleQuestionResultCard = ({
  data = [],
  displayScores = "Percentage",
}: SingleQuestionResultCardProps) => {
  return (
    <>
      {data.map((item) => {
        const {
          option_id: optionId = 0,
          option_text: optionText = "",
          count = 0,
          percentage = "0%",
        } = item;
        return (
          <Box
            key={optionId}
            className={`${false && "activeClass"}`}
            sx={{
              padding: { xs: "5px", md: "13px 14px" },
              flexDirection: "column",
              "&.activeClass": {
                background: "#fff",
                color: "#000",
              },
              borderRadius: "3px",
              border: "solid 1px #fff",
              cursor: "pointer",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              marginBottom: "15px",
              textAlign: "left",
            }}>
            <Typography variant='h5medium' color="textColor" sx={{ mt: "8.4px" }}>
              {optionText}
            </Typography>
            <VoteProgress
              text={displayScores === "Percentage" ? percentage : count}
              progress={percentage}
            />
          </Box>
        );
      })}
    </>
  );
};

export default SingleQuestionResultCard;
