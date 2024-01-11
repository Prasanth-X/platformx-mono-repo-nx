import React from 'react';
import XRadioButton from './XRadioButton';

export default {
  title: 'X Component Library/XRadioButton',
  component: XRadioButton,
};


const Template = (args) => <XRadioButton {...args} />;

const XRadioButtonTemp: any = Template.bind({});

XRadioButtonTemp.args = {
  size: 'medium',
};

export const RadioButton = {
  argTypes: {
    labelPlacement: {
      options: ['top', 'start', 'bottom', 'end'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    color: {
      options: ['primaryColor', 'secondaryColor', 'warningColor', 'successColor', 'errorColor'],
      control: { type: 'select' },
    },
  },
  args: {
    label: 'First Radio Button',
    color: 'primaryColor',
    labelPlacement: 'end',
    size: 'medium',
  },
};
