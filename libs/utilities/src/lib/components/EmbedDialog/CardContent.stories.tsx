import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CardContent from './CardContent';

const meta: Meta<typeof CardContent> = {
  component: CardContent,
  title: 'CardContent',
};
export default meta;
type Story = StoryObj<typeof CardContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardContent!/gi)).toBeTruthy();
  },
};
