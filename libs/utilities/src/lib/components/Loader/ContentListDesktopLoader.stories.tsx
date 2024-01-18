/* eslint-disable require-await */
import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ContentListDesktopLoader from './ContentListDesktopLoader';

const meta: Meta<typeof ContentListDesktopLoader> = {
  component: ContentListDesktopLoader,
  title: 'ContentListLoader',
};
export default meta;
type Story = StoryObj<typeof ContentListDesktopLoader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContentListDesktopLoader!/gi)).toBeTruthy();
  },
};
