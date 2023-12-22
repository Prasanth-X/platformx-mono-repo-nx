import type { Meta, StoryObj } from '@storybook/react';
import   LanguageDropDown   from './LanguageDropDown';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LanguageDropDown> = {
  component: LanguageDropDown,
  title: 'LanguageDropDown',
};
export default meta;
type Story = StoryObj<typeof LanguageDropDown>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LanguageDropDown!/gi)).toBeTruthy();
  },
};
