import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SocialShareStep1 from './socialShareSteps1';

const meta: Meta<typeof SocialShareStep1> = {
  component: SocialShareStep1,
  title: 'SocialShareStep1',
};
export default meta;
type Story = StoryObj<typeof SocialShareStep1>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SocialShareStep1!/gi)).toBeTruthy();
  },
};
