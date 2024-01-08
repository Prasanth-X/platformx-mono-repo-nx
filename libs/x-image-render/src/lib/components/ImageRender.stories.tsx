import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ImageRender from './ImageRender';
const meta: Meta<typeof ImageRender> = {
  component: ImageRender,
  title: 'CommonImageRender',
};
export default meta;
type Story = StoryObj<typeof ImageRender>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageRender!/gi)).toBeTruthy();
  },
};
