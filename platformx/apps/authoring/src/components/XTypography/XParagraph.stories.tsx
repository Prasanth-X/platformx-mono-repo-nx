import React from 'react';
import { XParagraph } from './XParagraph';

export default {
  title: 'My Component/XTypography',
  component: XParagraph,
};


const Template = (args) => <XParagraph {...args} />;

const ParagraphTemp: any = Template.bind({});

ParagraphTemp.args = {
  variant: 'p3regular',
};

export const Paragraph = {
  argTypes: {
    TextAlign: {
      options: ['center', 'inherit', 'justify', 'left', 'right'],
      control: { type: 'select' },
    },
  },
  args: {
    variant: 'p3regular',
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    TextAlign: 'left'
  },
};
