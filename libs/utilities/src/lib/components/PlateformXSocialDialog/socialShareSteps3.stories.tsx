import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SocialShareStep3 from './socialShareSteps3';

const meta: Meta<typeof SocialShareStep3> = {
  component: SocialShareStep3,
  title: 'SocialShareStep3',
};
export default meta;
type Story = StoryObj<typeof SocialShareStep3>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SocialShareStep3!/gi)).toBeTruthy();
  },
};
