import type { Meta, StoryObj } from '@storybook/react';
import { SitePage } from './site-page';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SitePage> = {
  component: SitePage,
  title: 'SitePage',
};
export default meta;
type Story = StoryObj<typeof SitePage>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SitePage!/gi)).toBeTruthy();
  },
};
