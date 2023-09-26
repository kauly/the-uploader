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

import RowActions from './RowActions'

const meta: Meta<typeof RowActions> = {
  component: RowActions,
}

export default meta

type Story = StoryObj<typeof RowActions>

export const Primary: Story = {}
