import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof Loader> = {
  component: Loader,
  title: 'Loader',
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Loader!/gi)).toBeTruthy();
  },
};
