import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CourseReportDialog } from './CourseReportDialog';

const meta: Meta<typeof CourseReportDialog> = {
  component: CourseReportDialog,
  title: 'CourseReportDialog',
};
export default meta;
type Story = StoryObj<typeof CourseReportDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CourseReportDialog!/gi)).toBeTruthy();
  },
};
