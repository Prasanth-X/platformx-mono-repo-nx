import type { Meta, StoryObj } from '@storybook/react';
import   ToastContainerHandle   from './ToastContainerHandle';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ToastContainerHandle> = {
  component: ToastContainerHandle,
  title: 'ToastContainerHandle',
};
export default meta;
type Story = StoryObj<typeof ToastContainerHandle>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ToastContainerHandle!/gi)).toBeTruthy();
  },
};
