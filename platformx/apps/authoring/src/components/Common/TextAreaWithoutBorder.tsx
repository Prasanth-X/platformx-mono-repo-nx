import { TextareaAutosize } from "@mui/base";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeConstants from "../../theme/variable";
import { convertToLowerCase } from "../../utils/helperFunctions";

interface TextBoxProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
}
const TextAreaWithoutBorder = ({
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
    }
  }, [state]);
  return (
    <Box sx={{ display: "flex" }}>
      <TextareaAutosize
        name={name}
        value={state}
        className='textArea noBorder'
        placeholder={placeHolder}
        id={name}
        maxLength={maxCharLength}
        minRows={4}
        style={{  }}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
      />

      {maxCharLength ?
        <Typography
          variant="h7regular"
          sx={{ color: ThemeConstants.BLACK_COLOR_VARIANT1, marginTop: "10px" }}>
          {reachLimit ?
            <>0</>
           :
            <>{restOfLength ? `${restOfLength}` : `${maxCharLength}`}</>}
        </Typography>
       : null}
    </Box>
  );
};
export default TextAreaWithoutBorder;
