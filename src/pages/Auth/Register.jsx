import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthError } from '../../api/auth.js'
import AuthAlert from '../../components/auth/AuthAlert.jsx'
import AuthField from '../../components/auth/AuthField.jsx'
import AuthGoogleButton from '../../components/auth/AuthGoogleButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthSuccess from '../../components/auth/AuthSuccess.jsx'
import PasswordField from '../../components/auth/PasswordField.jsx'
import PasswordStrength from '../../components/auth/PasswordStrength.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { images } from '../../data/images.js'
import { emailError, nameError, phoneError } from '../../utils/authValidation.js'
import { passwordError } from '../../utils/passwordPolicy.js'

function safeFrom(path) {
  if (!path || path === '/login' || path === '/register') return '/'
  return path
}

function Register() {
  const { user, register, loginWithGoogle, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = safeFrom(location.state?.from)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  })
  const [touched, setTouched] = useState({})
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')
  const [done, setDone] = useState('')
  const hadSession = useRef(Boolean(user))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [done])

  useEffect(() => {
    if (!hadSession.current) return undefined
    hadSession.current = false
    logout()
    return undefined
  }, [logout])

  useEffect(() => {
    if (done !== 'google') return undefined
    const timer = window.setTimeout(() => navigate(from, { replace: true }), 1800)
    return () => window.clearTimeout(timer)
  }, [done, from, navigate])

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function blur(key) {
    setTouched((current) => ({ ...current, [key]: true }))
  }

  function goToLogin() {
    navigate('/login', {
      replace: true,
      state: {
        registered: true,
        email: form.email.trim(),
        from,
      },
    })
  }

  const errors = {
    name: touched.name ? nameError(form.name) : '',
    email: touched.email ? emailError(form.email) : '',
    phone: touched.phone ? phoneError(form.phone) : '',
    password: touched.password ? passwordError(form.password) : '',
    confirm: touched.confirm
      ? !form.confirm
        ? 'Confirm your password.'
        : form.confirm !== form.password
          ? 'Passwords don’t match.'
          : ''
      : '',
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setTouched({ name: true, email: true, phone: true, password: true, confirm: true })
    setFormError('')

    const next = {
      name: nameError(form.name),
      email: emailError(form.email),
      phone: phoneError(form.phone),
      password: passwordError(form.password),
      confirm: !form.confirm
        ? 'Confirm your password.'
        : form.confirm !== form.password
          ? 'Passwords don’t match.'
          : '',
    }

    if (Object.values(next).some(Boolean)) return

    setBusy(true)
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
      setDone('password')
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

  async function handleGoogle() {
    setFormError('')
    setBusy(true)
    try {
      const result = await loginWithGoogle()
      if (result.created) {
        setDone('google')
        return
      }
      navigate(from, { replace: true })
    } catch (error) {
      setFormError(
        error instanceof AuthError
          ? error.message
          : 'Google Sign-In didn’t work. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      variant="split"
      image={images.cooking}
      imageAlt="A traditional South Indian meal served at home"
    >
      {done === 'google' ? (
        <AuthSuccess
          eyebrow="Account"
          title="Successfully registered"
          copy="Your SV Hub account is ready. Taking you into the site."
        >
          <Button className="auth__submit" onClick={() => navigate(from, { replace: true })}>
            CONTINUE
          </Button>
        </AuthSuccess>
      ) : done === 'password' ? (
        <AuthSuccess
          eyebrow="Account"
          title="Registration successful"
          copy="Your SV Hub account is ready. Log in with your email and password to continue."
        >
          <Button className="auth__submit" onClick={goToLogin}>
            LOG IN
          </Button>
        </AuthSuccess>
      ) : (
        <>
          <p className="auth__eyebrow">Account</p>
          <h1 className="auth__title">Create Your SV Hub Account</h1>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <AuthAlert>{formError}</AuthAlert>

            <AuthField
              id="register-name"
              label="Full Name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              error={errors.name}
              onChange={(event) => setField('name', event.target.value)}
              onBlur={() => blur('name')}
            />

            <AuthField
              id="register-email"
              label="Email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              value={form.email}
              error={errors.email}
              onChange={(event) => setField('email', event.target.value)}
              onBlur={() => blur('email')}
            />

            <AuthField
              id="register-phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              error={errors.phone}
              onChange={(event) => setField('phone', event.target.value)}
              onBlur={() => blur('phone')}
            />

            <PasswordField
              id="register-password"
              label="Password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={form.password}
              error={errors.password}
              onChange={(event) => setField('password', event.target.value)}
              onBlur={() => blur('password')}
            />

            <PasswordStrength password={form.password} />

            <PasswordField
              id="register-confirm"
              label="Confirm Password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirm}
              error={errors.confirm}
              onChange={(event) => setField('confirm', event.target.value)}
              onBlur={() => blur('confirm')}
            />

            <Button type="submit" className="auth__submit" disabled={busy} aria-busy={busy}>
              {busy ? 'Please wait' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          <AuthGoogleButton busy={busy} onClick={handleGoogle} />

          <p className="auth__switch">
            Already have an account?
            <Link className="auth__text-link" to="/login" state={{ from }}>
              LOGIN
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

export default Register
