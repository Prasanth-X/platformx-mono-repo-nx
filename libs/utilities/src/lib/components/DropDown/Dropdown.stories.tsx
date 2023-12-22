import type { Meta, StoryObj } from '@storybook/react';
import   DropDown   from './Dropdown';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DropDown> = {
  component: DropDown,
  title: 'DropDown',
};
export default meta;
type Story = StoryObj<typeof DropDown>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropDown!/gi)).toBeTruthy();
  },
};
