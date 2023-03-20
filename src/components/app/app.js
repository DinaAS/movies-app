import { Layout, Input, Pagination } from 'antd'
import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'

import MoviesServices from '../../services/movies-services'
import MoviesList from '../movies-list'
import SliderMenu from '../slider-menu'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import OfflineIndicator from '../offline-indicator'

class App extends React.Component {
  moviesService = new MoviesServices()

  constructor() {
    super()
    this.state = {
      movies: [],
      loading: true,
      error: false,
    }

    this.searchMovies()
    this.onChange = this.onChange.bind(this)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  onChange(number) {
    this.moviesService.searchMovies('return', number).then((movies) => {
      this.setState({
        movies,
        loading: false,
      })
    })
  }

  searchMovies() {
    this.moviesService
      .searchMovies('return')
      .then((movies) => {
        this.setState({
          movies,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { movies, loading, error } = this.state

    const spin = loading ? <Spinner /> : null
    const errorMassage = error ? <ErrorIndicator /> : null

    return (
      <>
        <Online>
          <Layout className="container">
            <div className="wrapper">
              <SliderMenu />

              <Input className="search-input" placeholder="Type to search..." />
              {spin}
              {errorMassage}
              <MoviesList movies={movies} loading={loading} />

              {!error && <Pagination className="pagination" defaultCurrent={1} total={50} onChange={this.onChange} />}
            </div>
          </Layout>
        </Online>
        <Offline>
          <OfflineIndicator />
        </Offline>
      </>
    )
  }
}

export default App
