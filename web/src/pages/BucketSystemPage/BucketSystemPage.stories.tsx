import type { Meta, StoryObj } from '@storybook/react'

import BucketSystemPage from './BucketSystemPage'

const meta: Meta<typeof BucketSystemPage> = {
  component: BucketSystemPage,
}

export default meta

type Story = StoryObj<typeof BucketSystemPage>

export const Primary: Story = {}
