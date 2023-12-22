import type { Meta, StoryObj } from '@storybook/react';
import   EmailTextBox   from './EmailTextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof EmailTextBox> = {
  component: EmailTextBox,
  title: 'EmailTextBox',
};
export default meta;
type Story = StoryObj<typeof EmailTextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EmailTextBox!/gi)).toBeTruthy();
  },
};
