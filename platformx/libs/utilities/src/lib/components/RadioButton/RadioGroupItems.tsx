import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";
import useTheme from "@mui/material/styles/useTheme";
import "./RadioGroupItems.css";
import { useCustomStyle } from "./RadioGroupItems.style";

const RadioGroupItems = ({ name, arrData, sepratorLine, groupName, getSelectedValue }: any) => {
  const classes = useCustomStyle();
  const theme = useTheme();
  const handleChange = (event: any) => {
    getSelectedValue(event.target.value);
  };

  return (
    <RadioGroup
      aria-labelledby={name}
      defaultValue={arrData[0]?.value}
      name={groupName ? groupName : "radio-buttons-group"}
      className={`${classes.radioGroupWrapperOuter} radioGroupItems radio-group-list-item`}
      onChange={handleChange}
      sx={{
        "& .Platform-x-Radio-colorPrimary svg": {
          fontSize: theme.palette.prelemType1.RADIO.SIZE,
        },
        "& .Platform-x-Radio-colorPrimary": {
          fontFamily: "Inter",
        },
      }}>
      {arrData.map((item: any, index: number) => {
        return (
          <FormControlLabel
            className={sepratorLine ? "item" : ""}
            value={item.value}
            key={"options" + index.toLocaleString()}
            control={
              <Radio
                className='cutsomradiobutton'
                sx={{
                  color: theme.palette.prelemType1.RADIO.BOX_COLOR,
                  "&.Mui-checked": {
                    color: theme.palette.prelemType1.RADIO.BOX_COLOR_ACTIVE,
                  },
                  "&.Mui-disabled": {
                    color: theme.palette.prelemType1.RADIO.BOX_COLOR,
                    opacity: 0.4,
                  },
                }}
              />
            }
            disabled={item?.disabled}
            label={
              <Typography variant='p3regular' component='span'>
                {item.name}
              </Typography>
            }
          />
        );
      })}
    </RadioGroup>
  );
};
export default RadioGroupItems;
