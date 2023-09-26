import { render } from '@redwoodjs/testing/web'

import RowActions from './RowActions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RowActions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RowActions />)
    }).not.toThrow()
  })
})
