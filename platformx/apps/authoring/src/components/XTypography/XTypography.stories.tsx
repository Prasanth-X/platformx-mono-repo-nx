import React from 'react';
import { XTypography } from './XTypography';

export default {
  title: 'My Component/XTypography',
  component: XTypography,
};

const Template = (args) => <XTypography {...args} />;

const HeadingTemp: any = Template.bind({});

HeadingTemp.args = {
  variant: 'h2bold',
};

export const Heading = {
  argTypes: {
    TextAlign: {
      options: ['center', 'inherit', 'justify', 'left', 'right'],
      control: { type: 'select' },
    },
  },
  args: {
    variant: 'h2bold',
    label: 'First Heading Text',
    TextAlign: 'left',
  },
};
