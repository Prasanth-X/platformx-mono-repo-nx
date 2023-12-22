import type { Meta, StoryObj } from '@storybook/react';
import   DatePicker   from './DatePicker';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DatePicker!/gi)).toBeTruthy();
  },
};
