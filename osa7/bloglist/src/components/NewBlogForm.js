import React, { useState } from 'react'
import FormInput from './FormInput'
import { Button, Form } from 'react-bootstrap'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createClicked = (event) => {
    event.preventDefault()
    console.log(`createClicked: title:${title} author:${author} url:${url}`)
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={createClicked}>
        <FormInput name="title" value={title} valueChanged={setTitle} />
        <FormInput name="author" value={author} valueChanged={setAuthor} />
        <FormInput name="url" value={url} valueChanged={setUrl} />
        <div>
          <Button type="submit">create</Button>
        </div>
      </Form>
    </div>
  )
}

export default NewBlogForm
