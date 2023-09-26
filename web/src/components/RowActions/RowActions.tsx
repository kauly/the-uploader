import { HardDriveDownloadIcon, PencilIcon, Trash2Icon } from 'lucide-react'

interface RowActionsProps<D> {
  onDelete?: (data: D) => void
  onEdit?: (data: D) => void
  data?: D
}

function RowActions<D>({ onDelete, onEdit, data }: RowActionsProps<D>) {
  const editWrapper = () => onEdit(data)
  const deleteWrapper = () => onDelete(data)
  const downloadWrapper = async () => {
    try {
      const response = await fetch(
        'http:/localhost:8910/.redwood/functions/downloadFile',
        {
          method: 'POST',
          body: JSON.stringify({ id: data.id }),
        }
      )
      const base64Str = response.body
      console.log(
        '🚀 ~ file: RowActions.tsx:22 ~ downloadWrapper ~ base64Str:',
        base64Str
      )
      const base64response = await fetch(base64Str)
      const blob = await base64response.blob()
      const downloadLink = document.createElement('a')
      const fileName = data.name

      downloadLink.href = blob
      downloadLink.download = fileName
      downloadLink.click()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <HardDriveDownloadIcon
        className="cursor-pointer hover:skew-y-12"
        onClick={downloadWrapper}
      />
      <PencilIcon
        className="cursor-pointer hover:skew-y-12"
        onClick={editWrapper}
      />
      <Trash2Icon
        className="cursor-pointer hover:skew-y-12"
        onClick={deleteWrapper}
      />
    </div>
  )
}

export default RowActions
