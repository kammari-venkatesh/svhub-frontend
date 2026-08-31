import { Link } from 'react-router-dom'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { categories } from '../../data/categories.js'
import { housesIntro } from '../../data/home.js'
import { storefronts } from '../../data/storefronts.js'
import './Storefronts.css'

function houseCategories(house) {
  return house.categorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter(Boolean)
}

function ExploreArrow() {
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

function GoodnessMark() {
  return (
    <span className="houses-heading__mark">
      Goodness
      <svg viewBox="0 0 152 16" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M3.2 10.4c14.2-5.6 27.8 3.8 42.1 1.2 16.4-3 31.2-8.6 48-4.6 13.2 3.1 25.6 7.4 39.4 3.4 10.6-3.1 13.8-5.8 16.8-2.8"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function Storefronts() {
  return (
    <section className="home-section home-section--off houses-section" aria-label="Shop by house">
      <div className="home-container">
        <Reveal className="home-section__header houses-section__header">
          <SectionHeader
            align="center"
            eyebrow={housesIntro.eyebrow}
            title={
              <>
                Two Houses,{' '}
                <br className="houses-heading__break" />
                One Commitment to <GoodnessMark />.
              </>
            }
            copy={housesIntro.copy}
          />
        </Reveal>

        <Reveal className="home-stagger houses">
          {storefronts.map((house, index) => {
            const lead = index === 0

            return (
              <article
                key={house.id}
                className={`house house--${house.accentToken} ${lead ? 'house--lead' : 'house--offset'}`}
                style={{ '--house-accent': house.accent }}
                data-speed="0.14"
              >
                <img src={house.image} alt={house.imageAlt} loading="lazy" decoding="async" />
                <span className="house__grain" aria-hidden="true" />
                <div className="house__content">
                  <p className="house__kicker">
                    <span className="house__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="house__kicker-dash" aria-hidden="true">
                      —
                    </span>
                    {house.kicker}
                  </p>
                  <h3>{house.name}</h3>
                  <p className="house__copy">{house.copy}</p>
                  <ul className="house__cats">
                    {houseCategories(house).map((category) => (
                      <li key={category.id}>
                        <Link to={category.to}>{category.name}</Link>
                      </li>
                    ))}
                    {house.extraLabels.map((label) => (
                      <li key={label}>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={house.to} className="house__cta">
                    <span>{house.cta}</span>
                    <ExploreArrow />
                  </Link>
                </div>
              </article>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Storefronts
