import { MetaTags } from '@redwoodjs/web'

import BucketListCell from 'src/components/BucketListCell'
import Button from 'src/components/Button/Button'
import UploadForm from 'src/components/UploadForm/UploadForm'
import { useModal } from 'src/state/ModalContext/ModalContext'

const BucketSystemPage = () => {
  const { openModal } = useModal()

  const toggleModal = () =>
    openModal(<UploadForm page="bucket" />, 'Bucket Upload')

  return (
    <>
      <MetaTags title="BucketSystem" description="BucketSystem page" />
      <div className="relative flex h-full w-full flex-col gap-2">
        <h3 className="text-lg">Bucket System</h3>
        <div className="flex flex-1 flex-col items-center gap-2 p-2 sm:p-0">
          <BucketListCell />
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

export default BucketSystemPage
