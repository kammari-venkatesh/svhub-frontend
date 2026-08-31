import { useEffect, useRef, useState } from 'react'
import AuthAlert from '../../components/auth/AuthAlert.jsx'
import AuthField from '../../components/auth/AuthField.jsx'
import '../../components/auth/Auth.css'
import Button from '../../components/ui/Button.jsx'
import { contact } from '../../data/contact.js'
import { images } from '../../data/images.js'
import { emailError, nameError, phoneError } from '../../utils/authValidation.js'
import './Contact.css'

function messageError(value = '') {
  const message = value.trim()
  if (!message) return 'Tell us how we can help.'
  if (message.length < 10) return 'A few more words will help us reply well.'
  return ''
}

function mailHref(form) {
  const subject = encodeURIComponent(`A note from ${form.name.trim()}`)
  const body = encodeURIComponent(
    `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}\n${form.phone.trim()}`,
  )
  return `mailto:${contact.email}?subject=${subject}&body=${body}`
}

function whatsappHref(form) {
  const text = encodeURIComponent(
    `Hello SV Hub,\n\n${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}\n${form.phone.trim()}`,
  )
  return `${contact.whatsappUrl}?text=${text}`
}

function WhatsAppMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.04 3.2A8.7 8.7 0 0 0 3.4 11.9c0 1.53.4 3.03 1.16 4.35L3.2 20.8l4.68-1.32A8.7 8.7 0 0 0 20.8 11.9 8.7 8.7 0 0 0 12.04 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.3 8.7c.18-.4.36-.42.53-.43h.45c.18 0 .42 0 .63.3.22.32.74 1.02.8 1.1.07.07.12.18.02.35-.1.18-.14.28-.28.43-.14.15-.3.33-.13.63.16.3.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.28 1.4.3.15.47.12.65-.07.17-.18.74-.86.94-1.16.2-.3.4-.24.66-.14.27.1 1.7.8 1.99.95.3.14.49.22.56.34.07.13.07.73-.17 1.44-.24.7-1.4 1.37-1.94 1.42-.54.05-1.22.08-3.53-.87-2.78-1.15-4.56-3.96-4.7-4.15-.13-.18-1.1-1.46-1.1-2.78 0-1.32.7-1.97.94-2.24Z"
        fill="currentColor"
      />
    </svg>
  )
}

function firstErrorId(errors) {
  const order = [
    ['name', 'contact-name'],
    ['email', 'contact-email'],
    ['phone', 'contact-phone'],
    ['message', 'contact-message'],
  ]
  return order.find(([key]) => errors[key])?.[1] || ''
}

function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [touched, setTouched] = useState({})
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const errors = {
    name: touched.name ? nameError(form.name) : '',
    email: touched.email ? emailError(form.email) : '',
    phone: touched.phone ? phoneError(form.phone) : '',
    message: touched.message ? messageError(form.message) : '',
  }

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setSuccess(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {
      name: nameError(form.name),
      email: emailError(form.email),
      phone: phoneError(form.phone),
      message: messageError(form.message),
    }
    setTouched({ name: true, email: true, phone: true, message: true })

    if (Object.values(nextErrors).some(Boolean)) {
      window.requestAnimationFrame(() => {
        document.getElementById(firstErrorId(nextErrors))?.focus()
      })
      return
    }

    setBusy(true)
    window.location.href = mailHref(form)
    window.setTimeout(() => {
      setBusy(false)
      setSuccess(true)
    }, 400)
  }

  return (
    <div className="contact">
      <header className="contact-hero" aria-labelledby="contact-hero-heading">
        <div className="contact-hero__media" aria-hidden="true">
          <img src={images.contactHero} alt="" />
          <span className="contact-hero__veil" />
        </div>
        <div className="container contact-hero__copy">
          <p className="contact-hero__eyebrow">Contact</p>
          <h1 id="contact-hero-heading">We’d Love to Hear From You</h1>
          <p className="contact-hero__lede">
            Come say hello — whether it’s a question about native rice, a soap that found its way home, or a note from
            Coimbatore.
          </p>
        </div>
      </header>

      <div className="contact-body">
        <div className="container contact-layout">
          <aside className="contact-reach" aria-labelledby="reach-heading">
            <p className="contact-kicker">Reach us</p>
            <h2 id="reach-heading">A kitchen in Coimbatore</h2>
            <p className="contact-reach__copy">{contact.replyNote}</p>

            <ul className="contact-facts">
              <li>
                <p className="contact-kicker">Location</p>
                <p>{contact.city}</p>
                <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
                  Open map →
                </a>
              </li>
              <li>
                <p className="contact-kicker">Phone / WhatsApp</p>
                <p>
                  <a href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>
                </p>
              </li>
              <li>
                <p className="contact-kicker">Email</p>
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </li>
            </ul>

            <div className="contact-reach__actions">
              <Button href={contact.whatsappUrl} variant="primary" size="md" arrow target="_blank" rel="noreferrer">
                <WhatsAppMark />
                Chat on WhatsApp
              </Button>
              <Button href={`mailto:${contact.email}`} variant="secondary" size="md">
                Write to us
              </Button>
            </div>
          </aside>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <p className="contact-kicker">Write to us</p>
            <h2>Send a message</h2>
            <p className="contact-form__lede">
              Leave your details and a few words. We’ll reply from {contact.email}.
            </p>

            {success ? (
              <AuthAlert tone="success">
                Your note is ready in your mail app. If it didn’t open, write to {contact.email} or chat on WhatsApp.
              </AuthAlert>
            ) : null}

            <div className="contact-form__fields">
              <AuthField
                id="contact-name"
                label="Name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                error={errors.name}
                disabled={busy}
                onChange={(event) => setField('name', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
              />
              <AuthField
                id="contact-email"
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
                onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              />
              <AuthField
                id="contact-phone"
                label="Phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                error={errors.phone}
                disabled={busy}
                onChange={(event) => setField('phone', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
              />
              <AuthField
                as="textarea"
                id="contact-message"
                label="Message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                error={errors.message}
                disabled={busy}
                onChange={(event) => setField('message', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, message: true }))}
              />
            </div>

            <div className="contact-form__cta">
              <Button type="submit" variant="espresso" size="md" arrow disabled={busy} aria-busy={busy}>
                {busy ? 'Opening' : 'Send message'}
              </Button>
              {success ? (
                <a className="contact-form__wa" href={whatsappHref(form)} target="_blank" rel="noreferrer">
                  Send this on WhatsApp →
                </a>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      <section className="contact-map" aria-labelledby="map-heading">
        <div className="container contact-map__grid">
          <div className="contact-map__copy">
            <p className="contact-kicker">Find us</p>
            <h2 id="map-heading">Coimbatore, Tamil Nadu</h2>
            <p>
              SV Hub is rooted here — in the same soil that grows the native grains we send home. Visit the map, or
              write to us from wherever you are.
            </p>
            <Button href={contact.mapsUrl} variant="secondary" size="md" arrow>
              Open map
            </Button>
          </div>
          <figure className="contact-map__frame">
            <iframe
              title="Map of Coimbatore, Tamil Nadu"
              src={contact.osmEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </figure>
        </div>
      </section>
    </div>
  )
}

export default Contact
