import { useEffect, useId, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthError } from '../../api/auth.js'
import { GoogleMark } from '../../components/auth/AuthGoogleButton.jsx'
import PasswordStrength from '../../components/auth/PasswordStrength.jsx'
import '../../components/auth/Auth.css'
import { useAuth } from '../../context/AuthContext.jsx'
import { emailError, nameError, phoneError } from '../../utils/authValidation.js'
import { passwordError } from '../../utils/passwordPolicy.js'
import AccountLoginPrompt from './AccountLoginPrompt.jsx'
import './Profile.css'

const EMPTY_SECURITY = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function profileFromUser(user) {
  return {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    ...EMPTY_SECURITY,
  }
}

function isDirty(form, user) {
  return (
    form.name !== (user?.name || '') ||
    form.email !== (user?.email || '') ||
    form.phone !== (user?.phone || '') ||
    Boolean(form.currentPassword || form.newPassword || form.confirmPassword)
  )
}

function firstErrorId(errors) {
  const order = [
    ['name', 'profile-name'],
    ['email', 'profile-email'],
    ['phone', 'profile-phone'],
    ['currentPassword', 'profile-current'],
    ['newPassword', 'profile-new'],
    ['confirmPassword', 'profile-confirm'],
  ]
  return order.find(([key]) => errors[key])?.[1] || ''
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function ProfileField({ id, label, error = '', hint = '', trailing = null, ...inputProps }) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, !error && hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={`profile-field${error ? ' is-invalid' : ''}`}>
      <label className="profile-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="profile-field__control">
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
        {trailing}
      </div>
      {error ? (
        <p id={errorId} className="profile-field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="profile-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function ProfilePassword({ id, disabled = false, ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <ProfileField
      id={id}
      {...props}
      disabled={disabled}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          className="profile-field__toggle"
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

function Profile() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)
  const keepRef = useRef(null)
  const leaveTitleId = useId()
  const [form, setForm] = useState(() => profileFromUser(user))
  const [touched, setTouched] = useState({})
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const [leaveTo, setLeaveTo] = useState(null)

  const hasPassword = user?.hasPassword !== false
  const googleAccount = user?.hasPassword === false
  const dirty = Boolean(user) && isDirty(form, user)
  const changingPassword = Boolean(form.currentPassword || form.newPassword || form.confirmPassword)

  useEffect(() => {
    setForm(profileFromUser(user))
    setTouched({})
    setFormError('')
    setSuccess('')
    setLeaveTo(null)
  }, [user?.id])

  useEffect(() => {
    if (!dirty) return undefined

    function onLeave(event) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [dirty])

  useEffect(() => {
    if (!dirty || busy) return undefined

    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target.closest?.('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      let url
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return
      if (`${url.pathname}${url.search}` === `${location.pathname}${location.search}`) return

      event.preventDefault()
      event.stopPropagation()
      setLeaveTo(`${url.pathname}${url.search}${url.hash}`)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [busy, dirty, location.pathname, location.search])

  useEffect(() => {
    if (!leaveTo) return undefined
    keepRef.current?.focus()

    function onKey(event) {
      if (event.key === 'Escape') setLeaveTo(null)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [leaveTo])

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setSuccess('')
  }

  function blur(key) {
    setTouched((current) => ({ ...current, [key]: true }))
  }

  const errors = {
    name: touched.name ? nameError(form.name) : '',
    email: touched.email ? emailError(form.email) : '',
    phone: touched.phone ? phoneError(form.phone) : '',
    currentPassword: touched.currentPassword
      ? changingPassword && hasPassword && !form.currentPassword
        ? 'Enter your current password.'
        : ''
      : '',
    newPassword: touched.newPassword
      ? changingPassword
        ? !form.newPassword
          ? 'Enter a new password.'
          : passwordError(form.newPassword) ||
            (hasPassword && form.currentPassword && form.newPassword === form.currentPassword
              ? 'Choose a password that’s different from your current one.'
              : '')
        : ''
      : '',
    confirmPassword: touched.confirmPassword
      ? changingPassword
        ? !form.confirmPassword
          ? 'Confirm your new password.'
          : form.confirmPassword !== form.newPassword
            ? 'Passwords don’t match.'
            : ''
        : ''
      : '',
  }

  function validate() {
    return {
      name: nameError(form.name),
      email: emailError(form.email),
      phone: phoneError(form.phone),
      currentPassword:
        changingPassword && hasPassword && !form.currentPassword ? 'Enter your current password.' : '',
      newPassword: changingPassword
        ? !form.newPassword
          ? 'Enter a new password.'
          : passwordError(form.newPassword) ||
            (hasPassword && form.currentPassword && form.newPassword === form.currentPassword
              ? 'Choose a password that’s different from your current one.'
              : '')
        : '',
      confirmPassword: changingPassword
        ? !form.confirmPassword
          ? 'Confirm your new password.'
          : form.confirmPassword !== form.newPassword
            ? 'Passwords don’t match.'
            : ''
        : '',
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setTouched({
      name: true,
      email: true,
      phone: true,
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    })
    setFormError('')
    setSuccess('')

    if (Object.values(nextErrors).some(Boolean)) {
      window.requestAnimationFrame(() => {
        document.getElementById(firstErrorId(nextErrors))?.focus()
      })
      return
    }

    setBusy(true)
    try {
      const savedUser = await updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone,
        ...(changingPassword
          ? {
              currentPassword: form.currentPassword,
              newPassword: form.newPassword,
            }
          : {}),
      })
      setForm(profileFromUser(savedUser))
      setTouched({})
      setSuccess(changingPassword ? 'Details and password saved.' : 'Changes saved')
    } catch (error) {
      setFormError(
        error instanceof AuthError ? error.message : 'Something went wrong. Please try again.',
      )
      formRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    } finally {
      setBusy(false)
    }
  }

  function keepEditing() {
    setLeaveTo(null)
  }

  function discardChanges() {
    const next = leaveTo
    setForm(profileFromUser(user))
    setTouched({})
    setFormError('')
    setSuccess('')
    setLeaveTo(null)
    if (next) navigate(next)
  }

  if (!user) {
    return (
      <div className="account-panel">
        <AccountLoginPrompt
          title="Log in to manage your profile"
          copy="Sign in to update your name, email, phone and password."
        />
      </div>
    )
  }

  const saved = Boolean(success) && !dirty && !busy
  const saveLabel = busy ? 'Saving' : saved ? 'Changes saved' : 'Save changes'
  const phoneHint = form.phone.trim() || errors.phone ? '' : '10-digit mobile number'

  return (
    <form ref={formRef} className="profile" onSubmit={handleSubmit} noValidate>
      {formError ? (
        <p className="profile__alert" role="alert">
          {formError}
        </p>
      ) : null}

      {leaveTo ? (
        <div className="profile__leave" role="alertdialog" aria-labelledby={leaveTitleId} aria-describedby="unsaved-copy">
          <p className="profile__leave-kicker">Unsaved changes</p>
          <p id={leaveTitleId} className="profile__leave-title">
            You have changes that haven’t been saved.
          </p>
          <p id="unsaved-copy" className="sr-only">
            Keep editing to stay on this page, or discard to leave without saving.
          </p>
          <div className="profile__leave-actions">
            <button ref={keepRef} type="button" className="profile__leave-keep" onClick={keepEditing}>
              Keep
            </button>
            <button type="button" className="profile__leave-discard" onClick={discardChanges}>
              Discard
            </button>
          </div>
        </div>
      ) : null}

      <section className="profile__block" aria-labelledby="personal-heading">
        <p className="profile__kicker">
          <span className="profile__seed" aria-hidden="true" />
          Personal information
        </p>
        <h2 id="personal-heading" className="profile__heading">
          Your details
        </h2>
        <p className="profile__lede">Edit your name and how we reach you. Saved details appear on your next order.</p>

        <div className="profile__fields">
          <ProfileField
            id="profile-name"
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            error={errors.name}
            disabled={busy}
            onChange={(event) => setField('name', event.target.value)}
            onBlur={() => blur('name')}
          />
          <ProfileField
            id="profile-email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            value={form.email}
            error={errors.email}
            disabled={busy}
            onChange={(event) => setField('email', event.target.value)}
            onBlur={() => blur('email')}
          />
          <ProfileField
            id="profile-phone"
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Add your mobile number"
            value={form.phone}
            error={errors.phone}
            hint={phoneHint}
            disabled={busy}
            onChange={(event) => setField('phone', event.target.value)}
            onBlur={() => blur('phone')}
          />
        </div>
      </section>

      <section className="profile__block profile__block--security" aria-labelledby="security-heading">
        <p className="profile__kicker">Security</p>
        <h2 id="security-heading" className="profile__heading">
          Password
        </h2>
        <p className="profile__lede">Your account password is managed securely.</p>

        {googleAccount ? (
          <aside className="profile__google" aria-label="Google account">
            <GoogleMark size={14} />
            <span>
              <strong>Google account</strong>
              Signed in with Google. You can add a password if you’d also like to sign in with email.
            </span>
          </aside>
        ) : null}

        <div className="profile__fields">
          <ProfilePassword
            id="profile-current"
            label="Current password"
            name="currentPassword"
            autoComplete="current-password"
            placeholder="Current password"
            value={form.currentPassword}
            error={errors.currentPassword}
            hint={
              hasPassword
                ? 'Required only when choosing a new password.'
                : 'Not needed if you signed in with Google.'
            }
            disabled={busy}
            onChange={(event) => setField('currentPassword', event.target.value)}
            onBlur={() => blur('currentPassword')}
          />
          <ProfilePassword
            id="profile-new"
            label="New password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="New password"
            value={form.newPassword}
            error={errors.newPassword}
            disabled={busy}
            onChange={(event) => setField('newPassword', event.target.value)}
            onBlur={() => blur('newPassword')}
          />
          <PasswordStrength password={form.newPassword} />
          <ProfilePassword
            id="profile-confirm"
            label="Confirm password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter new password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            disabled={busy}
            onChange={(event) => setField('confirmPassword', event.target.value)}
            onBlur={() => blur('confirmPassword')}
          />
        </div>
      </section>

      <div className="profile__cta">
        <button
          type="submit"
          className={`profile__save${saved ? ' is-saved' : ''}`}
          disabled={busy || !dirty}
          aria-busy={busy}
        >
          <span>{saveLabel}</span>
          {busy ? null : saved ? <span aria-hidden="true">✓</span> : <Arrow />}
        </button>
        {saved ? (
          <p className="profile__saved" role="status">
            Changes saved ✓
          </p>
        ) : dirty ? (
          <p className="profile__hint">Unsaved edits</p>
        ) : null}
      </div>
    </form>
  )
}

export default Profile
