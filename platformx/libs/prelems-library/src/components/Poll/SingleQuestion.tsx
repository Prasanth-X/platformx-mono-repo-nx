import React, { useState } from "react";
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { green } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";

interface SingleQuestionProps {
  data: [];
  callBack: (a: any) => void;
}

const SingleQuestion = ({ data = [], callBack }: SingleQuestionProps) => {
  const [activeItem, setActiveItem] = useState(0);

  const setSelectedItem = (id: any) => {
    setActiveItem(id);
    callBack(id);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup sx={{ width: "100%" }}>
        {data.map((item) => {
          const { option_id: optionId = 0, option_text: optionText = "" } = item;
          return (
            <FormControlLabel
              key={optionId}
              onClick={() => setSelectedItem(optionId)}
              className={`${activeItem == optionId && "activeClass"}`}
              sx={{
                padding: "13px 14px",
                height: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
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
              value={optionText}
              control={
                <Radio
                  checkedIcon={<DoneIcon />}
                  sx={{
                    padding: 0,
                    display: "none",
                    color: "transparent",
                    "&.Mui-checked": {
                      color: green[600],
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
export default SingleQuestion;
