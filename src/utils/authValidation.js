const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value = '') {
  return value.trim().toLowerCase()
}

export function emailError(value = '') {
  const email = value.trim()
  if (!email) return 'Enter your email address.'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address.'
  return ''
}

export function nameError(value = '') {
  const name = value.trim()
  if (!name) return 'Enter your full name.'
  if (name.length < 2) return 'Enter your full name.'
  return ''
}

export function normalizePhone(value = '') {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

export function phoneError(value = '') {
  if (!value.trim()) return 'Enter your phone number.'
  const digits = normalizePhone(value)
  if (!/^[6-9]\d{9}$/.test(digits)) return 'Enter a valid 10-digit Indian mobile number.'
  return ''
}

export function loginIdentifierError(value = '') {
  const identifier = value.trim()
  if (!identifier) return 'Enter your email or mobile number.'
  if (identifier.includes('@')) return emailError(identifier)
  return phoneError(identifier)
}

export function maskEmail(value = '') {
  const email = normalizeEmail(value)
  const at = email.indexOf('@')
  if (at < 1) return email
  const name = email.slice(0, at)
  const domain = email.slice(at)
  const visible = name.slice(0, Math.min(2, name.length))
  return `${visible}${'•'.repeat(Math.max(name.length - visible.length, 2))}${domain}`
}
