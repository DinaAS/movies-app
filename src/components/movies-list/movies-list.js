import React from 'react'
import { Space } from 'antd'

import MoviesCard from '../movies-card'
import MoviesServices from '../../services/movies-services'
import './movies-list.css'

class MoviesList extends React.Component {
  moviesService = new MoviesServices()

  constructor() {
    super()
    this.searchMovies()
    this.state = {
      movies: [],
    }
  }

  searchMovies() {
    this.moviesService.searchMovies('return').then((list) => {
      this.setState({
        movies: list,
      })
    })
  }

  render() {
    const { movies } = this.state
    const elements = movies.map((item) => {
      const { id, ...itemsProps } = item

      return <MoviesCard props={itemsProps} key={id} />
    })

    return <Space className="movies-list">{elements}</Space>
  }
}

export default MoviesList
