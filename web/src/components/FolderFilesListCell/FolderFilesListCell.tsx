import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DataTable from '../DataTable/DataTable'
import RowActions from '../RowActions/RowActions'

const columnHelper = createColumnHelper<Partial<Asset>>()
const columns = [
  columnHelper.accessor('name', {
    cell: (props) => <div>{props.getValue()}</div>,
    header: () => 'File',
  }),
  columnHelper.accessor('location', {
    cell: (props) => <div>{props.getValue()}</div>,
    header: () => 'Location',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions data={props.row.original} />,
    header: () => 'Actions',
  }),
]
export const QUERY = gql`
  query AssetsQuery {
    assets {
      id
      name
      location
      ext
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="text-base">You dont have files yet...</div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ assets }: CellSuccessProps) => {
  return <DataTable<Partial<Asset>> columns={columns} data={assets} />
}
