import type { Meta, StoryObj } from '@storybook/react';
import   InfoToast   from './InfoToast';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof InfoToast> = {
  component: InfoToast,
  title: 'InfoToast',
};
export default meta;
type Story = StoryObj<typeof InfoToast>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to InfoToast!/gi)).toBeTruthy();
  },
};
