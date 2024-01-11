import { useField, useFormikContext } from 'formik';
import Switch from '../../../../CommonSchemaComponents/Switch/Switch';

const SwitchWrapper = ({ field }) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(field.name);
  const handleSwitch = (event) => {
    setFieldValue(field.name, !meta.value);
  };

  return (
    <Switch
      disabled={false}
      color={'#000000'}
      onChange={handleSwitch}
      checked={meta.value}
    />
  );
};

export default SwitchWrapper;
