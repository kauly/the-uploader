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
import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from 'types/graphql'

import RowActions from '../RowActions/RowActions'

import DataTable from './DataTable'

const columnHelper = createColumnHelper<Partial<Asset>>()

const columns = [
  columnHelper.accessor('name', {
    cell: (props) => <div>{props.getValue()}</div>,
    header: () => 'File',
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => <RowActions />,
    header: () => 'Actions',
  }),
]

const data = [
  { name: 'photo1.png' },
  { name: 'photo2.png' },
  { name: 'pikachu.stl' },
]

const meta: Meta<typeof DataTable> = {
  component: DataTable,
}

export default meta

type Story = StoryObj<typeof DataTable>

export const Primary: Story = {
  args: {
    data,
    columns,
  },
}
