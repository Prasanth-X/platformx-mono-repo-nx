import type { Meta, StoryObj } from '@storybook/react';
import { AboutUs2 } from './AboutUs2';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AboutUs2> = {
  component: AboutUs2,
  title: 'AboutUs2',
};
export default meta;
type Story = StoryObj<typeof AboutUs2>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AboutUs2!/gi)).toBeTruthy();
  },
};
