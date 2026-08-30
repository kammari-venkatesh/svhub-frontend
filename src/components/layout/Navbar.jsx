import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../brand/Logo.jsx'
import MobileNav from './MobileNav.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/nutri-hub', label: 'Nutri-Hub' },
  { to: '/self-care', label: 'Self-Care' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function IconAccount() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19.2c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconCart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7h15l-1.4 9.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.6L4.2 4.8H2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="21" r="1.15" fill="currentColor" />
      <circle cx="17" cy="21" r="1.15" fill="currentColor" />
    </svg>
  )
}

function Navbar() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    function onKey(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Logo />

        <nav className="navbar__pill" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/account" className="navbar__icon navbar__icon--desktop" aria-label="Account">
            <IconAccount />
          </Link>
          <Link to="/cart" className="navbar__icon" aria-label={`Cart, ${count} items`}>
            <IconCart />
            {count > 0 && <span className="navbar__badge">{count}</span>}
          </Link>
          <button
            type="button"
            className="navbar__menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
        cartCount={count}
      />
    </header>
  )
}

export default Navbar
