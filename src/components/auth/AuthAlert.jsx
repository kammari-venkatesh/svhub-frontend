function AuthAlert({ children, tone = 'error' }) {
  if (!children) return null

  return (
    <p
      className={`auth-alert${tone === 'success' ? ' auth-alert--success' : ''}`}
      role={tone === 'success' ? 'status' : 'alert'}
    >
      {children}
    </p>
  )
}

export default AuthAlert
