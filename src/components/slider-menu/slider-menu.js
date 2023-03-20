import { useState } from 'react'
import { Menu } from 'antd'
import './slider-menu.css'

const items = [
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Rated',
    key: 'rated',
  },
]

function SliderMenu() {
  const [current, setCurrent] = useState('search')
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return <Menu className="menu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default SliderMenu
