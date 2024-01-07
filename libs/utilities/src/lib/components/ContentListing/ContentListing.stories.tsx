import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ContentListing from './ContentListing';

const meta: Meta<typeof ContentListing> = {
  component: ContentListing,
  title: 'ContentListing',
};
export default meta;
type Story = StoryObj<typeof ContentListing>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContentListing!/gi)).toBeTruthy();
  },
};
