import { Alert } from 'antd'

import './offline-indicator.css'

function OfflineIndicator() {
  return (
    <div className="offline-massage">
      <Alert message="Ooops" description="You are offline" type="error" />
    </div>
  )
}

export default OfflineIndicator
