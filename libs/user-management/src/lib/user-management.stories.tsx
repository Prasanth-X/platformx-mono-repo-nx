import type { Meta, StoryObj } from '@storybook/react';
import { UserManagement } from './user-management';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof UserManagement> = {
  component: UserManagement,
  title: 'UserManagement',
};
export default meta;
type Story = StoryObj<typeof UserManagement>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to UserManagement!/gi)).toBeTruthy();
  },
};
