import type { Meta, StoryObj } from '@storybook/react';
import  ContentListLoader   from './ContentListLoader';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ContentListLoader> = {
  component: ContentListLoader,
  title: 'ContentListLoader',
};
export default meta;
type Story = StoryObj<typeof ContentListLoader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContentListLoader!/gi)).toBeTruthy();
  },
};
