import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

function Layout() {
  return (
    <div className="page-frame">
      <div className="page-shell">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
