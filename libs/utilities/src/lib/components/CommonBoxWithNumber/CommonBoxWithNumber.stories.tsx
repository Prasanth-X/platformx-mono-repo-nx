import type { Meta, StoryObj } from '@storybook/react';
import { CommonBoxWithNumber } from './CommonBoxWithNumber';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof CommonBoxWithNumber> = {
  component: CommonBoxWithNumber,
  title: 'Platfomx-Component-Library/CommonBoxWithNumber',
};
export default meta;
type Story = StoryObj<typeof CommonBoxWithNumber>;

export const Primary = {
  args: {
    number: 1,
    title: 'Platfomx-Component-Library/Title',
    subtitle: 'Platfomx-Component-Library/Platfomx-Component-Library/SubTitle',
    titleVarient: 'h1bold',
    subTitleVarient: 'h6medium',
    panelStyle: { backgroundColor: 'lightblue' }, // You can customize the panelStyle
  },
}; 