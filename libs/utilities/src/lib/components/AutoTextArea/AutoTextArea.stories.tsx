import type { Meta, StoryObj } from '@storybook/react';
import   AutoTextArea   from './AutoTextArea';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AutoTextArea> = {
  component: AutoTextArea,
  title: 'AutoTextArea',
};
export default meta;
type Story = StoryObj<typeof AutoTextArea>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AutoTextArea!/gi)).toBeTruthy();
  },
};
