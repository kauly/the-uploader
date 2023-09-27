import type {
  CreateAssetMutation,
  CreateAssetMutationVariables,
} from 'types/graphql'

import { Form, FileField, Label, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useModal } from 'src/state/ModalContext/ModalContext'

import Button from '../Button/Button'

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

const UploadForm = () => {
  const { closeModal } = useModal()
  const formMethods = useForm()
  const [create, { loading }] = useMutation<
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

  const handleSubmit = (data: FormValues) => {
    const reader = new FileReader()
    reader.readAsDataURL(data.asset[0])
    reader.onload = function () {
      const base64 = reader.result as string
      create({
        variables: { input: { name: data.asset[0].name, file: base64 } },
      })
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
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UploadForm
