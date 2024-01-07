import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import PictureComponent from './PictureComponent';
const meta: Meta<typeof PictureComponent> = {
  component: PictureComponent,
  title: 'PictureComponent',
};
export default meta;
type Story = StoryObj<typeof PictureComponent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to PictureComponent!/gi)
    ).toBeTruthy();
  },
};
