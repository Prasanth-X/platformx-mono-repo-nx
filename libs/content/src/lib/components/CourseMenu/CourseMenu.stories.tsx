import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CourseMenu } from './CourseMenu';

const meta: Meta<typeof CourseMenu> = {
  component: CourseMenu,
  title: 'CourseMenu',
};
export default meta;
type Story = StoryObj<typeof CourseMenu>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CourseMenu!/gi)).toBeTruthy();
  },
};
