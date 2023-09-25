import { render } from '@redwoodjs/testing/web'

import UploadForm from './UploadForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadForm />)
    }).not.toThrow()
  })
})
