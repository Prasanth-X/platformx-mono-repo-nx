import type { Meta, StoryObj } from '@storybook/react';
import   XCard2   from './XCard2';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta  = {
  component: XCard2,
  title: 'XCard2',
};
export default meta;
type Story = StoryObj<typeof XCard2>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XCard2!/gi)).toBeTruthy();
  },
};
