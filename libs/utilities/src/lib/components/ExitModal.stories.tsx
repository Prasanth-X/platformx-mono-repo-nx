import type { Meta, StoryObj } from '@storybook/react';
import   ExitModal   from './ExitModal';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ExitModal> = {
  component: ExitModal,
  title: 'ExitModal',
};
export default meta;
type Story = StoryObj<typeof ExitModal>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ExitModal!/gi)).toBeTruthy();
  },
};
