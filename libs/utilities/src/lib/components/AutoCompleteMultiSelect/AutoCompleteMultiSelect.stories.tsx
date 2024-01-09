import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import AutoCompleteMultiSelect from './AutoCompleteMultiSelect';

const meta: Meta<typeof AutoCompleteMultiSelect> = {
  component: AutoCompleteMultiSelect,
  title: 'Platfomx-Component-Library/AutoCompleteMultiSelect',
};
export default meta;
type Story = StoryObj<typeof AutoCompleteMultiSelect>;

export const Primary = {
  args: {
    options: [{ name: 'Option 1' }, { name: 'Option 2' }],
    placeholder: 'Select...',
    className: 'yourClassName',
    values: [],
    onChange: (event: any, newInputValue: any) => { console.log(newInputValue); },
    getOptionLabel: (option: any) => option.name,
    optionFormat: 'name',
    limitTags: 2,
  },
};

export const Heading: Story = {
  args: {
    options: [{ name: 'Option 1' }, { name: 'Option 2' }],
    placeholder: 'Select...',
    className: 'yourClassName',
    values: [],
    onChange: (event: any, newInputValue: any) => { console.log(newInputValue); },
    getOptionLabel: (option: any) => option.name,
    optionFormat: 'name',
    limitTags: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to AutoCompleteMultiSelect!/gi)
    ).toBeTruthy();
  },
};
