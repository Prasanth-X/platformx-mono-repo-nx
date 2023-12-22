import type { Meta, StoryObj } from '@storybook/react';
import   ErrorToast   from './ErrorToast';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ErrorToast> = {
  component: ErrorToast,
  title: 'ErrorToast',
};
export default meta;
type Story = StoryObj<typeof ErrorToast>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ErrorToast!/gi)).toBeTruthy();
  },
};
