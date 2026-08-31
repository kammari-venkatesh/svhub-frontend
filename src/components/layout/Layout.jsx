import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

function Layout() {
  const { pathname } = useLocation()
  const bare =
    pathname === '/checkout' || pathname === '/order-success' || pathname === '/payment-failed'
  const compactFooter = pathname.startsWith('/account') || pathname === '/about'

  return (
    <div className="page-frame">
      <div className="page-shell">
        {bare ? null : <Navbar />}
        <main>
          <Outlet />
        </main>
        {bare ? null : <Footer compact={compactFooter} />}
      </div>
    </div>
  )
}

export default Layout
