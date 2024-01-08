import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import LanguageDropDownCheckBox from './LanguageDropDownCheckBox';

const meta: Meta<typeof LanguageDropDownCheckBox> = {
  component: LanguageDropDownCheckBox,
  title: 'LanguageDropDownCheckBox',
};
export default meta;
type Story = StoryObj<typeof LanguageDropDownCheckBox>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to LanguageDropDownCheckBox!/gi)
    ).toBeTruthy();
  },
};
