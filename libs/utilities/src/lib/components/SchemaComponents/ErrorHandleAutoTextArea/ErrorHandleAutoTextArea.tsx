import { TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { convertToLowerCase } from "../../../utils/helperFns";
import { AutoTextAreaProps } from "./ErrorHandleAutoTextArea.types";

const ErrorHandleAutoTextArea = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  isDisabled,
  minRows = 6,
  register,
  errors,
  clearErrors,
  getValues,
  errMessage,
}: AutoTextAreaProps) => {
  const { t } = useTranslation();
  const inlineCss = `
  @media screen and (max-height: 600px) and (orientation: landscape) {
    textarea{
      height:auto !important;
      overflow-y:hidden !important;
  }
  }
  @media only screen and (max-width: 767px){
    textarea{
      height:220px !important;
      overflow-y:auto !important;
  }
  
}

  `;

  const [restOfChar, setRestOfChar] = useState({
    lengthOfState: 0,
    restOfLength: 0,
    reachLimit: false,
  });
  const { restOfLength = 0, reachLimit = false } = restOfChar;

  const handleLength = (valueData = "") => {
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

  return (
    <Box>
      <style>{inlineCss}</style>
      <TextareaAutosize
        disabled={isDisabled}
        aria-label='minimum height'
        minRows={minRows}
        placeholder={placeHolder}
        name={name}
        id={name}
        value={state || state === "" ? state : getValues(name)}
        maxLength={maxCharLength}
        style={{
          width: "100%",
          resize: "none",
          padding: "12px",
          border: errors ? "solid 1px red" : "solid 1px #ced3d9",
          borderRadius: "5px",
          backgroundColor: "#fff",
          fontFamily: "Inter",
        }}
        {...register(name, {
          required: errMessage,
          onChange: (event) => {
            if (errors) {
              clearErrors(name);
            }
            const { target: { value = "" } = {} } = event;
            handleLength(value);
          },
          onBlur: (event) => {
            handleOnBlur(event);
          },
        })}
      />
      {maxCharLength && !errors ? (
        <Typography variant='h7regular' sx={{ color: "#5c6574", marginTop: "10px" }}>
          {reachLimit ? (
            <>0 {`${t("characters")} ${t("left")}`}</>
          ) : (
            <>
              {restOfLength
                ? `${restOfLength} ${t("characters")} ${t("left")} `
                : `${maxCharLength} ${t("characters")} ${t("max")}`}
            </>
          )}
        </Typography>
      ) : null}
      {errors ? (
        <Typography
          variant='h7regular'
          sx={{
            color: "#B71C1C",
            marginLeft: "14px",
          }}>
          <>{errMessage}</>
        </Typography>
      ) : null}
    </Box>
  );
};
export default ErrorHandleAutoTextArea;
