import type { MutationsaveFileArgs } from 'types/graphql'

import { Form, FileField, Label, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from '../Button/Button'

interface FormValues {
  name: string
  asset: FileList
}

const SAVE_FILE = gql`
  mutation SaveFileMutation($file: File!) {
    saveFile(file: $file)
  }
`

const UploadForm = () => {
  const [create, { loading }] = useMutation<MutationsaveFileArgs>(SAVE_FILE, {
    onCompleted: (data) => {
      toast.success(`File ${data?.file ?? 'unavailable'} uploaded`)
      formMethods.reset()
    },
    refetchQueries: ['AssetsQuery'],
  })
  const formMethods = useForm()

  const handleSubmit = (data: FormValues) => {
    const formData = new FormData()
    formData.append('file', data.asset[0])
    create({
      variables: { file: formData },
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
