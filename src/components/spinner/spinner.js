import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import './spinner.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Spinner() {
  return (
    <div className="spin-container">
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Spinner
