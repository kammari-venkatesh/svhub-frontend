import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AuthError } from '../../api/auth.js'
import AuthAlert from '../../components/auth/AuthAlert.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthSuccess from '../../components/auth/AuthSuccess.jsx'
import PasswordField from '../../components/auth/PasswordField.jsx'
import PasswordStrength from '../../components/auth/PasswordStrength.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { images } from '../../data/images.js'
import { passwordError } from '../../utils/passwordPolicy.js'

function ResetPassword() {
  const { inspectResetToken, resetPassword } = useAuth()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState({})
  const [busy, setBusy] = useState(false)
  const [checking, setChecking] = useState(true)
  const [tokenError, setTokenError] = useState('')
  const [formError, setFormError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    let active = true

    inspectResetToken(token)
      .then(() => {
        if (active) setTokenError('')
      })
      .catch((error) => {
        if (!active) return
        setTokenError(
          error instanceof AuthError
            ? error.message
            : 'This reset link is invalid. Request a new one.',
        )
      })
      .finally(() => {
        if (active) setChecking(false)
      })

    return () => {
      active = false
    }
  }, [token, inspectResetToken])

  const passwordErr = touched.password ? passwordError(password) : ''
  const confirmErr = touched.confirm
    ? !confirm
      ? 'Confirm your password.'
      : confirm !== password
        ? 'Passwords don’t match.'
        : ''
    : ''

  async function handleSubmit(event) {
    event.preventDefault()
    setTouched({ password: true, confirm: true })
    setFormError('')

    const nextPassword = passwordError(password)
    const nextConfirm = !confirm
      ? 'Confirm your password.'
      : confirm !== password
        ? 'Passwords don’t match.'
        : ''
    if (nextPassword || nextConfirm) return

    setBusy(true)
    try {
      await resetPassword({ token, password })
      setDone(true)
    } catch (error) {
      setFormError(
        error instanceof AuthError
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout variant="card" image={images.authKitchen} imageAlt="">
      {checking ? (
        <p className="auth__copy">Checking your reset link…</p>
      ) : tokenError ? (
        <>
          <p className="auth__eyebrow">Account</p>
          <h1 className="auth__title">Link expired</h1>
          <p className="auth__copy">{tokenError}</p>
          <div className="auth__form">
            <Button to="/forgot-password" className="auth__submit">
              Request a new link
            </Button>
          </div>
        </>
      ) : done ? (
        <AuthSuccess
          title="PASSWORD UPDATED"
          copy="Your password has been changed. You can now log in with your new password."
        >
          <Button to="/login" className="auth__submit">
            LOGIN
          </Button>
        </AuthSuccess>
      ) : (
        <>
          <p className="auth__eyebrow">Account</p>
          <h1 className="auth__title">Create a New Password</h1>
          <p className="auth__copy">Choose a password you’ll remember, then confirm it below.</p>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <AuthAlert>{formError}</AuthAlert>

            <PasswordField
              id="reset-password"
              label="New Password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              error={passwordErr}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, password: true }))}
            />

            <PasswordStrength password={password} />

            <PasswordField
              id="reset-confirm"
              label="Confirm Password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirm}
              error={confirmErr}
              onChange={(event) => setConfirm(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, confirm: true }))}
            />

            <Button type="submit" className="auth__submit" disabled={busy} aria-busy={busy}>
              {busy ? 'Please wait' : 'RESET PASSWORD'}
            </Button>
          </form>

          <p className="auth__switch">
            <Link className="auth__text-link" to="/login">
              BACK TO LOGIN
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

export default ResetPassword
