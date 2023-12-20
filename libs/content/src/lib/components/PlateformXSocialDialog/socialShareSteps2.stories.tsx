import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SocialShareStep2 from './socialShareSteps2';

const meta: Meta<typeof SocialShareStep2> = {
  component: SocialShareStep2,
  title: 'SocialShareStep2',
};
export default meta;
type Story = StoryObj<typeof SocialShareStep2>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SocialShareStep2!/gi)).toBeTruthy();
  },
};
