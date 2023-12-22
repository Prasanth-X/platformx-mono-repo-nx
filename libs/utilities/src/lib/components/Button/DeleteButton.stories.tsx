import type { Meta, StoryObj } from '@storybook/react';
import   DeleteButton   from './DeleteButton';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DeleteButton> = {
  component: DeleteButton,
  title: 'DeleteButton',
};
export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DeleteButton!/gi)).toBeTruthy();
  },
};
