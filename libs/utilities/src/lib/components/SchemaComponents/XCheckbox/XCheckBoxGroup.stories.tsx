import XCheckBoxGroup from './XCheckBoxGroup';

export default {
  title: 'X Component Library/XCheckBox',
  component: XCheckBoxGroup,
};

const Template = (args) => <XCheckBoxGroup {...args} />;

const CheckBoxTemp: any = Template.bind({});

CheckBoxTemp.args = {
  size: 'medium',
};

export const CheckBoxGroup = {
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
      options: [
        'primaryColor',
        'secondaryColor',
        'warningColor',
        'successColor',
        'errorColor',
      ],
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
