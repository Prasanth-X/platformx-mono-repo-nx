import type { Meta, StoryObj } from '@storybook/react';
import   NoSearchResult   from './NoSearchResult';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NoSearchResult> = {
  component: NoSearchResult,
  title: 'NoSearchResult',
};
export default meta;
type Story = StoryObj<typeof NoSearchResult>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to NoSearchResult!/gi)).toBeTruthy();
  },
};
