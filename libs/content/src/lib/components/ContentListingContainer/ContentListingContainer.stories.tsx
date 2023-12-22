import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ContListingContainer from './ContentListingContainer';

const meta: Meta<typeof ContListingContainer> = {
  component: ContListingContainer,
  title: 'ContListingContainer',
};
export default meta;
type Story = StoryObj<typeof ContListingContainer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContListingContainer!/gi)).toBeTruthy();
  },
};
