import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { whyIntro, whyItems } from '../../data/home.js'
import './WhySvHub.css'

function IconFarm() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 15.2 16 7l10 8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15.5V25h14V15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 25v-5.5h4V25"
        stroke="currentColor"
        strokeWidth="1.6"
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 20.5c3-2.8 8-5 12.8-6"
        stroke="currentColor"
        strokeWidth="1.6"
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11c1 1.8 2.6 2.7 3.5 2.7s2.5-.9 3.5-2.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconLand() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7 24.5h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 24.5V14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 18.5c-3.6.2-6.2-2.2-6.6-5.8 4.2.3 6.4 2.8 6.6 5.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15c3.4-.6 5.8-3.2 6.2-6.6-4 .6-5.8 3.2-6.2 6.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const icons = [IconFarm, IconLeaf, IconBowl, IconLand]

function WhySvHub() {
  return (
    <section id="why-sv-hub" className="home-section home-section--off why-section" aria-label="Why SV Hub">
      <div className="home-container">
        <Reveal className="home-section__header">
          <SectionHeader
            align="center"
            eyebrow={whyIntro.eyebrow}
            title={whyIntro.title}
            copy={whyIntro.copy}
          />
        </Reveal>
        <Reveal className="home-stagger why">
          {whyItems.map((item, index) => {
            const Icon = icons[index]
            return (
              <article key={item.number} className="why__item">
                <div className="why__meta">
                  <p className="why__number">{item.number}</p>
                  <span className="why__icon">
                    <Icon />
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="why__copy">{item.copy}</p>
              </article>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default WhySvHub
