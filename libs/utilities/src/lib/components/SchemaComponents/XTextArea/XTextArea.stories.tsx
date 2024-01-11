import React from 'react';
import { XTextArea } from './XTextArea';

export default {
  title: 'X Component Library/Inputs',
  component: XTextArea,
};


const Template = (args) => <XTextArea {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  variant: 'outlined',
  minRows:1,
  maxRows:8,
};

export const TextArea = {
  args: {
    variant: 'outlined',
    minRows:1,
    maxRows:8,
  },
};
