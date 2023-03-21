import React from 'react'
import { Space, Pagination } from 'antd'

import MoviesCard from '../movies-card'

import './movies-list.css'

function MoviesList({ movies, loading, onChange }) {
  const elements = movies.map((item) => {
    const { id, ...itemsProps } = item

    return <MoviesCard props={itemsProps} key={id} loading={loading} />
  })

  return (
    <>
      <Space size="large" className="movies-list">
        {elements}
      </Space>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={50}
        onChange={(e) => {
          onChange(e)
        }}
      />
    </>
  )
}

export default MoviesList
