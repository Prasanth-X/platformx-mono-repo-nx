import type { Meta, StoryObj } from '@storybook/react'
import { Quote } from './quote'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof Quote> = {
  component: Quote,
  title: 'Quote',
}
export default meta
type Story = StoryObj<typeof Quote>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to Quote!/gi)).toBeTruthy()
  },
}
