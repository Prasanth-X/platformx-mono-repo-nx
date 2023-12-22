import type { Meta, StoryObj } from '@storybook/react';
import { XCard5 } from './XCard5';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof XCard5> = {
  component: XCard5,
  title: 'XCard5',
};
export default meta;
type Story = StoryObj<typeof XCard5>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XCard5!/gi)).toBeTruthy();
  },
};
