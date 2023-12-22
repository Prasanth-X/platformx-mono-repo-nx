import type { Meta, StoryObj } from '@storybook/react';
import   SuccessToast  from './SuccessToast';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SuccessToast> = {
  component: SuccessToast,
  title: 'SuccessToast',
};
export default meta;
type Story = StoryObj<typeof SuccessToast>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SuccessToast!/gi)).toBeTruthy();
  },
};
