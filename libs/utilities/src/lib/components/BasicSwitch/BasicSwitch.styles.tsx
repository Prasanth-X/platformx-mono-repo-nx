import { styled } from '@mui/system';

interface BasicSwitchProps {
  color: string;
  bgcolor?: string;
  disabled?: any;
  onChange?: any;
  checked?: any;
}

const grey = {
  400: 'rgba(0, 0, 0, 0.16)',
  500: '#AAB4BE',
  600: 'rgba(0, 0, 0, 0.16)',
};

export const BasicSwitchRoot = styled('span')<BasicSwitchProps>(
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

export const BasicSwitchInput = styled('input')`
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

export const BasicSwitchThumb = styled('span')`
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
