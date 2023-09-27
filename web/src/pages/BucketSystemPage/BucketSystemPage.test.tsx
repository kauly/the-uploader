import { render } from '@redwoodjs/testing/web'

import BucketSystemPage from './BucketSystemPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BucketSystemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BucketSystemPage />)
    }).not.toThrow()
  })
})
