import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SocialShareSteps from './SocialShareSteps';

const meta: Meta<typeof SocialShareSteps> = {
  component: SocialShareSteps,
  title: 'SocialShareSteps',
};
export default meta;
type Story = StoryObj<typeof SocialShareSteps>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SocialShareSteps!/gi)).toBeTruthy();
  },
};
