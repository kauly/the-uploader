import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import FolderFilesListCell from 'src/components/FolderFilesListCell'
import UploadForm from 'src/components/UploadForm/UploadForm'
import { useModal } from 'src/state/ModalContext/ModalContext'

const FileSystemPage = () => {
  const { openModal } = useModal()

  const toggleModal = () => openModal(<UploadForm />, 'File Upload')

  return (
    <>
      <MetaTags title="FileSystem" description="FileSystem page" />
      <div className="relative flex h-full w-full flex-col p-4">
        <div className="relative h-8 w-full overflow-hidden">
          <h3 className="header-animation-text absolute text-lg">
            File System
          </h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <FolderFilesListCell />
          <Button onClick={toggleModal} size="big">
            Upload
          </Button>
        </div>
      </div>
    </>
  )
}

export default FileSystemPage
