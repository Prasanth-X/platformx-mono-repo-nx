import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SocialShareStepSuccess from './socialShareStepsSuccess';

const meta: Meta<typeof SocialShareStepSuccess> = {
  component: SocialShareStepSuccess,
  title: 'SocialShareStepSuccess',
};
export default meta;
type Story = StoryObj<typeof SocialShareStepSuccess>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to SocialShareStepSuccess!/gi)
    ).toBeTruthy();
  },
};
