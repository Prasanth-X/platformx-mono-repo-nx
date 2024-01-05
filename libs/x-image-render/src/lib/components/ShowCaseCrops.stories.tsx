import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ShowCaseCrops from './ShowCaseCrops';

const meta: Meta<typeof ShowCaseCrops> = {
  component: ShowCaseCrops,
  title: 'ShowCaseCrops',
};
export default meta;
type Story = StoryObj<typeof ShowCaseCrops>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ShowCaseCrops!/gi)).toBeTruthy();
  },
};
