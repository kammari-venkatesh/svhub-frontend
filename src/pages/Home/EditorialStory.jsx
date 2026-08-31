import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import { editorial } from '../../data/home.js'
import './EditorialStory.css'

const THEME_ROLES = ['farming', 'grains', 'methods']

function frameRole(image, index) {
  if (image.wide) return 'farming'
  if (image.featured) return 'methods'
  if (index === 0) return 'grains'
  return 'spices'
}

function splitHeadline(text) {
  const grain = text.match(/^(From the grain)\s+(to the table\.?)$/i)
  if (grain) {
    return (
      <>
        <span className="editorial__headline-line">{grain[1]}</span>
        <span className="editorial__headline-line editorial__headline-line--soft">{grain[2]}</span>
      </>
    )
  }

  const comma = text.indexOf(',')
  if (comma === -1) return text

  return (
    <>
      <span className="editorial__headline-line">{text.slice(0, comma + 1)}</span>
      <span className="editorial__headline-line editorial__headline-line--soft">
        {text.slice(comma + 1).trim()}
      </span>
    </>
  )
}

function EditorialArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9h11M10.5 5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function StoryFrame({ image, active, children }) {
  return (
    <figure
      id={`editorial-visual-${image.role}`}
      className={`editorial__frame editorial__frame--${image.role}${active ? ' is-active' : ''}`}
    >
      <span className="editorial__media" data-speed="0.12">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        <span className="editorial__grain" aria-hidden="true" />
      </span>
      {children}
    </figure>
  )
}

function EditorialStory() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const active = hovered ?? selected

  const images = editorial.grid.map((image, index) => ({
    ...image,
    role: frameRole(image, index),
  }))

  const hero = images.find((image) => image.role === 'farming')
  const supporting = images.filter((image) => image.role !== 'farming')

  function activateTheme(index) {
    setSelected((current) => (current === index ? null : index))

    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 1023px)').matches) {
      return
    }

    const node = document.getElementById(`editorial-visual-${THEME_ROLES[index]}`)
    node?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  return (
    <section className="home-section home-section--off editorial-section" aria-label="Our story">
      <div className={`home-container editorial${active !== null ? ' is-hot' : ''}`}>
        <span className="editorial__backdrop" aria-hidden="true">
          Rooted
        </span>

        <Reveal className="editorial__meta">
          <header>
            <p className="editorial__label">{editorial.label}</p>
            <p className="editorial__origin">
              Est. {editorial.year}
              <span aria-hidden="true"> · </span>
              {editorial.origin}
            </p>
          </header>
        </Reveal>

        <Reveal className="editorial__headline-wrap" delay={80}>
          <h2 className="editorial__headline">{splitHeadline(editorial.headline)}</h2>
        </Reveal>

        {hero && (
          <Reveal className="editorial__hero" delay={120}>
            <StoryFrame image={hero} active={THEME_ROLES[active] === hero.role} />
          </Reveal>
        )}

        <Reveal as="ol" className="home-stagger editorial__themes">
          {editorial.themes.map((theme, index) => {
            const isActive = active === index

            return (
              <li key={theme.number}>
                <button
                  type="button"
                  className={`editorial__theme${isActive ? ' is-active' : ''}`}
                  aria-pressed={selected === index}
                  aria-controls={`editorial-visual-${THEME_ROLES[index]}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  onClick={() => activateTheme(index)}
                >
                  <span className="editorial__theme-num">{theme.number}</span>
                  <span className="editorial__theme-body">
                    <span className="editorial__theme-label">{theme.label}</span>
                    <span className="editorial__theme-line" aria-hidden="true" />
                  </span>
                  <span className="editorial__theme-mark" aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </Reveal>

        <Reveal className="home-stagger editorial__support" delay={80}>
          {supporting.map((image) => (
            <StoryFrame
              key={image.alt}
              image={image}
              active={THEME_ROLES[active] === image.role}
            >
              {image.role === 'grains' ? (
                <p className="editorial__note" aria-hidden="true">
                  grown with care
                  <svg viewBox="0 0 36 18" fill="none">
                    <path
                      d="M3 10h22M19.5 6.5 25.5 10l-6 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              ) : null}
            </StoryFrame>
          ))}
        </Reveal>

        <Reveal className="editorial__story" delay={180}>
          <h3 className="editorial__lead">{editorial.storyTitle}</h3>
          <span className="editorial__rule" aria-hidden="true" />
          <p className="editorial__copy">{editorial.storyCopy}</p>
          <Link to={editorial.storyTo} className="editorial__cta">
            <span>{editorial.storyCta}</span>
            <EditorialArrow />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default EditorialStory
