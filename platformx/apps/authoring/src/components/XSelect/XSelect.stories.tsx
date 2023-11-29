import React from 'react';
import { XSelect } from './XSelect';

export default {
  title: 'My Component/Select Item',
  component: XSelect,
};


const Template = (args) => <XSelect {...args} />;

const PrimarySelect: any = Template.bind({});

PrimarySelect.args = {
  variant: {
    options: ['outlined', 'filled'],
    control: { type: 'select' },
  }
};

export const Select = {
  args: {
    variant: 'outlined',
    size: 'medium',
  },
};
