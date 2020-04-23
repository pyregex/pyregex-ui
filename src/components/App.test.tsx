import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

xtest('renders learn react link', () => {
  const { container } = render(<App />)
  expect(container.innerHTML).toEqual('<div>PyRegex</div>')
})
