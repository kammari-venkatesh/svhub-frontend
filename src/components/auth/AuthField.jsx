function AuthField({
  id,
  label,
  error = '',
  hint = '',
  trailing = null,
  className = '',
  as = 'input',
  ...inputProps
}) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, !error && hint ? hintId : null].filter(Boolean).join(' ')
  const Control = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`auth-field${error ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`}>
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-field__control">
        <Control
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
        {trailing}
      </div>
      {error ? (
        <p id={errorId} className="auth-field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="auth-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export default AuthField
