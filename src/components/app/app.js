import { Layout } from 'antd'
import React from 'react'

import MoviesList from '../movies-list'

import './app.css'

class App extends React.Component {
  render() {
    return (
      <Layout className="container">
        <MoviesList />
      </Layout>
    )
  }
}

export default App
