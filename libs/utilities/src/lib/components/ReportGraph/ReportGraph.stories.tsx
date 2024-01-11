import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ReportGraph from './ReportGraph';

const meta: Meta<typeof ReportGraph> = {
  component: ReportGraph,
  title: 'ReportGraph',
};
export default meta;
type Story = StoryObj<typeof ReportGraph>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ReportGraph!/gi)).toBeTruthy();
  },
};
