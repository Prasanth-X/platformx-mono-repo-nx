import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DuplicateContentPopup from './DuplicateContentPopup';

const meta: Meta<typeof DuplicateContentPopup> = {
  component: DuplicateContentPopup,
  title: 'DuplicateContentPopup',
};
export default meta;
type Story = StoryObj<typeof DuplicateContentPopup>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DuplicateContentPopup!/gi)
    ).toBeTruthy();
  },
};
