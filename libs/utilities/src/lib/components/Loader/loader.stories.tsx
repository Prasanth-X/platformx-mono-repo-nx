import type { Meta, StoryObj } from '@storybook/react';
import   PlateformXLoader   from './loader';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PlateformXLoader> = {
  component: PlateformXLoader,
  title: 'PlateformXLoader',
};
export default meta;
type Story = StoryObj<typeof PlateformXLoader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PlateformXLoader!/gi)).toBeTruthy();
  },
};
