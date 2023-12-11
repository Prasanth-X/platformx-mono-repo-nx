import type { Meta, StoryObj } from '@storybook/react';
import ContactUsForm from './ContactUS';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ContactUsForm> = {
  component: ContactUsForm,
  title: 'ContactUsForm',
};
export default meta;
type Story = StoryObj<typeof ContactUsForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContactUsForm!/gi)).toBeTruthy();
  },
};
