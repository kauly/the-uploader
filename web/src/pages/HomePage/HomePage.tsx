import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'

const HomePage = () => {
  const handleLocal = () => navigate(routes.fileSystem())
  const handleBucket = () => navigate(routes.bucketSystem())

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="flex justify-center gap-8">
        <Button size="big" onClick={handleLocal}>
          Local Files
        </Button>
        <Button size="big" onClick={handleBucket}>
          Bucket Files
        </Button>
      </div>
    </>
  )
}

export default HomePage
