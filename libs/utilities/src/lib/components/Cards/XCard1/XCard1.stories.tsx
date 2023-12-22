import type { Meta, StoryObj } from '@storybook/react';
import   XCard1   from './XCard1';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta = {
  component: XCard1,
  title: 'XCard1',
};
export default meta;
type Story = StoryObj<typeof XCard1>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XCard1!/gi)).toBeTruthy();
  },
};
