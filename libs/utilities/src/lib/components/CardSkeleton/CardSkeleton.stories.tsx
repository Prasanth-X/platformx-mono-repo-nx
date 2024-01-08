import type { Meta, StoryObj } from '@storybook/react';
import   CardSkeleton   from './CardSkeleton';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CardSkeleton> = {
  component: CardSkeleton,
  title: 'CardSkeleton',
};
export default meta;
type Story = StoryObj<typeof CardSkeleton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardSkeleton!/gi)).toBeTruthy();
  },
};
