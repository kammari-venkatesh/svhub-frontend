import { NavLink, Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import './MobileNav.css'

function MobileNav({ open, onClose, links, cartCount }) {
  return (
    <div className={`mobile-nav${open ? ' is-open' : ''}`} id="mobile-nav">
      <button type="button" className="mobile-nav__backdrop" onClick={onClose} aria-label="Close menu" />
      <aside className="mobile-nav__panel" aria-hidden={!open} inert={!open || undefined}>
        <div className="mobile-nav__top">
          <Logo />
          <button type="button" className="mobile-nav__close" onClick={onClose}>
            Close
          </button>
        </div>

        <nav className="mobile-nav__links" aria-label="Mobile">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`
              }
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-nav__footer">
          <Link to="/search" className="mobile-nav__action" onClick={onClose}>
            Search
          </Link>
          <Link to="/account" className="mobile-nav__action" onClick={onClose}>
            Account
          </Link>
          <Link to="/cart" className="mobile-nav__action" onClick={onClose}>
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default MobileNav
