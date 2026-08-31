function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.4 12.2 10.1 16l7.5-8.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AuthSuccess({ eyebrow, title, copy, children }) {
  return (
    <div className="auth-success">
      <span className="auth-success__icon">
        <CheckIcon />
      </span>
      {eyebrow ? <p className="auth__eyebrow">{eyebrow}</p> : null}
      <h1 className="auth__title">{title}</h1>
      {copy ? <p className="auth__copy">{copy}</p> : null}
      {children}
    </div>
  )
}

export default AuthSuccess
