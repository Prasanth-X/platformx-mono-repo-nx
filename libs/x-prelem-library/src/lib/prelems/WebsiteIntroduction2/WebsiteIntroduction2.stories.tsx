import type { Meta, StoryObj } from '@storybook/react'
import { WebsiteIntroduction2 } from './WebsiteIntroduction2'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof WebsiteIntroduction2> = {
  component: WebsiteIntroduction2,
  title: 'WebsiteIntroduction2',
}
export default meta
type Story = StoryObj<typeof WebsiteIntroduction2>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to WebsiteIntroduction2!/gi)).toBeTruthy()
  },
}
