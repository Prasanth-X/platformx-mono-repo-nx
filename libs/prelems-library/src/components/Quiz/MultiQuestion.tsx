import * as React from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface MultiQuestionProps {
  data?: [];
  setIsNextDisabled: (a: boolean) => void;
  updateQuizData: (a: any) => void;
}

const MultiQuestion = ({ data = [], setIsNextDisabled, updateQuizData }: MultiQuestionProps) => {
  const [activeItem, setActiveItem] = useState<Array<any>>([]);

  const handleChange = (id: any) => {
    const findItem = activeItem.find((item) => item === id);
    if (findItem) {
      const removeItem = activeItem.filter((item) => item !== id);
      setActiveItem([...removeItem]);
      updateQuizData([...removeItem]);
    } else {
      setActiveItem([...activeItem, id]);
      updateQuizData([...activeItem, id]);
    }
    if (activeItem.length === 1) {
      if (findItem) {
        setIsNextDisabled(true);
      } else {
        setIsNextDisabled(false);
      }
    }
    if (activeItem.length === 0) {
      if (!findItem) {
        setIsNextDisabled(false);
      } else {
        setIsNextDisabled(false);
      }
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormGroup sx={{ width: "100%" }}>
        {data.map((item) => {
          const { option_id: optionId, option_text: optionText } = item;
          return (
            <FormControlLabel
              key={optionId}
              className={`${activeItem.includes(optionId) && "activeClass"}`}
              sx={{
                padding: "13px 14px",
                height: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                "&.activeClass": {
                  background: "#fff",
                  color: "#000",
                },
                marginBottom: "17px",
                borderRadius: "3px",
                marginLeft: "0px",
                border: "solid 1px #fff",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              value='end'
              control={
                <Checkbox
                  checked={activeItem.includes(optionId)}
                  onChange={() => handleChange(optionId)}
                  sx={{
                    padding: 0,
                    marginRight: "12px",
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#2d2d39",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant='h5medium'
                  color={activeItem.includes(optionId) ? "textColor1" : "textColor"}>
                  {optionText}
                </Typography>
              }
              labelPlacement='end'
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default MultiQuestion;
