import { useMutation } from '@apollo/client'
import { HardDriveDownloadIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import {
  Asset,
  DeleteAssetMutation,
  DeleteAssetMutationVariables,
} from 'types/graphql'

import { toast } from '@redwoodjs/web/dist/toast'

import Spinner from '../Spinner/Spinner'

interface RowActionsProps {
  data?: Partial<Asset>
}

const DELETE_ASSET = gql`
  mutation DeleteAssetMutation($id: String!) {
    deleteAsset(id: $id) {
      id
    }
  }
`

function RowActions({ data }: RowActionsProps) {
  const [deleteAsset, { loading }] = useMutation<
    DeleteAssetMutation,
    DeleteAssetMutationVariables
  >(DELETE_ASSET, {
    refetchQueries: ['AssetsQuery'],
    onCompleted: () => toast.success(`File ${data.name} deleted`),
    onError: () => toast.error('Something went wrong'),
  })

  const downloadWrapper = async () => {
    try {
      const response = await fetch('.redwood/functions/downloadFile', {
        method: 'POST',
        body: JSON.stringify({ id: data.id }),
      })

      if (!response.ok) {
        return
      }
      const buff = []
      for await (const chunk of response.body) {
        buff.push(chunk)
      }

      const blob = new Blob(buff, {
        type: response.headers.get('Content-Type'),
      })
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = data.name
      downloadLink.click()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = () => {
    deleteAsset({ variables: { id: data.id } })
  }

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <HardDriveDownloadIcon
        className="cursor-pointer hover:skew-y-12"
        onClick={downloadWrapper}
      />
      <PencilIcon
        className="cursor-pointer hover:skew-y-12"
        // onClick={editWrapper}
      />
      {loading ? (
        <Spinner />
      ) : (
        <Trash2Icon
          className="cursor-pointer hover:skew-y-12"
          onClick={handleDelete}
        />
      )}
    </div>
  )
}

export default RowActions
