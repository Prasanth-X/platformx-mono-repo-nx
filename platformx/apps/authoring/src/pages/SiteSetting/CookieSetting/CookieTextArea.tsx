import { TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../../utils/helperFunctions';
import { useCookieSkeletonStyle } from './CookieSkeleton.style';
interface CookieTextAreaProps {
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
const CookieTextArea = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  isDisabled,
  minRows = 6,
}: CookieTextAreaProps) => {
  const { t } = useTranslation();
  const inlineCss = `
  textarea::placeholder {
    color:#6E7191
  }
  textarea{
    height:280px;
    overflow-y:hidden;
    font-size:16px;
    font-family: inter;
  }
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

  const classes = useCookieSkeletonStyle();

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
        className={classes.textAreAuto}
      />
      {maxCharLength ? (
        <Typography
          variant='h7regular'
          className={classes.cookieTextAreaTypo}
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
export default CookieTextArea;
