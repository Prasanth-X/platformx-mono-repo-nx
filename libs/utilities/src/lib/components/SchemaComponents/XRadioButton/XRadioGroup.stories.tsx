import React from 'react';
import XRadioGroup from './XRadioGroup';

export default {
  title: 'X Component Library/XRadioButton',
  component: XRadioGroup,
};


const Template = (args) => <XRadioGroup {...args} />;

const RadioGroupTemp: any = Template.bind({});

RadioGroupTemp.args = {
  size: 'medium',
};

export const RadioGroup = {
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
    AlignmentVertical: false,
  },
};
