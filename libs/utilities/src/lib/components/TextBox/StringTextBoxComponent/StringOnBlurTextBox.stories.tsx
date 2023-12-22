import type { Meta, StoryObj } from '@storybook/react';
import   StringOnBlurTextBox   from './StringOnBlurTextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StringOnBlurTextBox> = {
  component: StringOnBlurTextBox,
  title: 'StringOnBlurTextBox',
};
export default meta;
type Story = StoryObj<typeof StringOnBlurTextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StringOnBlurTextBox!/gi)).toBeTruthy();
  },
};
