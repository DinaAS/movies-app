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

  async searchMovies(text) {
    const res = await this.getResourse(`search/movie?query=${text}&api_key=${this.apiKey}&language=en-US&page=1`)
    return res.results
  }
}
