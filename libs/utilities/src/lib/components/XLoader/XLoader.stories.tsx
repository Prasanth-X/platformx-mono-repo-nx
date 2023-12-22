import type { Meta, StoryObj } from '@storybook/react';
import XLoader  from './XLoader';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof XLoader> = {
  component: XLoader,
  title: 'XLoader',
};
export default meta;
type Story = StoryObj<typeof XLoader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XLoader!/gi)).toBeTruthy();
  },
};
