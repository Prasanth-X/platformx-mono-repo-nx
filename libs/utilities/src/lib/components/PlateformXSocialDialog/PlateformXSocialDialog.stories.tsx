import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import PlateformXSocialDialog from './PlateformXSocialDialog';

const meta: Meta<typeof PlateformXSocialDialog> = {
  component: PlateformXSocialDialog,
  title: 'PlateformXSocialDialog',
};
export default meta;
type Story = StoryObj<typeof PlateformXSocialDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to PlateformXSocialDialog!/gi)
    ).toBeTruthy();
  },
};
