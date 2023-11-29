import { Box } from "@mui/material";
import React, { useState } from "react";
import SingleImageCard from "./SingleImageCard";

interface ImageQuestionProps {
  data: [];
  setIsNextDisabled: (a: boolean) => void;
  updateQuizData: (a: any) => void;
}

const ImageQuestion = ({ data = [], setIsNextDisabled, updateQuizData }: ImageQuestionProps) => {
  const [activeItem, setActiveItem] = useState(0);

  const setSelectedItem = (id: any) => {
    setActiveItem(id);
    updateQuizData(id);
    setIsNextDisabled(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}>
      {data.map((item, key) => (
        <SingleImageCard
          key={key}
          option={item}
          activeItem={activeItem}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </Box>
  );
};

export default ImageQuestion;
