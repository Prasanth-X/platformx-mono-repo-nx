import { TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../theme/variable';
import { convertToLowerCase } from '../../utils/helperFunctions';

interface AutoTextAreaProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
}
const TextAreaWithBorder = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
}: AutoTextAreaProps) => {
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
    }
  }, [state]);

  return (
    <Box>
      <TextareaAutosize
        className='textArea withBorder'
        placeholder={placeHolder}
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
        maxLength={maxCharLength}
        style={{
          //   width: "100%",
          //   resize: "none",
          //   padding: "12px",
          //   border: "solid 1px #ced3d9",
          //   borderRadius: "5px",
          //   backgroundColor: "#fff",
          fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
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
export default TextAreaWithBorder;
