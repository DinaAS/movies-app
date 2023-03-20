import { Button, Card, Space, Rate } from 'antd'
import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'

import Spinner from '../spinner'
import './movies-card.css'

import iconNoImage from './no-image.png'

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

  constructor({ props }) {
    super()
    this.title = props.title
    this.releaseDate = props.releaseDate
    this.genres = props.genres
    this.overview = props.overview
    this.poster = props.poster
    this.rate = props.rate
    this.loading = props.loading
    this.newTitle = this.sliceTitle()
  }

  sliceTitle() {
    let newTitle = this.title
    if (newTitle.length > 17) {
      let count = newTitle.length - 1
      while (newTitle[count] !== ' ') {
        count -= 1
      }
      newTitle = `${newTitle.slice(0, count)} ...`
    }
    return newTitle
  }

  render() {
    const spin = this.loading ? <Spinner /> : null
    const iconImage = this.poster ? (
      <img className="poster" src={`https://image.tmdb.org/t/p/original/${this.poster}`} alt="poster" />
    ) : (
      <img className="poster" src={iconNoImage} alt="poster" />
    )

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

    let classNameOfRateIcon = 'rate-icon'

    if (this.rate >= 7) {
      classNameOfRateIcon += ' green'
    }

    if (this.rate < 7 && this.rate >= 5) {
      classNameOfRateIcon += ' yellow'
    }

    if (this.rate < 5) {
      classNameOfRateIcon += ' red'
    }

    return (
      <Card className="card-container">
        <Card.Grid className="poster-container" hoverable={false}>
          {spin}
          {iconImage}
        </Card.Grid>

        <Card.Grid className="content-container" hoverable={false}>
          <div className="card-header">
            <h5 className="title">{this.newTitle}</h5>
            <div className={classNameOfRateIcon}>{this.rate.toFixed(1)}</div>
          </div>
          <span className="date-release">{date}</span>
          <Space className="genres-group">{genresNames}</Space>
          <div className="overview">{this.overview}</div>
          <Rate className="rate-star" disabled value={this.rate} count={10} allowHalf />
        </Card.Grid>
      </Card>
    )
  }
}

export default MoviesCard
