import { XSwitch } from '@platformx/utilities';
import { useField, useFormikContext } from 'formik';

const SwitchWrapper = ({ field }) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(field.name);
  const handleSwitch = (event) => {
    setFieldValue(field.name, !meta.value);
  };

  return (
    <XSwitch
      disabled={false}
      color={'#000000'}
      onChange={handleSwitch}
      checked={meta.value}
    />
  );
};

export default SwitchWrapper;
