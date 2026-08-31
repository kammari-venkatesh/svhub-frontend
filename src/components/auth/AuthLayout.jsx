import Logo from '../brand/Logo.jsx'
import './Auth.css'

function AuthLayout({ variant = 'split', image, imageAlt = '', children }) {
  return (
    <div className={`auth auth--${variant}`}>
      {image ? (
        <aside className="auth__visual" aria-hidden={variant === 'card' ? true : undefined}>
          <img
            src={image}
            alt={variant === 'split' ? imageAlt : ''}
            width="1200"
            height="1600"
            decoding="async"
            fetchPriority={variant === 'split' ? 'high' : 'low'}
          />
          <span className="auth__veil" />
        </aside>
      ) : null}

      <div className="auth__panel">
        <header className="auth__brand">
          <Logo />
        </header>
        <div className="auth__body">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
