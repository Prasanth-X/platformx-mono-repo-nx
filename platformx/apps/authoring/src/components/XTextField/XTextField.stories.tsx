import React from 'react';
import { XTextField } from './XTextField';

export default {
  title: 'My Component/Inputs',
  component: XTextField,
};


const Template = (args) => <XTextField {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  variant: 'outlined',
};

export const Input = {
  args: {
    variant: 'outlined',
    
    // size: 'medium',
  },
};
