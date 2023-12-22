import type { Meta, StoryObj } from '@storybook/react';
import  StringOnChangeTextBox  from './StringOnChangeTextBox';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StringOnChangeTextBox> = {
  component: StringOnChangeTextBox,
  title: 'StringOnChangeTextBox',
};
export default meta;
type Story = StoryObj<typeof StringOnChangeTextBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to StringOnChangeTextBox!/gi)
    ).toBeTruthy();
  },
};
