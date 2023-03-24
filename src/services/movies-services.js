export default class MoviesServices {
  apiBase = 'https://api.themoviedb.org/'

  apiKey = 'd00a921a92469ca980d7175002ad8c54'

  async getResourse(url) {
    const res = await fetch(`${this.apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`)
    }
    return res.json()
  }

  async getGenres() {
    const res = await this.getResourse(`3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    return res.genres
  }

  async createGuestSession() {
    const res = await this.getResourse(`3/authentication/guest_session/new?api_key=${this.apiKey}`)
    return res.guest_session_id
  }

  async sendRate(idSession, id, value) {
    const res = await fetch(
      `${this.apiBase}3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${idSession}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value,
        }),
      }
    )
    return res
  }

  async searchMovies(text, page = 1) {
    const res = await this.getResourse(
      `3/search/movie?query=${text}&api_key=${this.apiKey}&language=en-US&page=${page}`
    )
    return res.results.map(MoviesServices.transformMoviesList)
  }

  async getTotalPages(text) {
    const res = await this.getResourse(`3/search/movie?query=${text}&api_key=${this.apiKey}&language=en-US&`)
    return res.total_pages
  }

  async getRatedMovies(idSession) {
    const res = await this.getResourse(
      `3/guest_session/${idSession}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    )
    return res.results.map(MoviesServices.transformMoviesList)
  }

  async getTotalPagesRated(idSession) {
    const res = await this.getResourse(
      `3/guest_session/${idSession}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    )
    return res.total_pages
  }

  static transformMoviesList(result) {
    return {
      id: result.id,
      title: result.title,
      releaseDate: result.release_date,
      genresIds: result.genre_ids,
      overview: result.overview,
      poster: result.poster_path,
      rate: result.vote_average,
      rating: result.rating,
    }
  }
}
