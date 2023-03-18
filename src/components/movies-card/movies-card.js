import { Button, Card, Space } from 'antd'
import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'

import './movies-card.css'

class MoviesCard extends React.Component {
  genresData = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ]

  constructor(props) {
    super(props)

    this.title = props.props.original_title
    this.releaseDate = props.props.release_date
    this.genres = props.props.genre_ids
    this.overview = props.props.overview
    this.poster = props.props.poster_path
    this.newOverview = this.sliceOverview()
  }

  sliceOverview() {
    let newOverview = this.overview
    if (newOverview.length > 185) {
      for (let i = newOverview.length - 1; i > 0; i -= 1) {
        if (newOverview[i] === ' ') {
          newOverview = `${this.overview.slice(0, 198)} ...`
        }
      }
    }
    return newOverview
  }

  render() {
    const date = this.releaseDate ? format(parseISO(this.releaseDate), 'MMMM dd, yyyy', { locale: enGB }) : null
    const genresArr = this.genresData.filter((genre) => this.genres.includes(genre.id))
    const genresNames = genresArr.slice(0, 3).map((genre) => {
      const { id, name } = genre

      return (
        <Button key={id} className="genre-btn">
          {name}
        </Button>
      )
    })

    return (
      <Card className="card-container">
        <Card.Grid className="poster-container" hoverable={false}>
          <img className="poster" src={`https://image.tmdb.org/t/p/original/${this.poster}`} alt="" />
        </Card.Grid>

        <Card.Grid className="content-container" hoverable={false}>
          <h5 className="title">{this.title}</h5>
          <span className="date-release">{date}</span>
          <Space className="genres-group">{genresNames}</Space>
          <div className="overview">{this.newOverview}</div>
        </Card.Grid>
      </Card>
    )
  }
}

export default MoviesCard

// list.map((movie) => {
//     const { genre_ids } = movie
// const genresArray = this.genresData.map((genre) => {
//   if (genre_ids.includes(genre.id)) {
//     return genre.name
//   }
// })

//     return this.setState({
//       title: movie.original_title,
//       releaseDate: movie.release_date,
//       genres: genresArray,
//       overview: movie.overview,
//     })
//   })
