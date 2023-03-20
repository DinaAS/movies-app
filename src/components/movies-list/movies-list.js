import React from 'react'
import { Space } from 'antd'

import MoviesCard from '../movies-card'

import './movies-list.css'

function MoviesList({ movies, loading }) {
  const elements = movies.map((item) => {
    const { id, ...itemsProps } = item

    return <MoviesCard props={itemsProps} key={id} loading={loading} />
  })

  return (
    <Space size="large" className="movies-list">
      {elements}
    </Space>
  )
}

export default MoviesList
