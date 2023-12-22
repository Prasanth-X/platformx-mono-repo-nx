import type { Meta, StoryObj } from '@storybook/react';
import { ErrorTooltip } from './ErrorTooltip';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ErrorTooltip> = {
  component: ErrorTooltip,
  title: 'ErrorTooltip',
};
export default meta;
type Story = StoryObj<typeof ErrorTooltip>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ErrorTooltip!/gi)).toBeTruthy();
  },
};
