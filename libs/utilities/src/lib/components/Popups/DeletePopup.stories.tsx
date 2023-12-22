import type { Meta, StoryObj } from '@storybook/react';
import  PlateformXDialog   from './DeletePopup';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PlateformXDialog> = {
  component: PlateformXDialog,
  title: 'PlateformXDialog',
};
export default meta;
type Story = StoryObj<typeof PlateformXDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PlateformXDialog!/gi)).toBeTruthy();
  },
};
