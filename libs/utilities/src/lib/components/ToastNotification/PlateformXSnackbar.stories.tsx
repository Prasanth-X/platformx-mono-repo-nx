import type { Meta, StoryObj } from '@storybook/react';
import   PlateformXSnackbar   from './PlateformXSnackbar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PlateformXSnackbar> = {
  component: PlateformXSnackbar,
  title: 'PlateformXSnackbar',
};
export default meta;
type Story = StoryObj<typeof PlateformXSnackbar>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PlateformXSnackbar!/gi)).toBeTruthy();
  },
};
