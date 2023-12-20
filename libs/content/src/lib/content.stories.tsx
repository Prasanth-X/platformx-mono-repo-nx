import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Content from './content';

const meta: Meta<typeof Content> = {
  component: Content,
  title: 'Content',
};
export default meta;
type Story = StoryObj<typeof Content>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Content!/gi)).toBeTruthy();
  },
};
