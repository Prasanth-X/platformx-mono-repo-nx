import type { Meta, StoryObj } from '@storybook/react';
import { XButton } from './XButton';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof XButton> = {
  component: XButton,
  title: 'XButton',
};
export default meta;
type Story = StoryObj<typeof XButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to XButton!/gi)).toBeTruthy();
  },
};
