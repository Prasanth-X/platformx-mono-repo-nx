import React from 'react';
import { FormTextField } from './FormTextField';

export default {
  title: 'X SchemaComponents/FormTextField',
  component: FormTextField,
};

const Template = (args) => <FormTextField {...args} />;

export const FormTextFieldTemplate: any = Template.bind({});
FormTextFieldTemplate.args = {
  titleVariant: 'h6',
  subTitleVariant: 'subtitle1',
  title: 'Your Title',
  subTitle: 'Your Subtitle',
};

export const Wrapper = {
  args: {
    number: '01',
    title: 'Title & Description',
    subTitle: 'Fields with * are mandatory',
    titleVariant: 'p3semibold',
    subTitleVariant: 'p4regular',
    children: 'You can add any component here',
  },
};
