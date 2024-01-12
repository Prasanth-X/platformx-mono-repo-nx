import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';

const blue = {
  500: ThemeConstants.PRIMARY_MAIN_COLOR,
};

const grey = {
  400: 'rgba(0, 0, 0, 0.16)',
  500: '#AAB4BE',
  600: 'rgba(0, 0, 0, 0.16)',
};

const BasicSwitchRoot = styled('span')<BasicSwitchProps>(
  ({ theme, color, bgcolor }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  background:  ${
    bgcolor ? bgcolor : theme.palette.mode === 'dark' ? grey[600] : grey[400]
  };
  border-radius: 10px;
  cursor: pointer;

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: ${color}
  }
  `
);

const BasicSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled('span')`
  display: block;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-focusVisible {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.Switch-checked {
    left: 22px;
    top: 3px;
    background-color: #fff;
  }
`;
interface BasicSwitchProps {
  color: string;
  bgcolor?: string;
  disabled?: any;
  onChange?: any;
  checked?: any;
}
function BasicSwitch(props: BasicSwitchProps) {
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
}
export default BasicSwitch;
