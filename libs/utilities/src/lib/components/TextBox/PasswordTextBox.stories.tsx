import type { Meta, StoryObj } from '@storybook/react';
import   PasswordTextBox    from './PasswordTextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PasswordTextBox> = {
  component: PasswordTextBox,
  title: 'PasswordTextBox',
};
export default meta;
type Story = StoryObj<typeof PasswordTextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PasswordTextBox!/gi)).toBeTruthy();
  },
};
