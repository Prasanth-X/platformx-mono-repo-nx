import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SkeltonLoader from './SkeltonLoader';

const meta: Meta<typeof SkeltonLoader> = {
  component: SkeltonLoader,
  title: 'SkeltonLoader',
};
export default meta;
type Story = StoryObj<typeof SkeltonLoader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SkeltonLoader!/gi)).toBeTruthy();
  },
};
