import type { Meta, StoryObj } from '@storybook/react';
import  WarningToast   from './WarningToast';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof WarningToast> = {
  component: WarningToast,
  title: 'WarningToast',
};
export default meta;
type Story = StoryObj<typeof WarningToast>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to WarningToast!/gi)).toBeTruthy();
  },
};
