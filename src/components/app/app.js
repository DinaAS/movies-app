import { Input } from 'antd'
import { debounce } from 'lodash'
import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'

import MoviesServices from '../../services/movies-services'
import MoviesList from '../movies-list'
import SliderMenu from '../slider-menu'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import OfflineIndicator from '../offline-indicator'
import EmptyContainer from '../empty-container'

class App extends React.Component {
  moviesService = new MoviesServices()

  constructor() {
    super()
    this.state = {
      movies: [],
      loading: false,
      error: false,
      searchValue: '',
      emptyResult: true,
    }

    this.updateFunc = debounce(this.searchMovies, 5000)
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.state
    if (prevState.searchValue !== searchValue) {
      this.updateFunc(searchValue)
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  onChange(number) {
    const { searchValue } = this.state
    this.moviesService
      .searchMovies(searchValue, number)
      .then((movies) => {
        this.setState({
          movies,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  onChangeInput = (e) => {
    if (e.length <= 0) {
      this.setState(() => {
        return {
          loading: false,
        }
      })
    } else {
      this.setState(() => {
        return {
          movies: [],
          searchValue: e,
          loading: true,
        }
      })
    }
  }

  searchMovies(text) {
    this.moviesService
      .searchMovies(text)
      .then((movies) => {
        if (movies.length <= 0) {
          this.setState({
            emptyResult: true,
            loading: false,
          })
        } else {
          this.setState({
            movies,
            loading: false,
            emptyResult: false,
          })
        }
      })
      .catch(this.onError)
  }

  render() {
    const { movies, loading, error, emptyResult } = this.state

    const spin = loading ? <Spinner /> : null
    const errorMassage = error ? <ErrorIndicator /> : null
    const mainContent = !emptyResult ? (
      <MoviesList movies={movies} loading={loading} onChange={this.onChange} />
    ) : (
      <EmptyContainer />
    )

    return (
      <>
        <Online>
          <div className="main-container">
            <div className="wrapper">
              <SliderMenu />

              <Input
                className="search-input"
                placeholder="Type to search..."
                onChange={(e) => this.onChangeInput(e.target.value)}
              />
              {spin}
              {errorMassage}
              {mainContent}
            </div>
          </div>
        </Online>
        <Offline>
          <OfflineIndicator />
        </Offline>
      </>
    )
  }
}

export default App
