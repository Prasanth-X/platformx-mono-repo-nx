import type { Meta, StoryObj } from '@storybook/react';
import   RadioGroupItems   from './RadioGroupItems';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RadioGroupItems> = {
  component: RadioGroupItems,
  title: 'RadioGroupItems',
};
export default meta;
type Story = StoryObj<typeof RadioGroupItems>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RadioGroupItems!/gi)).toBeTruthy();
  },
};
