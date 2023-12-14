import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../utils/helperFunctions';
import { ThemeConstants } from '@platformx/utilities';

interface TextBoxProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
}
const TextBoxWithoutBorder = ({
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
    } else {
      handleLength(state);
    }
  }, [state]);
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        variant="outlined"
        size="small"
        name={name}
        value={state}
        className="inputBase noBorder"
        placeholder={placeHolder}
        id={name}
        sx={{
          border: 'none ',
          '& fieldset ': { border: 'none ' },
          padding: '0px !important',
          height: 'auto !important',
        }}
        inputProps={{
          maxLength: maxCharLength,
          readOnly: false,
        }}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
      />

      {maxCharLength ? (
        <Typography
          variant="h7regular"
          sx={{
            color: ThemeConstants.BLACK_COLOR_VARIANT1,
            marginTop: '15px !important',
          }}
        >
          {reachLimit ? (
            <>0</>
          ) : (
            <>{restOfLength ? `${restOfLength}` : `${maxCharLength}`}</>
          )}
        </Typography>
      ) : null}
    </Box>
  );
};
export default TextBoxWithoutBorder;
