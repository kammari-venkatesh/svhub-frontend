import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Account.css'

const NAV = [
  { to: '/account', label: 'Overview', end: true },
  { to: '/account/profile', label: 'Profile' },
  { to: '/account/orders', label: 'Orders' },
  { to: '/account/addresses', label: 'Addresses' },
]

function displayName(user) {
  return user?.name?.trim() || ''
}

function sectionFromPath(pathname) {
  if (pathname.startsWith('/account/profile')) {
    return {
      id: 'profile',
      crumb: 'Profile',
      title: 'Your details',
      copy: 'Keep your name and contact details current so we can reach you about your orders.',
    }
  }
  if (pathname.startsWith('/account/orders/')) return { id: 'order-detail' }
  if (pathname.startsWith('/account/orders')) return { id: 'orders' }
  if (pathname.startsWith('/account/addresses')) return { id: 'addresses' }
  return { id: 'overview' }
}

function Account() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const name = displayName(user)
  const from = `${location.pathname}${location.search}`
  const section = sectionFromPath(location.pathname)
  const isProfile = section.id === 'profile'
  const isOrderDetail = section.id === 'order-detail'
  const compactShell = isProfile || isOrderDetail

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  async function handleLogout() {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <section
      className={`account${compactShell ? ' account--focus' : ''}${isProfile ? ' account--profile' : ''}${isOrderDetail ? ' account--order' : ''}`}
    >
      {compactShell ? null : (
        <p className="account__mark" aria-hidden="true">
          Goodness
        </p>
      )}

      {isOrderDetail ? null : (
      <header className="account__intro">
        <div className="container">
          {isProfile ? (
            <>
              <nav className="account__crumb" aria-label="Account">
                <Link to="/account">My Account</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Profile</span>
              </nav>
              <h1 className="account__title">{section.title}</h1>
              <p className="account__copy">{section.copy}</p>
            </>
          ) : user ? (
            <>
              <p className="account__eyebrow">My Account</p>
              <h1 className="account__title">
                Welcome back{name ? ',' : ''}
                {name ? (
                  <>
                    <br />
                    <span>{name}.</span>
                  </>
                ) : (
                  '.'
                )}
              </h1>
              <p className="account__copy">Your orders, addresses and account details — all in one place.</p>
              <p className="account__aside">Goodness, made personal.</p>
            </>
          ) : (
            <>
              <p className="account__eyebrow">My Account</p>
              <h1 className="account__title">Hello.</h1>
              <p className="account__copy">
                Log in to see your orders, saved addresses and account details.
              </p>
              <div className="account__intro-actions">
                <Button to="/login" state={{ from }} variant="primary" size="md">
                  Log in
                </Button>
                <Button to="/register" state={{ from }} variant="secondary" size="md">
                  Create account
                </Button>
              </div>
            </>
          )}
        </div>
      </header>
      )}

      <div className="account__body">
        <div className="container account__layout">
          <aside className="account__rail" aria-label="My SV Hub">
            <p className="account__rail-label">My SV Hub</p>
            <nav className="account__nav">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className="account__link">
                  {item.label}
                </NavLink>
              ))}
            </nav>
            {user ? (
              <button type="button" className="account__leave" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <NavLink to="/login" state={{ from }} className="account__leave">
                Log in
              </NavLink>
            )}
          </aside>

          <div className="account__tabs" role="navigation" aria-label="My SV Hub">
            <div className="account__tablist">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className="account__tab">
                  {item.label}
                </NavLink>
              ))}
            </div>
            {user ? (
              <button type="button" className="account__leave account__leave--mobile" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <NavLink to="/login" state={{ from }} className="account__leave account__leave--mobile">
                Log in
              </NavLink>
            )}
          </div>

          <div className="account__main">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
