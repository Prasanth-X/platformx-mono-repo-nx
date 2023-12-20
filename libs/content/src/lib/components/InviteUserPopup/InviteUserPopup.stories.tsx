import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import InviteUserPopup from './InviteUserPopup';

const meta: Meta<typeof InviteUserPopup> = {
  component: InviteUserPopup,
  title: 'InviteUserPopup',
};
export default meta;
type Story = StoryObj<typeof InviteUserPopup>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to InviteUserPopup!/gi)).toBeTruthy();
  },
};
