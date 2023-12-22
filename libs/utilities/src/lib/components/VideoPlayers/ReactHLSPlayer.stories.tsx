import type { Meta, StoryObj } from '@storybook/react';
import { ReactHLSPlayer } from './ReactHLSPlayer';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ReactHLSPlayer> = {
  component: ReactHLSPlayer,
  title: 'ReactHLSPlayer',
};
export default meta;
type Story = StoryObj<typeof ReactHLSPlayer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ReactHLSPlayer!/gi)).toBeTruthy();
  },
};
