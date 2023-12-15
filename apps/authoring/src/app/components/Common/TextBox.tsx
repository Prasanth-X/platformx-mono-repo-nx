import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../utils/helperFunctions';
import useTextboxStyle from './utils/Textbox.style';

interface TextBoxProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
  error?: any;
  helperText?: any;
  borderColor?: any;
  isEmailExist?: any;
  isDisabled?: boolean;
  backgroundColor?: any;
}
const TextBox = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  error,
  helperText,
  borderColor,
  backgroundColor,
  isEmailExist,
  isDisabled,
}: TextBoxProps) => {
  const { t } = useTranslation();
  const classes = useTextboxStyle();
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
    const { target: { value = '' } = {} } = event;
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
    // else {
    //   const x: any = document.querySelector(`#${name}`);
    //   x.value = state;
    //   handleLength(state);
    // }
  }, [state]);

  const handleKeydown = (e) => {
    if (e.keyCode == 70) {
      e.stopPropagation();
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
        // value={state || ""}
        sx={{
          input: { cursor: isDisabled && 'not-allowed' },
          backgroundColor: backgroundColor,
        }}
        inputProps={{
          maxLength: maxCharLength,
          readOnly: false,
        }}
        InputProps={{
          classes: {
            notchedOutline: isEmailExist ? borderColor : null,
          },
        }}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
        onKeyDown={(e) => handleKeydown(e)}
        FormHelperTextProps={{className:classes.typotool}}
      />

      {maxCharLength && (
        <Typography
          variant='h7regular'
          sx={{ color: '#5c6574', marginTop: '10px' }}
        >
          {reachLimit ? (
            <>0 {`${t('characters')} ${t('left')}`}</>
          ) : (
            <>
              {restOfLength
                ? `${restOfLength} ${t('characters')} ${t('left')} `
                : `${maxCharLength} ${t('characters')} ${t('max')}`}
            </>
          )}
        </Typography>
      )}
    </Box>
  );
};
export default TextBox;
