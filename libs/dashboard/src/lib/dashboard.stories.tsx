import type { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from './dashboards'

import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'Dashboard',
}
export default meta
type Story = StoryObj<typeof Dashboard>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to Dashboard!/gi)).toBeTruthy()
  },
}
