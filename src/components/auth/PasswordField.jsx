import { useState } from 'react'
import AuthField from './AuthField.jsx'

function PasswordField({ id, disabled = false, ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <AuthField
      id={id}
      {...props}
      disabled={disabled}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          className="auth-field__toggle"
          onClick={() => setVisible((open) => !open)}
          disabled={disabled}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          aria-controls={id}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      }
    />
  )
}

export default PasswordField
