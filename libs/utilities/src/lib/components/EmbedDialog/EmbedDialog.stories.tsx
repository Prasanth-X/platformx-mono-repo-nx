import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import EmbedDialog from './EmbedDialog';

const meta: Meta<typeof EmbedDialog> = {
  component: EmbedDialog,
  title: 'EmbedDialog',
};
export default meta;
type Story = StoryObj<typeof EmbedDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EmbedDialog!/gi)).toBeTruthy();
  },
};
