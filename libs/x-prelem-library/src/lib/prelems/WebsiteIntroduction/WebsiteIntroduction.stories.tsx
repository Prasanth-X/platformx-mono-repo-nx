import type { Meta, StoryObj } from '@storybook/react'
import { WebsiteIntroduction } from './WebsiteIntroduction'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof WebsiteIntroduction> = {
  component: WebsiteIntroduction,
  title: 'WebsiteIntroduction',
}
export default meta
type Story = StoryObj<typeof WebsiteIntroduction>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to WebsiteIntroduction!/gi)).toBeTruthy()
  },
}
