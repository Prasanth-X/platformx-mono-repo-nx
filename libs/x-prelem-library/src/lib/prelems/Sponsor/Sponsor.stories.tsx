import type { Meta, StoryObj } from '@storybook/react'
import { Sponsor } from './Sponsor'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof Sponsor> = {
  component: Sponsor,
  title: 'Sponsor',
}
export default meta
type Story = StoryObj<typeof Sponsor>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to Sponsor!/gi)).toBeTruthy()
  },
}
