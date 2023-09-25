import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
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
          <h3>File System</h3>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div>a table</div>
          <span>
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
