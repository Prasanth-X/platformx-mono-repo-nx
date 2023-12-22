import type { Meta, StoryObj } from '@storybook/react';
import   XCard4   from './XCard4';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta  = {
  component: XCard4,
  title: 'XCard4',
};
export default meta;
type Story = StoryObj<typeof XCard4>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XCard4!/gi)).toBeTruthy();
  },
};
