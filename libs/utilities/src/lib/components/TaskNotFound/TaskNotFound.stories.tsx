import type { Meta, StoryObj } from '@storybook/react';
import   TaskNotFound   from './TaskNotFound';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TaskNotFound> = {
  component: TaskNotFound,
  title: 'TaskNotFound',
};
export default meta;
type Story = StoryObj<typeof TaskNotFound>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TaskNotFound!/gi)).toBeTruthy();
  },
};
