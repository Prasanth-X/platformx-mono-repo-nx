import type { Meta, StoryObj } from '@storybook/react';
import   DateTextBox   from './DateTextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DateTextBox> = {
  component: DateTextBox,
  title: 'DateTextBox',
};
export default meta;
type Story = StoryObj<typeof DateTextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DateTextBox!/gi)).toBeTruthy();
  },
};
