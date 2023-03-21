import { Empty } from 'antd'

import './empty-container.css'

export default function EmptyContainer() {
  return (
    <div className="empty-container">
      <Empty description={<span>No results</span>} />
    </div>
  )
}
