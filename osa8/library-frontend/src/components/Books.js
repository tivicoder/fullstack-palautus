import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 } )

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return(
      <div> loading </div>
    )
  }

  const books = result.data.allBooks
  let genres = result.data.allBooks.map(book => book.genres).reduce((res, elem) => res.concat(elem))
  genres = [...new Set(genres)] // make unique
  console.log('all books:', books)
  console.log('all genres:', genres)

  const genreClicked = ({ target }) => {
    console.log(target.value)
    setSelectedGenre(target.value)
    result.refetch({ variables: { genre: selectedGenre } })
  }

  return (
    <div>
      <h2>books</h2>

      <div>in genre <b>{selectedGenre}</b></div>

      <BookList genre={selectedGenre} />
      {genres.map(genre =>
        <button key={genre} value={genre} onClick={genreClicked}>{genre}</button>
      )}
      <button value='all genres' onClick={genreClicked}>all genres</button>
    </div>
  )
}

export default Books