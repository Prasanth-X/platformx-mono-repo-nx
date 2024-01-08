import { useSwitch } from '@mui/base/SwitchUnstyled';
import clsx from 'clsx';
import {
  BasicSwitchInput,
  BasicSwitchRoot,
  BasicSwitchThumb,
} from './BasicSwitch.styles';

interface BasicSwitchProps {
  color: string;
  bgcolor?: string;
  disabled?: boolean;
  onChange?: any;
  checked?: any;
}
const BasicSwitch = (props: BasicSwitchProps) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };

  return (
    <BasicSwitchRoot
      className={clsx(stateClasses)}
      color={props.color}
      bgcolor={props.bgcolor}
    >
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
};
export default BasicSwitch;
