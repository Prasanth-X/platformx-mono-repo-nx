import type { Meta, StoryObj } from '@storybook/react'
import { BasicButton } from './BasicButton'

import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof BasicButton> = {
  component: BasicButton,
  title: 'BasicButton',
  argTypes: {
    openButtonEditWindow: { action: 'openButtonEditWindow executed!' },
    handleTrack: { action: 'handleTrack executed!' },
  },
}
export default meta
type Story = StoryObj<typeof BasicButton>

export const Primary = {
  args: {
    analyticsEnabled: false,
    isAuthoring: false,
    isEditing: false,
    currentBtnEditing: '',
    buttonContentEditable: false,
    position: 0,
    pageId: 0,
    prelemId: 0,
    pageTitle: '',
    pageDesc: '',
    pageTags: '',
    prelemTags: '',
    variant: '',
  },
}

export const Heading: Story = {
  args: {
    analyticsEnabled: false,
    isAuthoring: false,
    isEditing: false,
    currentBtnEditing: '',
    buttonContentEditable: false,
    position: 0,
    pageId: 0,
    prelemId: 0,
    pageTitle: '',
    pageDesc: '',
    pageTags: '',
    prelemTags: '',
    variant: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to BasicButton!/gi)).toBeTruthy()
  },
}
