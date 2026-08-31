import { Link, useLocation } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'

function AccountLoginPrompt({
  title = 'Log in to continue',
  copy = 'Sign in to see your orders, profile and saved addresses.',
}) {
  const location = useLocation()
  const from = `${location.pathname}${location.search}`

  return (
    <div className="account-login">
      <h3>{title}</h3>
      <p>{copy}</p>
      <div className="account-login__actions">
        <Button to="/login" state={{ from }} variant="primary" size="md">
          Log in
        </Button>
        <Link className="account-login__register" to="/register" state={{ from }}>
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default AccountLoginPrompt
