import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import { whyIntro, whyItems } from '../../data/home.js'
import './WhySvHub.css'

function IconFarm() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 15.2 16 7l10 8.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15.5V25h14V15.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 25v-5.5h4V25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M9 23c7-1.2 12.5-7.5 13.5-16.5C13.5 7.8 7.8 14.8 9 23Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 20.5c3-2.8 8-5 12.8-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconBowl() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7 16h18c-.8 6.6-5.2 10-9 10s-8.2-3.4-9-10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11c1 1.8 2.6 2.7 3.5 2.7s2.5-.9 3.5-2.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconLand() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 24.5h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 24.5V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M16 18.5c-3.6.2-6.2-2.2-6.6-5.8 4.2.3 6.4 2.8 6.6 5.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15c3.4-.6 5.8-3.2 6.2-6.6-4 .6-5.8 3.2-6.2 6.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function CareNote() {
  return (
    <span className="why__note">
      <span className="why__note-label">care matters</span>
      <svg className="why__note-arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="why__note-mark" viewBox="0 0 120 14" fill="none" aria-hidden="true">
        <path
          d="M2.4 9.6c14.8-4.6 28.6 2.6 43.4.2 13.2-2.1 25.4-6.2 38.8-4 10.8 1.8 21.2 5.2 32.2 2.2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function PromiseSeal() {
  return (
    <div className="why__seal" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.45" />
        <path
          id="why-seal-path"
          d="M100,100 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0"
          fill="none"
        />
        <text>
          <textPath href="#why-seal-path" startOffset="0">
            SV HUB  ·  PROMISE  ·  CARE  ·  SV HUB  ·  PROMISE  ·  CARE  ·
          </textPath>
        </text>
      </svg>
      <span className="why__seal-word">Promise</span>
    </div>
  )
}

const icons = [IconFarm, IconLeaf, IconBowl, IconLand]
const anchors = ['Rooted', 'Pure', 'Heritage', 'Care']

function WhySvHub() {
  const [active, setActive] = useState(0)
  const current = whyItems[active] ?? whyItems[0]

  return (
    <section
      id="why-sv-hub"
      className="home-section why-section"
      aria-labelledby="why-heading"
    >
      <span className="why__grain" aria-hidden="true" />
      <span className="why__promise-mark" aria-hidden="true">
        Promise
      </span>

      <div className="home-container">
        <Reveal className="why__header">
          <div className="why__heading">
            <p className="why__eyebrow">{whyIntro.eyebrow}</p>
            <h2 id="why-heading" className="why__title">
              {whyIntro.title}
            </h2>
            <CareNote />
          </div>
          <div className="why__lede">
            <p className="why__count">04 Principles</p>
            <p className="why__intro">{whyIntro.copy}</p>
          </div>
        </Reveal>

        <div className="why__stage">
          <Reveal className="why__anchor" delay={60} aria-hidden="true">
            <p className="why__watermark">{anchors[active]}</p>
            <PromiseSeal />
            <p className="why__active-label">
              <span>{current.number}</span>
              {current.title}
            </p>
          </Reveal>

          <Reveal as="ol" className="home-stagger why__manifesto">
            {whyItems.map((item, index) => {
              const Icon = icons[index]

              return (
                <li key={item.number}>
                  <article
                    className={`why__item${active === index ? ' is-active' : ''}`}
                    tabIndex={0}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                  >
                    <span className="why__number">{item.number}</span>
                    <span className="why__icon">
                      <Icon />
                    </span>
                    <div className="why__body">
                      <h3>{item.title}</h3>
                      <p className="why__copy">{item.copy}</p>
                    </div>
                  </article>
                </li>
              )
            })}
          </Reveal>
        </div>

        <Reveal className="why__footer" delay={80}>
          <Link to="/about" className="why__cta">
            Explore our story
            <Arrow size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default WhySvHub
