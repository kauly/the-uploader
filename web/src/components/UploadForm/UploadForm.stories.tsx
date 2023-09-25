// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import UploadForm from './UploadForm'

const meta: Meta<typeof UploadForm> = {
  component: UploadForm,
}

export default meta

type Story = StoryObj<typeof UploadForm>

export const Primary: Story = {}
