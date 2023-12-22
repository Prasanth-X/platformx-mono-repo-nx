import type { Meta, StoryObj } from '@storybook/react';
import   CommonDraftDescription  from './CommonDraftDescription';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CommonDraftDescription> = {
  component: CommonDraftDescription,
  title: 'CommonDraftDescription',
};
export default meta;
type Story = StoryObj<typeof CommonDraftDescription>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to CommonDraftDescription!/gi)
    ).toBeTruthy();
  },
};
