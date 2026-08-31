export const PASSWORD_RULES = [
  { id: 'length', label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { id: 'upper', label: 'An uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { id: 'lower', label: 'A lowercase letter', test: (value) => /[a-z]/.test(value) },
  { id: 'number', label: 'A number', test: (value) => /\d/.test(value) },
  { id: 'special', label: 'A special character', test: (value) => /[^A-Za-z0-9]/.test(value) },
]

export function checkPassword(password = '') {
  const checks = Object.fromEntries(PASSWORD_RULES.map((rule) => [rule.id, rule.test(password)]))
  const passed = PASSWORD_RULES.filter((rule) => checks[rule.id]).length

  let label = 'Weak'
  let score = 1
  if (passed >= 5) {
    label = 'Strong'
    score = 3
  } else if (passed >= 3) {
    label = 'Fair'
    score = 2
  }

  return {
    checks,
    passed,
    label,
    score,
    valid: passed === PASSWORD_RULES.length,
  }
}

export function passwordError(password = '') {
  if (!password) return 'Enter a password.'
  const result = checkPassword(password)
  if (result.valid) return ''
  if (!result.checks.length) return 'Use at least 8 characters.'
  if (!result.checks.upper || !result.checks.lower) return 'Include upper and lowercase letters.'
  if (!result.checks.number) return 'Include at least one number.'
  if (!result.checks.special) return 'Include at least one special character.'
  return 'Choose a stronger password.'
}
