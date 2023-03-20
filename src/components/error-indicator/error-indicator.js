import { Alert } from 'antd'

import './error-indicator.css'

function ErrorIndicator() {
  return <Alert message="Ooops" description="Something wrong here..." type="error" />
}

export default ErrorIndicator
