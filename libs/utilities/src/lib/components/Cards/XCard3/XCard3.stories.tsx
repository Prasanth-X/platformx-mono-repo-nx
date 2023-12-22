import type { Meta, StoryObj } from '@storybook/react';
import   XCard3   from './XCard3';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta  = {
  component: XCard3,
  title: 'XCard3',
};
export default meta;
type Story = StoryObj<typeof XCard3>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XCard3!/gi)).toBeTruthy();
  },
};
