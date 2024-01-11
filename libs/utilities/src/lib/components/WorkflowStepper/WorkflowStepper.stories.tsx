import type { Meta, StoryObj } from '@storybook/react';
import WorkflowStepper from './WorkflowStepper';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof WorkflowStepper> = {
  component: WorkflowStepper,
  title: 'WorkflowStepper',
};
export default meta;
type Story = StoryObj<typeof WorkflowStepper>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to WorkflowStepper!/gi)).toBeTruthy();
  },
};
