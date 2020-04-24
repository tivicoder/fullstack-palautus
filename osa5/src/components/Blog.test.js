import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'test author',
  title: 'test title',
  url: 'test url',
  likes: 43,
  user: {
    name: 'test creator'
  }
}

test('renders: title author', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog  blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} allowRemove={(mockHandler)} />
  )

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
})

test('expanded content has: url, likes and creator', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog  blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} allowRemove={(mockHandler)} />
  )

  const expandedDiv = component.container.querySelector('.expanded')

  expect(expandedDiv).toHaveTextContent(`${blog.url}`)
  expect(expandedDiv).toHaveTextContent(`likes ${blog.likes}`)
  expect(expandedDiv).toHaveTextContent(`${blog.user.name}`)
})

test('expanded content is hidden by default', () => {
  const component = render(
    <Blog  blog={blog} likeBlog={() => 0} removeBlog={() => 0} allowRemove={(() => 0)} />
  )

  const expandedDiv = component.container.querySelector('.expanded')
  expect(expandedDiv).toHaveStyle('display: none')
})

test('clicking "view" button shows expanded content', () => {
  const component = render(
    <Blog  blog={blog} likeBlog={() => 0} removeBlog={() => 0} allowRemove={(() => 0)} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const expandedDiv = component.container.querySelector('.expanded')
  expect(expandedDiv).not.toHaveStyle('display: none')
})

test('clicking "like" button twice causes event handler to be called twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog  blog={blog} likeBlog={mockHandler} removeBlog={() => 0} allowRemove={(() => 0)} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
