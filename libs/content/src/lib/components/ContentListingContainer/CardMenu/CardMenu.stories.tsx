import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CardMenu from './CardMenu';

const meta: Meta<typeof CardMenu> = {
  component: CardMenu,
  title: 'CardMenu',
};
export default meta;
type Story = StoryObj<typeof CardMenu>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardMenu!/gi)).toBeTruthy();
  },
};
