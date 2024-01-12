import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { convertToLowerCase } from "../../../utils/helperFns";
import { TextBoxProps } from "./ErrorHandleTextBox.types";


const ErrorHandleTextBox = ({
  name,
  placeHolder,
  maxCharLength,
  error,
  helperText,
  isDisabled,
  register,
  clearErrors,
  getValues,
  errMessage,
  handleChange,
  handleOnBlur,
  state,
}: TextBoxProps) => {
  const { t } = useTranslation();
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
      <TextField
        variant='outlined'
        size='small'
        name={name}
        className='titlefield'
        placeholder={placeHolder}
        id={name}
        error={error}
        helperText={helperText}
        disabled={isDisabled}
        value={state || state === "" ? state : getValues(name)}
        sx={{
          input: { cursor: isDisabled && "not-allowed" },
        }}
        inputProps={{
          maxLength: maxCharLength,
          readOnly: false,
        }}
        {...register(name, {
          required: errMessage,
          onChange: (event) => {
            if (error) {
              clearErrors(name);
            }
            const { target: { value = "" } = {} } = event;
            handleLength(value);
            if (handleChange) {
              handleChange(event);
            }
          },
          onBlur: (event) => {
            handleOnBlur(event);
          },
        })}
      />

      {maxCharLength && !error && (
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
      )}
    </Box>
  );
};
export default ErrorHandleTextBox;
