// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="flex gap-8">
        <Button size="big">Local Files</Button>
        <Button size="big">S3 Files</Button>
      </div>
    </>
  )
}

export default HomePage
