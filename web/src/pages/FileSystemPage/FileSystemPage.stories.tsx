import type { Meta, StoryObj } from '@storybook/react'

import FileSystemPage from './FileSystemPage'

const meta: Meta<typeof FileSystemPage> = {
  component: FileSystemPage,
}

export default meta

type Story = StoryObj<typeof FileSystemPage>

export const Primary: Story = {}
