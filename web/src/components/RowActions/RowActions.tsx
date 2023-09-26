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
      console.log('🚀 ~ file: RowActions.tsx:10 ~ data:', data)

      /*  const response = await fetch('http://localhost:8911/downloadFile', {
        method: 'POST',
        body: JSON.stringify({ location: data.location }),
      })
      const base64Str = response.body
      const downloadLink = document.createElement('a')
      const fileName = data.name

      downloadLink.href = base64Str
      downloadLink.download = fileName
      downloadLink.click() */
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
