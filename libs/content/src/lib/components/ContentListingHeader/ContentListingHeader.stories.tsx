import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ContentListingHeader from './ContentListingHeader';

const meta: Meta<typeof ContentListingHeader> = {
  component: ContentListingHeader,
  title: 'ContentListingHeader',
};
export default meta;
type Story = StoryObj<typeof ContentListingHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContentListingHeader!/gi)).toBeTruthy();
  },
};
