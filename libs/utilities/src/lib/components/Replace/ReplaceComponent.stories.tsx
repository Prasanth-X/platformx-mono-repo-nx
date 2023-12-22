import type { Meta, StoryObj } from '@storybook/react';
import   ReplaceComponent   from './ReplaceComponent';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ReplaceComponent> = {
  component: ReplaceComponent,
  title: 'ReplaceComponent',
};
export default meta;
type Story = StoryObj<typeof ReplaceComponent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ReplaceComponent!/gi)).toBeTruthy();
  },
};
