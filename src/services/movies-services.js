export default class MoviesServices {
  apiBase = 'https://api.themoviedb.org/3/'

  apiKey = 'd00a921a92469ca980d7175002ad8c54'

  async getResourse(url) {
    const res = await fetch(`${this.apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`)
    }
    return res.json()
  }

  async searchMovies(text, page = 1) {
    const res = await this.getResourse(`search/movie?query=${text}&api_key=${this.apiKey}&language=en-US&page=${page}`)
    return res.results.map(MoviesServices.transformMoviesList)
  }

  static transformMoviesList(result) {
    return {
      id: result.id,
      title: result.title,
      releaseDate: result.release_date,
      genres: result.genre_ids,
      overview: result.overview,
      poster: result.poster_path,
      rate: result.vote_average,
    }
  }
}
