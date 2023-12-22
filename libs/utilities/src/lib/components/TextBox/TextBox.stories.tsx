import type { Meta, StoryObj } from '@storybook/react';
import   TextBox   from './TextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TextBox> = {
  component: TextBox,
  title: 'TextBox',
};
export default meta;
type Story = StoryObj<typeof TextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TextBox!/gi)).toBeTruthy();
  },
};
