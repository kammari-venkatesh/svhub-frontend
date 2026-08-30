import { Link } from 'react-router-dom'
import './Logo.css'

function Logo({ variant = 'light', compact = false }) {
  return (
    <Link to="/" className={`logo logo--${variant}`} aria-label="SV Hub home">
      <span className="logo__mark" aria-hidden="true">
        SV
      </span>
      {!compact && (
        <span className="logo__text">
          <span className="logo__name">SV Hub</span>
          <span className="logo__tag">Sadhguru Veera’s</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
