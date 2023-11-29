import React from 'react';
import { XIconButton } from './XIconButton';
import SaveIcon from '@mui/icons-material/Save';

export default {
  title: 'My Component/Button',
  component: XIconButton,
  argTypes: {
    onClick: { action: 'Click handler' },
  },
};

const Template = (args) => <XIconButton {...args} />;

const IconButton: any = Template.bind({});

IconButton.args = {
  variant: 'primaryButton',
};

export const Icon_Button = {
  args: {
    variant: 'primaryButton',
    startIcon: <SaveIcon />,
  },
};
