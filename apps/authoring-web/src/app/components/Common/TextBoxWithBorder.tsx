import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { convertToLowerCase } from "../../utils/helperFunctions";

interface TextBoxProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
}
const TextBoxWidthBorder = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
}: TextBoxProps) => {
  const { t } = useTranslation();
  const [restOfChar, setRestOfChar] = useState({
    lengthOfState: 0,
    restOfLength: 0,
    reachLimit: false,
  });
  const { restOfLength = 0, reachLimit = false } = restOfChar;

  const handleLength = (valueData = '') => {
    if (maxCharLength) {
      const lengthOfChar = convertToLowerCase(valueData).length;
      const rest = valueData ? maxCharLength - lengthOfChar : 0;

      setRestOfChar({
        ...restOfChar,
        restOfLength: rest,
        lengthOfState: lengthOfChar,
        reachLimit: maxCharLength === lengthOfChar ? true : false,
      });
    }
  };

  const onChange = (event: any = {}) => {
    if (handleChange) {
      handleChange(event);
    }
    const { target: { value = "" } = {} } = event;
    handleLength(value);
  };

  useEffect(() => {
    if (
      state //&& isEdit
    ) {
      const x: any = document.querySelector(`#${name}`);
      // if (!x?.value) {
      x.value = state;
      handleLength(state);
      // }
    } else {
      handleLength(state);
    }
  }, [state]);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        border: "solid 1px #ced3d9 !important",
        borderRadius: "4px !important",
      }}>
      <TextField
        hiddenLabel
        variant='outlined'
        size='small'
        name={name}
        placeholder={placeHolder}
        id={name}
        value={state}
        sx={{
          border: "transparent !important",
        }}
        inputProps={{
          maxLength: maxCharLength,
          readOnly: false,
        }}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
      />

      {maxCharLength ?
        <Typography
          variant="h7regular"
          sx={{
            marginTop: "15px !important",
            marginRight: "15px",
          }}>
          {reachLimit ?
            <>0</>
           :
            <>{restOfLength ? `${restOfLength} ` : `${maxCharLength}`}</>}
        </Typography>
       : null}
    </Box>
  );
};
export default TextBoxWidthBorder;
