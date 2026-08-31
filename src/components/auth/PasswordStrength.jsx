import { checkPassword, PASSWORD_RULES } from '../../utils/passwordPolicy.js'

function PasswordStrength({ password = '' }) {
  if (!password) return null

  const { score, label, checks } = checkPassword(password)

  return (
    <div className="auth-strength" data-score={score}>
      <div className="auth-strength__meter" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span key={step} className={`auth-strength__seg${score >= step ? ' is-on' : ''}`} />
        ))}
      </div>
      <p className="auth-strength__label">{label}</p>
      <ul className="auth-strength__list">
        {PASSWORD_RULES.map((rule) => (
          <li key={rule.id} className={checks[rule.id] ? 'is-met' : undefined}>
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordStrength
