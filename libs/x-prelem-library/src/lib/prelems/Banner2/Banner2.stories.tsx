import type { Meta, StoryObj } from '@storybook/react'
import { Banner2 } from './Banner2'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof Banner2> = {
  component: Banner2,
  title: 'Banner2',
}
export default meta
type Story = StoryObj<typeof Banner2>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to Banner2!/gi)).toBeTruthy()
  },
}
