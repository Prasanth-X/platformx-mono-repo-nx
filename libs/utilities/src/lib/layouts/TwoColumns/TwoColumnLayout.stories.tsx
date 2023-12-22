import type { Meta, StoryObj } from '@storybook/react';
import   TwoColumnLayout   from './TwoColumnLayout';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TwoColumnLayout> = {
  component: TwoColumnLayout,
  title: 'TwoColumnLayout',
};
export default meta;
type Story = StoryObj<typeof TwoColumnLayout>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TwoColumnLayout!/gi)).toBeTruthy();
  },
};
