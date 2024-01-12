import { Box, TextField } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase } from '../../../utils/helperFns';

enum ValidationType {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Email = 'email',
  Number = 'number',
}
const FormikTextField = ({ metaData }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(metaData.name);

  const maxLength =
    metaData?.validations.find(
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
      const maxLength = metaData.validations.find(
        (x) => x.type?.toLocaleLowerCase() === ValidationType.MaxLength
      );

      setRestOfChar({
        ...restOfChar,
        restOfLength: rest,
        lengthOfState: lengthOfChar,
        reachLimit: maxCharLength === lengthOfChar ? true : false,
      });
    }
  };
  const [remainingCharacters, setRemainingCharacters] = useState(
    maxLength['value']
  );
  return (
    <Box mr={2}>
      <TextField
        variant='outlined'
        size='small'
        name={metaData.name}
        className='titlefield'
        placeholder={metaData.placeHolder}
        fullWidth
        id={metaData.name}
        required={metaData.required}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </Box>
  );
};

export default FormikTextField;
