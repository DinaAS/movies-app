import { Card, Rate, Alert } from 'antd'
import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { truncate } from 'lodash'

import MoviesServices from '../../services/movies-services'
import Spinner from '../spinner'
import { GenresConsumer } from '../genres-context/genres-context'
import GenresGroup from '../genres-group'

import './movies-card.css'
import iconNoImage from './no-image.png'

class MoviesCard extends React.Component {
  moviesService = new MoviesServices()

  constructor({ props, id, idSession }) {
    super()
    this.id = id
    this.idSession = idSession
    this.title = props.title
    this.releaseDate = props.releaseDate
    this.genresIds = props.genresIds
    this.overview = props.overview
    this.poster = props.poster
    this.rate = props.rate
    this.loading = props.loading
    this.rating = props.rating
    this.newTitle = this.sliceTitle()
    this.newOverview = this.sliceOverview()

    this.state = {
      sendRate: false,
    }
  }

  onChangeRate(e) {
    this.moviesService.sendRate(this.idSession, this.id, e).then((res) => {
      if (res.ok) {
        this.setState({
          sendRate: true,
        })
      }
    })
  }

  sliceTitle() {
    const newTitle = truncate(this.title, {
      length: 20,
      separator: ' ',
      omission: '...',
    })

    return newTitle
  }

  sliceOverview() {
    const newOverview = truncate(this.overview, {
      length: 120,
      separator: ' ',
      omission: '...',
    })
    return newOverview
  }

  render() {
    const { sendRate } = this.state
    const alert = sendRate ? <Alert className="alert" message="Rate send" type="success" /> : null
    const spin = this.loading ? <Spinner /> : null
    const iconImage = this.poster ? (
      <img className="poster" src={`https://image.tmdb.org/t/p/original/${this.poster}`} alt="poster" />
    ) : (
      <img className="poster" src={iconNoImage} alt="poster" />
    )

    const date = this.releaseDate ? format(parseISO(this.releaseDate), 'MMMM dd, yyyy', { locale: enGB }) : null

    const rating = this.rating ? this.rating : 0

    let classNameOfRateIcon = 'rate-icon'

    if (this.rate > 7) {
      classNameOfRateIcon += ' green'
    }

    if (this.rate >= 5 && this.rate <= 7) {
      classNameOfRateIcon += ' orange'
    }

    if (this.rate < 5 && this.rate >= 3) {
      classNameOfRateIcon += ' yellow'
    }

    if (this.rate < 3) {
      classNameOfRateIcon += ' red'
    }

    return (
      <GenresConsumer>
        {(genres) => {
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
                <GenresGroup genres={genres} genresIds={this.genresIds} />
                <div className="overview">{this.newOverview}</div>
                {alert}
                <Rate
                  className="rate-star"
                  defaultValue={rating}
                  count={10}
                  allowHalf
                  onChange={(e) => this.onChangeRate(e)}
                />
              </Card.Grid>
            </Card>
          )
        }}
      </GenresConsumer>
    )
  }
}

export default MoviesCard
