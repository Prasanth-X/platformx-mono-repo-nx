import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CardOption from './CardOption';

const meta: Meta<typeof CardOption> = {
  component: CardOption,
  title: 'CardOption',
};
export default meta;
type Story = StoryObj<typeof CardOption>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardOption!/gi)).toBeTruthy();
  },
};
