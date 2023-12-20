import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { PublishInformation } from './PublishInformation';

const meta: Meta<typeof PublishInformation> = {
  component: PublishInformation,
  title: 'PublishInformation',
};
export default meta;
type Story = StoryObj<typeof PublishInformation>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PublishInformation!/gi)).toBeTruthy();
  },
};
