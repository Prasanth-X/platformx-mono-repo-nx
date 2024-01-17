import type { Meta, StoryObj } from '@storybook/react'
import { AboutUsThree } from './AboutUsThree'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof AboutUsThree> = {
  component: AboutUsThree,
  title: 'AboutUsThree',
}
export default meta
type Story = StoryObj<typeof AboutUsThree>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to AboutUsThree!/gi)).toBeTruthy()
  },
}
