import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import BookList from './BookList'

const Recommend = (props) => {
  const result = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      const genre = result.data.me.favoriteGenre
      console.log('favorite genre:', genre)
      setFavoriteGenre(genre)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return(
      <div> loading </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{favoriteGenre}</b></div>

      <BookList genre={favoriteGenre} />

    </div>
  )
}

export default Recommend