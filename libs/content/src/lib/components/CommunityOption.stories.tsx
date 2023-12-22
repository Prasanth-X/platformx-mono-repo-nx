import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CommunityOption from './CommunityOption';

const meta: Meta<typeof CommunityOption> = {
  component: CommunityOption,
  title: 'CommunityOption',
};
export default meta;
type Story = StoryObj<typeof CommunityOption>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommunityOption!/gi)).toBeTruthy();
  },
};
