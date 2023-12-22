import type { Meta, StoryObj } from '@storybook/react';
import { MiniHeader } from './MiniHeader';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MiniHeader> = {
  component: MiniHeader,
  title: 'MiniHeader',
};
export default meta;
type Story = StoryObj<typeof MiniHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MiniHeader!/gi)).toBeTruthy();
  },
};
