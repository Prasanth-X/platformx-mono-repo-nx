import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Gallery from './Gallery';
const meta: Meta<typeof Gallery> = {
  component: Gallery,
  title: 'Gallery',
};
export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Gallery!/gi)).toBeTruthy();
  },
};
