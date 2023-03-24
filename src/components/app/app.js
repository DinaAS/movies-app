import { Input, Tabs } from 'antd'
import { debounce } from 'lodash'
import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'

import { GenresProvider } from '../genres-context/genres-context'
import MoviesServices from '../../services/movies-services'
import MoviesList from '../movies-list'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import OfflineIndicator from '../offline-indicator'
import EmptyContainer from '../empty-container'

class App extends React.Component {
  moviesService = new MoviesServices()

  idSession = ''

  constructor() {
    super()
    this.state = {
      current: 'search',
      searchMovies: [],
      ratedMovies: [],
      genres: [],
      loading: false,
      error: false,
      searchValue: '',
      emptyResult: true,
      totalPages: '',
    }

    this.updateFunc = debounce(this.searchMovies, 5000)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    const { searchValue } = this.state
    this.moviesService.getGenres().then((res) => this.setState({ genres: res }))

    this.moviesService
      .createGuestSession()
      .then((id) => {
        this.idSession = id
      })
      .catch((err) => this.onError(err))
    this.updateFunc(searchValue)
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, current } = this.state
    if (prevState.searchValue !== searchValue) {
      this.updateFunc(searchValue)
    }
    if (prevState.current !== current) {
      this.getRatedMovies()
    }
  }

  componentWillUnmount() {
    this.updateFunc()
    this.getRatedMovies()
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
          searchMovies: movies,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  onChangeTab = (key) => {
    this.setState({
      current: key,
      loading: true,
    })
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

  getRatedMovies() {
    this.moviesService
      .getRatedMovies(this.idSession)
      .then((movies) => {
        if (movies.length <= 0) {
          this.setState({
            loading: false,
          })
        } else {
          this.setState({
            ratedMovies: movies,
            loading: false,
            emptyResult: false,
          })
        }
      })
      .catch(this.onError)
    this.moviesService.getTotalPagesRated(this.idSession).then((res) => this.setState({ totalPages: res }))
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
            searchMovies: movies,
            loading: false,
            emptyResult: false,
          })
        }
      })
      .catch(this.onError)
    this.moviesService.getTotalPages(text).then((num) => this.setState({ totalPages: num }))
  }

  render() {
    const { searchMovies, ratedMovies, loading, error, genres, emptyResult, current, totalPages } = this.state
    const input = (
      <Input
        className="search-input"
        placeholder="Type to search..."
        onChange={(e) => this.onChangeInput(e.target.value)}
      />
    )
    const emptyContainer = emptyResult && !loading && !error ? <EmptyContainer /> : null
    const currentList = current === 'search' ? searchMovies : ratedMovies
    const moviesList = (
      <MoviesList
        movies={currentList}
        idSession={this.idSession}
        totalPages={totalPages}
        loading={loading}
        onChange={this.onChange}
      />
    )

    const items = [
      {
        label: 'Search',
        key: 'search',
        children: (
          <>
            {input}
            {emptyContainer}
            {moviesList}
          </>
        ),
      },
      {
        label: 'Rated',
        key: 'rated',
        children: (
          <>
            {emptyResult}
            {moviesList}
          </>
        ),
      },
    ]

    const spin = loading ? <Spinner /> : null
    const errorMassage = error ? <ErrorIndicator /> : null

    return (
      <>
        <Online>
          <GenresProvider value={genres}>
            <div className="main-container">
              <div className="wrapper">
                <Tabs
                  className="tabs"
                  defaultActiveKey="1"
                  destroyInactiveTabPane
                  items={items}
                  centered
                  onChange={this.onChangeTab}
                />
                {spin}
                {errorMassage}
              </div>
            </div>
          </GenresProvider>
        </Online>
        <Offline>
          <OfflineIndicator />
        </Offline>
      </>
    )
  }
}

export default App
