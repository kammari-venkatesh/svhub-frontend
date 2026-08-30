import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo variant="dark" />
          <p className="footer__motto">Pure. Traditional. Honest.</p>
        </div>

        <nav aria-label="Footer">
          <div>
            <h3>Shop</h3>
            <ul>
              <li>
                <Link to="/shop">Shop All</Link>
              </li>
              <li>
                <Link to="/nutri-hub">Nutri-Hub</Link>
              </li>
              <li>
                <Link to="/self-care">Self-Care</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Help</h3>
            <ul>
              <li>
                <Link to="/shipping">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/refund">Refund Policy</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>Coimbatore, Tamil Nadu</li>
              <li>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hello@svhub.in">hello@svhub.in</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__bar">
        <p>© 2026 SV Hub. Coimbatore, Tamil Nadu.</p>
      </div>
    </footer>
  )
}

export default Footer
