import { XButton } from './XButton';

export default {
  title: 'X Component Library/Button',
  component: XButton,
  argTypes: {
    onClick: { action: 'Click handler' },
  },
};

const Template = (args) => <XButton {...args} />;

const PrimaryButton: any = Template.bind({});

PrimaryButton.args = {
  variant: 'primaryButton',
};

export const Primary_Button = {
  argTypes: {
    loadingPosition: {
      options: ['start', 'end', 'center'],
      control: { type: 'select' },
    },
  },
  args: {
    label: 'Primary Button',
    variant: 'primaryButton',
    loading: false,
    loadingPosition: 'end',
    startIcon: false,
    endIcon: false,
  },
};
