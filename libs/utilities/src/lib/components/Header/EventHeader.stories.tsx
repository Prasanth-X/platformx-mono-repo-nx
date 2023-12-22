import type { Meta, StoryObj } from '@storybook/react';
import { EventHeader } from './EventHeader';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof EventHeader> = {
  component: EventHeader,
  title: 'EventHeader',
};
export default meta;
type Story = StoryObj<typeof EventHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EventHeader!/gi)).toBeTruthy();
  },
};
