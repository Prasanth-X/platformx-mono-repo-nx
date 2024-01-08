import type { Meta, StoryObj } from '@storybook/react';
import { XImageRender } from './x-image-render';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof XImageRender> = {
  component: XImageRender,
  title: 'XImageRender',
};
export default meta;
type Story = StoryObj<typeof XImageRender>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XImageRender!/gi)).toBeTruthy();
  },
};
