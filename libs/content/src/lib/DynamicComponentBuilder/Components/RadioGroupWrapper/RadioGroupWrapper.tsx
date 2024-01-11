import { RadioGroup } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import RadioControlLabel from '../../../../components/Common/RadioControlLabel';

const RadioGroupWrapper = ({ field }) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(field.name);
  const handleChange = (event) => {
    setFieldValue(field.name, event.target.value);
  };

  return (
    <RadioGroup name='scoreBy' value={meta.value} onChange={handleChange} row>
      <RadioControlLabel value={field.radioObj.radioLabel1} />
      <RadioControlLabel value={field.radioObj.radioLabel2} />
    </RadioGroup>
  );
};

export default RadioGroupWrapper;
