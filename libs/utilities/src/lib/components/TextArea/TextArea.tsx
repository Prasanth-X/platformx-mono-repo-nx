import { TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../utils/helperFns';

interface TextAreaProps {
  name?: any;
  placeHolder?: any;
  // handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
  isDisabled?: any;
  minRows?: number;
  maxRows?: number;
  metadata?: any;
  formik?: any;
}
enum ValidationType {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Email = 'email',
  Number = 'number',
}

const TextArea = ({
  name,
  placeHolder,
  // handleChange,
  state,
  handleOnBlur,
  isDisabled,
  minRows = 6,
  metadata,
  formik,
  ...rest
}: TextAreaProps) => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);
  const handleChange = (e) => {
    if (name === 'description') {
      setFieldValue(name, e.target.value);
      setFieldValue('socialShareDesc', e.target.value);
    } else {
      setFieldValue(name, e.target.value);
    }
  };

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
  const maxLength =
    metadata?.validations?.find(
      (x) =>
        x.type?.toLocaleLowerCase() ===
        ValidationType.MaxLength.toLocaleLowerCase()
    ) || 0;
  const maxCharLength = maxLength['value'];
  const error =
    metadata?.validations?.find(
      (x) => x.type?.toLocaleLowerCase() === 'required'
    ) || '';
  const errMessage = error['message'];
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
    // if (handleChange) {
    //   handleChange(event);
    // }
    const { target: { value = '' } = {} } = event;
    handleLength(value);
  };

  useEffect(() => {
    if (state) {
      const x: any = document.querySelector(`#${name}`);
      x.value = state;
      handleLength(state);
    }
  }, [state]);
  console.log('meta1', meta, field);
  return (
    <Box>
      <style>{inlineCss}</style>
      <TextareaAutosize
        disabled={isDisabled}
        aria-label='minimum height'
        minRows={minRows}
        placeholder={placeHolder}
        // name={name}
        {...field}
        {...rest}
        id={name}
        onChange={(e) => {
          onChange(e);
          handleChange(e);
        }}
        // onBlur={(e) => handleOnBlur && handleOnBlur(e)}
        maxLength={maxCharLength}
        style={{
          width: '100%',
          resize: 'none',
          padding: '12px',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontFamily: 'Inter',
          border:
            meta.touched && Boolean(meta.error)
              ? 'solid 1px red'
              : 'solid 1px #ced3d9',
        }}
      />
      {maxCharLength && !meta.error ? (
        <Typography
          variant='h7regular'
          sx={{ color: '#5c6574', marginTop: '0px' }}
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
      {meta.touched && Boolean(meta.error) ? (
        <Typography
          variant='h7regular'
          sx={{
            color: '#B71C1C',
            marginLeft: '14px',
          }}
        >
          <>{`${metadata.title} is ${errMessage}`}</>
        </Typography>
      ) : null}
    </Box>
  );
};
export default TextArea;
