import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { QuizPollEventMenu } from './QuizPollEventsMenu';

const meta: Meta<typeof QuizPollEventMenu> = {
  component: QuizPollEventMenu,
  title: 'QuizPollEventMenu',
};
export default meta;
type Story = StoryObj<typeof QuizPollEventMenu>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to QuizPollEventMenu!/gi)).toBeTruthy();
  },
};
