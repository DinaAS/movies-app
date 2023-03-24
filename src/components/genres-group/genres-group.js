import { Space, Button } from 'antd'

import './genres-group.css'

function GenresGroup({ genres, genresIds }) {
  const genresArr = genres.filter((genre) => genresIds.includes(genre.id))
  const genresNames = genresArr.slice(0, 3).map((genre) => {
    const { id, name } = genre

    return (
      <Button key={id} className="genre-btn">
        {name}
      </Button>
    )
  })
  return <Space className="genres-group">{genresNames}</Space>
}

export default GenresGroup
