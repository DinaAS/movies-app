import React from 'react'
import { Space, Pagination } from 'antd'

import MoviesCard from '../movies-card'

import './movies-list.css'

function MoviesList({ movies, idSession, loading, onChange, totalPages }) {
  const elements = movies.map((item) => {
    const { id, ...itemsProps } = item

    return <MoviesCard props={itemsProps} id={id} key={id} idSession={idSession} loading={loading} />
  })

  const pagination =
    movies.length > 0 && totalPages > 2 ? (
      <Pagination
        className="pagination"
        defaultCurrent={1}
        size="small"
        hideOnSinglePage
        total={totalPages}
        onChange={(e) => {
          onChange(e)
        }}
      />
    ) : null

  return (
    <>
      <Space size="large" className="movies-list">
        {elements}
      </Space>
      {pagination}
    </>
  )
}

export default MoviesList
