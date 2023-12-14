import { TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../utils/helperFunctions';

interface AutoTextAreaProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
  isDisabled?: any;
  minRows?: number;
  maxRows?: number;
}
const AutoTextArea = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  isDisabled,
  minRows = 6,
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
      const x: any = document.querySelector(`#${name}`);
      x.value = state;
      handleLength(state);
    }
  }, [state]);

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
        // value={state || ""}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
        maxLength={maxCharLength}
        style={{
          width: '100%',
          resize: 'none',
          padding: '12px',
          border: 'solid 1px #ced3d9',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontFamily: 'Inter',
        }}
      />
      {maxCharLength ? (
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
      ) : null}
    </Box>
  );
};
export default AutoTextArea;
