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

import EditForm from './EditForm'

const meta: Meta<typeof EditForm> = {
  component: EditForm,
}

export default meta

type Story = StoryObj<typeof EditForm>

export const Primary: Story = {}
