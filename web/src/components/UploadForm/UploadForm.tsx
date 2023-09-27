import type {
  CreateAssetMutation,
  CreateAssetMutationVariables,
  CreateBucketAssetMutation,
  CreateBucketAssetMutationVariables,
} from 'types/graphql'

import { Form, FileField, Label, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button'
import { useModal } from 'src/state/ModalContext/ModalContext'

interface UploadFormProps {
  page: 'bucket' | 'file'
}
interface FormValues {
  name: string
  asset: File
}

const CREATE_ASSET = gql`
  mutation CreateAssetMutation($input: CreateAssetInput!) {
    createAsset(input: $input) {
      name
    }
  }
`
const CREATE_BUCKET_ASSET = gql`
  mutation CreateBucketAssetMutation($input: CreateBucketAssetInput!) {
    createBucketAsset(input: $input) {
      name
    }
  }
`

const UploadForm = ({ page }: UploadFormProps) => {
  const { closeModal } = useModal()
  const formMethods = useForm()

  const [createAsset, { loading }] = useMutation<
    CreateAssetMutation,
    CreateAssetMutationVariables
  >(CREATE_ASSET, {
    onCompleted: (data) => {
      toast.success(`File ${data?.createAsset?.name ?? 'unavailable'} uploaded`)
      closeModal()
    },
    onError: () => toast.error('Something went wrong'),
    refetchQueries: ['AssetsQuery'],
  })

  const [createBucketAsset, { loading: bucketLoading }] = useMutation<
    CreateBucketAssetMutation,
    CreateBucketAssetMutationVariables
  >(CREATE_BUCKET_ASSET, {
    onCompleted: (data) => {
      toast.success(
        `File ${data?.createBucketAsset?.name ?? 'unavailable'} uploaded`
      )
      closeModal()
    },
    onError: () => toast.error('Something went wrong'),
    refetchQueries: ['BucketsQuery'],
  })

  const handleSubmit = (data: FormValues) => {
    const reader = new FileReader()
    reader.readAsDataURL(data.asset[0])
    reader.onload = function () {
      const base64 = reader.result as string
      const payload = {
        variables: { input: { name: data.asset[0].name, file: base64 } },
      }
      page === 'file' ? createAsset(payload) : createBucketAsset(payload)
    }
  }

  return (
    <div className="flex  h-full w-full flex-col pt-8">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col justify-between"
        formMethods={formMethods}
      >
        <span>
          <Label name="asset">File</Label>
          <FileField name="asset" required />
        </span>

        <div className="ml-auto">
          <Button type="submit" loading={loading || bucketLoading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UploadForm
