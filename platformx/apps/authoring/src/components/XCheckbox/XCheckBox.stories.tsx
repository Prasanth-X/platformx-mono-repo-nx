import React from 'react';
import XCheckBox from './XCheckBox';

export default {
  title: 'My Component/XCheckBox',
  component: XCheckBox,
};
const Template = (args) => <XCheckBox {...args} />;
const XCheckBoxTemp: any = Template.bind({});

XCheckBoxTemp.args = {
  variant: 'primaryButton',
  size: 'small',
  label:'CheckBox',
  value: 'custom-value',
};

export const CheckBox= {
  args: {
    size: 'small',
    label:'CheckBox'
  },
};
