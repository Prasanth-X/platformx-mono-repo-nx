import React from 'react';
import XDateTimePicker from './XDateTimePicker';

export default {
  title: 'Schema Components/DateTimePicker',
  component: XDateTimePicker,
};

const Template = (args) => <XDateTimePicker {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  disablePast: false,
};

export const DateTime = {
  args: {
    variant: 'outlined',
    disablePast: false,
  },
};
