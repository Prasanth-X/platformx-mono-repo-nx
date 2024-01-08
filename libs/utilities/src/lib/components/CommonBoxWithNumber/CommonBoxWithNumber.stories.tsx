import type { Meta, StoryObj } from '@storybook/react';
import CommonBoxWithNumber from './CommonBoxWithNumber';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof CommonBoxWithNumber> = {
  component: CommonBoxWithNumber,
  title: 'CommonBoxWithNumber',
};
export default meta;
type Story = StoryObj<typeof CommonBoxWithNumber>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommonBoxWithNumber!/gi)).toBeTruthy();
  },
};
