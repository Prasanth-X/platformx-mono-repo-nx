import React, { useState } from "react";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { green } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";

interface ManyOptionQuestionProps {
  data: [];
  setIsNextDisabled: (a: boolean) => void;
  updateQuizData: (a: any) => void;
}

const ManyOptionQuestion = ({
  data = [],
  setIsNextDisabled,
  updateQuizData,
}: ManyOptionQuestionProps) => {
  const [activeItem, setActiveItem] = useState(0);

  const setSelectedItem = (id: any) => {
    setActiveItem(id);
    updateQuizData(id);
    setIsNextDisabled(false);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup sx={{ width: "100%", flexDirection: "row", justifyContent: "center" }}>
        {data.map((item) => {
          const { option_id: optionId, option_text: optionText } = item;
          return (
            <FormControlLabel
              key={optionId}
              onClick={() => setSelectedItem(optionId)}
              className={`${activeItem === optionId && "activeClass"}`}
              sx={{
                padding: { xs: "3px 10px", md: "13px 14px" },
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "&.activeClass": {
                  background: "#fff",
                  color: "#000",
                },
                marginBottom: { xs: "10px", md: "20px" },
                borderRadius: "3px",
                marginLeft: { xs: "5px", md: "10px" },
                marginRight: { xs: "5px", md: "10px" },
                border: "solid 1px #fff",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              value={optionText}
              control={
                <Radio
                  checkedIcon={<DoneIcon />}
                  sx={{
                    padding: 0,
                    display: "none",
                    color: "transparent",
                    marginLeft: "8px",
                    "&.Mui-checked": {
                      color: green[600],
                      display: "block",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant='h5medium'
                  color={activeItem === optionId ? "textColor1" : "textColor"}>
                  {optionText}
                </Typography>
              }
              labelPlacement='start'
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default ManyOptionQuestion;
