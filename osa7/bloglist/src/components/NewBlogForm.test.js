import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('adding new blog causes callback function to be called with correct input', () => {
  const mockHandler = jest.fn()
  const component = render(
    <NewBlogForm addBlog={mockHandler} />
  )

  // Change new blog input fields
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  fireEvent.change(author, { target: { value: 'new author' } })
  fireEvent.change(title, { target: { value: 'new title' } })
  fireEvent.change(url, { target: { value: 'new url' } })

  // submit form
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  const addBlogArgs = mockHandler.mock.calls[0][0]
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(addBlogArgs.author).toBe('new author')
  expect(addBlogArgs.title).toBe('new title')
  expect(addBlogArgs.url).toBe('new url')
})
