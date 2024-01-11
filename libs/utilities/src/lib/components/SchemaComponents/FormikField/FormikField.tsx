import { TextField, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';;
import { convertToLowerCase } from '../../../utils/helperFns';
enum ValidationType {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Email = 'email',
  Number = 'number',
}
const FormikField = ({ name, label, metadata, formik, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  console.log('data', metadata);
  const handleChange = (e) => {
    if (name === 'title') {
      setFieldValue(name, e.target.value);
      setFieldValue('socialShareTitle', e.target.value);
    } else {
      setFieldValue(name, e.target.value);
    }
  };

  const maxLength =
    metadata?.validations?.find(
      (x) =>
        x.type?.toLocaleLowerCase() ===
        ValidationType.MaxLength.toLocaleLowerCase()
    ) || 0;
  const maxCharLength = maxLength['value'];
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
  console.log('meta', meta);
  return (
    <>
      <TextField
        variant='outlined'
        size='small'
        {...field}
        {...rest}
        name={name}
        // label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        onChange={(e) => {
          handleLength(e.target.value);
          handleChange(e);
        }}
      // onBlur={formik.handleBlur}
      />
      {maxCharLength && !meta.error && (
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
    </>
  );
};

export default FormikField;
