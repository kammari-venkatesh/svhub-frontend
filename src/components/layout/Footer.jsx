import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import { contact } from '../../data/contact.js'
import { useInView } from '../../hooks/useInView.js'
import './Footer.css'

const shopLinks = [
  { to: '/shop', label: 'Shop All' },
  { to: '/nutri-hub', label: 'Nutri-Hub' },
  { to: '/self-care', label: 'Self-Care' },
]

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const helpLinks = [
  { to: '/shipping-policy', label: 'Shipping Policy' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
]

function Arrow() {
  return (
    <svg className="footer__arrow" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavGroup({ title, links }) {
  return (
    <div className="footer__group">
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>
              {link.label}
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer({ compact = false }) {
  const { ref, visible } = useInView({ rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

  function scrollTop() {
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className={`footer${compact ? ' footer--compact' : ''}${visible ? ' is-in' : ''}`} ref={ref}>
      <span className="footer__grain" aria-hidden="true" />
      <span className="footer__watermark" aria-hidden="true">
        Goodness
      </span>

      <div className="footer__inner">
        <div className="footer__identity">
          <div className="footer__lockup">
            <Logo variant="dark" />
            <p className="footer__meta">Est. 2026 · Coimbatore</p>
          </div>

          <p className="footer__statement">
            <span>Pure.</span>
            <span>Traditional.</span>
            <span>Honest.</span>
          </p>

          <p className="footer__note">
            <span>see you around</span>
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>

        <span className="footer__rule" aria-hidden="true" />

        <nav className="footer__nav" aria-label="Footer">
          <NavGroup title="Shop" links={shopLinks} />
          <NavGroup title="Company" links={companyLinks} />
          <NavGroup title="Help" links={helpLinks} />

          <div className="footer__group footer__group--contact">
            <h3>Contact</h3>
            <p className="footer__hello">Come say hello</p>
            <ul>
              <li>{contact.city}</li>
              <li>
                <a href={`tel:${contact.phoneTel}`}>
                  {contact.phoneDisplay}
                  <Arrow />
                </a>
              </li>
              <li>
                <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp
                  <Arrow />
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                  <Arrow />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__bar">
        <p>© 2026 SV Hub. Coimbatore, Tamil Nadu.</p>
        <button type="button" className="footer__top" onClick={scrollTop}>
          Back to top
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 13V3M4.5 6.5 8 3l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer
