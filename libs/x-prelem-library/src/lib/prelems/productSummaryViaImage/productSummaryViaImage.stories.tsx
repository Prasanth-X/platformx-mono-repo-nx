import type { Meta, StoryObj } from '@storybook/react'
import { ProductSummaryViaImage } from './productSummaryViaImage'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof ProductSummaryViaImage> = {
  component: ProductSummaryViaImage,
  title: 'ProductSummaryViaImage',
}
export default meta
type Story = StoryObj<typeof ProductSummaryViaImage>

export const Primary = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(
      canvas.getByText(/Welcome to ProductSummaryViaImage!/gi),
    ).toBeTruthy()
  },
}
