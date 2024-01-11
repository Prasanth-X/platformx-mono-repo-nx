import type { Meta, StoryObj } from '@storybook/react';
import { lineBreak } from './helper';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof lineBreak> = {
  component: lineBreak,
  title: 'lineBreak',
};
export default meta;
type Story = StoryObj<typeof lineBreak>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to lineBreak!/gi)).toBeTruthy();
  },
};
