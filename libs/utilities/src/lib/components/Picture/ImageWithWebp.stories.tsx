import type { Meta, StoryObj } from '@storybook/react';
import   ImageWithWebp   from './ImageWithWebp';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ImageWithWebp> = {
  component: ImageWithWebp,
  title: 'ImageWithWebp',
};
export default meta;
type Story = StoryObj<typeof ImageWithWebp>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageWithWebp!/gi)).toBeTruthy();
  },
};
