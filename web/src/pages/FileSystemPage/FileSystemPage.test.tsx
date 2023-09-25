import { render } from '@redwoodjs/testing/web'

import FileSystemPage from './FileSystemPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FileSystemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileSystemPage />)
    }).not.toThrow()
  })
})
