import { createColumnHelper } from '@tanstack/react-table'
import type { BucketAsset, BucketsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DataTable from 'src/components/DataTable'

export const QUERY = gql`
  query BucketsQuery {
    bucketAssets {
      id
      name
      version
    }
  }
`
const columnHelper = createColumnHelper<Partial<BucketAsset>>()
const columns = [
  columnHelper.accessor('name', {
    cell: (props) => <div>{props.getValue()}</div>,
    header: () => 'File',
  }),
  columnHelper.accessor('version', {
    cell: (props) => <div>{props.getValue()}</div>,
    header: () => 'Version',
  }),
]

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>You dont have files yet...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ bucketAssets }: CellSuccessProps<BucketsQuery>) => {
  return <DataTable data={bucketAssets} columns={columns} />
}
