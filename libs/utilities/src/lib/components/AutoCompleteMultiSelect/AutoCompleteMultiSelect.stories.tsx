import type { Meta, StoryObj } from '@storybook/react';
import   AutoCompleteMultiSelect   from './AutoCompleteMultiSelect';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AutoCompleteMultiSelect> = {
  component: AutoCompleteMultiSelect,
  title: 'AutoCompleteMultiSelect',
};
export default meta;
type Story = StoryObj<typeof AutoCompleteMultiSelect>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to AutoCompleteMultiSelect!/gi)
    ).toBeTruthy();
  },
};
