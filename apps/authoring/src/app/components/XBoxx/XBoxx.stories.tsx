import React from 'react';
import { XBoxx as XBox } from './XBoxx';

export default {
  title: 'My Component/Xbox',
  component: XBox,
};

const Template = (args) => <XBox {...args} />;

const XBoxxTemp: any = Template.bind({});

XBoxxTemp.args = {
  variant: 'p3regular',
};

export const Box = {
  argTypes: {
    alignItems: {
      options: [
        'stretch',
        'center',
        'flex-start',
        'flex-end',
        ' baseline',
        'initial',
        'inherit',
      ],
      control: { type: 'select' },
    },
    justifyContent: {
      options: [
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'center',
        'initial',
        'inherit',
      ],
      control: { type: 'select' },
    },
    flexDirection: {
        options: [
            'column','row','column-reverse', 'row-reverse'
        ],
        control: { type: 'select' },
      },
      flexWrap: {
        options: [
            'wrap','no-wrap' ,'wrap-reverse'
        ],
        control: { type: 'select' },
      },
  },
  args: {
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'column',

  },
};
