import type {
  UpdateAssetMutation,
  UpdateAssetMutationVariables,
} from 'types/graphql'

import { Form, Label, useForm, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useModal } from 'src/state/ModalContext/ModalContext'

import Button from '../Button/Button'

interface FormValues {
  name: string
}

interface EditFormProps {
  assetId: string
}

const UPDATE_ASSET = gql`
  mutation UpdateAssetMutation($id: String!, $input: UpdateAssetInput!) {
    updateAsset(id: $id, input: $input) {
      name
    }
  }
`

const EditForm = ({ assetId }: EditFormProps) => {
  const { closeModal } = useModal()
  const formMethods = useForm()
  const [create, { loading }] = useMutation<
    UpdateAssetMutation,
    UpdateAssetMutationVariables
  >(UPDATE_ASSET, {
    onCompleted: (data) => {
      toast.success(`File ${data.updateAsset.name ?? 'unavailable'} updated`)
      closeModal()
    },
    onError: () => toast.error('Something went wrong'),
    refetchQueries: ['AssetsQuery'],
  })

  const handleSubmit = (data: FormValues) => {
    create({
      variables: { input: { name: data.name }, id: assetId },
    })
  }

  return (
    <div className="flex  h-full w-full flex-col pt-8">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col justify-between"
        formMethods={formMethods}
      >
        <span>
          <Label name="name">Name</Label>
          <TextField name="name" required />
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

export default EditForm
