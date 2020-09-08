import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const NewCommentForm = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams('id').id

  const createClicked = (event) => {
    event.preventDefault()
    console.log(`createClicked: comment:${comment}`)
    dispatch(addComment(id, comment))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={createClicked}>
        <input id='comment' type='text' value={comment} onChange={({ target }) => {setComment(target.value)}} />
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default NewCommentForm
