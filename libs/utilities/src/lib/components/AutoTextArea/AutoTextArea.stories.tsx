import type { Meta, StoryObj } from '@storybook/react';
import AutoTextArea from './AutoTextArea';

const meta: Meta<typeof AutoTextArea> = {
  component: AutoTextArea,
  title: 'Platfomx-Component-Library/AutoTextArea',
};
export default meta;
type Story = StoryObj<typeof AutoTextArea>;

export const Primary = {
  args: {
    name: 'AutoTextArea',
    placeHolder: 'Type something...',
    handleChange: (event: any) => { console.log(event.target.value); },
    maxCharLength: 100,
    state: '',
    handleOnBlur: (event: any) => { console.log('Blurred'); },
    isDisabled: false,
    minRows: 3,
  },
};
