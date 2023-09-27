import { render } from '@redwoodjs/testing/web'

import EditForm from './EditForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditForm />)
    }).not.toThrow()
  })
})
