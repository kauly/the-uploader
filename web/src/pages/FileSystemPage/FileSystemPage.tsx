import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import FolderFilesListCell from 'src/components/FolderFilesListCell'
import Modal from 'src/components/Modal/Modal'
import UploadForm from 'src/components/UploadForm/UploadForm'

const FileSystemPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => setIsModalVisible((prev) => !prev)

  return (
    <>
      <MetaTags title="FileSystem" description="FileSystem page" />
      <div className="relative flex h-full w-full flex-col p-4">
        <div>
          <h3 className="text-lg">File System</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <FolderFilesListCell />
          <span className=" ">
            <Button onClick={toggleModal}>Upload</Button>
          </span>
        </div>
      </div>
      <Modal open={isModalVisible} onClose={toggleModal} title="Upload File">
        <UploadForm />
      </Modal>
    </>
  )
}

export default FileSystemPage
