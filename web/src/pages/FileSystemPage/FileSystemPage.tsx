import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import FolderFilesListCell from 'src/components/FolderFilesListCell'
import UploadForm from 'src/components/UploadForm/UploadForm'
import { useModal } from 'src/state/ModalContext/ModalContext'

const FileSystemPage = () => {
  const { openModal } = useModal()

  const toggleModal = () => openModal(<UploadForm page="file" />, 'File Upload')

  return (
    <>
      <MetaTags title="FileSystem" description="FileSystem page" />
      <div className="relative flex h-full w-full flex-col gap-2">
        <h3 className="text-lg">File System</h3>
        <div className="flex flex-1 flex-col items-center gap-2 p-2 sm:p-0">
          <FolderFilesListCell />
          <div className="ml-auto">
            <Button onClick={toggleModal} size="big">
              Upload
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileSystemPage
