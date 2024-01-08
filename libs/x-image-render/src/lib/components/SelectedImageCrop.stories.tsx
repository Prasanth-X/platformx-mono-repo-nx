import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SelectedImageCrop from './SelectedImageCrop';

const meta: Meta<typeof SelectedImageCrop> = {
  component: SelectedImageCrop,
  title: 'SelectedImageCrop',
};
export default meta;
type Story = StoryObj<typeof SelectedImageCrop>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectedImageCrop!/gi)).toBeTruthy();
  },
};
